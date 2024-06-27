import React from 'react'
import AdminLayout from '../../components/layout/AdminLayout'
import { Box, Container, Paper, Stack, Typography } from '@mui/material'
import AdminPanelSettingsIcon from '@mui/icons-material/AdminPanelSettings';
import { SearchField } from '../../components/styled/StyledComponents';
import moment from 'moment';

const Dashboard = () => {

  const Appbar=<Paper elevation={"3"} sx={{
    padding:"2rem", margin:"2rem 0", borderRadius:"1rem"
  }}>
  <Stack direction={"row"} alignItems={"center"} spacing={"1rem"}>
    <AdminPanelSettingsIcon sx={{fontSize:"3rem"}}/>
    <SearchField/>
    <button>btn</button>
    <Box flexGrow={1}/>
    <Typography>{moment().format('MMMM Do YYYY')}</Typography>
  </Stack>
  </Paper>

  return (
    <AdminLayout>
    <Container component={"main"}>{Appbar}</Container>
    </AdminLayout>
  )
}

export default Dashboard