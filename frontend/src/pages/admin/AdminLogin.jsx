import React,{useEffect} from "react";
import { Button, Container, Paper, TextField, Typography } from "@mui/material";
import { useInputValidation} from "6pp";
import { Navigate, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { adminLogin, getAdmin } from "../../redux/thunks/admin";

const AdminLogin = () => {

  const secretkey=useInputValidation("");
  const {isAdmin}=useSelector(state=>state.auth);
  const dispatch=useDispatch()

  const navigate=useNavigate();

 const submitHandler=(e)=>{
  e.preventDefault();
  dispatch(adminLogin(secretkey.value)) //we wre calling like this becouse we are using createAsyncThunk in redux it can also be done normally by using axios or rtk query etc;
 }

 useEffect(()=>{
  dispatch(getAdmin());
 },[dispatch])

 if(isAdmin)
  return <Navigate to="/admin/dashboard"/>
  
  return (
    <div style={{
      backgroundImage:"linear-gradient(to bottom, #9600FF, #AEBAF8)"
    }}>
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
        
          <>
            <Typography variant="h5" sx={{color:"#9600FF"}}>ADMIN LOGIN</Typography>
            <form
              style={{
                width: "100%",
                marginTop: "1rem",
              }}
              onSubmit={submitHandler}
            >
              <TextField
                label="Secret Key"
                margin="normal"
                required
                fullWidth
                variant="outlined"
                name="password"
                value={secretkey.value}
                onChange={secretkey.changeHandler}
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
            </form>
          </>
        
      </Paper>
    </Container>
    </div>
  )
}

export default AdminLogin