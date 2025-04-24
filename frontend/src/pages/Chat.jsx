import React, { useCallback, useEffect, useRef, useState } from "react";
import AppLayout from "../components/layout/AppLayout";
import { IconButton, Skeleton, Stack } from "@mui/material";
import AttachFileIcon from "@mui/icons-material/AttachFile";
import SendIcon from "@mui/icons-material/Send";
import { InputBox } from "../components/styled/StyledComponents";
import { FileMenu } from "../components/dialog/FileMenu";
import MessageComponent from "../components/shared/MessageComponent";
import { getSocket } from "../socket";
import { NEW_MESSAGE } from "../constants/events";
import { useChatDetailsQuery, useGetMessagesQuery } from "../redux/api/api";
import { useErrors, useSocketEvents } from "../../hooks/hook";
import {useInfiniteScrollTop} from "6pp"

const Chat = ({chatId,user}) => {
  const containerRef = useRef(null);
  const socket=getSocket();
  const [messages,setMessages]=useState([]);
  const [message,setMessage]=useState("");
  const [page,setPage]=useState(1);

  const chatDetails=useChatDetailsQuery({chatId,skip:!chatId});
  const oldMessagesChunk=useGetMessagesQuery({chatId,page})

  const {data:oldMessages,setData:setOldMessages}=useInfiniteScrollTop(containerRef,oldMessagesChunk.data?.totalPages,page,setPage,oldMessagesChunk.data?.messages)

  const errors=[{isError:chatDetails.isError,error:chatDetails.error},{isError:oldMessagesChunk.isError,error:oldMessagesChunk.error}]

  let members=chatDetails?.data?.chat?.members;
  console.log("oldMessagesChunk",oldMessagesChunk.data)

  
  const submitHandler=(e)=>{
    e.preventDefault();
    if(!message.trim())
      return ;
    
    socket.emit(NEW_MESSAGE,{chatId,members,message})
    setMessage("")

  }

  const newMessagehandler=useCallback((data)=>{
    setMessages((prev)=>[...prev,data?.message])
  },[]);


  const eventHandlers={[NEW_MESSAGE]:newMessagehandler};

  useSocketEvents(socket,eventHandlers);

  useErrors(errors)

  let allMessages=[...oldMessages,...messages]
 
  return chatDetails?.isLoading?<Skeleton/>:(
    <>
      <Stack
        ref={containerRef}
        padding={"1rem"}
        spacing={"1rem"}
        height={"86%"}
        boxSizing={"border-box"}
        sx={{
          overflowX: "hidden",
          overflowY: "auto",
        }}
        bgcolor={"#EAEAEA"}
      >
        {
          allMessages.map((i,index)=>(
            <MessageComponent message={i} user={user} key={index}/>
          ))
        }

      </Stack>
      <form
        style={{
          height: "10%",
        }}
        onSubmit={submitHandler}
      >
        <Stack
          direction={"row"}
          height={"100%"}
          padding={"1rem"}
          alignItems={"center"}
          position={"relative"}
        >
          <IconButton
            sx={{
              position: "absolute",
              left: "1rem",
              rotate: "30deg",
            }}
          >
            <AttachFileIcon />
          </IconButton>

          <InputBox placeholder="Type something..." value={message} onChange={(e)=>setMessage(e.target.value)} />

          <IconButton type="submit">
            <SendIcon />
          </IconButton>
        </Stack>
      </form>

            <FileMenu/>

    </>
  );
};

export default AppLayout()(Chat);
