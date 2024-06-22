import React, { useState } from "react";
import { Grid, Box, IconButton, Drawer, Stack, Typography } from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import CloseIcon from "@mui/icons-material/Close";
import { useLocation } from "react-router-dom";

const AdminLayout = ({ children }) => {
  const [isMobile, setIsMobile] = useState(false);

  const handleMobile = () => {
    setIsMobile(!isMobile);
  };

  const handleClose=()=>
    {
        setIsMobile(false)
    }

  return (
    <Grid container minHeight={"100vh"}>
      <Box
        sx={{
          display: { xs: "block", md: "none" },
          position: "fixed",
          top: "1rem",
          right: "1rem",
        }}
      >
        <IconButton onClick={handleMobile}>
          {isMobile ? (
            <CloseIcon fontSize="large" />
          ) : (
            <MenuIcon fontSize="large" />
          )}
        </IconButton>
      </Box>
      <Grid item md={4} lg={3} sx={{ display: { xs: "none", md: "block" } }}>
        <Sidebar />
      </Grid>
      <Grid
        item
        xs={12}
        md={8}
        lg={9}
        sx={{
          bgcolor: "#f5f5f5",
        }}
      >
        {children}
      </Grid>

      <Drawer open={isMobile} onClose={handleClose}>
        <Sidebar w="50vw"/>
      </Drawer>
    </Grid>
  );
};

const Sidebar = ({w="100%"}) => {

    const location=useLocation();

  return (
    <Stack width={w} direction={"column"} p={"3rem"} spacing={"3rem"}>
<Typography variant="h5" textTransform={"uppercase"}>
realtime
</Typography>



    </Stack>
  );
};

export default AdminLayout;
