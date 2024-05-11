import React from 'react'
import Header from './Header'
import Title from '../shared/Title'
import { Grid } from '@mui/material'
import ChatList from '../../specific/ChatList'

const AppLayout = () =>(WrappedComponent)=> {
    return(props)=>{
        return (
          <>
          <Title/>
            <Header/>
            <Grid container height='96vh'>
                <Grid item sm={4} md={3} sx={{display:{xs:"none",sm:"block"}}} height={"100%"}>
                <ChatList/>
                </Grid>
                <Grid item xs={12} sm={8} md={5} lg={6} height={"100%"} bgcolor="#8A2BE2"><WrappedComponent {...props}/></Grid>
                <Grid item md={4} lg={3} height={"100%"} bgcolor="#572083" sx={{display:{xs:"none",md:"block"},padding:"2rem"}}>third</Grid>
            </Grid>
            
            {/* <div>footer</div> */}
          </>
        )
    }
}

export default AppLayout