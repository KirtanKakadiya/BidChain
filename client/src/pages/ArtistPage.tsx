import React, { useState, JSX } from 'react';
import { Box, Typography, Button, Avatar, Tabs, Tab } from '@mui/material';
import { Link } from 'react-router-dom';
import { NFTCard } from '../components/NFTCard';
import type { NFT } from '../types/nft';
import AddIcon from '@mui/icons-material/Add';
import './ArtistPage.css';

export function ArtistPage(): JSX.Element {
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
            creatorName: 'TheArtist',
            price: '1.63 ETH',
        },
        {
            id: '2',
            name: 'ArtFowl',
            imageUrl: '/bored-ape.png',
            creatorAvatarUrl: '/avatar.png',
            creatorName: 'TheArtist',
            price: '1.63 ETH',
        },
        {
            id: '3',
            name: 'Neonhawk',
            imageUrl: '/bored-ape.png',
            creatorAvatarUrl: '/avatar.png',
            creatorName: 'TheArtist',
            price: '1.63 ETH',
        },
        {
            id: '4',
            name: 'HatHack',
            imageUrl: '/bored-ape.png',
            creatorAvatarUrl: '/avatar.png',
            creatorName: 'TheArtist',
            price: '1.63 ETH',
        },
        {
            id: '5',
            name: 'CyberGrim',
            imageUrl: '/bored-ape.png',
            creatorAvatarUrl: '/avatar.png',
            creatorName: 'TheArtist',
            price: '1.63 ETH',
        },
        {
            id: '6',
            name: 'AetherElf',
            imageUrl: '/bored-ape.png',
            creatorAvatarUrl: '/avatar.png',
            creatorName: 'TheArtist',
            price: '1.63 ETH',
        },
    ];

    return (
        <Box className="artist-page">
            {/* Profile Section */}
            <Box className="artist-header">
                <Box
                    className="artist-banner"
                    sx={{
                        backgroundImage: 'url(/bored-ape.png)',
                        backgroundSize: 'cover',
                        backgroundPosition: 'center',
                    }}
                />

                <Box className="artist-info-container">
                    <Avatar
                        src="/avatar.png"
                        alt="TheArtist"
                        className="artist-avatar"
                        sx={{ width: 120, height: 120 }}
                    />

                    <Box className="artist-details">
                        <Typography variant="h3" className="artist-name">
                            TheArtist
                        </Typography>

                        <Box className="artist-stats">
                            <Box className="stat">
                                <Typography variant="h6" className="stat-value">
                                    50+
                                </Typography>
                                <Typography
                                    variant="body2"
                                    className="stat-label"
                                >
                                    NFTs Sold
                                </Typography>
                            </Box>
                            <Box className="stat">
                                <Typography variant="h6" className="stat-value">
                                    3000+
                                </Typography>
                                <Typography
                                    variant="body2"
                                    className="stat-label"
                                >
                                    Followers
                                </Typography>
                            </Box>
                        </Box>

                        <Typography variant="body2" className="artist-bio">
                            <strong>Bio</strong>
                            <br />
                            The Internet's Friendliest Designer Kid.
                        </Typography>
                    </Box>

                    <Box className="artist-actions">
                        <Button
                            component={Link}
                            to="/createNft"
                            variant="contained"
                            startIcon={<AddIcon />}
                            className="plus-button"
                        >
                            Create
                        </Button>
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
            <Box className="artist-tabs-container">
                <Tabs
                    value={activeTab}
                    onChange={handleTabChange}
                    className="artist-tabs"
                >
                    <Tab label="Created" />
                    <Tab label="Owned" />
                    <Tab label="Collection" />
                </Tabs>
            </Box>

            {/* NFT Grid */}
            <Box className="artist-nfts">
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
