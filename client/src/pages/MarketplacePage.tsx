import React, { JSX, useEffect } from 'react';
import './MarketplacePage.css';
import { TextField, InputAdornment, IconButton } from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import { NFTCard } from '../components/NFTCard';
import type { NFT } from '../types/nft';
import { useState } from 'react';
import { getNFTs } from '../graphql/queries/nftQueries';

async function fetchNFTs(): Promise<NFT[]> {
    
    const response = await fetch('http://localhost:8080/', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
            query: getNFTs,
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

    if (!json.data || !json.data.nfts) {
        console.warn('No nfts field in GraphQL response data');
        return [];
    }

    const apiNfts = json.data.nfts as Array<{
        id: number | string;
        title: string;
        imageUrl: string;
        creator: { name: string; avatarPicture: string | null } | null;
        auction: { currentPrice: number } | null;
    }>;

    return apiNfts.map((nft) => ({
        id: String(nft.id),
        name: nft.title,
        imageUrl: nft.imageUrl,
        creatorName: nft.creator?.name ?? 'Unknown Creator',
        creatorAvatarUrl: nft.creator?.avatarPicture ?? '/avatar.png',
        price: nft.auction
            ? `${nft.auction.currentPrice.toFixed(2)} ETH`
            : 'Not for sale',
    }));

}

export function MarketplacePage(): JSX.Element {
    const [searchText, setSearchText] = useState('');
    const [nfts, setNfts] = useState<NFT[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
        
    useEffect(() => {
            async function loadNFTs() {
                try {
                    setLoading(true);
                    setError(null);
                    const fetched = await fetchNFTs();
                    setNfts(fetched);
                } catch (e) {
                    console.error(e);
                    setError('Failed to load NFTs');
                } finally {
                    setLoading(false);
                }
            }

            loadNFTs();
        }, []);

        const filteredNFTs = nfts.filter((nft) =>
        nft.name.toLowerCase().includes(searchText.toLowerCase())
    );

    return (
        <main className="marketplace-page">
            <section className="hero-marketplace">
                <div className="hero-top-marketplace">
                    <h1 className="hero-title-marketplace">
                        Browse Marketplace
                    </h1>
                    <p className="hero-sub-marketplace">
                        Browse through more than 50k NFTs on the NFT
                        Marketplace.
                    </p>

                    <div className="search-bar">
                        <TextField
                            placeholder="Search your favourite NFTs"
                            variant="outlined"
                            fullWidth
                            className="search-field"
                            sx={{
                                '& .MuiOutlinedInput-root': {
                                    backgroundColor: '#2f2f2f',
                                    color: '#fff',
                                    '&.Mui-focused fieldset': {
                                        borderColor: '#a259ff',
                                    },
                                },
                                '& .MuiSvgIcon-root': {
                                    color: '#cccccc',
                                },
                            }}
                            onChange={(e) => setSearchText(e.target.value)}
                            InputProps={{
                                endAdornment: (
                                    <InputAdornment position="end">
                                        <IconButton aria-label="search">
                                            <SearchIcon />
                                        </IconButton>
                                    </InputAdornment>
                                ),
                            }}
                        />
                    </div>
                </div>
            </section>
            <section className="nft-items">
                {filteredNFTs.map((nft) => (
                    <NFTCard key={nft.id} nft={nft} />
                ))}
            </section>
        </main>
    );
}
