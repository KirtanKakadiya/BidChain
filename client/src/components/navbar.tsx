import React, { JSX, useState } from 'react';
import { PrimaryButton } from './button';
import PersonIcon from '@mui/icons-material/Person';
import { IconButton } from '@mui/material';
import './navbar.css';
import { Link } from 'react-router-dom';

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
    const [isLoggedIn, setIsLoggedIn] = useState(false); // Replace with actual auth state

    return (
        <header className="navbar">
            <div className="navbar-container">
                <div className="navbar-left">
                    <div className="navbar-logo">
                        <Link to="/">
                            <img
                                src="/bidchain-logo.svg"
                                alt="BidChain logo"
                                className="navbar-logo"
                            />
                        </Link>
                    </div>
                    <span className="navbar-brand">BidChain</span>
                </div>

                <div className="navbar-right">
                    <nav className="navbar-links">
                        <Link to="/marketplace">Marketplace</Link>
                        <Link to="#">Connect a wallet</Link>
                    </nav>

                    {isLoggedIn ? (
                        <Link to="/artist">
                            <IconButton className="user-icon-button">
                                <PersonIcon />
                            </IconButton>
                        </Link>
                    ) : (
                        <Link to="/login">
                            <PrimaryButton text="Login" icon={PersonIcon} />
                        </Link>
                    )}
                </div>
            </div>
        </header>
    );
}
