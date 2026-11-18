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
import { LeaderDetailPage } from './components/LeaderDetailPage';
import { ProcessPage } from './components/ProcessPage';
import { ContactPage } from './components/ContactPage';
import { useSEO } from './utils/useSEO';
import { Language, LANGUAGE_STORAGE_KEY } from './i18n/types';
import {
  getLanguageFromPath,
  stripLanguagePrefix,
  localizePath,
  switchLanguagePath,
} from './i18n/routing';
import { LanguageProvider, getUITranslations } from './i18n/LanguageContext';

interface ErrorBoundaryProps {
  children: ReactNode;
  lang: Language;
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
      const ui = getUITranslations(this.props.lang);
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
            {ui.errorBoundary.title}
          </h2>
          <p style={{ maxWidth: '480px', color: '#55655F', margin: 0, fontSize: '15px' }}>
            {ui.errorBoundary.message}
          </p>
          <button
            className="btn btn-brand"
            style={{ cursor: 'pointer' }}
            onClick={() => {
              this.setState({ hasError: false });
              if (this.props.onReset) {
                this.props.onReset();
              } else {
                window.location.href = localizePath('/', this.props.lang);
              }
            }}
          >
            {ui.errorBoundary.button}
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

  const lang = getLanguageFromPath(currentPath);

  // Dynamically update html[lang], document title, canonical, hreflang alternates, OpenGraph, and JSON-LD
  useSEO(currentPath);

  useEffect(() => {
    const handlePopState = () => {
      setCurrentPath(window.location.pathname || '/');
    };

    window.addEventListener('popstate', handlePopState);
    return () => window.removeEventListener('popstate', handlePopState);
  }, []);

  const pushPath = (targetPath: string) => {
    if (targetPath !== currentPath) {
      window.history.pushState({}, '', targetPath);
      setCurrentPath(targetPath);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  const navigateTo = (path: string) => {
    pushPath(localizePath(path, lang));
  };

  const switchLanguage = (targetLang: Language) => {
    try {
      window.localStorage.setItem(LANGUAGE_STORAGE_KEY, targetLang);
    } catch {
      // Ignore storage quota / privacy mode errors
    }
    const targetPath = switchLanguagePath(currentPath, targetLang);
    pushPath(targetPath);
  };

  // Route resolution agnostic of '/fr/' prefix and aliases (/about-us -> /about, /team -> /leadership)
  const renderCurrentPage = () => {
    const normalized = stripLanguagePrefix(currentPath);

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

    if (normalized === '/leadership') {
      return <LeadershipPage onNavigate={navigateTo} />;
    }

    if (normalized.startsWith('/leadership/')) {
      const slug = normalized.replace('/leadership/', '');
      return <LeaderDetailPage slug={slug} onNavigate={navigateTo} />;
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
    <LanguageProvider lang={lang}>
      <ErrorBoundary lang={lang} onReset={() => pushPath(localizePath('/', lang))}>
        <Header
          currentPath={currentPath}
          onNavigate={navigateTo}
          onSwitchLanguage={switchLanguage}
        />
        {renderCurrentPage()}
        <Footer onNavigate={navigateTo} />
      </ErrorBoundary>
    </LanguageProvider>
  );
};

export default App;
