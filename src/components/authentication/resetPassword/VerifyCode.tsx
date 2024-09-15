import React, { useState, useEffect } from 'react';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';

export default function VerifyCode({ handleVerify, resendCode, editEmail }: any) {
  const [code, setCode] = useState('');
  const [timer, setTimer] = useState(20);

  useEffect(() => {
    const interval = setInterval(() => {
      setTimer(prev => (prev > 0 ? prev - 1 : prev));
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  const handleCodeSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    handleVerify(code);  // Trigger the verify action
  };

  return (
      <Box
        sx={{
          my: 8,
          mx: 4,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
        }}
      >
        <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
          <LockOutlinedIcon />
        </Avatar>
        <Typography component="h1" variant="h5">
          Enter Verification Code
        </Typography>
        <Box component="form" noValidate onSubmit={handleCodeSubmit} sx={{ mt: 1 }}>
          <TextField
            margin="normal"
            required
            fullWidth
            id="code"
            label="Verification Code"
            name="code"
            autoComplete="one-time-code"
            autoFocus
            value={code}
            onChange={(e) => setCode(e.target.value)}
          />
          <Button
            type="submit"
            fullWidth
            variant="contained"
            sx={{ mt: 3, mb: 2 }}
          >
            Verify Code
          </Button>
          <Grid container>
            <Grid item xs>
                {timer === 0 ? (
                    <Button onClick={resendCode} variant="text" fullWidth>Resend Code</Button>
                ) : (
                    <Typography variant="body2" color="textSecondary">Resend code in {timer} seconds</Typography>
                )}
            </Grid>
            <Grid item>
                <p className='text-sm text-gray-500 hover:text-blue-400 cursor-pointer' onClick={editEmail}>
                    {"Entered wrong email? Edit Email"}
                </p>
            </Grid>
          </Grid>
        </Box>
      </Box>
  );
}
