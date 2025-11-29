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
  const [auction, setAuction] = useState<Auction | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function loadAuctionData() {
      if (!id) return;

      try {
        setLoading(true);

        // Fetch both NFT and auction data
        const [nftData, auctionData] = await Promise.all([
          nftQueries.getNFTById(id),
          auctionQueries.getAuctionByNftId(id),
        ]);

        setNft(nftData);
        setAuction(auctionData);
      } catch (e) {
        setError(
          e instanceof Error ? e.message : 'Failed to load NFT & Auction data'
        );
        console.error(e);
      } finally {
        setLoading(false);
      }
    }

    if (id) {
      loadAuctionData();
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
            backgroundImage: `${nft.imageUrl || 'url(/nft-placeholder.png)'}`,
            backgroundSize: 'cover',
            backgroundPosition: 'center',
          }}
        ></Box>
        <Box className="info-and-bid-container">
          <Box className="info-container">
            <Typography variant="h3" className="nft-title" fontWeight="600">
              {nft.name}
            </Typography>
            <Typography variant="body1" className="artist-label">
              Created By
            </Typography>
            (// TODO: Fix this component, should pass a user object probably or
            get arist ID)
            <ArtistLink
              artistName={nft.creatorName}
              artistId={'CHANGE THIS'}
              avatarUrl={nft.creatorAvatarUrl}
            ></ArtistLink>
            <Typography className="description-label">Description</Typography>
            <Typography className="nft-description">
              (// TODO: Fix nft loading to include description even if there is
              nothing Description placeholder should fill with nft.description)
            </Typography>
            <Typography className="tags-label">Tags</Typography>
            <Box className="tags-container">(// TODO Make tags component)</Box>
          </Box>
          <Box className="bid-container">
            <Card
              className="bid-card"
              sx={{
                borderRadius: '20px',
                overflow: 'hidden',
                backgroundColor: '#2b2b2b',
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
                          >
                            {unit.value}
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
                  Current Bid: {auction.currentPrice} ETH
                </Typography>
                <CardActions className="bid-input-container">
                  <Box className="input-box-container">
                    <input></input>
                    <Typography className="bid-currency">ETH</Typography>
                  </Box>
                  <PrimaryButton
                    text="Place Bid"
                    ariaLabel="Place Bid"
                  ></PrimaryButton>
                </CardActions>
              </CardContent>
            </Card>
          </Box>
        </Box>
        (// TODO: Add "more from this artist" section) (// could probably reuse
        the same section from artist/marketplace) (// should consider converting
        that matrix of cards into a component)
      </Box>
    </ThemeProvider>
  );
}
