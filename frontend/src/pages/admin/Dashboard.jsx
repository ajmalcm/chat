import React from "react";
import AdminLayout from "../../components/layout/AdminLayout";
import { Box, Container, Paper, Stack, Typography } from "@mui/material";
import AdminPanelSettingsIcon from "@mui/icons-material/AdminPanelSettings";
import {
  CurveButton,
  SearchField,
} from "../../components/styled/StyledComponents";
import NotificationsNoneRoundedIcon from "@mui/icons-material/NotificationsNoneRounded";
import GroupOutlinedIcon from "@mui/icons-material/GroupOutlined";
import PersonOutlinedIcon from "@mui/icons-material/PersonOutlined";
import MessageOutlinedIcon from "@mui/icons-material/MessageOutlined";
import moment from "moment";

const Dashboard = () => {
  const Appbar = (
    <Paper
      elevation={"3"}
      sx={{
        padding: "2rem",
        margin: "2rem 0",
        borderRadius: "1rem",
      }}
    >
      <Stack direction={"row"} alignItems={"center"} spacing={"1rem"}>
        <AdminPanelSettingsIcon sx={{ fontSize: "3rem" }} />
        <SearchField />
        <CurveButton>search</CurveButton>
        <Box flexGrow={1} />
        <Typography sx={{ display: { xs: "none", lg: "block" } }}>
          {moment().format("dddd, D MMMM YYYY")}
        </Typography>
        <NotificationsNoneRoundedIcon fontSize="large" />
      </Stack>
    </Paper>
  );

  const widgets = (
    <Stack
      direction={{ xs: "column", sm: "row" }}
      spacing={"2rem"}
      justifyContent={"space-between"}
      alignItems={"center"}
      margin={"2rem 0"}
    >
      <Widget title={"Users"} value={20} icon={<PersonOutlinedIcon />} />
      <Widget title={"Chats"} value={10} icon={<GroupOutlinedIcon />} />
      <Widget title={"Messages"} value={200} icon={<MessageOutlinedIcon />} />
    </Stack>
  );

  return (
    <AdminLayout>
      <Container component={"main"}>
        {Appbar}
        <Stack direction={"row"} spacing={"2rem"} flexWrap={"wrap"}>
          <Paper
            elevation={3}
            sx={{
              padding: "2rem 3.5rem",
              borderRadius: "1rem",
              width: "100%",
              maxWidth: "45rem",
              height: "25rem",
            }}
          >
            <Typography>Last Messages</Typography>
            {"Chat"}
          </Paper>

          <Paper
            elevation={3}
            sx={{
              padding: "1rem",
              borderRadius: "1rem",
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              width: { xs: "100%", sm: "50%" },
              position: "relative",
              width: "100%",
              maxWidth: "45rem",
              height: "25rem",
            }}
          >
            {"doughnut chart"}

            <Stack
              position={"absolute"}
              direction={"row"}
              justifyContent={"center"}
              alignItems={"center"}
              spacing={"0.5rem"}
              width={"100%"}
              height={"100%"}
            >
              <GroupOutlinedIcon />
              <Typography>vs</Typography>
              <PersonOutlinedIcon />
            </Stack>
          </Paper>
        </Stack>

        {widgets}
      </Container>
    </AdminLayout>
  );
};

const Widget = ({ title, value, icon }) => (
  <Paper>
    <Stack alignItems={"center"} spacing={"1rem"}>
      <Typography>{value}</Typography>
      <Stack>
        {icon}
        <Typography>{title}</Typography>
      </Stack>
    </Stack>
  </Paper>
);

export default Dashboard;
