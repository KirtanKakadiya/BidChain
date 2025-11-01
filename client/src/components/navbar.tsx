import React, { JSX } from 'react';
import { PrimaryButton } from './button';
import PersonIcon from '@mui/icons-material/Person';
import './navbar.css';

interface NavBarItemProps {
  readonly text: string;
  readonly path?: string;
  readonly onClick?: () => void;
  readonly icon?: JSX.Element;
}

const NAVBAR_ITEMS: readonly NavBarItemProps[] = [
  { text: 'Marketplace', path: '#' },
  { text: 'Connect a wallet', path: '#' },
];

export function NavBar(): JSX.Element {
  return (
    <header className="navbar">
      <div className="navbar-container">
        <div className="navbar-left">
          <div className="navbar-logo">
            <img
              src="/bidchain-logo.svg"
              alt="BidChain logo"
              className="navbar-logo"
            />
          </div>
          <span className="navbar-brand">BidChain</span>
        </div>

        <div className="navbar-right">
          <nav className="navbar-links">
            <a href="#">Marketplace</a>
            <a href="#">Connect a wallet</a>
          </nav>

          <PrimaryButton text="Login" icon={PersonIcon} />
        </div>
      </div>
    </header>
  );
}
