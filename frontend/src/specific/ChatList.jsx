import { Stack, Typography } from '@mui/material'
import React from 'react'
import Chatitem from '../components/shared/Chatitem'

const ChatList = (
    {w="100%",chats=[],chatId,onlineUsers=[],newMessagesAlert=[{
    chatId:"1",
    count:0
}],
handleDeleteChat
}) => {


  return (
    <Stack width={w} direction={"column"} overflow={"auto"} height={"100%"}>
    {/* <Typography>hello</Typography> */}
    {
        chats?.map((data,index)=>{

          const {avatar,_id,name,groupChat,members}=data;

          const newMessageAlert=newMessagesAlert.find(({chatId})=>chatId===_id);

          const isOnline=members?.some((member)=>onlineUsers.includes(member))

           
             return (<Chatitem 
                index={index}
                newMessageAlert={newMessageAlert} 
                isOnline={isOnline}
                avatar={avatar}
                name={name}
                _id={_id}
                key={_id}
                groupChat={groupChat}
                sameSender={chatId===_id}
                handleDeleteChat={handleDeleteChat}
                />)
                
             
        })
    }
    </Stack>
  )
}

export default ChatList