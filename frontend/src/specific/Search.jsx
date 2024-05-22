import {
  Dialog,
  DialogTitle,
  InputAdornment,
  List,
  Stack,
  TextField,
} from "@mui/material";
import React from "react";
import { useInputValidation } from "6pp";
import SearchIcon from "@mui/icons-material/Search";
import UserItem from "../components/shared/UserItem";

const Search = () => {
  const search = useInputValidation();

  const users = ["user1", "user2", "user3", "user4"];

  return (
    <Dialog open>
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
              <UserItem user={user} />
          ))}
        </List>
      </Stack>
    </Dialog>
  );
};

export default Search;
