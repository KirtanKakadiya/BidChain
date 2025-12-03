import React, { JSX, useEffect } from 'react';
import './MarketplacePage.css';
import { TextField, InputAdornment, IconButton } from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import { NFTCard } from '../components/NFTCard';
import type { NFT } from '../types/nft';
import { useState } from 'react';
import { nftQueries } from '../graphql/queries/nftQueries';

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
                const fetched = await nftQueries.getAllNFTs();
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
