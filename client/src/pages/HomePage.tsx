import React, { JSX } from 'react';
import './HomePage.css';
import { NFTCard } from '../components/NFTCard';
import { PrimaryButton } from '../components/button';
import RocketLaunchIcon from '@mui/icons-material/RocketLaunch';
import { CATEGORIES } from '../data/category';
import { CategoryCard } from '../components/CategoryCard';

const sampleNFTCard = {
  id: '1',
  name: 'Bored Ape',
  imageUrl: '/bored-ape.png',
  creatorName: 'Test Creator',
  creatorAvatarUrl: '/avatar.png',
  creator: {
    id: '1',
    name: 'Animakid',
  },
};

export function HomePage(): JSX.Element {

    
  return (
    <main className="homepage">
      <section className="hero">
        <div className="hero-left">
          <h1 className="hero-title">
            Discover <br />
            Digital Art & <br />
            Collect NFTs
          </h1>

          <p className="hero-sub">
            BidChain — A transparent, NFT auction platform designed to deliver
            live bidding excitement and powerful tools for creators and
            collectors alike.
          </p>

          <div className="get-started-btn">
            <PrimaryButton text="Get Started" icon={RocketLaunchIcon} />
          </div>

          <div className="stats">
            <div className="stat">
              <div className="stat-num">240k+</div>
              <div className="stat-label">Total Sale</div>
            </div>
            <div className="stat">
              <div className="stat-num">100k+</div>
              <div className="stat-label">Auctions</div>
            </div>
            <div className="stat">
              <div className="stat-num">240k+</div>
              <div className="stat-label">Artists</div>
            </div>
          </div>
        </div>
        <div className="hero-right">
          <div className="image-container">
            <NFTCard nft={sampleNFTCard} />
          </div>
        </div>
      </section>
      <section className="categories">
        <div className="categories-head">
          <h2>Browse by Category</h2>
          <p className="categories-sub">Find art that matches your vibe.</p>
        </div>

        <div className="categories-grid">
          {CATEGORIES.map((cat) => (
            <CategoryCard key={cat.id} category={cat} />
          ))}
        </div>
      </section>
    </main>
  );
}
