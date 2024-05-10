import { AppBar, Box, IconButton, Toolbar, Tooltip, Typography } from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import SearchIcon from "@mui/icons-material/Search";
import AddIcon from '@mui/icons-material/Add';
import GroupIcon from '@mui/icons-material/Group';
import React from "react";

const Header = () => {
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
              <IconButton size="large" color="inherit">
                <MenuIcon />
              </IconButton>
            </Box>
            <Box sx={{ flexGrow: 1 }} />
            <Box>
            <Tooltip title="Search">
              <IconButton size="large" color="inherit">
                <SearchIcon />
              </IconButton>
            </Tooltip>

            <Tooltip title="Create new group">
            <IconButton size="large" color="inherit">
                <AddIcon/>
              </IconButton>
            </Tooltip>

            <Tooltip title="Manage Groups">
            <IconButton size="large" color="inherit">
                <GroupIcon/>
              </IconButton>
            </Tooltip>

            </Box>
          </Toolbar>
        </AppBar>
      </Box>
    </>
  );
};

export default Header;
