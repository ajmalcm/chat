import React from "react";
import { Link } from "../styled/StyledComponents";
import { Stack } from "@mui/material";

const Chatitem = ({
  avatar = [],
  name,
  _id,
  groupChat = false,
  sameSender,
  isOnline,
  newMessage,
  index = 0,
  handleDeleteChatOpen,
}) => {
  <Link to={`chat/${_id}`}>
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
      <Stack>
        
      </Stack>
    </div>
  </Link>;
};

export default Chatitem;
