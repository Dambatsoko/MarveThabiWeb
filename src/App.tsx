import React, { useState, useEffect, Suspense, lazy } from 'react';
import { Header } from './components/Header';
import { Footer } from './components/Footer';
import { HomePage } from './components/HomePage';

// Code-split heavy page components to minimize initial parse time and improve perceived speed
const ServicesPage = lazy(() =>
  import('./components/ServicesPage').then((m) => ({ default: m.ServicesPage }))
);
const ServiceDetailPage = lazy(() =>
  import('./components/ServiceDetailPage').then((m) => ({ default: m.ServiceDetailPage }))
);
const IndustriesPage = lazy(() =>
  import('./components/IndustriesPage').then((m) => ({ default: m.IndustriesPage }))
);
const IndustryDetailPage = lazy(() =>
  import('./components/IndustryDetailPage').then((m) => ({ default: m.IndustryDetailPage }))
);
const AboutPage = lazy(() =>
  import('./components/AboutPage').then((m) => ({ default: m.AboutPage }))
);
const LeadershipPage = lazy(() =>
  import('./components/LeadershipPage').then((m) => ({ default: m.LeadershipPage }))
);
const ProcessPage = lazy(() =>
  import('./components/ProcessPage').then((m) => ({ default: m.ProcessPage }))
);
const ContactPage = lazy(() =>
  import('./components/ContactPage').then((m) => ({ default: m.ContactPage }))
);

const PageFallback: React.FC = () => (
  <div
    style={{
      minHeight: '60vh',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      gap: '16px',
      background: '#fff',
    }}
  >
    <div
      style={{
        width: '36px',
        height: '36px',
        border: '3px solid rgba(51, 102, 89, 0.15)',
        borderTopColor: '#336659',
        borderRadius: '50%',
        animation: 'spin 0.8s linear infinite',
      }}
    />
    <span
      className="num"
      style={{
        fontSize: '11px',
        letterSpacing: '0.15em',
        color: '#6e7e78',
        textTransform: 'uppercase',
      }}
    >
      Loading Specification...
    </span>
  </div>
);

export const App: React.FC = () => {
  const [currentPath, setCurrentPath] = useState<string>(() => {
    return window.location.pathname || '/';
  });

  useEffect(() => {
    const handlePopState = () => {
      setCurrentPath(window.location.pathname || '/');
    };

    window.addEventListener('popstate', handlePopState);
    return () => window.removeEventListener('popstate', handlePopState);
  }, []);

  const navigateTo = (path: string) => {
    if (path !== currentPath) {
      window.history.pushState({}, '', path);
      setCurrentPath(path);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  // Route resolution
  const renderCurrentPage = () => {
    const normalized = currentPath.replace(/\/+$/, '') || '/';

    if (normalized === '/services') {
      return (
        <Suspense fallback={<PageFallback />}>
          <ServicesPage onNavigate={navigateTo} />
        </Suspense>
      );
    }

    if (normalized.startsWith('/services/')) {
      const slug = normalized.replace('/services/', '');
      return (
        <Suspense fallback={<PageFallback />}>
          <ServiceDetailPage slug={slug} onNavigate={navigateTo} />
        </Suspense>
      );
    }

    if (normalized === '/industries') {
      return (
        <Suspense fallback={<PageFallback />}>
          <IndustriesPage onNavigate={navigateTo} />
        </Suspense>
      );
    }

    if (normalized.startsWith('/industries/')) {
      const slug = normalized.replace('/industries/', '');
      return (
        <Suspense fallback={<PageFallback />}>
          <IndustryDetailPage slug={slug} onNavigate={navigateTo} />
        </Suspense>
      );
    }

    if (normalized === '/about') {
      return (
        <Suspense fallback={<PageFallback />}>
          <AboutPage onNavigate={navigateTo} />
        </Suspense>
      );
    }

    if (normalized === '/leadership' || normalized === '/team') {
      return (
        <Suspense fallback={<PageFallback />}>
          <LeadershipPage onNavigate={navigateTo} />
        </Suspense>
      );
    }

    if (normalized === '/process') {
      return (
        <Suspense fallback={<PageFallback />}>
          <ProcessPage onNavigate={navigateTo} />
        </Suspense>
      );
    }

    if (normalized === '/contact') {
      return (
        <Suspense fallback={<PageFallback />}>
          <ContactPage onNavigate={navigateTo} />
        </Suspense>
      );
    }

    // Default to HomePage
    return <HomePage onNavigate={navigateTo} />;
  };

  return (
    <>
      <Header currentPath={currentPath} onNavigate={navigateTo} />
      {renderCurrentPage()}
      <Footer onNavigate={navigateTo} />
    </>
  );
};

export default App;
