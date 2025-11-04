import React from 'react';
import {
    Card,
    CardMedia,
    CardContent,
    Avatar,
    Typography,
    Box,
} from '@mui/material';
import type { NFT } from '../types/nft';
import './NFTCard.css';

type NFTCardProps = {
    nft: NFT;
    onClick?: (id: string) => void;
};

// TODO
// The bg color for the icon doesnt work, need to fix that bug
// Also still need to add the info container
// Fix font family for price, cant get space mono to work!!
// Also add highest price to right of the price

export const NFTCard: React.FC<NFTCardProps> = ({ nft, onClick }) => {
    return (
        <Card
            className="nft-card"
            onClick={() => onClick?.(nft.id)}
            sx={{ borderRadius: '20px', overflow: 'hidden' }}
        >
            <CardMedia
                component="img"
                image={nft.imageUrl}
                alt={nft.name}
                className="nft-image"
            />

            <CardContent className="nft-card-content">
                <Typography variant="h5" className="nft-name">
                    {nft.name}
                </Typography>

                <Box className="nft-creator">
                    <Avatar
                        src={nft.creatorAvatarUrl}
                        alt={nft.creatorName}
                        className="nft-avatar"
                    />
                    <Typography variant="body2" className="nft-creator-name">
                        {nft.creatorName}
                    </Typography>
                </Box>

                <Box className="nft-price">
                    <Typography variant="body2" className="nft-price-label">
                        Value
                    </Typography>
                    <Typography variant="body1" className="nft-price-value">
                        {nft.price}
                    </Typography>
                </Box>
            </CardContent>
        </Card>
    );
};
