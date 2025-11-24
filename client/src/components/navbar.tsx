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

type NavBarProps = {
    isLoggedIn: boolean;
    onSignOut: () => void;
};

export function NavBar({ isLoggedIn, onSignOut }: NavBarProps): JSX.Element {
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

                    {isLoggedIn ? (
                        <>
                            <Link to="/artist">
                                <IconButton className="user-icon-button">
                                    <PersonIcon />
                                </IconButton>
                            </Link>

                            <PrimaryButton
                                text="Sign out"
                                ariaLabel="Sign out"
                                onClick={onSignOut}
                            />
                        </>
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
