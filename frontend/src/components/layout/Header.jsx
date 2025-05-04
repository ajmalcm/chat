import { AppBar, Backdrop, Badge, Box, IconButton, Toolbar, Tooltip, Typography } from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import SearchIcon from "@mui/icons-material/Search";
import AddIcon from '@mui/icons-material/Add';
import GroupIcon from '@mui/icons-material/Group';
import React,{Suspense,lazy, useState} from "react";
import { useNavigate } from "react-router-dom";
import NotificationsIcon from '@mui/icons-material/Notifications';
import LogoutIcon from '@mui/icons-material/Logout';
import { setIsMobile, setIsNewGroup, setIsNotification, setIsSearch } from "../../redux/reducers/misc";
import { useDispatch, useSelector } from "react-redux";
import { resetNotification } from "../../redux/reducers/chat";
import axios from "axios";
import toast from "react-hot-toast";
import { userExists } from "../../redux/reducers/auth";
import { server } from "../../constants/config";

const Header = () => {
  const navigate=useNavigate();

  const Notifications=lazy(()=>import("../../specific/Notifications"));
  const SearchDialog=lazy(()=>import("../../specific/Search"));
  const NewGroup=lazy(()=>import("../../specific/NewGroup"));

  const {isMobile,isSearch,isNotification,isNewGroup}=useSelector(state=>state.misc);
  const {notificationCount}=useSelector(state=>state.chat);

  const dispatch=useDispatch();


  const handleMobile=()=>{
    dispatch(setIsMobile(true));
  }

  const openSearch=()=>{
    dispatch(setIsSearch(true))
  }

  const openNewGroup=()=>{
    dispatch(setIsNewGroup(true));
    
  }

  const openNotification=()=>{
    dispatch(setIsNotification(true))
    dispatch(resetNotification())
  }


  const navigateToGroup=()=>{
    navigate("/groups") 
  }

  const logOutHandler=async ()=>{

    const config={
      withCredentials:true,
      headers:{
        "Content-Type":"application/json"
      }
    }

    try {
      const {data}=await axios.delete(`${server}/api/v1/user/logout`,config);
      dispatch(userExists(false))
      toast.success(data?.message)
    } catch (error) {
      dispatch(userExists(true))
      console.log(error)
      toast.error(error.response.data.message)
    }
  }

  return (
    <>
      <Box sx={{ flexGrow: 1, height: "4rem" }}>
        <AppBar position="static" sx={{ bgcolor: "#3B0A61" }}>
          <Toolbar>
            <Typography
              variant="h6"
              sx={{ display: { xs: "none", sm: "block" } }}
            >
              Realtime
            </Typography>
            <Box sx={{ display: { xs: "block", sm: "none" } }}>
              <IconButton size="large" color="inherit" onClick={handleMobile}>
                <MenuIcon/>
              </IconButton>
            </Box>
            <Box sx={{ flexGrow: 1 }} />
            <Box>
            <IconBtn
              title="Search"
              icon={<SearchIcon/>}
              handler={openSearch}
            />

            <IconBtn
              title="New Group"
              icon={<AddIcon/>}
              handler={openNewGroup}
            />

            <IconBtn
              title="Manage Groups"
              icon={<GroupIcon/>}
              handler={navigateToGroup}
            />
            <IconBtn
              title="Notifications"
              icon={<NotificationsIcon/>}
              handler={openNotification}
              value={notificationCount}
            />
            <IconBtn
              title="Logout"
              icon={<LogoutIcon/>}
              handler={logOutHandler}
            />

            </Box>
          </Toolbar>
        </AppBar>
      </Box>

    {
      isSearch&&(
        <Suspense fallback={<Backdrop open/>}>
          <SearchDialog isSearch={isSearch} handleSearchClose={()=>dispatch(setIsSearch(false))}/>
        </Suspense>
      )
    }
    {
      isNotification&&(
        <Suspense fallback={<Backdrop open/>}>
          <Notifications/>
        </Suspense>
      )
    }
    {
      isNewGroup&&(
        <Suspense fallback={<Backdrop open/>}>
          <NewGroup/>
        </Suspense>
      )
    }


    

    </>
  );
};

const IconBtn=({title,icon,handler,value})=>{
  return(
    <Tooltip title={title}>
    <IconButton onClick={handler} size="large" color="inherit">
    {
      value?<Badge badgeContent={value} color="error">{icon}</Badge>:icon
    }
    </IconButton>
    </Tooltip>
  )
}

export default Header;
