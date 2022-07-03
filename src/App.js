import NavBar from './components/NavBar/NavBar';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Box from '@mui/material/Box';

import HomePage from './pages/HomePage/HomePage';
import DetailPage from './pages/DetailPage/DetailPage';

function App() {
  return (
    <BrowserRouter>
        <NavBar />
        <Box component="main" sx={{ paddingBottom: 5, paddingTop: 15, px: 10 }}>
          <Routes>
            <Route path="/" element={<HomePage />} />
            {/* <Route path="collection" element={<CollectionPage />} /> */}
            <Route path="detail/:id" element={<DetailPage />} />
          </Routes>
        </Box>
    </BrowserRouter>
  );
}

export default App;
