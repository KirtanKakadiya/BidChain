import React, { useState, JSX, useEffect } from 'react';
import {
    Box,
    Typography,
    Button,
    Avatar,
    ThemeProvider,
    CircularProgress,
} from '@mui/material';
import { Link, useParams } from 'react-router-dom';
import { NFTCard } from '../components/NFTCard';
import type { NFT } from '../types/nft';
import type { Auction } from '../types/auction';
import AddIcon from '@mui/icons-material/Add';
import { createTheme } from '@mui/material/styles';
import './NFTPage.css';
import { ArtistLink } from '../components/artistLink';
import { getAuctionByNftId } from '../graphql/queries/auctionQueries';

async function fetchAuction(id: string): Promise<Auction> {
    const response = await fetch('http://localhost:8080/', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
            query: getAuctionByNftId,
            variables: { nftId: Number.parseInt(id) },
        }),
    });

    const json = await response.json();
    if (!response.ok) {
        throw new Error(`Network error: ${response.status}`);
    }

    if (json.errors && json.errors.length > 0) {
        console.error('GraphQL errors:', json.errors);
        throw new Error('GraphQL responded with errors');
    }

    if (!json.data?.auctionByNftId) {
        console.error('No auction field in GraphQL response data');
        throw new Error('GraphQL could not find auction');
    }

    return json.data.auctionByNftId;
}

export function NFTPage(): JSX.Element {
    const { id } = useParams<{ id: string }>(); // Get ID from URL
    const [auction, setAuction] = useState<Auction | null>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        async function loadAuction() {
            if (!id) return;
            try {
                setLoading(true);
                const fetched = await fetchAuction(id);
                setAuction(fetched);
            } catch (e) {
                setError(e instanceof Error ? e.message : 'Failed to load NFT');
                console.log(e);
            } finally {
                setLoading(false);
            }
        }

        if (id) {
            loadAuction();
        }
    }, [id]);

    if (loading) {
        return (
            <Box
                display="flex"
                justifyContent="center"
                alignItems="center"
                minHeight="400px"
            >
                <CircularProgress />
            </Box>
        );
    }

    if (error || !auction) {
        return (
            <Box textAlign="center" py={4}>
                <Typography color="error">
                    {error || 'NFT not found'}
                </Typography>
            </Box>
        );
    }

    // Set global font for typography elements
    const theme = createTheme({
        typography: {
            fontFamily: '"Work Sans", "Space Mono", sans-serif',
        },
    });

    return (
        <ThemeProvider theme={theme}>
            <Box className="nft-page" sx={{ fontFamily: 'Work Sans' }}>
                <Box
                    className="nft-banner"
                    sx={{
                        backgroundImage: 'url(/nft-placeholder.png)',
                        backgroundSize: 'cover',
                        backgroundPosition: 'center',
                    }}
                ></Box>
                <Box className="info-and-bid-container">
                    <Box className="info-container">
                        <Typography
                            variant="h3"
                            className="nft-title"
                            fontWeight="600"
                        >
                            The Palm Tree
                        </Typography>
                        <Box className="artist-info-container">
                            <Typography
                                variant="body1"
                                className="artist-label"
                            >
                                Created By
                            </Typography>
                            {/* <ArtistLink></ArtistLink> */}
                        </Box>
                    </Box>
                    <Box className="bid-container">
                        <Box className="bid-card">
                            <Box className="countdown-container">
                                <Typography className="countdown-label">
                                    Auction ends in:
                                </Typography>
                                <Box className="timer-container">
                                    <Box className="hours-container">
                                        <Typography className="hours-number">
                                            59
                                        </Typography>
                                        <Typography className="hours-label">
                                            Hours
                                        </Typography>
                                    </Box>
                                    <Box className="minutes-container">
                                        <Typography className="minutes-number">
                                            59
                                        </Typography>
                                        <Typography className="minutes-label">
                                            Minutes
                                        </Typography>
                                    </Box>
                                    <Box className="seconds-container">
                                        <Typography className="seconds-number">
                                            59
                                        </Typography>
                                        <Typography className="seconds-label">
                                            Seconds
                                        </Typography>
                                    </Box>
                                </Box>
                            </Box>
                        </Box>
                    </Box>
                </Box>
            </Box>
        </ThemeProvider>
    );
}
