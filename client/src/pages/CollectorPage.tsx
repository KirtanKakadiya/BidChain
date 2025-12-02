import React, { useState, JSX, useEffect} from 'react';
import { Box, Typography, Button, Avatar, Tabs, Tab } from '@mui/material';
import { Link } from 'react-router-dom';
import { NFTCard } from '../components/NFTCard';
import type { NFT } from '../types/nft';
import './CollectorPage.css';
import { useAuth } from '../context/AuthContext';
import { GRAPHQL_ENDPOINT } from '../config/env';


export function CollectorPage(): JSX.Element {
        const { user } = useAuth(); // get current logged-in user
        const [activeTab, setActiveTab] = useState(0);
        const [userInfo, setUserInfo] = useState<any>(null);
        const handleTabChange = (event: React.SyntheticEvent, newValue: number) => {
            setActiveTab(newValue);
        };
    
        useEffect(() => {
            async function fetchUser() {
                const userEmail = user?.email ?? '0';
                try {
                    const response = await fetch(GRAPHQL_ENDPOINT, {
                        method: 'POST',
                        headers: {
                            'Content-Type': 'application/json',
                        },
                        body: JSON.stringify({
                            query: `
                            query user($email: String!) {
                                 user(email: $email) {
                                    id
                                    name
                                    email
                                    description
                                    avatarPicture
                                    bannerPicture
                                }
                            }
                            `,
                            variables: {
                                email: userEmail,
                            },
                        }),
                    });
    
                    const result = await response.json();
                    setUserInfo(result.data.user);
                } catch (error) {
                    console.error('Failed to fetch user:', error);
                }
            }
            if (user?.email) fetchUser();
        }, [user]);   
    

    return (
        <Box className="collector-page">
            {/* Profile Section */}
            <Box className="collector-header">
                <Box
                    className="collector-banner"
                    sx={{
                        backgroundImage: `url(${userInfo?.bannerPicture})`,
                        backgroundSize: 'cover',
                        backgroundPosition: 'center',
                    }}
                />

                <Box className="collector-info-container">
                    <Avatar
                        src={userInfo?.avatarPicture}
                        alt="TheBuyer"
                        className="collector-avatar"
                        sx={{ width: 120, height: 120 }}
                    />

                    <Box className="collector-details">
                        <Typography variant="h3" className="collector-name">
                            {userInfo?.name || 'Collector Name'}
                        </Typography>

                        {/* <Box className="collector-stats">
                            <Box className="stat">
                                <Typography variant="h6" className="stat-value">
                                    250k+
                                </Typography>
                                <Typography
                                    variant="body2"
                                    className="stat-label"
                                >
                                    Volume
                                </Typography>
                            </Box>
                            <Box className="stat">
                                <Typography variant="h6" className="stat-value">
                                    50+
                                </Typography>
                                <Typography
                                    variant="body2"
                                    className="stat-label"
                                >
                                    NFTs Bought
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
                        </Box> */}

                        <Typography variant="body2" className="collector-bio">
                            <strong>Bio</strong>
                            <br />
                            {userInfo?.description}
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

            {/* NFT Grid
            <Box className="collector-nfts">
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
