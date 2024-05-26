import React, { useRef } from "react";
import AppLayout from "../components/layout/AppLayout";
import { IconButton, Stack } from "@mui/material";
import AttachFileIcon from "@mui/icons-material/AttachFile";
import SendIcon from "@mui/icons-material/Send";
import { Form } from "react-router-dom";
import { InputBox } from "../components/styled/StyledComponents";

const Chat = () => {
  const containerRef = useRef(null);

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
      ></Stack>
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
    </>
  );
};

export default AppLayout()(Chat);
