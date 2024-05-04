import React from 'react'
import {Button, Container, Paper, TextField, Typography} from "@mui/material"
import { useState } from 'react'

const Login = () => {

  const [isLogin,setisLogin]=useState(true);

  return (
    <Container component={'main'} maxWidth='xs' sx={{
      height:"100vh",
      display:"flex",
      justifyContent:"center",
      alignItems:"center",

    }}>
      <Paper
      elevation={3}
      sx={{
        display:"flex",
        flexDirection:"column",
        alignItems:"center",
        padding:4
      }}
      >
      {
        isLogin?
        <>
       <Typography variant='h5'>LOGIN</Typography>
       <form style={{
        width:"100%",
        marginTop:"1rem"
       }}>
        <TextField
          variant='outlined'
          margin="normal"
          required
          fullWidth
          label="userName"
        />
        <TextField
          label="Password"
          margin='normal'
          required
          fullWidth
          variant='outlined'
          type='password'
        />

        <Button color='primary' variant='contained' sx={{marginTop:"1rem"}} type="submit" fullWidth>
        LOGIN
        </Button>
        <Typography textAlign={'center'} margin={'1rem'}>OR</Typography>
        <Button variant='text' onClick={()=>setisLogin(false)} fullWidth >
          REGISTER
        </Button>
       </form>
        </>
        : <>
       <Typography variant='h5'>REGISTER</Typography>
       <form style={{
        width:"100%",
        marginTop:"1rem"
       }}>
       <TextField
          variant='outlined'
          margin="normal"
          required
          fullWidth
          label="Name"
        />
        <TextField
          variant='outlined'
          margin="normal"
          required
          fullWidth
          label="Bio"
        />
        <TextField
          variant='outlined'
          margin="normal"
          required
          fullWidth
          label="userName"
        />
        <TextField
          label="Password"
          margin='normal'
          required
          fullWidth
          variant='outlined'
          type='password'
        />

        <Button color='primary' variant='contained' sx={{marginTop:"1rem"}} type="submit" fullWidth>
        REGISTER
        </Button>
        <Typography textAlign={'center'} margin={'1rem'}>Already have an account</Typography>
        <Button variant='text' onClick={()=>setisLogin(true)} fullWidth >
          Login
        </Button>
       </form>
        </>
      }
      </Paper>
    </Container>
  )
}

export default Login