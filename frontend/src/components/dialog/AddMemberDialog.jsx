import { Button, Dialog, DialogTitle, Skeleton, Stack, Typography } from '@mui/material'
import React, { useState } from 'react'
import { sampleUsers } from '../../constants/sampleData'
import UserItem from "../shared/UserItem";
import { useAsyncMutation, useErrors } from '../../../hooks/hook';
import { useAddGroupMemberMutation, useAvailableFriendsQuery } from '../../redux/api/api';
import { useDispatch, useSelector } from 'react-redux';
import { setisAddMember } from '../../redux/reducers/misc';

const AddMemberDialog = ({chatId}) => {

  const [selectedMembers,setSelectedMembers]=useState([]);
  const dispatch=useDispatch();
  const {isAddMember}=useSelector(state=>state.misc)
  const [addMembers,isLoadingAddmembers]=useAsyncMutation(useAddGroupMemberMutation);
  const {isLoading,data,error,isError}=useAvailableFriendsQuery(chatId);


  const selectMemberHandler=(id)=>{
    setSelectedMembers(prev=>(prev.includes(id)?prev.filter((currentElement)=>currentElement!==id):[...prev,id]))

  }

    const cancelHandler=()=>{
        dispatch(setisAddMember(false));
    }
    
    const addMemberSubmitHandler=()=>{
        addMembers("Adding members...",{chatId,members:selectedMembers});
        cancelHandler();
    }

    console.log(data?.friends)
    useErrors([{isError,isLoading,error}]);

  return (
    <Dialog open={isAddMember} onClose={cancelHandler}>
        <Stack p={"2rem"} width={"20rem"} spacing={"2rem"}>
            <DialogTitle textAlign={"center"}>Add Member</DialogTitle>
            <Stack spacing={"1rem"}>
                { isLoading ? <Skeleton/> : data?.friends?.length>0?
                    data?.friends.map((i)=>(
                        <UserItem key={i._id} user={i} handler={selectMemberHandler} isAdded={selectedMembers.includes(i._id)}/>
                    ))
                    :<Typography textAlign={"center"}>No Friends</Typography>
                }
            </Stack>
            <Stack
            direction={"row"}
            alignItems={"center"}
            justifyContent={"space-evenly"}
            >
                <Button color='error' onClick={cancelHandler}>Cancel</Button>
                <Button variant='contained' disabled={isLoadingAddmembers} onClick={addMemberSubmitHandler}>Submit Changes</Button>
            </Stack>
        </Stack>
    </Dialog>
  )
}

export default AddMemberDialog