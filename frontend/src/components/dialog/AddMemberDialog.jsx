import { Dialog, DialogTitle, Stack, Typography } from '@mui/material'
import React from 'react'
import { sampleUsers } from '../../constants/sampleData'
import UserItem from "../shared/UserItem";

const AddMemberDialog = ({addMember,isLoadingAddMember,chatId}) => {

    const addFriendHandler=(id)=>{
        console.log(id,chatId);
    }

  return (
    <Dialog open>
        <Stack>
            <DialogTitle>Add Member</DialogTitle>
            <Stack>
                { sampleUsers.length>0?
                    sampleUsers.map((i)=>(
                        <UserItem key={i._id} user={i} handler={addFriendHandler}/>
                    ))
                    :<Typography textAlign={"center"}>No Friends</Typography>
                }
            </Stack>
        </Stack>
    </Dialog>
  )
}

export default AddMemberDialog