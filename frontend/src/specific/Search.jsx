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
import { sampleUsers } from "../constants/sampleData";
import { useLazySearchUserQuery } from "../redux/api/api";

const Search = ({handleSearchClose,isSearch}) => {
  const search = useInputValidation();

  const [searchUser]=useLazySearchUserQuery();

  const [users,setUsers] = useState(sampleUsers);
  let isLoadingFriendRequest=false;

  const addFriendHandler=(id)=>{
    console.log(id)
  }

  useEffect(()=>{
    console.log(search.value)
  },[search.value])
  

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
            {/* if some error happens it may be becouse im not providing objeects inside the users it is a todo" */}
          {
            users.map((user) => (
              <UserItem user={user} key={user._id} handler={addFriendHandler} handlerIsLoading={isLoadingFriendRequest}/>
          ))}
        </List>
      </Stack>
    </Dialog>
  );
};

export default Search;
