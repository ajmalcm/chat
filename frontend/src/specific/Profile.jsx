import { Avatar, Stack } from '@mui/material'
import React from 'react'

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
    <ProfileCard text={"some text"} icon={"ajckIcon"} heading={"some heading"}/>
    </Stack>
  )
}

const ProfileCard=({text,icon,heading})=>{
  return (
    <div>
      ProfileCard
    </div>
  )
}



export default Profile