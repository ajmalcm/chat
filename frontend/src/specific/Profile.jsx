import { Avatar, Stack, Typography } from '@mui/material'
import React from 'react'
import FaceIcon from '@mui/icons-material/Face';
import AlternateEmailIcon from '@mui/icons-material/AlternateEmail';
import CalendarMonthIcon from '@mui/icons-material/CalendarMonth';
import moment from "moment";

const Profile = () => {
  return (
    <Stack direction={"column"} spacing={"2rem"} alignItems={"center"}>
    <Avatar
  sx={{
    width:200,
    height:200,
    objectFit:"contain",
    marginBottom:"1rem",
    border:"5px solid white"

  }}
    />
    <ProfileCard text={"Bio"} heading={"realtime creator"}/>
    <ProfileCard text={"Username"} icon={<AlternateEmailIcon/>} heading={"@realtime"}/>
    <ProfileCard text={"name"}  icon={<FaceIcon/>} heading={"jack smoke"}/>
    <ProfileCard text={"joined"}  icon={<CalendarMonthIcon/>} heading={moment("2024-05-22T19:37:57.116Z").fromNow()}/>
    </Stack>
  )
}

const ProfileCard=({text,icon,heading})=>{
  return (
    <Stack direction={"row"}
    alignItems={"center"}
    spacing={"1rem"}
    color={"white"}
    textAlign={"center"}
    >
    {icon&&icon}
  <Stack>
    <Typography variant='body1'>{text}</Typography>
    <Typography color={"gray"} variant='caption'>
    {heading}
    </Typography>
  </Stack>
    </Stack>
  )
}



export default Profile