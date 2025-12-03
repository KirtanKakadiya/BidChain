import React, { useState, JSX, useEffect } from 'react';
import {
  Box,
  Typography,
  Button,
  Avatar,
  ThemeProvider,
  CircularProgress,
  Card,
  CardContent,
  CardActions,
  Chip,
} from '@mui/material';
import { Link, useParams } from 'react-router-dom';
import { NFTCard } from '../components/NFTCard';
import type { NFT } from '../types/nft';
import type { Auction } from '../types/auction';
import { createTheme } from '@mui/material/styles';
import './NFTPage.css';
import { ArtistLink } from '../components/artistLink';
import { nftQueries } from '../graphql/queries/nftQueries';
import { auctionQueries } from '../graphql/queries/auctionQueries';
import { PrimaryButton } from '../components/button';

export function NFTPage(): JSX.Element {
  const { id } = useParams<{ id: string }>();
  const [nft, setNft] = useState<NFT | null>(null);
  const [nftList, setNftList] = useState<NFT[]>([]);
  const [auction, setAuction] = useState<Auction | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function loadNFTPageData() {
      if (!id) return;

      try {
        setLoading(true);

        // First fetch the NFT data to get creator ID
        console.log('Fetching NFT with id:', id);
        const nftData = await nftQueries.getNFTById(id);
        console.log('NFT data received:', nftData);
        setNft(nftData);

        // Then fetch auction and other NFTs from the same creator in parallel
        console.log(
          'Fetching auction and creator NFTs for creator:',
          nftData.creator.id
        );
        const [auctionData, creatorNftList] = await Promise.all([
          auctionQueries.getAuctionByNftId(id).catch((err) => {
            console.error('Auction fetch error:', err);
            return null;
          }),
          nftQueries.getNFTsByCreatorId(nftData.creator.id).catch((err) => {
            console.error('Creator NFTs fetch error:', err);
            return [];
          }),
        ]);

        console.log('Auction data:', auctionData);
        console.log('All creator NFTs:', creatorNftList);

        setAuction(auctionData);

        // Filter out the current NFT from the list
        const filteredList = creatorNftList.filter((n) => n.id !== id);
        console.log('Filtered NFT list (excluding current):', filteredList);
        setNftList(filteredList);
      } catch (e) {
        console.error('Full error:', e);
        setError(
          e instanceof Error ? e.message : 'Failed to load NFT & Auction data'
        );
      } finally {
        setLoading(false);
      }
    }

    if (id) {
      loadNFTPageData();
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

  if (error || !nft || !auction) {
    return (
      <Box textAlign="center" py={4}>
        <Typography color="error">{error || 'NFT not found'}</Typography>
      </Box>
    );
  }

  // Set global font for typography elements
  const theme = createTheme({
    typography: {
      fontFamily: '"Work Sans", "Space Mono", sans-serif',
    },
  });

  // TODO Add logic here to update countdown timer
  const timeUnits = [
    { value: 59, label: 'Hours' },
    { value: 59, label: 'Minutes' },
    { value: 59, label: 'Seconds' },
  ];

  return (
    <ThemeProvider theme={theme}>
      <Box className="nft-page" sx={{ fontFamily: 'Work Sans' }}>
        <Box
          className="nft-banner"
          sx={{
            backgroundImage: `url(${nft.imageUrl || '/nft-placeholder.png'})`,
            backgroundSize: 'cover',
            backgroundPosition: 'center',
          }}
        ></Box>
        <Box className="info-and-bid-container">
          <Box className="info-container">
            <Typography variant="h3" className="nft-title" fontWeight="600">
              {nft.name}
            </Typography>
            <Box className="artist-info">
              <Typography
                variant="body1"
                className="artist-label"
                fontWeight="600"
                fontFamily="Space Mono"
                color="#3b3b3b"
                paddingBottom="8px"
              >
                Created By
              </Typography>
              <ArtistLink
                artistName={nft.creatorName}
                artistId={nft.creator.id}
                avatarUrl={nft.creatorAvatarUrl}
              />
            </Box>
            <Box className="description-container">
              <Typography
                className="description-label"
                sx={{
                  color: '#3b3b3b',
                  fontFamily: 'Space Mono',
                  fontWeight: '600',
                  paddingBottom: '8px',
                }}
              >
                Description
              </Typography>
              <Typography className="nft-description">
                {nft.description || 'No description provided'}
              </Typography>
            </Box>
            <Typography
              className="tags-label"
              sx={{
                color: '#3b3b3b',
                fontFamily: 'Space Mono',
                fontWeight: '600',
              }}
            >
              Tags
            </Typography>
            <Box
              className="tags-container"
              sx={{
                display: 'flex',
                gap: 1,
                flexWrap: 'wrap',
                mt: 1,
              }}
            >
              {nft.tags && nft.tags.length > 0 ? (
                nft.tags.map((tag, index) => (
                  <Chip
                    key={index}
                    label={tag}
                    sx={{
                      backgroundColor: '#3b3b3b',
                      color: 'white',
                      fontWeight: 600,
                    }}
                  />
                ))
              ) : (
                <Typography>No tags</Typography>
              )}
            </Box>
          </Box>
          <Box className="bid-container">
            <Card
              className="bid-card"
              sx={{
                borderRadius: '20px',
                overflow: 'hidden',
                backgroundColor: '#3b3b3b',
              }}
            >
              <CardContent className="card-content">
                <Box className="countdown-container">
                  <Typography className="countdown-label">
                    Auction ends in:
                  </Typography>

                  <Box className="timer-container">
                    {timeUnits.map((unit, index) => (
                      <React.Fragment key={unit.label}>
                        <Box
                          className={`${unit.label.toLowerCase()}-container`}
                        >
                          <Typography
                            className={`${unit.label.toLowerCase()}-number`}
                            fontSize="32px"
                          >
                            {unit.value}
                          </Typography>
                          <Typography
                            sx={{
                              fontFamily: 'Space Mono',
                              fontSize: '12px',
                              color: '#ffffff',
                              textTransform: 'capitalize',
                            }}
                          >
                            {unit.label}
                          </Typography>
                        </Box>
                        {index < timeUnits.length - 1 && (
                          <Typography className="time-separator">:</Typography>
                        )}
                      </React.Fragment>
                    ))}
                  </Box>
                </Box>

                <Typography className="current-bid">
                  Current Bid : {auction.currentPrice} ETH
                </Typography>

                <CardActions className="bid-input-container">
                  <Box className="input-box-container">
                    <input placeholder="Bid Amount" />
                    <Typography className="bid-currency">ETH</Typography>
                  </Box>
                  <Button className="place-bid-button">Place Bid</Button>
                </CardActions>
              </CardContent>
            </Card>
          </Box>
        </Box>

        {/* More from this artist section */}
        {nftList.length > 0 && (
          <Box className="more-nfts-container" sx={{ mt: 4 }}>
            <Typography
              variant="h4"
              sx={{
                mb: 3,
                fontWeight: 600,
                fontSize: { xs: '24px', sm: '28px', md: '34px' },
                color: '#ffffff',
              }}
            >
              More from {nft.creatorName}
            </Typography>
            <Box
              sx={{
                display: 'grid',
                gridTemplateColumns: {
                  xs: 'repeat(auto-fill, minmax(250px, 1fr))',
                  sm: 'repeat(auto-fill, minmax(280px, 1fr))',
                  md: 'repeat(auto-fill, minmax(300px, 1fr))',
                },
                gap: { xs: 2, sm: 2.5, md: 3 },
              }}
            >
              {nftList.map((nftItem) => (
                <NFTCard key={nftItem.id} nft={nftItem} />
              ))}
            </Box>
          </Box>
        )}
      </Box>
    </ThemeProvider>
  );
}
