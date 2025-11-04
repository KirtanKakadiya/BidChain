import React, { JSX } from 'react';
import './MarketplacePage.css';
import { TextField, InputAdornment, IconButton } from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import { NFTCard } from '../components/NFTCard';
import type { NFT } from '../types/nft';
import { useState } from 'react';

const sampleNFTCard: NFT = {
    id: '1',
    name: 'Bored Ape',
    imageUrl: '/bored-ape.png',
    creatorName: 'Test Creator',
    creatorAvatarUrl: '/avatar.png',
    price: '1.83 ETH',
};

/** TODO
 * Add proper fetching from api's , remove sample nft data
 * Add filters for the cards (price, data added ....)
 * fix css make it more responsive...
 */
export function MarketplacePage(): JSX.Element {
    const [searchText, setSearchText] = useState('');

    const generateNFTs = (count: number): NFT[] =>
        Array.from({ length: count }, (_, i) => ({
            ...sampleNFTCard,
            id: String(i + 1),
            name: `${sampleNFTCard.name} #${i + 1}`,
            price: `${(1.83 + i * 0.05).toFixed(2)} ETH`,
        }));

    const nfts = generateNFTs(12);
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
