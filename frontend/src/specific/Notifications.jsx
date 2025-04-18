import React, { memo } from "react";
import {
  Avatar,
  Button,
  Dialog,
  DialogTitle,
  ListItem,
  Skeleton,
  Stack,
  Typography,
} from "@mui/material";
import { sampleNotification } from "../constants/sampleData";
import { useAcceptFriendRequestMutation, useGetNotificationsQuery } from "../redux/api/api";
import { useErrors } from "../../hooks/hook";
import { useDispatch, useSelector } from "react-redux";
import { setIsNotification } from "../redux/reducers/misc";
const Notifications = () => {
  const { isLoading, data, error, isError } = useGetNotificationsQuery();
  const {isNotification}=useSelector(state=>state.misc);
  const dispatch=useDispatch()
  const [acceptRequest]=useAcceptFriendRequestMutation();

  useErrors([{ error, isError }]);

  const friendRequestHandler = async({ _id, accept }) => {

    dispatch(setIsNotification(false))

    try{
      const res=await acceptRequest({ requestId:_id, accept });
      if(res.data?.success){
        console.log("socket use here")
        toast.success(res.data.message)
      }else{
        toast.error(res.data.error || "Something went wrong")
      }
    }catch(err){
      console.log(err)
    }
  };

  const onCloseHandler=()=>{
    dispatch(setIsNotification(false))

  }

  return (
    <Dialog open={isNotification} onClose={onCloseHandler}>
      <Stack p={{ xs: "1rem", sm: "2rem" }} maxWidth={"25rem"}>
        <DialogTitle>Notifications</DialogTitle>

        {isLoading ? (
          <Skeleton />
        ) : (
          <>
            {data?.allRequests.length > 0 ? (
              data?.allRequests.map((i) => (
                <NotificationItem
                  sender={i.sender}
                  _id={i._id}
                  handler={friendRequestHandler}
                  key={i._id}
                />
              ))
            ) : (
              <Typography textAlign={"center"}>0 Notifications</Typography>
            )}
          </>
        )}
      </Stack>
    </Dialog>
  );
};

const NotificationItem = memo(({ sender, _id, handler }) => {
  const { name, avatar } = sender;

  return (
    <ListItem>
      <Stack
        direction={"row"}
        alignItems={"center"}
        spacing={"1rem"}
        width={"100%"}
      >
        <Avatar />
        <Typography
          variant="body1"
          sx={{
            flexGlow: 1,
            display: "-webkit-box",
            WebkitLineClamp: 1,
            WebkitBoxOrient: "vertical",
            overflow: "hidden",
            textOverflow: "ellipsis",
            width: "100%",
          }}
        >
          {`${name} sent you friend request`}
        </Typography>
        <Stack
          direction={{
            xs: "column",
            sm: "row",
          }}
        >
          <Button onClick={() => handler({ _id, accept: true })}>Accept</Button>
          <Button color="error" onClick={() => handler({ _id, accept: false })}>
            Reject
          </Button>
        </Stack>
      </Stack>
    </ListItem>
  );
});

export default Notifications;
