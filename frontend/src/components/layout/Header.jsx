import { AppBar, Backdrop, Box, IconButton, Toolbar, Tooltip, Typography } from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import SearchIcon from "@mui/icons-material/Search";
import AddIcon from '@mui/icons-material/Add';
import GroupIcon from '@mui/icons-material/Group';
import React,{Suspense,lazy, useState} from "react";
import { useNavigate } from "react-router-dom";
import NotificationsIcon from '@mui/icons-material/Notifications';
import LogoutIcon from '@mui/icons-material/Logout';

const Header = () => {
  const navigate=useNavigate();
  const [isMobile,setIsMobile]=useState(false);
  const [isSearch,setIsSearch]=useState(false);
  const [isNewGroup,setIsNewGroup]=useState(false);
  const [isNotification,setIsNotification]=useState(false);

  const Notifications=lazy(()=>import("../../specific/Notifications"));
  const SearchDialog=lazy(()=>import("../../specific/Search"));
  const NewGroup=lazy(()=>import("../../specific/NewGroup"));


  const handleMobile=()=>{
    setIsMobile(prev=>!prev)
  }

  const openSearch=()=>{
    setIsSearch(prev=>!prev)
  }

  const openNewGroup=()=>{
    setIsNewGroup(prev=>!prev)
    
  }

  const openNotification=()=>{
    setIsNotification(prev=>!prev)
  }


  const navigateToGroup=()=>{
    console.log("groups")
    navigate("/groups")
  }

  const logOutHandler=()=>{
    console.log("logout")
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
          <SearchDialog/>
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

const IconBtn=({title,icon,handler})=>{
  return(
    <Tooltip title={title}>
    <IconButton onClick={handler} size="large" color="inherit">
      {icon}
    </IconButton>
    </Tooltip>
  )
}

export default Header;
