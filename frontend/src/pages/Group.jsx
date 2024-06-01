import { Box, Drawer, Grid, IconButton, Stack, Tooltip, Typography } from "@mui/material";
import React, { Suspense,memo, useState } from "react";
import KeyboardBackspaceIcon from "@mui/icons-material/KeyboardBackspace";
import MenuIcon from "@mui/icons-material/Menu";
import { useNavigate } from "react-router-dom";
import { Link } from "../components/styled/StyledComponents";
import AvatarCard from "../components/shared/AvatarCard";
import { sampleChats } from "../constants/sampleData";

const Group = () => {
  const [isMobileMenuOpen, setisMobileMenuOpen] = useState();

  const navigate = useNavigate();
  const chatId="jajka";
  const navigateBack = () => {
    navigate("/");
  };

  const handleMobile = () => {
    setisMobileMenuOpen((prev) => !prev);
  };

  const handleMobileClose = () => {
    setisMobileMenuOpen(false);
  };

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
      </Grid>

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
        <GroupsList w={"50vw"}/>
      </Drawer>
    </Grid>
  );
};

export default Group;

const GroupsList = ({w="100%",myGroups=[],chatId}) => (
  <Stack>
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
    <Link to={`?group=${_id}`}>
      <Stack direction={"row"} spacing={"1rem"} alignItems={"center"}>
        <AvatarCard avatar={avatar}/>
        <Typography>{name}</Typography>
      </Stack>
    </Link>
  )
})