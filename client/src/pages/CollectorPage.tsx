import React, { useState, JSX } from 'react';
import {
  Box,
  Typography,
  Button,
  Avatar,
  Tabs,
  Tab,
} from '@mui/material';
import { Link } from 'react-router-dom';
import { NFTCard } from '../components/NFTCard';
import type { NFT } from '../types/nft';
import './CollectorPage.css';

export function CollectorPage(): JSX.Element {
  const [activeTab, setActiveTab] = useState(0);

  const handleTabChange = (event: React.SyntheticEvent, newValue: number) => {
    setActiveTab(newValue);
  };

  // Sample NFT data for the grid
  const sampleNFTs: NFT[] = [
    {
      id: '1',
      name: 'Codeface',
      imageUrl: '/bored-ape.png',
      creatorAvatarUrl: '/avatar.png',
      creatorName: 'TheBuyer',
      price: '1.63 ETH',
    },
    {
      id: '2',
      name: 'Neonhawk',
      imageUrl: '/bored-ape.png',
      creatorAvatarUrl: '/avatar.png',
      creatorName: 'TheBuyer',
      price: '0.33 mETH',
    },
    {
      id: '3',
      name: 'ArtFowl',
      imageUrl: '/bored-ape.png',
      creatorAvatarUrl: '/avatar.png',
      creatorName: 'TheBuyer',
      price: '1.63 ETH',
    },
    {
      id: '4',
      name: 'HatHack',
      imageUrl: '/bored-ape.png',
      creatorAvatarUrl: '/avatar.png',
      creatorName: 'TheBuyer',
      price: '0.33 mETH',
    },
    {
      id: '5',
      name: 'CyberGrim',
      imageUrl: '/bored-ape.png',
      creatorAvatarUrl: '/avatar.png',
      creatorName: 'TheBuyer',
      price: '1.63 ETH',
    },
    {
      id: '6',
      name: 'AetherElf',
      imageUrl: '/bored-ape.png',
      creatorAvatarUrl: '/avatar.png',
      creatorName: 'TheBuyer',
      price: '0.33 mETH',
    },
    {
      id: '7',
      name: 'Solar Drift',
      imageUrl: '/bored-ape.png',
      creatorAvatarUrl: '/avatar.png',
      creatorName: 'TheBuyer',
      price: '1.63 ETH',
    },
    {
      id: '8',
      name: 'Auralyn',
      imageUrl: '/bored-ape.png',
      creatorAvatarUrl: '/avatar.png',
      creatorName: 'TheBuyer',
      price: '0.33 mETH',
    },
    {
      id: '9',
      name: 'Pixel Purr',
      imageUrl: '/bored-ape.png',
      creatorAvatarUrl: '/avatar.png',
      creatorName: 'TheBuyer',
      price: '1.63 ETH',
    },
  ];

  return (
    <Box className="collector-page">
      {/* Profile Section */}
      <Box className="collector-header">
        <Box
          className="collector-banner"
          sx={{
            backgroundImage: 'url(/bored-ape.png)',
            backgroundSize: 'cover',
            backgroundPosition: 'center',
          }}
        />

        <Box className="collector-info-container">
          <Avatar
            src="/avatar.png"
            alt="TheBuyer"
            className="collector-avatar"
            sx={{ width: 120, height: 120 }}
          />

          <Box className="collector-details">
            <Typography variant="h3" className="collector-name">
              TheBuyer
            </Typography>

            <Box className="collector-stats">
              <Box className="stat">
                <Typography variant="h6" className="stat-value">
                  250k+
                </Typography>
                <Typography variant="body2" className="stat-label">
                  Volume
                </Typography>
              </Box>
              <Box className="stat">
                <Typography variant="h6" className="stat-value">
                  50+
                </Typography>
                <Typography variant="body2" className="stat-label">
                  NFTs Bought
                </Typography>
              </Box>
              <Box className="stat">
                <Typography variant="h6" className="stat-value">
                  3000+
                </Typography>
                <Typography variant="body2" className="stat-label">
                  Followers
                </Typography>
              </Box>
            </Box>

            <Typography variant="body2" className="collector-bio">
              <strong>Bio</strong>
              <br />
              Buyer Bio
            </Typography>
          </Box>

          <Box className="collector-actions">
            <Button
              component={Link}
              to="/editprofile"
              variant="contained"
              className="edit-button"
            >
              Edit Profile
            </Button>
          </Box>
        </Box>
      </Box>

      {/* Tabs Section */}
      <Box className="collector-tabs-container">
        <Tabs
          value={activeTab}
          onChange={handleTabChange}
          className="collector-tabs"
        >
          <Tab label="Owned" />
          <Tab label="Watching" />
          <Tab label="Collection" />
        </Tabs>
      </Box>

      {/* NFT Grid */}
      <Box className="collector-nfts">
        <Box className="nft-grid">
          {sampleNFTs.map((nft) => (
            <Box key={nft.id} className="nft-grid-item">
              <NFTCard nft={nft} />
            </Box>
          ))}
        </Box>
      </Box>
    </Box>
  );
}
