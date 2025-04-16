import {
  Dialog,
  DialogTitle,
  InputAdornment,
  List,
  Stack,
  TextField,
} from "@mui/material";
import React, { useEffect, useState } from "react";
import { useInputValidation } from "6pp";
import SearchIcon from "@mui/icons-material/Search";
import UserItem from "../components/shared/UserItem";
import { useLazySearchUserQuery, useSendFriendRequestMutation } from "../redux/api/api";
import { transformImage } from "../lib/features";
import toast from "react-hot-toast";
import { useAsyncMutation } from "../../hooks/hook";

const Search = ({ handleSearchClose, isSearch }) => {
  const search = useInputValidation();
  const [useFriendRequest,isLoadingFriendRequest]=useAsyncMutation(useSendFriendRequestMutation);

  const [searchUser] = useLazySearchUserQuery();

  const [users, setUsers] = useState([]);

  const addFriendHandler = async (id) => {
    await useFriendRequest("Sending friend request... ",{userId:id})
  };

  useEffect(() => {
    const timeOutId = setTimeout(() => {
      searchUser(search.value)
        .then(({ data }) => setUsers(data?.users))
        .catch((err) => {
          console.log(err);
        });
    }, 1000);

    return () => clearTimeout(timeOutId);
  }, [search.value]);

  return (
    <Dialog open={isSearch} onClose={handleSearchClose}>
      <Stack p={"2rem"} direction={"column"} width={"25rem"}>
        <DialogTitle textAlign={"center"}>Find People</DialogTitle>
        <TextField
          label=""
          value={search.value}
          onChange={search.changeHandler}
          variant="outlined"
          size="small"
          inputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <SearchIcon />
              </InputAdornment>
            ),
          }}
        />

        <List>
          {users.map((user) => (
            <UserItem
              user={user}
              key={user._id}
              avatar={transformImage(user?.avatar)}
              handler={addFriendHandler}
              handlerIsLoading={isLoadingFriendRequest}
            />
          ))}
        </List>
      </Stack>
    </Dialog>
  );
};

export default Search;
