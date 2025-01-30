import React from "react";
import Header from "./Header";
import Title from "../shared/Title";
import { Drawer, Grid, Skeleton } from "@mui/material";
import ChatList from "../../specific/ChatList";
import { sampleChats } from "../../constants/sampleData";
import { useParams } from "react-router-dom";
import Profile from "../../specific/Profile";
import { useMyChatsQuery } from "../../redux/api/api";
import { useSelector,useDispatch } from "react-redux";
import { setIsMobile } from "../../redux/reducers/misc";

const AppLayout = () => (WrappedComponent) => {
  return (props) => {
    const dispatch=useDispatch();
    const { chatId } = useParams();
    const {isMobile}=useSelector(state=>state.misc)
    const {isLoading,data,error,isError,refetch}=useMyChatsQuery();

    console.log("data",data);

    const handleDeleteChat = (e, _id, groupChat) => {
      e.preventDefault();
      console.log("handleDeleteCHat");
    };

    const handleMobileClose=()=>{
      dispatch(setIsMobile(false))
    }

    return (
      <>
        <Title />
        <Header />
        {
          isLoading? (
            <Skeleton/>
          ):(
            <Drawer open={isMobile} onClose={handleMobileClose}>
              <ChatList
              w='70vw'
              chats={data?.chats}
              chatId={chatId}
              newMessagesAlert={[{ chatId, count: 4 }]}
              onlineUsers={["1", "2"]}
              handleDeleteChat={handleDeleteChat}
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
            isLoading?AppLayout(
              <Skeleton/>
            ):(
              <ChatList
              chats={data?.chats}
              chatId={chatId}
              newMessagesAlert={[{ chatId, count: 4 }]}
              onlineUsers={["1", "2"]}
              handleDeleteChat={handleDeleteChat}
            />
            )
          }
    
          </Grid>
          <Grid item xs={12} sm={8} md={5} lg={6} height={"100%"}>
            <WrappedComponent {...props} />
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
