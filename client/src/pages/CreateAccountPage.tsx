import React, { useState, JSX } from 'react';
import { TextField, Button, Box, Typography, InputAdornment, Select, MenuItem } from '@mui/material';
import './LoginPage.css';
import { NFTCard } from '../components/NFTCard';
import type { NFT } from '../types/nft';
import PersonOutlineIcon from '@mui/icons-material/PersonOutline';
import EmailOutlinedIcon from '@mui/icons-material/EmailOutlined';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import VerifiedUserOutlinedIcon from '@mui/icons-material/VerifiedUserOutlined';

export function CreateAccountPage(): JSX.Element {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [userType, setUserType] = useState('');

  const handleCreate = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Create account:', { username, email, password, confirmPassword, userType });
  };

  return (
    <Box className="login-page">
      {/* Left: NFT showcase */}
      <Box className="login-art">
        <NFTCard
          nft={{
            id: 'sample-1',
            name: 'Featured NFT',
            imageUrl: '/bored-ape.png',
            creatorAvatarUrl: '/avatar.png',
            creatorName: 'Creator',
            price: '1.2 ETH',
          } as unknown as NFT}
        />
      </Box>

      {/* Right: create account form */}
      <Box component="form" className="login-form" onSubmit={handleCreate}>
        <Typography variant="h2" component="h1" gutterBottom sx={{ fontWeight: 700 }}>
          Create Account
        </Typography>
        <Typography variant="body1" gutterBottom>
          Welcome! Enter your details and start creating, collecting and selling NFTs.
        </Typography>

        <TextField
          label="Username"
          variant="outlined"
          fullWidth
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          slotProps={{
            input: {
              startAdornment: (
                <InputAdornment position="start">
                  <PersonOutlineIcon />
                </InputAdornment>
              ),
            },
          }}
        />

        <TextField
          label="Email"
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

        <TextField
          label="Confirm Password"
          type="password"
          variant="outlined"
          fullWidth
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
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

        <Select
          value={userType}
          onChange={(e) => setUserType(e.target.value)}
          displayEmpty
          fullWidth
          variant="outlined"
          sx={{
            borderRadius: '999px',
            backgroundColor: 'transparent',
            color: '#fff',
            '& .MuiOutlinedInput-notchedOutline': {
              borderColor: '#555',
              borderRadius: '999px',
            },
            '&:hover .MuiOutlinedInput-notchedOutline': {
              borderColor: '#a259ff',
            },
            '&.Mui-focused .MuiOutlinedInput-notchedOutline': {
              borderColor: '#a259ff',
            },
            '& .MuiSvgIcon-root': {
              color: '#aaa',
            },
          }}
        >
          <MenuItem value="" disabled>
            Choose Buyer/Artist
          </MenuItem>
          <MenuItem value="buyer">Buyer</MenuItem>
          <MenuItem value="artist">Artist</MenuItem>
        </Select>

        <Button type="submit" variant="contained" fullWidth>
          Create Account
        </Button>
      </Box>
    </Box>
  );
}
