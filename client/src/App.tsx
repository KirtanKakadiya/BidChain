import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Layout } from './pages/layout';
import { HomePage } from './pages/HomePage';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<HomePage />} />
        </Route>
      </Routes>
    </Router>
  );
}

export default App;
