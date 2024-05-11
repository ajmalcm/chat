import { Stack } from '@mui/material'
import React from 'react'

const ChatList = (
    {w="100%",chats=[],chatId,onlineUsers=[],newMessagesAlert=[{
    chatId:"1",
    count:0
}],
handleDeleteChat
}) => {
  return (
    <Stack width={w}>
    {
        chats?.map((data)=>{
            return(
                <div>jack</div>
            )
        })
    }
    </Stack>
  )
}

export default ChatList