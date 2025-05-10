import React, { useEffect } from "react";
import {
  Avatar,
  Button,
  Container,
  IconButton,
  Paper,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import CameraAltIcon from "@mui/icons-material/CameraAlt";
import { isValidUsername, useFileHandler, useInputValidation } from "6pp";
import { useState } from "react";
import VisualyHidden from "../components/styled/StyledComponents";
import { userNameValidator } from "../utils/Validation";
import axios from "axios";
import { server } from "../constants/config";
import { useDispatch, useSelector } from "react-redux";
import { userExists } from "../redux/reducers/auth";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const [isLogin, setisLogin] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const { user } = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const name = useInputValidation("");
  const password = useInputValidation("");
  const bio = useInputValidation("");
  const userName = useInputValidation("", userNameValidator);
  const avatar = useFileHandler("single");

  const loginHandler = async (e) => {
    e.preventDefault();

    const toastId=toast.loading("Logging in...")

    setIsLoading(true);
    const config = {
      withCredentials: true,
      headers: {
        "Content-Type": "application/json",
      },
    };

    try {
      const { data } = await axios.post(
        `${server}/api/v1/user/login`,
        { username: userName.value, password: password.value },
        config
      );
      console.log(data);
      dispatch(userExists(data.user));
      setisLogin(true);
      toast.success(data?.message,{id:toastId});
    } catch (error) {
      toast.error(error?.response?.data?.message || "Something went wrong.",{id:toastId});
      setisLogin(false);
    } finally {
      setIsLoading(false);
    }
  };

  const registerHandler = async (e) => {
    e.preventDefault();

    const toastId=toast.loading("Registering...")

    setIsLoading(true);
    const formData = new FormData();
    formData.append("avatar", avatar.file);
    formData.append("name", name.value);
    formData.append("bio", bio.value);
    formData.append("username", userName.value);
    formData.append("password", password.value);

    const config = {
      withCredentials: true,
      headers: {
        "Content-Type": "multipart/form-data",
      },
    };

    try {
      const { data } = await axios.post(
        `${server}/api/v1/user/register`,
        formData,
        config
      );
      dispatch(userExists(data.user));
      toast.success(data?.message,{id:toastId});
      setisLogin(true);
    } catch (error) {
      console.log(error);
      toast.error(error.response.data.message,{id:toastId});
      setisLogin(false);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    if (user) {
      navigate("/");
    }
  }, [navigate, user]);

  return (
    <div
      style={{
        backgroundImage: "linear-gradient(to bottom, #9600FF, #AEBAF8)",
      }}
    >
      <Container
        component={"main"}
        maxWidth="xs"
        sx={{
          height: "100vh",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <Paper
          elevation={3}
          sx={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            padding: 3,
            // backgroundImage:"linear-gradient(to bottom,#AEBAF8,#9600FF)"
          }}
        >
          {isLogin ? (
            <>
              <Typography variant="h5" sx={{ color: "#9600FF" }}>
                LOGIN
              </Typography>
              <form
                style={{
                  width: "100%",
                  marginTop: "1rem",
                }}
                onSubmit={loginHandler}
              >
                <TextField
                  variant="outlined"
                  margin="normal"
                  required
                  fullWidth
                  label="userName"
                  name="userName"
                  value={userName.value}
                  onChange={userName.changeHandler}
                />
                <TextField
                  label="Password"
                  margin="normal"
                  required
                  fullWidth
                  variant="outlined"
                  name="password"
                  value={password.value}
                  onChange={password.changeHandler}
                  type="password"
                />

                <Button
                  color="primary"
                  variant="contained"
                  sx={{ marginTop: "1rem" }}
                  type="submit"
                  fullWidth
                  disabled={isLoading}
                >
                  LOGIN
                </Button>
                <Typography textAlign={"center"} margin={"1rem"}>
                  OR
                </Typography>
                <Button
                  variant="text"
                  onClick={() => setisLogin(false)}
                  fullWidth
                  disabled={isLoading}
                >
                  REGISTER
                </Button>
              </form>
            </>
          ) : (
            <>
              <Typography variant="h5" sx={{ color: "#9600FF" }}>
                REGISTER
              </Typography>
              <form
                style={{
                  width: "100%",
                  marginTop: "1rem",
                }}
                onSubmit={registerHandler}
              >
                <Stack margin={"auto"} width={"7rem"} position={"relative"}>
                  <Avatar
                    sx={{
                      width: "7rem",
                      height: "7rem",
                      objectFit: "contain",
                    }}
                    src={avatar.preview}
                  />
                  <IconButton
                    sx={{
                      position: "absolute",
                      right: 0,
                      bottom: 0,
                      color: "white",
                      bgcolor: "rgba(0,0,0,0.5)",
                      ":hover": {
                        bgcolor: "rgba(0,0,0,0.7)",
                      },
                    }}
                    component="label"
                  >
                    <>
                      <CameraAltIcon fontSize="small" />
                      <VisualyHidden
                        type="file"
                        onChange={avatar.changeHandler}
                      />
                    </>
                  </IconButton>
                </Stack>
                {avatar.error && (
                  <Typography
                    variant="caption"
                    m={"1rem auto"}
                    width={"fit-content"}
                    display={"block"}
                    color="error"
                  >
                    {avatar.error}
                  </Typography>
                )}

                <TextField
                  variant="outlined"
                  margin="normal"
                  required
                  fullWidth
                  label="Name"
                  name="name"
                  value={name.value}
                  onChange={name.changeHandler}
                />
                <TextField
                  variant="outlined"
                  margin="normal"
                  required
                  fullWidth
                  label="Bio"
                  name="bio"
                  value={bio.value}
                  onChange={bio.changeHandler}
                />
                <TextField
                  variant="outlined"
                  margin="normal"
                  required
                  fullWidth
                  label="userName"
                  name="uname"
                  value={userName.value}
                  onChange={userName.changeHandler}
                />
                {userName.error && (
                  <Typography variant="caption" color="error">
                    {userName.error}
                  </Typography>
                )}
                <TextField
                  label="Password"
                  margin="normal"
                  required
                  fullWidth
                  variant="outlined"
                  type="password"
                  name="pass"
                  value={password.value}
                  onChange={password.changeHandler}
                />

                <Button
                  color="primary"
                  variant="contained"
                  sx={{ marginTop: "1rem" }}
                  type="submit"
                  fullWidth
                  disabled={isLoading}
                >
                  REGISTER
                </Button>
                <Typography textAlign={"center"} margin={"1rem"}>
                  Already have an account
                </Typography>
                <Button
                  variant="text"
                  onClick={() => setisLogin(true)}
                  fullWidth
                  disabled={isLoading}
                >
                  Login
                </Button>
              </form>
            </>
          )}
        </Paper>
      </Container>
    </div>
  );
};

export default Login;
