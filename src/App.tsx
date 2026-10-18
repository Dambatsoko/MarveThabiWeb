import React, { useState, useEffect, Component, ErrorInfo, ReactNode } from 'react';
import { Header } from './components/Header';
import { Footer } from './components/Footer';
import { HomePage } from './components/HomePage';
import { ServicesPage } from './components/ServicesPage';
import { ServiceDetailPage } from './components/ServiceDetailPage';
import { IndustriesPage } from './components/IndustriesPage';
import { IndustryDetailPage } from './components/IndustryDetailPage';
import { AboutPage } from './components/AboutPage';
import { LeadershipPage } from './components/LeadershipPage';
import { ProcessPage } from './components/ProcessPage';
import { ContactPage } from './components/ContactPage';

interface ErrorBoundaryProps {
  children: ReactNode;
  onReset?: () => void;
}

interface ErrorBoundaryState {
  hasError: boolean;
  error?: Error;
}

class ErrorBoundary extends Component<ErrorBoundaryProps, ErrorBoundaryState> {
  constructor(props: ErrorBoundaryProps) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(error: Error): ErrorBoundaryState {
    return { hasError: true, error };
  }

  componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    console.error('App caught an error:', error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      return (
        <div
          style={{
            minHeight: '60vh',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            gap: '18px',
            padding: '40px 20px',
            textAlign: 'center',
            background: '#fff',
          }}
        >
          <h2 style={{ fontSize: '24px', color: 'var(--ink, #0e1e1a)', margin: 0 }}>
            Unable to Display Specification
          </h2>
          <p style={{ maxWidth: '480px', color: '#55655F', margin: 0, fontSize: '15px' }}>
            We encountered an unexpected interface state while rendering this page.
          </p>
          <button
            className="btn btn-brand"
            style={{ cursor: 'pointer' }}
            onClick={() => {
              this.setState({ hasError: false });
              if (this.props.onReset) {
                this.props.onReset();
              } else {
                window.location.href = '/';
              }
            }}
          >
            Return to Home
          </button>
        </div>
      );
    }
    return this.props.children;
  }
}

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
      return <ServicesPage onNavigate={navigateTo} />;
    }

    if (normalized.startsWith('/services/')) {
      const slug = normalized.replace('/services/', '');
      return <ServiceDetailPage slug={slug} onNavigate={navigateTo} />;
    }

    if (normalized === '/industries') {
      return <IndustriesPage onNavigate={navigateTo} />;
    }

    if (normalized.startsWith('/industries/')) {
      const slug = normalized.replace('/industries/', '');
      return <IndustryDetailPage slug={slug} onNavigate={navigateTo} />;
    }

    if (normalized === '/about') {
      return <AboutPage onNavigate={navigateTo} />;
    }

    if (normalized === '/leadership' || normalized === '/team') {
      return <LeadershipPage onNavigate={navigateTo} />;
    }

    if (normalized === '/process') {
      return <ProcessPage onNavigate={navigateTo} />;
    }

    if (normalized === '/contact') {
      return <ContactPage onNavigate={navigateTo} />;
    }

    // Default to HomePage
    return <HomePage onNavigate={navigateTo} />;
  };

  return (
    <ErrorBoundary onReset={() => navigateTo('/')}>
      <Header currentPath={currentPath} onNavigate={navigateTo} />
      {renderCurrentPage()}
      <Footer onNavigate={navigateTo} />
    </ErrorBoundary>
  );
};

export default App;
