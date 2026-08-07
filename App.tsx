/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
*/


import React, { useState, useEffect } from 'react';
import { Routes, Route, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import HomePage from './views/HomePage';
import SkillPage from './views/SkillPage';
import AboutPage from './views/AboutPage';
import ContactPage from './views/ContactPage';
import PortfolioPage from './views/PortfolioPage';
import LoadingScreen from './ui/LoadingScreen';
import { Toaster } from 'sonner';

const App: React.FC = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [isInitialLoad, setIsInitialLoad] = useState(true);
  const location = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
    setIsLoading(true);
    const timer = setTimeout(() => {
      setIsLoading(false);
      if (isInitialLoad) {
        setIsInitialLoad(false);
      }
    }, 1200);
    return () => clearTimeout(timer);
  }, [location.pathname]);

  const getPageTitle = () => {
    switch (location.pathname) {
      case '/': return 'HOME';
      case '/portfolio': return 'PORTFOLIO';
      case '/skill': return 'SKILLS';
      case '/about': return 'ABOUT';
      case '/contact': return 'CONTACT';
      default: return 'WELCOME TO DOMAIN EDITS';
    }
  };

  return (
    <>
      <Toaster position="top-center" richColors />
      <AnimatePresence mode="wait">
        {isLoading && (
          <motion.div
            key="loader"
            initial={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.1, ease: "easeInOut" }}
            className="fixed inset-0 z-[100]"
          >
            <LoadingScreen title={getPageTitle()} />
          </motion.div>
        )}
      </AnimatePresence>
      <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/portfolio" element={<PortfolioPage />} />
          <Route path="/skill" element={<SkillPage />} />
          <Route path="/about" element={<AboutPage />} />
          <Route path="/contact" element={<ContactPage />} />
        </Routes>
    </>
  );
};

export default App;