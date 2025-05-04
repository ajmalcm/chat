import { Menu, Stack, Typography } from '@mui/material'
import React, { useEffect } from 'react'
import { useSelector } from 'react-redux'
import { setIsDeletedMenu } from '../../redux/reducers/misc'
import ExitToAppIcon from '@mui/icons-material/ExitToApp';
import DeleteIcon from '@mui/icons-material/Delete';
import { useNavigate } from 'react-router-dom';
import { useAsyncMutation } from '../../../hooks/hook';
import { useDeleteChatMutation, useLeaveGroupMutation } from '../../redux/api/api';

const DeleteChatMenu = ({dispatch,deleteAnchor}) => {

    const navigate=useNavigate();
    const [deleteChat,_,deleteChatData]=useAsyncMutation(useDeleteChatMutation);
    const [leaveGroup,__,LeaveGroupData]=useAsyncMutation(useLeaveGroupMutation);


    const {isDeleteMenu,selectedDeleteChat}=useSelector(state=>state.misc)
    const isGroup=selectedDeleteChat.groupChat;

    const closeHandler=()=>{
        dispatch(setIsDeletedMenu(false))
        deleteAnchor.current=null
    }

    const leaveGroupHandler=()=>{
        closeHandler();
        leaveGroup("Leaving Group...",selectedDeleteChat.chatId)
    }

    const deleteChatHandler=()=>{
        closeHandler();
        deleteChat("Deleteing Chat...",selectedDeleteChat.chatId)
    }

    useEffect(()=>{
        if(deleteChatData || LeaveGroupData)
        {
            navigate("/");
        }
    },[deleteChatData,LeaveGroupData])

  return (
    <Menu open={isDeleteMenu} onClose={closeHandler} anchorEl={deleteAnchor.current} anchorOrigin={{ vertical: "bottom", horizontal: "right" }} transformOrigin={{vertical:"center",horizontal:"center"}} >
        <Stack
        sx={{
            width:"10rem",
            padding:"0.5rem",
            cursor:"pointer",
        }}
        direction={"row"}
        alignItems={"center"}
        spacing="0.5rem"
        onClick={isGroup?leaveGroupHandler:deleteChatHandler}
        >
            {isGroup ?
            <>
            <ExitToAppIcon/>
            <Typography>Leave Group</Typography>
            </>:
            <>
            <DeleteIcon/>
            <Typography>Delete Chat</Typography>
            </>}
        </Stack>
    </Menu>
  )
}

export default DeleteChatMenu