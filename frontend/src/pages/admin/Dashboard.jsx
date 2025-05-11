import AdminPanelSettingsIcon from "@mui/icons-material/AdminPanelSettings";
import GroupOutlinedIcon from "@mui/icons-material/GroupOutlined";
import MessageOutlinedIcon from "@mui/icons-material/MessageOutlined";
import NotificationsNoneRoundedIcon from "@mui/icons-material/NotificationsNoneRounded";
import PersonOutlinedIcon from "@mui/icons-material/PersonOutlined";
import { Box, Container, Paper, Skeleton, Stack, Typography } from "@mui/material";
import moment from "moment";
import { useErrors } from "../../../hooks/hook";
import AdminLayout from "../../components/layout/AdminLayout";
import {
  CurveButton,
  SearchField,
} from "../../components/styled/StyledComponents";
import { useGetAdminStatsQuery } from "../../redux/api/api";
import { DoughnutChart, LineChart } from "../../specific/Charts";

const Dashboard = () => {

  const {data,isLoading,isError,error}=useGetAdminStatsQuery();
  const {stats}=data || {};

  useErrors([{isError,error}]);

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
      <Widget title={"Users"} value={stats?.usersCount} icon={<PersonOutlinedIcon />} />
      <Widget title={"Chats"} value={stats?.totalChatsCount} icon={<GroupOutlinedIcon />} />
      <Widget title={"Messages"} value={stats?.messagesCount} icon={<MessageOutlinedIcon />} />
    </Stack>
  );

  return (
    <AdminLayout>
    {
      isLoading?<Skeleton height={"100vh"}/>:
      <Container component={"main"}>
        {Appbar}
        <Stack direction={{xs:"column",lg:"row"}} sx={{gap:"2rem"}} flexWrap={"wrap"} justifyContent={"center"} alignItems={{xs:"center",lg:"stretch"}}>
          <Paper
            elevation={3}
            sx={{
              padding: "2rem 3.5rem",
              borderRadius: "1rem",
              // width: { xs: "100%", sm: "48%" },
              width:"100%",
              maxWidth: "41rem",
            }}
          >
            <Typography margin={"2rem 0"} variant="h4">Last Messages</Typography>
        
            <LineChart value={stats?.messagesChart || []}/>

          </Paper>

          <Paper
            elevation={3}
            sx={{
              padding: "1rem",
              borderRadius: "1rem",
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              width: { xs: "100%", sm: "40%" },
              position: "relative",
              maxWidth: {xs:"100%",lg:"25rem"},
            }}
          >
            <DoughnutChart labels={["Single Chats","Group Chats"]} value={[stats?.totalChatsCount - stats?.groupsCount || 0,stats?.groupsCount || 0]}/>

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
    }
    </AdminLayout>
  );
};

const Widget = ({ title, value, icon }) => (
  <Paper
    elevation={3}
    sx={{
      padding: "2rem",
      margin: "2rem 0",
      borderRadius: "1rem",
      width: "20rem",
    }}
  >
    <Stack alignItems={"center"} spacing={"1rem"}>
      <Typography
        sx={{
          color: "rgba(0,0,0,0.7)",
          borderRadius: "50%",
          border: "5px solid black",
          width: "5rem",
          height: "5rem",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        {value}
      </Typography>
      <Stack direction={"row"} alignItems={"center"} spacing={1}>
        {icon}
        <Typography>{title}</Typography>
      </Stack>
    </Stack>
  </Paper>
);

export default Dashboard;
