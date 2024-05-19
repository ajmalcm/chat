import React from 'react'
import Header from './Header'
import Title from '../shared/Title'
import { Grid } from '@mui/material'
import ChatList from '../../specific/ChatList'
import { sampleChats } from '../../constants/sampleData'
import { useParams } from 'react-router-dom'
import Profile from '../../specific/Profile'

const AppLayout = () =>(WrappedComponent)=> {

  
  return(props)=>{
      const {chatId}=useParams();

      const handleDeleteChat=(e,_id,groupChat)=>{
        e.preventDefault();
        console.log("handleDeleteCHat");
      }

        return (
          <>
          <Title/>
            <Header/>
            <Grid container height='96vh'>
                <Grid item sm={4} md={3} sx={{display:{xs:"none",sm:"block"}}} height={"100%"}>
                <ChatList chats={sampleChats} chatId={chatId} newMessagesAlert={[{chatId,count:4}]} onlineUsers={["1","2"]} handleDeleteChat={handleDeleteChat}/>
                </Grid>
                <Grid item xs={12} sm={8} md={5} lg={6} height={"100%"} bgcolor="#8A2BE2"><WrappedComponent {...props}/></Grid>
                <Grid item md={4} lg={3} height={"100%"} bgcolor="#572083" sx={{display:{xs:"none",md:"block"},padding:"2rem"}}><Profile/></Grid>
            </Grid>
            
            {/* <div>footer</div> */}
          </>
        )
    }
}

export default AppLayout