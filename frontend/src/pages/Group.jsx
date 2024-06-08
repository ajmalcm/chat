import { Backdrop, Box, Button, Drawer, Grid, IconButton, Stack, TextField, Tooltip, Typography } from "@mui/material";
import React, { Suspense,lazy,memo, useEffect, useState } from "react";
import KeyboardBackspaceIcon from "@mui/icons-material/KeyboardBackspace";
import EditIcon from '@mui/icons-material/Edit';
import MenuIcon from "@mui/icons-material/Menu";
import DoneIcon from '@mui/icons-material/Done';
import AddIcon from '@mui/icons-material/Add';
import DeleteIcon from '@mui/icons-material/Delete';
import { useNavigate,useSearchParams } from "react-router-dom";
import { Link } from "../components/styled/StyledComponents";
import AvatarCard from "../components/shared/AvatarCard";
import { sampleChats } from "../constants/sampleData";

const Group = () => {
  const [isMobileMenuOpen, setisMobileMenuOpen] = useState();
  const [isEdit,setIsEdit]=useState(false);
  const [groupName,setGroupName]=useState();
  const [groupNameUpdatedValue,setGroupNameUpdatedValue]=useState("");
  const [confirmDeleteDialog,setConfirmDeleteDialog]=useState(false);
  const ConfirmDeleteDialog=lazy(()=>import ("../components/dialog/ConfirmDeleteDialog") );
  const AddMemberDialog=lazy(()=>import ("../components/dialog/AddMemberDialog") );

  let isAddMember=true;

  const chatId=useSearchParams()[0].get("group");
  console.log(chatId);

  const navigate = useNavigate();
  // const chatId="jajka";
  const navigateBack = () => {
    navigate("/");
  };

  const handleMobile = () => {
    setisMobileMenuOpen((prev) => !prev);
  };

  const handleMobileClose = () => {
    setisMobileMenuOpen(false);
  };
  
  const updateGroupName=()=>{
    setIsEdit(false);
    console.log(groupNameUpdatedValue)
  }

  const openConfirmDeleteHandler=()=>{
    setConfirmDeleteDialog(true)
  }

  const closeConfirmDeleteHandler=()=>{
    setConfirmDeleteDialog(false)

  }

  const deleteHandler=()=>{

  }


  const openAddMemberHandler=()=>{
  }

  useEffect(()=>{
    setGroupName(`Group Name ${chatId}`)
    setGroupNameUpdatedValue(`Group updated name ${chatId}`);


    return()=>{
      setGroupName('')
      setGroupNameUpdatedValue('');
      setIsEdit(false)
    }

  },[chatId])

  const ButtonGroup=<Stack
  direction={{
    xs:"column-reverse",
    sm:"row"
  }}
  spacing={"1rem"}
  p={{
    xs:"0",
    sm:"1rem",
    md:"1rem 4rem"
  }}
  >
  <Button size="large" startIcon={<AddIcon/>} onClick={openConfirmDeleteHandler}>Delete Group</Button>
  <Button size="large" variant="contained" startIcon={<DeleteIcon/>} onClick={openAddMemberHandler}>Add Member</Button>
  </Stack>

  const IconBtns = (
    <>
      <Box
        sx={{
          display: {
            xs: "block",
            sm: "none",
          },
          position: "fixed",
          right: "1rem",
          top: "1rem",
        }}
      >
        <IconButton size="large" onClick={handleMobile}>
          <MenuIcon />
        </IconButton>
      </Box>
      <Tooltip title="back">
        <IconButton
          sx={{
            position: "absolute",
            top: "2rem",
            left: "2rem",
            backgroundColor: "black",
            color: "white",
            ":hover": {
              backgroundColor: "grey",
            },
          }}
          onClick={navigateBack}
        >
          <KeyboardBackspaceIcon />
        </IconButton>
      </Tooltip>
    </>
  );

  const GroupName=(

    <Stack direction={"row"} alignItems={"center"} justifyContent={"center"} spacing={"1rem"}>
      {isEdit?<>
        <TextField value={groupNameUpdatedValue} onChange={e=>setGroupNameUpdatedValue(e.target.value)}/>
        <IconButton onClick={updateGroupName}>
          <DoneIcon/>
        </IconButton>
      </>:<>
        <Typography variant="h4">{groupName}</Typography>
        <IconButton onClick={()=>setIsEdit(true)}>
          <EditIcon/>
        </IconButton>
      </>}
    </Stack>

  )

  return (
    <Grid container height={"100vh"}>
      <Grid
        item
        sx={{
          display: {
            xs: "none",
            sm: "block",
          },
        }}
        sm={4}
      >
        <GroupsList myGroups={sampleChats} chatId={chatId}/>
      </Grid>
      <Grid
        item
        xs={12}
        sm={8}
        sx={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          position: "relative",
          padding: "1rem 3rem",
        }}
      >
        {IconBtns}

        {
          groupName&& <>
          {GroupName}
          <Typography
          margin={"2rem"}
          alignSelf={"flex-start"}
          variant="body1"
          >
            Members
          </Typography>
          <Stack
          maxWidth={"45rem"}
          width={"100%"}
          boxSizing={"border-box"}
          padding={
            {
              sm:"1rem",
              xs:"0",
              md:"1rem 4rem"
            }
          }
          spacing={"2rem"}
          bgcolor={"#c9a0ff"}
          height={"50vh"}
          overflow={"auto"}
          >
          {/* members */}
          </Stack>
            {ButtonGroup}
        </>
        }

      </Grid>


        {
          confirmDeleteDialog &&
         <Suspense fallback={<Backdrop open/>}>
            <ConfirmDeleteDialog open={confirmDeleteDialog} handleClose={closeConfirmDeleteHandler} deleteHandler={deleteHandler}/>
         </Suspense>
        }

        {
          isAddMember &&
         <Suspense fallback={<Backdrop open/>}>
            <AddMemberDialog/>
         </Suspense>
        }

      <Drawer
        sx={{
          display: {
            xs: "block",
            sm: "none",
          },
        }}
        open={isMobileMenuOpen}
        onClose={handleMobileClose}
      >
        <GroupsList w={"50vw"} myGroups={sampleChats} chatId={chatId}/>
      </Drawer>
    </Grid>
  );
};

export default Group;

const GroupsList = ({w="100%",myGroups=[],chatId}) => (
  <Stack width={w}>
    {myGroups.length>0 ? myGroups.map((group)=>(
      <GroupListItem group={group} chatId={chatId} key={group?._id}/>
    ))
    :
      <Typography textAlign={"center"} padding={"1rem"}>No Groups</Typography>

    }
  </Stack>
)

const GroupListItem=memo(({group,chatId})=>{
  const {name,avatar,_id}=group;
  return(
    <Link to={`?group=${_id}`} onClick={e=>{if(chatId===_id) e.preventDefault() }}>
      <Stack direction={"row"} spacing={"1rem"} alignItems={"center"}>
        <AvatarCard avatar={avatar}/>
        <Typography>{name}</Typography>
      </Stack>
    </Link>
  )
})