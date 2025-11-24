import { useState } from "react";
import React, { JSX, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Layout } from './pages/layout';
import { HomePage } from './pages/HomePage';
import { MarketplacePage } from './pages/MarketplacePage';
import { LoginPage } from './pages/LoginPage';
import { CreateAccountPage } from './pages/CreateAccountPage';
import { ArtistPage } from './pages/ArtistPage';
import { CollectorPage } from './pages/CollectorPage';
import { EditProfilePage } from './pages/EditProfilePage';
import { CreateNFTPage } from './pages/CreateNFTPage';
import { ProtectedRoute } from './components/ProtectedRoute';
import { AuthProvider } from './context/AuthContext';

function App(): JSX.Element {
    useEffect(() => {
        // Clear localStorage on app startup for testing
        localStorage.clear();
    }, []);
    const [isLoggedIn, setIsLoggedIn] = useState(false);

    const handleLogin = () => setIsLoggedIn(true);
    const handleSignOut = () => setIsLoggedIn(false);
    
    return (
        <AuthProvider>
            <>
                <Routes>
                    <Route path="/" element={<Layout isLoggedIn={isLoggedIn} onSignOut={handleSignOut} />}>
                        <Route index element={<HomePage />} />
                        <Route path="/marketplace" element={<MarketplacePage />} />
                        <Route path="/login" element={<LoginPage onLogin={handleLogin} />} />
                        <Route path="/createAccount" element={<CreateAccountPage />} />
                    <Route path="/artist" element={<ProtectedRoute requiredRole="ARTIST"><ArtistPage /></ProtectedRoute>} />
                    <Route path="/collector" element={<ProtectedRoute requiredRole="COLLECTOR"><CollectorPage /></ProtectedRoute>} />
                        <Route path="/editprofile" element={<ProtectedRoute><EditProfilePage /></ProtectedRoute>} />
                        <Route path="/createNft" element={<ProtectedRoute><CreateNFTPage /></ProtectedRoute>} />
                    </Route>
                </Routes>
            </>
        </AuthProvider>
    );
}

export default App;
