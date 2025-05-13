import React, { useCallback, useEffect, useRef } from "react";
import Header from "./Header";
import Title from "../shared/Title";
import { Drawer, Grid, Skeleton } from "@mui/material";
import ChatList from "../../specific/ChatList";
import { sampleChats } from "../../constants/sampleData";
import { useNavigate, useParams } from "react-router-dom";
import Profile from "../../specific/Profile";
import { useMyChatsQuery } from "../../redux/api/api";
import { useSelector,useDispatch } from "react-redux";
import { setIsDeletedMenu, setIsMobile, setSelectedDeleteChat } from "../../redux/reducers/misc";
import toast from "react-hot-toast";
import { useErrors, useSocketEvents } from "../../../hooks/hook";
import { getSocket } from "../../socket";
import { NEW_MESSAGE_ALERT, NEW_REQUEST, ONLINE_USERS, REFETCH_CHAT } from "../../constants/events";
import { incrementNotification, setNewMessagesAlert } from "../../redux/reducers/chat";
import { getorSaveFromStorage } from "../../lib/features";
import DeleteChatMenu from "../dialog/DeleteChatMenu";
import { useState } from "react";

const AppLayout = () => (WrappedComponent) => {
  return (props) => {
    const dispatch=useDispatch();
    const { chatId } = useParams();
    const deleteMenuAnchor=useRef(null);
    const navigate=useNavigate();
    const {isMobile}=useSelector(state=>state.misc);
    const {user}=useSelector(state=>state.auth);
    const {newMessagesAlert}=useSelector(state=>state.chat);
    const [onlineUsers,setOnlineUsers]=useState([]);

    const {isLoading,data,error,isError,refetch}=useMyChatsQuery();

    useEffect(()=>{
      getorSaveFromStorage({key:NEW_MESSAGE_ALERT,value:newMessagesAlert})
    },[newMessagesAlert])

    const socket=getSocket();

    const handleDeleteChat = (e, chatId, groupChat) => {
      dispatch(setIsDeletedMenu(true))
      dispatch(setSelectedDeleteChat({ chatId, groupChat }))
      deleteMenuAnchor.current=e.currentTarget;
    };

    const handleMobileClose=()=>{
      dispatch(setIsMobile(false))
    }

    const newMessageAlertListener=useCallback((data)=>{
      if(data.chatId===chatId) return;
      dispatch(setNewMessagesAlert(data))
    },[chatId])

    const newRequestListener=useCallback(()=>{
      dispatch(incrementNotification())
    },[dispatch])

    const onlineUsersListener=useCallback((data)=>{
      console.log("online users",data);
      setOnlineUsers(data);
    },[])

    const refetchlistener=useCallback(()=>{
      refetch();
      navigate("/")
    },
    [refetch,navigate]);

    const eventHandlers={[NEW_MESSAGE_ALERT]:newMessageAlertListener,[NEW_REQUEST]:newRequestListener,[REFETCH_CHAT]:refetchlistener,[ONLINE_USERS]:onlineUsersListener}
    
      useSocketEvents(socket,eventHandlers);

    useErrors([{isError,error}])

    return (
      <>
        <Title />
        <Header />
        <DeleteChatMenu dispatch={dispatch} deleteAnchor={deleteMenuAnchor}/>
        {
          isLoading? (
            <Skeleton/>
          ):(
            <Drawer open={isMobile} onClose={handleMobileClose}>
              <ChatList
              w='70vw'
              chats={data?.chats}
              chatId={chatId}
              newMessagesAlert={newMessagesAlert}
              handleDeleteChat={handleDeleteChat}
              onlineUsers={onlineUsers}
              />
            </Drawer>
          )
        }
        <Grid container height={"96vh"}>
          <Grid
            item
            sm={4}
            md={3}
            sx={{ display: { xs: "none", sm: "block" } }}
            height={"100%"}
          >
          {
            isLoading?(
              <Skeleton/>
            ):(
              <ChatList
              chats={data?.chats}
              chatId={chatId}
              handleDeleteChat={handleDeleteChat}
              newMessagesAlert={newMessagesAlert}
              onlineUsers={onlineUsers}
            />
            )
          }
    
          </Grid>
          <Grid item xs={12} sm={8} md={5} lg={6} height={"100%"}>
            <WrappedComponent {...props} chatId={chatId} 
              user={user}
            />
          </Grid>
          <Grid
            item
            md={4}
            lg={3}
            height={"100%"}
            bgcolor="#572083"
            sx={{ display: { xs: "none", md: "block" }, padding: "2rem" }}
          >
            <Profile />
          </Grid>
        </Grid>

        {/* <div>footer</div> */}
      </>
    );
  };
};

export default AppLayout;
