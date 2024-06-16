import { Button, Dialog, DialogTitle, Stack, TextField, Typography } from '@mui/material'
import React, { useState } from 'react'
import { sampleUsers } from '../constants/sampleData'
import UserItem from '../components/shared/UserItem'
import { useInputValidation } from '6pp'

const NewGroup = () => {
  
  const groupName=useInputValidation();
  const [members,setMembers]=useState(sampleUsers);
  const [selectedMembers,setSelectedMembers]=useState([]);

  const selectMemberHandler=(id)=>{
    setSelectedMembers(prev=>(prev.includes(id)?prev.filter((currentElement)=>currentElement!==id):[...prev,id]))

  }

  const submitHandler=()=>{

  }
  const closeHandler=()=>{

  }


  return (
    <Dialog open onClose={closeHandler}>
      <Stack p={{xs:"1rem",sm:"3rem"}} width={"25rem"} spacing={"2rem"}>
      <DialogTitle variant='h5' textAlign={"center"}>New Group</DialogTitle>
      <TextField label="Group Name" value={groupName.value} onChange={groupName.changeHandler}/>
      <Typography>Members</Typography>
      <Stack >
      {
        members.map((user)=>(
          <UserItem user={user} key={user._id} handler={selectMemberHandler} isAdded={selectedMembers.includes(user._id)}/>
        ))
      }
      </Stack>
      <Stack direction={"row"} justifyContent={"space-between"}>
        <Button variant='text' color='error'>Cancel</Button>
        <Button variant='contained' onClick={submitHandler}>Create</Button>

      </Stack>
      </Stack>
    </Dialog>
  )
}

export default NewGroup