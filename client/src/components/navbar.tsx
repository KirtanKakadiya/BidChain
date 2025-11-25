import React, { JSX } from 'react';
import { PrimaryButton } from './button';
import PersonIcon from '@mui/icons-material/Person';
import { IconButton } from '@mui/material';
import './navbar.css';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

export function NavBar(): JSX.Element {
    const { user, isLoggedIn, logout } = useAuth();
    const navigate = useNavigate();

    const handleProfileClick = () => {
        if (!user) return;
        if (user.role === "ARTIST") navigate("/artist");
        if (user.role === "COLLECTOR") navigate("/collector");
    };

    return (
        <header className="navbar">
            <div className="navbar-container">
                <div className="navbar-left">
                    <Link to="/">
                        <img src="/bidchain-logo.svg" alt="BidChain logo" className="navbar-logo" />
                    </Link>
                    <span className="navbar-brand">BidChain</span>
                </div>

                <div className="navbar-right">
                    <nav className="navbar-links">
                        <Link to="/marketplace">Marketplace</Link>
                        <Link to="#">Connect a wallet</Link>
                    </nav>

                    {isLoggedIn ? (
                        <>
                            <IconButton className="user-icon-button" onClick={handleProfileClick}>
                                <PersonIcon />
                            </IconButton>

                            <PrimaryButton
                                text="Sign out"
                                ariaLabel="Sign out"
                                onClick={logout}
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
