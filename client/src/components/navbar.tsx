import React, { JSX } from "react";
import { PrimaryButton } from "./button";
import "./navbar.css";

interface NavBarItemProps {
  readonly text: string;
  readonly path?: string;
  readonly onClick?: () => void;
  readonly icon?: JSX.Element;
}

const NAVBAR_ITEMS: readonly NavBarItemProps[] = [
  { text: "Marketplace", path: "#" },
  { text: "Connect a wallet", path: "#" },
];

export function NavBar(): JSX.Element {
  return (
    <header className="navbar">
        <div className="navbar-container">
            <div className="navbar-left">
            <div className="navbar-logo">
                <img src="/bidchain-logo.svg" alt="BidChain logo" className="navbar-logo" />
            </div>
            <span className="navbar-brand">BidChain</span>
            </div>

            <div className="navbar-right">
            <nav className="navbar-links">
                <a href="#">Marketplace</a>
                <a href="#">Connect a wallet</a>
            </nav>

            <PrimaryButton
                text="Login"
                icon={
                <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="18"
                    height="18"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                >
                    <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
                    <circle cx="12" cy="7" r="4" />
                </svg>
                }
            />
            </div>
        </div>
    </header>

  );
}
