// pages/CreateAccountPage.tsx
import React, { useState, JSX } from 'react';
import { TextField, Button, Box, Typography } from '@mui/material';
import './LoginPage.css'; // reuse the CSS if styling is similar

export function CreateAccountPage(): JSX.Element {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleCreate = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Create account:', email, password);
  };

  return (
    <Box className="login-page">
      <Box component="form" className="login-form" onSubmit={handleCreate}>
        <Typography variant="h2" component="h1" gutterBottom>
          Create Account
        </Typography>
        <TextField
          label="Email"
          variant="outlined"
          fullWidth
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <TextField
          label="Password"
          type="password"
          variant="outlined"
          fullWidth
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <Button type="submit" variant="contained" fullWidth>
          Create Account
        </Button>
      </Box>
    </Box>
  );
}
