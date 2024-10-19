'use client';
import Link from '@mui/material/Link';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import React, { useState } from 'react';
import styles from './Auth.module.css';
import SignIn from './Login';
import SignUp from './Signup';
import Verify from './Verify';
import ResetPass from './ResetPass';
import ChangePass from './ChangePass'
import Paper from '@mui/material/Paper';
import { useSelector, useDispatch } from 'react-redux';

function Copyright(props?: any) {
  return (
    <Typography variant="body2" color="text.secondary" align="center" {...props}>
      {'Copyright © '}
      <Link color="inherit" href="">
        Portfolio
      </Link>{' '}
      {new Date().getFullYear()}
      {'.'}
    </Typography>
  );
}

export default function SideAuth({ onClose , AuthType = 'signIn' }: any) {
  
  const user = useSelector((state: any) => state.auth.user);
  const [authType, setAuthType] = useState(AuthType); 
  const [userData, setUserData] = useState({});

  const getForm = () => {
    switch (authType) {
      case 'signIn':
        return <SignIn setAuthType={setAuthType} onClose={onClose} setUserData={setUserData}/>;
      case 'signUp': 
        return <SignUp setAuthType={setAuthType} onClose={onClose} setUserData={setUserData}/>;
      case 'resetPassword':
        return <ResetPass  setAuthType={setAuthType} onClose={onClose} setUserData={setUserData}/>;
      case 'verify':
        return <Verify setAuthType={setAuthType} onClose={onClose} userData={userData}/>
      case 'changePassword':
        return <ChangePass setAuthType={setAuthType} onClose={onClose}/>
      default:
        return null;
    }
  };
  

  return (
    <Grid container component="main" className='absolute top-0 right-0' sx={{ height: '100vh' }}>
      <Grid
        item
        className='opacity-40 w-full !bg-gray-900'
        sx={{
          backgroundColor: (t) =>
            t.palette.mode === 'light' ? t.palette.grey[50] : t.palette.grey[900],
          backgroundSize: 'cover',
          backgroundPosition: 'center',
        }}
      >
        <div className='w-full h-full' onClick={onClose}></div>
      </Grid>
      <Grid item xs={12} sm={8} md={6} lg={4} xl={3} component={Paper} elevation={6} className='absolute top-0 right-0 h-full flex !flex-col' square>
      <div className="flex-grow">{getForm()}</div>
          <div className="mt-auto mb-0">
            {Copyright()} 
          </div>
      </Grid> 
    </Grid>
  );
}
