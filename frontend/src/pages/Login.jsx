import React, { useEffect } from "react";
import { Avatar, Button, Container, IconButton, Paper, Stack, TextField, Typography } from "@mui/material";
import CameraAltIcon from '@mui/icons-material/CameraAlt';
import { useState } from "react";
import VisualyHidden from "../styled/StyledComponents";

const Login = () => {
  const [isLogin, setisLogin] = useState(true);
  const [loginData,setLoginData]=useState({userName:"",password:""});
  const [registerData,setRegisterData]=useState({name:"",uname:"",pass:"",bio:""})
  const {userName,password}=loginData;
  const {name,uname,pass,bio}=registerData;

  const loginChangeHandler=(e)=>{setLoginData({...loginData,[e.target.name]:e.target.value})}
  const registerChangeHandler=(e)=>{setRegisterData({...registerData,[e.target.name]:e.target.value})}

 const loginHandler=(e)=>{
  e.preventDefault();
 }

 const registerHandler=(e)=>{
  e.preventDefault();
 }



  return (
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
          padding: 4,
        }}
      >
        {isLogin ? (
          <>
            <Typography variant="h5">LOGIN</Typography>
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
                value={userName}
                onChange={loginChangeHandler}
              />
              <TextField
                label="Password"
                margin="normal"
                required
                fullWidth
                variant="outlined"
                name="password"
                value={password}
                onChange={loginChangeHandler}
                type="password"
              />

              <Button
                color="primary"
                variant="contained"
                sx={{ marginTop: "1rem" }}
                type="submit"
                fullWidth
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
              >
                REGISTER
              </Button>
            </form>
          </>
        ) : (
          <>
            <Typography variant="h5">REGISTER</Typography>
            <form
              style={{
                width: "100%",
                marginTop: "1rem",
              }}
              onSubmit={registerHandler}
            >
            <Stack margin={"auto"} width={"10rem"} position={"relative"}>
              <Avatar sx={{
                width:"10rem",
                height:"10rem",
                objectFit:"contain"
              }}/>
              <IconButton sx={{
                position:"absolute",
                right:0,
                bottom:0,
                color:"white",
                bgcolor:"rgba(0,0,0,0.5)",
                ":hover":{
                  bgcolor:"rgba(0,0,0,0.7)"
                }
              }}
              component="label"
              >
                <>
                  <CameraAltIcon/>
                  <VisualyHidden type="file"/>
                </>
              </IconButton>
            </Stack>

            
              <TextField
                variant="outlined"
                margin="normal"
                required
                fullWidth
                label="Name"
                name="name"
                value={name}
                onChange={registerChangeHandler}
              />
              <TextField
                variant="outlined"
                margin="normal"
                required
                fullWidth
                label="Bio"
                name="bio"
                value={bio}
                onChange={registerChangeHandler}
              />
              <TextField
                variant="outlined"
                margin="normal"
                required
                fullWidth
                label="userName"
                name="uname"
                value={uname}
                onChange={registerChangeHandler}
              />
              <TextField
                label="Password"
                margin="normal"
                required
                fullWidth
                variant="outlined"
                type="password"
                name="pass"
                value={pass}
                onChange={registerChangeHandler}
              />

              <Button
                color="primary"
                variant="contained"
                sx={{ marginTop: "1rem" }}
                type="submit"
                fullWidth
              >
                REGISTER
              </Button>
              <Typography textAlign={"center"} margin={"1rem"}>
                Already have an account
              </Typography>
              <Button variant="text" onClick={() => setisLogin(true)} fullWidth>
                Login
              </Button>
            </form>
          </>
        )}
      </Paper>
    </Container>
  );
};

export default Login;
