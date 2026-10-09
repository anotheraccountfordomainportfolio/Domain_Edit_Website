/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
*/
import React, { useEffect, useState } from 'react';
import { Routes, Route, useLocation } from 'react-router-dom';
import { Toaster } from 'sonner';
import { DinoGame } from './ui/DinoGame';
import LoadingScreen from './ui/LoadingScreen';
import { AnimatePresence, motion } from 'framer-motion';

// Import all pages synchronously
import HomePage from './views/HomePage';
import SkillPage from './views/SkillPage';
import AboutPage from './views/AboutPage';
import ContactPage from './views/ContactPage';
import PortfolioPage from './views/PortfolioPage';
import ReviewsPage from './views/ReviewsPage';
import NotFoundPage from './views/NotFoundPage';

const App: React.FC = () => {
  const location = useLocation();
  const [isOffline, setIsOffline] = useState(!navigator.onLine);
  const [isLoading, setIsLoading] = useState(false);
  const [loadingTitle, setLoadingTitle] = useState('DOMAIN EDITS');

  useEffect(() => {
    window.scrollTo(0, 0);
    const titleMap: Record<string, string> = {
      '/': 'HOME',
      '/portfolio': 'PORTFOLIO',
      '/skill': 'SKILLS',
      '/about': 'ABOUT',
      '/contact': 'CONTACT',
      '/reviews': 'REVIEWS',
      '/404': '404 NOT FOUND',
    };
    const title = titleMap[location.pathname] || 'DOMAIN EDITS';
    setLoadingTitle(title);
    setIsLoading(true);

    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 600);

    return () => clearTimeout(timer);
  }, [location.pathname]);

  useEffect(() => {
    const handleOnline = () => setIsOffline(false);
    const handleOffline = () => setIsOffline(true);

    window.addEventListener('online', handleOnline);
    window.addEventListener('offline', handleOffline);

    return () => {
      window.removeEventListener('online', handleOnline);
      window.removeEventListener('offline', handleOffline);
    };
  }, []);

  if (isOffline) {
    return (
      <>
        <Toaster position="top-center" richColors />
        <DinoGame isOffline={true} />
      </>
    );
  }

  return (
    <>
      <Toaster position="top-center" richColors />
      
      <AnimatePresence>
        {isLoading && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-0 z-[99999]"
          >
            <LoadingScreen title={loadingTitle} />
          </motion.div>
        )}
      </AnimatePresence>

      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/portfolio" element={<PortfolioPage />} />
        <Route path="/skill" element={<SkillPage />} />
        <Route path="/about" element={<AboutPage />} />
        <Route path="/contact" element={<ContactPage />} />
        <Route path="/reviews" element={<ReviewsPage />} />
        <Route path="/404" element={<NotFoundPage />} />
        <Route path="*" element={<NotFoundPage />} />
      </Routes>
    </>
  );
};

export default App;
