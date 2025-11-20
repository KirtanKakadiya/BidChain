import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Layout } from './pages/layout';
import { HomePage } from './pages/HomePage';
import { MarketplacePage } from './pages/MarketplacePage';
import { LoginPage } from './pages/LoginPage';
import { CreateAccountPage } from './pages/CreateAccountPage';
import { ArtistPage } from './pages/ArtistPage';
import { EditProfilePage } from './pages/EditProfilePage';
import { CreateNFTPage } from './pages/CreateNFTPage';

function App() {
    return (
        <Router>
            <Routes>
                <Route path="/" element={<Layout />}>
                    <Route index element={<HomePage />} />
                    <Route path="/marketplace" element={<MarketplacePage />} />
                    <Route path="/login" element={<LoginPage />} />
                    <Route path="/createAccount" element={<CreateAccountPage />} />
                    <Route path="/artist" element={<ArtistPage />} />
                    <Route path="/editprofile" element={<EditProfilePage />} />
                    <Route path="/createNft" element={<CreateNFTPage />} />
                </Route>
            </Routes>
        </Router>
    );
}

export default App;
