import React, { useRef } from "react";
import AppLayout from "../components/layout/AppLayout";
import { IconButton, Stack } from "@mui/material";
import AttachFileIcon from "@mui/icons-material/AttachFile";
import SendIcon from "@mui/icons-material/Send";
import { Form } from "react-router-dom";
import { InputBox } from "../components/styled/StyledComponents";
import { FileMenu } from "../components/dialog/FileMenu";
import { sampleMessage } from "../constants/sampleData";
import MessageComponent from "../components/shared/MessageComponent";

const Chat = () => {
  const containerRef = useRef(null);

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
          sampleMessage.map((i)=>(
            <MessageComponent message={i} user={user}/>
          ))
        }

      </Stack>
      <form
        style={{
          height: "10%",
        }}
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

          <InputBox placeholder="Type something..." />

          <IconButton>
            <SendIcon />
          </IconButton>
        </Stack>
      </form>

            <FileMenu/>

    </>
  );
};

export default AppLayout()(Chat);
