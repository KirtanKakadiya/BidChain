import React, { useState, JSX, useEffect } from 'react';
import { Box, Typography, Button, Avatar, Tabs, Tab } from '@mui/material';
import { Link } from 'react-router-dom';
import { NFTCard } from '../components/NFTCard';
import type { NFT } from '../types/nft';
import AddIcon from '@mui/icons-material/Add';
import './ArtistPage.css';
import { useAuth } from '../context/AuthContext';
import { GRAPHQL_ENDPOINT } from '../config/env';
import { Email } from '@mui/icons-material';
import { FETCH_USER } from '../graphql/queries/userQueries';

export function ArtistPage(): JSX.Element {
    const { user } = useAuth(); // get current logged-in user
    const [activeTab, setActiveTab] = useState(0);
    const [userInfo, setUserInfo] = useState<any>(null);
    const handleTabChange = (event: React.SyntheticEvent, newValue: number) => {
        setActiveTab(newValue);
    };

    useEffect(() => {
        async function fetchUser() {
            try {
                const response = await fetch(GRAPHQL_ENDPOINT, {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({
                        query: FETCH_USER,
                        variables: {
                            id: Number(user?.id),
                        },
                    }),
                });
                console.log(response);
                const result = await response.json();
                setUserInfo(result.data.user);
            } catch (error) {
                console.error('Failed to fetch user:', error);
            }
        }
        if (user?.email) fetchUser();
    }, [user]);   



    return (
        <Box className="artist-page">
            {/* Profile Section */}
            <Box className="artist-header">
                <Box
                    className="artist-banner"
                    sx={{
                        backgroundImage: `url(${userInfo?.bannerPicture})`,
                        backgroundSize: 'cover',
                        backgroundPosition: 'center',
                    }}
                />

                <Box className="artist-info-container">
                    <Avatar
                        src={userInfo?.avatarPicture}
                        alt="TheArtist"
                        className="artist-avatar"
                        sx={{ width: 120, height: 120 }}
                    />

                    <Box className="artist-details">
                        <Typography variant="h3" className="artist-name">
                            {userInfo?.name || 'Artist Name'}
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
                            {/* <Box className="stat">
                                <Typography variant="h6" className="stat-value">
                                    3000+
                                </Typography>
                                <Typography
                                    variant="body2"
                                    className="stat-label"
                                >
                                    Followers
                                </Typography>
                            </Box> */}
                        </Box>

                        <Typography variant="body2" className="artist-bio">
                            <strong>Bio</strong>
                            <br />
                            {userInfo?.description || ''}
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

            {/* NFT Grid
            <Box className="artist-nfts">
                <Box className="nft-grid">
                    {sampleNFTs.map((nft) => (
                        <Box key={nft.id} className="nft-grid-item">
                            <NFTCard nft={nft} />
                        </Box>
                    ))}
                </Box>
            </Box> */}
        </Box>
    );
}
