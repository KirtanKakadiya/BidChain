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

export const NFTCard: React.FC<NFTCardProps> = ({ nft, onClick }) => {
    return (
        <Card className="nft-card">
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
            </CardContent>
        </Card>
    );
};
