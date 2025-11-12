import React, { useState, JSX } from 'react';
import { TextField, Button, Box, Typography, InputAdornment } from '@mui/material';
import './LoginPage.css'; // import the CSS file
import { NFTCard } from '../components/NFTCard';
import type { NFT } from '../types/nft';
import EmailOutlinedIcon from '@mui/icons-material/EmailOutlined';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import { Link } from 'react-router-dom';

export function LoginPage(): JSX.Element {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Email:', email);
    console.log('Password:', password);
  };

  return (
    <Box className="login-page">
      <Box className="login-art">
        <NFTCard
          nft={{
            id: 'sample-1',
            name: 'Featured NFT',
            // use sample image from the project public folder
            imageUrl: '/bored-ape.png',
            creatorAvatarUrl: '/avatar.png',
            creatorName: 'Creator',
            price: '1.2 ETH',
          } as unknown as NFT}
        />
      </Box>

      <Box
        component="form"
        onSubmit={handleLogin}
        className="login-form"
        noValidate
        autoComplete="off"
      >
        <Typography variant="h2" component="h1" gutterBottom sx={{ fontWeight: 700 }}>
          Login
        </Typography>
        <Typography variant="body1" gutterBottom>
          Welcome! Enter your details and start creating, collecting and selling NFTs.
        </Typography>

        <TextField
          label="Email Address"
          variant="outlined"
          fullWidth
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          slotProps={{
            input: {
              startAdornment: (
                <InputAdornment position="start">
                  <EmailOutlinedIcon />
                </InputAdornment>
              ),
            },
          }}
        />
        <TextField
          label="Password"
          type="password"
          variant="outlined"
          fullWidth
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          slotProps={{
            input: {
              startAdornment: (
                <InputAdornment position="start">
                  <LockOutlinedIcon />
                </InputAdornment>
              ),
            },
          }}
        />

        <Button
        component={Link}       // <-- turn it into a Link
        to="/create-account"   // <-- route to navigate
        variant="contained"
        fullWidth
        className="create-account"
        >
        Create Account
        </Button>
        <Button type="submit" variant="contained" fullWidth className="login-button">
          Login
        </Button>
      </Box>
    </Box>
  );
}
