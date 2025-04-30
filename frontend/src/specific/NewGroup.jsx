import { Button, Dialog, DialogTitle, Skeleton, Stack, TextField, Typography } from '@mui/material'
import React, { useState } from 'react'
import { sampleUsers } from '../constants/sampleData'
import UserItem from '../components/shared/UserItem'
import { useInputValidation } from '6pp'
import { useAvailableFriendsQuery, useNewGroupMutation } from '../redux/api/api'
import { useAsyncMutation, useErrors } from '../../hooks/hook'
import { useDispatch, useSelector } from 'react-redux'
import { setIsNewGroup } from '../redux/reducers/misc'
import toast from 'react-hot-toast'

const NewGroup = () => {
  
  const groupName=useInputValidation();
  const dispatch=useDispatch();
  const [selectedMembers,setSelectedMembers]=useState([]);
  const {isNewGroup}=useSelector(state=>state.misc);

  const {isError,error,isLoading,data}=useAvailableFriendsQuery();
  const [newGroup,isLoadingnewGroup]=useAsyncMutation(useNewGroupMutation);

  const errors=[{isError,error}];
  useErrors(errors);

  const selectMemberHandler=(id)=>{
    setSelectedMembers(prev=>(prev.includes(id)?prev.filter((currentElement)=>currentElement!==id):[...prev,id]))

  }

  const submitHandler=()=>{

    if(!groupName.value || !groupName.value.trim())
    {
      return toast.error("Group name is required")
    }
    if(selectedMembers.length<2)
    {
      return toast.error("Select at least 3 members to create a group.")
    }

    newGroup("Creating New Group",{name:groupName.value,members:selectedMembers});
    closeHandler();
  }
  const closeHandler=()=>{
    dispatch(setIsNewGroup(false))
  }


  return (
    <Dialog open={isNewGroup} onClose={closeHandler}>
      <Stack p={{xs:"1rem",sm:"3rem"}} width={"25rem"} spacing={"2rem"}>
      <DialogTitle variant='h5' textAlign={"center"}>New Group</DialogTitle>
      <TextField label="Group Name" value={groupName.value} onChange={groupName.changeHandler}/>
      <Typography>Members</Typography>
      <Stack >
      {
        isLoading?<Skeleton/>:
        data?.friends.map((user)=>(
          <UserItem user={user} key={user._id} handler={selectMemberHandler} isAdded={selectedMembers.includes(user._id)}/>
        ))
      }
      </Stack>
      <Stack direction={"row"} justifyContent={"space-between"}>
        <Button variant='text' color='error' onClick={closeHandler}>Cancel</Button>
        <Button variant='contained' onClick={submitHandler} disabled={isLoadingnewGroup}>Create</Button>

      </Stack>
      </Stack>
    </Dialog>
  )
}

export default NewGroup