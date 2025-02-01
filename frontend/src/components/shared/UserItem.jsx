import { Avatar, IconButton, ListItem, Stack, Typography } from "@mui/material";
import React from "react";
import AddIcon from "@mui/icons-material/Add";
import RemoveIcon from '@mui/icons-material/Remove';

const UserItem = ({ user, handler, handlerIsLoading,isAdded=false,styling={} }) => {
  const { name, _id, avatar } = user;

  return (
    <ListItem>
      <Stack
        direction={"row"}
        alignItems={"center"}
        spacing={"1rem"}
        width={"100%"}
        {...styling}
      >
        <Avatar src={avatar} alt={name}/>
        <Typography
          variant="body1"
          sx={{
            flexGlow: 1,
            display: "-webkit-box",
            WebkitLineClamp: 1,
            WebkitBoxOrient: "vertical",
            overflow: "hidden",
            textOverflow: "ellipsis",
            width:"100%"
          }}
        >
          {name}
        </Typography>
        <IconButton
          size="small"
          sx={{
            bgcolor: isAdded?"error.main":"primary.main",
            color: "white",
            "&hover": {
              bgcolor:isAdded?"error.dark": "primary.dark",
            },
          }}
          onClick={() => handler(_id)}
          disabled={handlerIsLoading}
        >
        {
          isAdded?<RemoveIcon/>: <AddIcon />
        }
         
        </IconButton>
      </Stack>
    </ListItem>
  );
};

export default UserItem;
