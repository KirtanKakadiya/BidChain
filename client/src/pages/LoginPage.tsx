import React, { useState, JSX } from 'react';
import { TextField, Button, Box, Typography, InputAdornment } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import './LoginPage.css'; 
import { NFTCard } from '../components/NFTCard';
import type { NFT } from '../types/nft';
import EmailOutlinedIcon from '@mui/icons-material/EmailOutlined';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import { Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

type LoginPageProps = {
  onLogin: () => void;
};

export function LoginPage({ onLogin }: LoginPageProps): JSX.Element {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const navigate = useNavigate();
  const { login } = useAuth();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    if (!email || !password) {
      setError('Email and password are required');
      return;
    }

    setLoading(true);
    try {
      const response = await fetch('http://localhost:8080/', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          query: `
            mutation LoginUser($data: LoginInput!) {
              login(data: $data) {
                id
                name
                email
                role
              }
            }
          `,
          variables: {
            data: {
              email,
              password,
            },
          },
        }),
      });

      const result = await response.json();

      if (result.errors) {
        setError(result.errors[0].message);
        setLoading(false);
        return;
      }

      if (result.data) {
        // Use auth context to login
        const user = result.data.login;
        login(user);
        console.log('Login successful:', user);
        navigate(user.role === 'ARTIST' ? '/artist' : '/collector');
      }
    } catch (err) {
      setError("Server error");
    } finally {
      setLoading(false);
    }
  };

  onLogin();

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

        {error && (
          <Box sx={{ color: '#ff6b6b', marginBottom: '16px', padding: '10px', backgroundColor: 'rgba(255, 107, 107, 0.1)', borderRadius: '4px' }}>
            {error}
          </Box>
        )}

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
        component={Link}      
          to="/createAccount"
          variant="contained"
          fullWidth
          className="create-account"
        >
        Create Account
        </Button>

        <Button type="submit" variant="contained" fullWidth className="login-button" disabled={loading}>
          {loading ? 'Logging in...' : 'Login'}
        </Button>
      </Box>
    </Box>
  );
}
