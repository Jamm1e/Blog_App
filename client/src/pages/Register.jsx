import React from 'react'

import { useState, useEffect } from 'react';

import{
  Grid, TextField, Button, Typography,
  Container, CssBaseline, Box, Avatar
} from '@mui/material';

import {
  useNavigate, Link 
} from 'react-router-dom';

//#region --------------------( ICONS )----------------------
import { InputAdornment } from '@mui/material';
import LockPersonOutlinedIcon from '@mui/icons-material/LockPersonOutlined';
import VisibilityOutlinedIcon from '@mui/icons-material/VisibilityOutlined';
import VisibilityOffOutlinedIcon from '@mui/icons-material/VisibilityOffOutlined';
//#endregion

import { toast } from 'react-toastify';

import { useAuth } from '../middleware/contextHooks';

export default function Register() {
  const {registerUser, clearErrors, toasts, isAuthenticated} = useAuth();

  const navigate = useNavigate();
  const [user, setUser] = useState({
    firstName: 'Jammie',
    lastName: 'Moon',
    email: 'moonJammie@mail.com',
    password: 'moonlight00',
    confirmpassword: 'moonlight00'
  })

  const [showPassword, setShowPassword] = useState(
    {password: false, confirmpassword: false}
  );

  useEffect(() => {
    if(isAuthenticated) navigate('/blogs')

    if(toasts){
      toasts.forEach(element => {
        toast(element.message,
            {type: element.type}
          )
      });
    }
  }, {toasts, isAuthenticated, clearErrors, navigate})

  const handleRegister = () => {
    const { firstName, lastName, email, password, confirmpassword } = user;
    if ( !firstName || !lastName || !email || !password || !confirmpassword ){
      toast('Please fill all fields', {type: 'error'});
      return
    }

    if(password !== confirmpassword){
      toast('Passwords do not match', {type: 'error'});
      return
    }
    else{
      toast('Registration Successfull', {type: 'success'})
    }

  };


  return (
    <Container maxWidth="xs">
      <CssBaseline />

      <Box 
        sx={{
          marginTop: 8,
          display: 'flex',
          flexDirection: 'column', 
          alignItems: 'center'
        }}>

          <Avatar sx={{m: 1, backgroundColor: 'pink'}}>
            <LockPersonOutlinedIcon />
          </Avatar>

          <Typography component="h1" varient="h5">Register</Typography>
          
          <Grid container spacing={2} sx={{mt: 3}}>

            <Grid item sx={12} sm={6}>
              <TextField placeholder="Enter Your First Name" label='First Name' value={user.firstName} name='firstName'
               onChange={(e) => setUser({...user, firstName: e.target.value})} />
            </Grid>

            <Grid item sx={12} sm={6}>
              <TextField placeholder="Enter Your Last Name" label='Last Name' value={user.lastName} name='lastName'
               onChange={(e) => setUser({...user, lastName: e.target.value})} />
            </Grid>
            
            <Grid item sx={12} sm={50}>
              <TextField placeholder="Email Address" label='E-mail' value={user.email} name='email'
               onChange={(e) => setUser({...user, email: e.target.value})} />
            </Grid>

            <Grid item sx={12} sm={6}>
              <TextField placeholder="Password" label='Password' value={user.password} name='password' 
               onChange={(e) => setUser({...user, password: e.target.value})}
               type={showPassword.password ? 'text' : 'password'} 
                InputProps={{
                  endAdornment: <InputAdornment position="end" onClick={() => setShowPassword({...showPassword, password: !showPassword.password})}>
                                  {!showPassword.password ? <VisibilityOutlinedIcon /> : <VisibilityOffOutlinedIcon />}
                                </InputAdornment>
                }}
               />
            </Grid>

            <Grid item sx={12} sm={6}>
              <TextField placeholder="Confirm Password" label='Confirm Password' value={user.confirmpassword} name='confirmpassword'
               onChange={(e) => setUser({...user, confirmpassword: e.target.value})}
               type={showPassword.confirmpassword ? 'text' : 'password'} 
               InputProps={{
                endAdornment: <InputAdornment position="end" onClick={() => setShowPassword({...showPassword, confirmpassword: !showPassword.confirmpassword})}>
                                {!showPassword.confirmpassword ? <VisibilityOutlinedIcon /> : <VisibilityOffOutlinedIcon />}
                              </InputAdornment>
              }}
                />
            </Grid>

            <Grid item sx={12} sm={50}>
              <Button fullWidth sx={{mb: 2}}>
                Register
              </Button>
            </Grid>

          </Grid>

          <Grid container justify="flex-end">
              <Grid item sx={12} sm={50}>
                <Link to="/login">
                  Already have an account? Sign in
                </Link>
              </Grid>

            </Grid>

        </Box>
    </Container>
  )
}
