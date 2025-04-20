import React, { useRef, useState } from "react";
import AppLayout from "../components/layout/AppLayout";
import { IconButton, Stack } from "@mui/material";
import AttachFileIcon from "@mui/icons-material/AttachFile";
import SendIcon from "@mui/icons-material/Send";
import { Form } from "react-router-dom";
import { InputBox } from "../components/styled/StyledComponents";
import { FileMenu } from "../components/dialog/FileMenu";
import { sampleMessage } from "../constants/sampleData";
import MessageComponent from "../components/shared/MessageComponent";
import { getSocket } from "../socket";

const Chat = () => {
  const containerRef = useRef(null);
  const socket=getSocket();

  const [message,setMessage]=useState("");
  
  const submitHandler=(e)=>{
    e.preventDefault();

    if(!message.trim())
      return ;
    
    console.log(message);
  }

  const user={
    _id:"ajaksla",
    name:"sandySemicolon"
  }

  return (
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
          sampleMessage.map((i,index)=>(
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
