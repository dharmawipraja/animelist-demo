import NavBar from './components/NavBar/NavBar';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Box from '@mui/material/Box';

import HomePage from './pages/HomePage/HomePage';
import DetailPage from './pages/DetailPage/DetailPage';
import CollectionsPage from './pages/CollectionsPage/CollectionsPage';
import CollectionDetailPage from './pages/CollectionDetailPage/CollectionDetailPage';
import { mq } from './utils/mediaQueriesUtils';
import { ToastProvider } from './context/Toast/ToastContext';

const AppRoutes = [
  { path: '/', element: <HomePage /> },
  { path: 'collections', element: <CollectionsPage /> },
  { path: 'detail/:id', element: <DetailPage /> },
  { path: 'collection/:name', element: <CollectionDetailPage /> }
];

function App() {
  return (
    <BrowserRouter>
      <NavBar />
      <ToastProvider>
        <Box component="main" sx={{ pb: 5, pt: 15, px: 10, [mq]: { px: 3 } }}>
          <Routes>
            {AppRoutes.map(({ path, element }) => (
              <Route path={path} element={element} />
            ))}
          </Routes>
        </Box>
      </ToastProvider>
    </BrowserRouter>
  );
}

export default App;
