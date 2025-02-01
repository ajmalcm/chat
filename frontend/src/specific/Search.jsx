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
import { useLazySearchUserQuery } from "../redux/api/api";
import { transformImage } from "../lib/features";

const Search = ({ handleSearchClose, isSearch }) => {
  const search = useInputValidation();

  const [searchUser] = useLazySearchUserQuery();

  const [users, setUsers] = useState([]);
  let isLoadingFriendRequest = false;

  const addFriendHandler = (id) => {
    console.log(id);
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
