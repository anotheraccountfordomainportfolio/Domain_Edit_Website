/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
*/
import React, { Suspense, lazy, useEffect } from 'react';
import { Routes, Route, useLocation } from 'react-router-dom';
import LoadingScreen from './ui/LoadingScreen';
import { Toaster } from 'sonner';

// Import HomePage synchronously for instant LCP and 0 CLS on initial load
import HomePage from './views/HomePage';

const SkillPage = lazy(() => import('./views/SkillPage'));
const AboutPage = lazy(() => import('./views/AboutPage'));
const ContactPage = lazy(() => import('./views/ContactPage'));
const PortfolioPage = lazy(() => import('./views/PortfolioPage'));

const App: React.FC = () => {
  const location = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
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
      <Suspense fallback={
        <div className="fixed inset-0 z-[100]">
          <LoadingScreen title={getPageTitle()} />
        </div>
      }>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/portfolio" element={<PortfolioPage />} />
          <Route path="/skill" element={<SkillPage />} />
          <Route path="/about" element={<AboutPage />} />
          <Route path="/contact" element={<ContactPage />} />
        </Routes>
      </Suspense>
    </>
  );
};

export default App;
