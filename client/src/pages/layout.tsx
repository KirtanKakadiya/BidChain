import React, { JSX } from 'react';
import { NavBar } from '../components/navbar';
import { Outlet } from 'react-router-dom';
import { Footer } from '../components/footer';

type LayoutProps = {
  isLoggedIn: boolean;
  onSignOut: () => void;
};

export function Layout({ isLoggedIn, onSignOut }: LayoutProps): JSX.Element {
  return (
    <div>
      <NavBar isLoggedIn={isLoggedIn} onSignOut={onSignOut} />
      <Outlet />
      <Footer />
    </div>
  );
}