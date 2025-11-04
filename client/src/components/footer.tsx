import React, { JSX } from 'react';
import './footer.css';

export function Footer(): JSX.Element {
    return (
        <footer className="footer">
            <div className="footer-left">
                <img
                    src="/bidchain-logo.svg"
                    alt="BidChain logo"
                    className="footer-logo"
                />
            </div>

            <div className="footer-links">
                <p>Marketplace</p>
                <p>Connect a wallet</p>
            </div>
        </footer>
    );
}
