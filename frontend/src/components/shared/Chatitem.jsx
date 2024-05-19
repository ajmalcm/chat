import React, { memo } from "react";
import { Link } from "../styled/StyledComponents";
import { Box, Stack, Typography } from "@mui/material";
import AvatarCard from "./AvatarCard";

const Chatitem = ({
  avatar = [],
  name,
  _id,
  groupChat = false,
  sameSender,
  isOnline,
  newMessageAlert,
  index = 0,
  handleDeleteChat,
}) => (
  <Link
    to={`/chat/${_id}`}
    onContextMenu={(e) => handleDeleteChat(e, _id, groupChat)}
    sx={{
      padding:"0"
    }}
  >
    <div
      style={{
        display: "flex",
        gap: "1rem",
        alignItems: "center",
        padding: "1rem",
        backgroundColor: sameSender ? "black" : "unset",
        color: sameSender ? "white" : "unset",
        position: "relative",
      }}
    >
      {/* avatar card */}

      <AvatarCard avatar={avatar}/>

      <Stack>
        <Typography>{name}</Typography>
        {newMessageAlert?.count >0 && (
          <Typography>{newMessageAlert?.count} new messages.</Typography>
        )}
      </Stack>
      {isOnline && (
        <Box
          sx={{
            width: "10px",
            height: "10px",
            borderRadius: "50%",
            background: "green",
            position: "absolute",
            top: "50%",
            right: "1rem",
            transform: "translateY(-50%)",
          }}
        ></Box>
      )}
    </div>
  </Link>
);

export default memo(Chatitem);
