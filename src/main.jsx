import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { ThemeProvider } from '@mui/material';

import { ScrollToTop } from './utils/hooks';
import { theme } from './utils/theme';

import AuthPage from './pages/AuthPage/AuthPage';
import OrdersPage from './pages/OrdersPage/OrdersPage';
import NavComponent from './components/NavComponent/NavigationComponent';
import AnalyticsPage from './pages/AnalyticsPage/AnalyticsPage';
import ArticlesPage from './pages/ArticlesPage/ArticlesPage';

import './index.css'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <ThemeProvider theme={theme}>
      <BrowserRouter basename='/admin_dashboard'>
        <ScrollToTop />
        <NavComponent />
        <Routes>
          <Route path='/' element={<OrdersPage />} />
          <Route path='/auth' element={<AuthPage />} />
          <Route path='/analytic' element={<AnalyticsPage />} />
          <Route path='/article' element={<ArticlesPage />} />
        </Routes>
      </BrowserRouter>
    </ThemeProvider>
  </StrictMode>,
)
