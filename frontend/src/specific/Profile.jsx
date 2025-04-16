import { Avatar, Stack, Typography } from "@mui/material";
import React from "react";
import FaceIcon from "@mui/icons-material/Face";
import AlternateEmailIcon from "@mui/icons-material/AlternateEmail";
import CalendarMonthIcon from "@mui/icons-material/CalendarMonth";
import moment from "moment";
import { useSelector } from "react-redux";
import { transformImage } from "../lib/features";

const Profile = () => {

  const { user } = useSelector((state) => state.auth);
  
  return (
    <Stack direction={"column"} spacing={"2rem"} alignItems={"center"}>
      <Avatar
      src={transformImage(user?.avatar?.url)}
      alt={user?.name}
        sx={{
          width: 200,
          height: 200,
          objectFit: "contain",
          marginBottom: "1rem",
          border: "5px solid white",
        }}
      />
      <ProfileCard text={"Bio"} heading={user?.bio} />
      <ProfileCard
        text={"Username"}
        icon={<AlternateEmailIcon />}
        heading={`@${user?.username}`}
      />
      <ProfileCard text={"name"} icon={<FaceIcon />} heading={user?.name} />
      <ProfileCard
        text={"joined"}
        icon={<CalendarMonthIcon />}
        heading={moment(user?.createdAt).fromNow()}
      />
    </Stack>
  );
};

const ProfileCard = ({ text, icon, heading }) => {
  return (
    <Stack
      direction={"row"}
      alignItems={"center"}
      spacing={"1rem"}
      color={"white"}
      textAlign={"center"}
    >
      {icon && icon}
      <Stack>
        <Typography variant="body1">{text}</Typography>
        <Typography color={"gray"} variant="caption">
          {heading}
        </Typography>
      </Stack>
    </Stack>
  );
};

export default Profile;
