import React, { useState, JSX, useEffect} from 'react';
import { Box, Typography, Button, Avatar, Tabs, Tab, CircularProgress } from '@mui/material';
import { Link } from 'react-router-dom';
import { NFTCard } from '../components/NFTCard';
import type { NFT } from '../types/nft';
import './CollectorPage.css';
import { useAuth } from '../context/AuthContext';
import { GRAPHQL_ENDPOINT } from '../config/env';
import { FETCH_USER } from '../graphql/queries/userQueries';
import { useOwnedNfts } from '../hooks/useOwnedNfts';
import { toast } from 'react-toastify';
import { useBidNfts } from '../hooks/useWatchingNfts';


export function CollectorPage(): JSX.Element {
        const { user } = useAuth();
        const [activeTab, setActiveTab] = useState(0);
        const [userInfo, setUserInfo] = useState<any>(null);
        const handleTabChange = (event: React.SyntheticEvent, newValue: number) => {
            setActiveTab(newValue);
        };
    
        useEffect(() => {
            async function fetchUser() {
                console.log(user);
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
    
                    const result = await response.json();
                    console.log(result);
                    setUserInfo(result.data.user);
                } catch (error) {
                    toast.error(`Failed to fetch user: ${error}`);
                }
            }
            if (user?.email) fetchUser();
        }, [user]);   
    
    const { nfts: ownedNfts, loading: ownedLoading,error: ownedError,} = useOwnedNfts(Number(user?.id));
    const { nfts: watchingNfts,loading: watchingLoading,error: watchingError,} = useBidNfts(Number(user?.id));



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
                </Tabs>
            </Box>

            <Box className="collector-nfts">
                {activeTab === 0 && (
                <Box>
                    {ownedLoading ? (
                    <Box className="collector-loading">
                        <CircularProgress />
                    </Box>
                    ) : ownedNfts.length === 0 ? (
                    <Typography>
                        You don’t own any NFTs yet.
                    </Typography>
                    ) : (
                    <Box className="nft-grid">
                        {ownedNfts.map((nft: NFT) => (
                        <Box key={nft.id} className="nft-grid-item">
                            <NFTCard nft={nft} />
                        </Box>
                        ))}
                    </Box>
                    )}
                </Box>
                )}

                {activeTab === 1 && (
                <Box>
                    {watchingLoading ? (
                    <Box className="collector-loading">
                        <CircularProgress />
                    </Box>
                    ) : watchingNfts.length === 0 ? (
                    <Typography>
                        You’re not watching any auctions yet. Place a bid to start watching.
                    </Typography>
                    ) : (
                    <Box className="nft-grid">
                        {watchingNfts.map((nft: NFT) => (
                        <Box key={nft.id} className="nft-grid-item">
                            <NFTCard nft={nft} />
                        </Box>
                        ))}
                    </Box>
                    )}
                </Box>
                )}
            </Box>
        </Box>
    );
}
