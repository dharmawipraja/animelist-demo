import NavBar from './components/NavBar/NavBar';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Box from '@mui/material/Box';

import HomePage from './pages/HomePage/HomePage';
import DetailPage from './pages/DetailPage/DetailPage';
import CollectionsPage from './pages/CollectionsPage/CollectionsPage';
import CollectionDetailPage from './pages/CollectionDetailPage/CollectionDetailPage';

function App() {
  return (
    <BrowserRouter>
        <NavBar />
        <Box component="main" sx={{ pb: 5, pt: 15, px: 10 }}>
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="collections" element={<CollectionsPage />} />
            <Route path="detail/:id" element={<DetailPage />} />
            <Route path="collection/:name" element={<CollectionDetailPage />} />
          </Routes>
        </Box>
    </BrowserRouter>
  );
}

export default App;
