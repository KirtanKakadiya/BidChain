import React, { JSX } from 'react';
import { PrimaryButton } from './button';
import PersonIcon from '@mui/icons-material/Person';
import { IconButton } from '@mui/material';
import './navbar.css';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

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
    const { user } = useAuth();
    const navigate = useNavigate();

    const handleProfileClick = () => {
        if (user?.role === 'ARTIST') {
            navigate('/artist');
        } else if (user?.role === 'COLLECTOR') {
            navigate('/collector');
        }
    };

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

                    <Link to="/login">
                        <PrimaryButton text="Login" icon={PersonIcon} />
                    </Link>
                </div>
            </div>
        </header>
    );
}
