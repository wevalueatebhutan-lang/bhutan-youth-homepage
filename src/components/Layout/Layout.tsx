import { Link, useLocation, Outlet } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { useState } from 'react';
import './Layout.css';

interface LayoutProps {
  children?: React.ReactNode;
}

export default function Layout({ children }: LayoutProps) {
  const { t, i18n } = useTranslation();
  const location = useLocation();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const toggleLanguage = () => {
    const nextLang = i18n.language === 'ko' ? 'en' : 'ko';
    i18n.changeLanguage(nextLang);
  };

  const navLinks = [
    { path: '/', label: t('nav.home') },
    { path: '/about', label: t('nav.about') },
    { path: '/project', label: t('nav.project') },
    { path: '/programs', label: t('nav.programs') },
    { path: '/community', label: t('nav.community') },
  ];

  return (
    <div className="layout-wrapper">
      {/* ── UPPER UTILITY BAR ── */}
      <div className="utility-bar">
        <div className="container utility-inner">
          <span className="gov-badge">
            Official Portal of Bhutan Youth Development Project
          </span>
          <div className="utility-right">
            {/* Language Switcher */}
            <button className="lang-switcher-btn" onClick={toggleLanguage}>
              🌐 {i18n.language === 'ko' ? 'English (EN)' : '한국어 (KR)'}
            </button>
            <span className="divider">|</span>
            <Link to="/admin/login" className="admin-login-link">Admin Login</Link>
          </div>
        </div>
      </div>

      {/* ── GNB MAIN HEADER ── */}
      <header className="main-header">
        <div className="container header-inner">
          <Link to="/" className="brand-logo">
            <img src="/logo.png" alt="Bhutan Taekwondo Federation Logo" style={{ height: '40px', width: 'auto', objectFit: 'contain' }} />
            <div className="brand-text">
              <strong>BHUTAN TAEKWONDO FEDERATION</strong>
              <span>Youth Development Project Portal</span>
            </div>
          </Link>

          {/* Desktop Navigation */}
          <nav className="desktop-nav">
            <ul>
              {navLinks.map((link) => {
                const isActive = location.pathname === link.path;
                return (
                  <li key={link.path}>
                    <Link to={link.path} className={isActive ? 'active' : ''}>
                      {link.label}
                    </Link>
                  </li>
                );
              })}
            </ul>
          </nav>

          {/* Mobile Menu Toggle */}
          <button 
            className="mobile-menu-toggle" 
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            aria-label="Toggle menu"
          >
            <div className={`bar ${mobileMenuOpen ? 'open' : ''}`} />
            <div className={`bar ${mobileMenuOpen ? 'open' : ''}`} />
            <div className={`bar ${mobileMenuOpen ? 'open' : ''}`} />
          </button>
        </div>
      </header>

      {/* Mobile Drawer Menu */}
      {mobileMenuOpen && (
        <div className="mobile-drawer" onClick={() => setMobileMenuOpen(false)}>
          <div className="drawer-content" onClick={(e) => e.stopPropagation()}>
            <div className="drawer-header">
              <strong>Menu</strong>
              <button className="close-btn" onClick={() => setMobileMenuOpen(false)}>×</button>
            </div>
            <nav className="drawer-nav">
              <ul>
                {navLinks.map((link) => (
                  <li key={link.path}>
                    <Link 
                      to={link.path} 
                      onClick={() => setMobileMenuOpen(false)}
                      className={location.pathname === link.path ? 'active' : ''}
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </nav>
            <div className="drawer-footer">
              <button className="lang-switcher-btn-m" onClick={toggleLanguage}>
                🌐 {i18n.language === 'ko' ? 'English (EN)' : '한국어 (KR)'}
              </button>
            </div>
          </div>
        </div>
      )}

      {/* ── MAIN BODY ── */}
      <main className="main-content-area">
        {children || <Outlet />}
      </main>

      {/* ── SITE FOOTER ── */}
      <footer className="site-footer">
        <div className="container footer-inner">
          <div className="footer-top-row">
            <div className="footer-logo">
              <strong>BTF × KOICA</strong>
              <p>{t('footer.support')}</p>
            </div>
            <div className="footer-sns">
              <a href="https://www.facebook.com/bhutantaekwondo/?locale=ko_KR" target="_blank" rel="noreferrer" className="sns-circle">
                FB
              </a>
            </div>
          </div>

          <div className="footer-grid">
            <div className="footer-col">
              <h4>{t('footer.navTitle')}</h4>
              <ul>
                {navLinks.map((link) => (
                  <li key={link.path}>
                    <Link to={link.path}>{link.label}</Link>
                  </li>
                ))}
              </ul>
            </div>
            <div className="footer-col">
              <h4>{t('footer.contactTitle')}</h4>
              <p style={{ margin: '0 0 6px' }}><strong>Bhutan Taekwondo Federation</strong></p>
              <p style={{ margin: '0 0 10px', fontSize: '0.88rem' }}>{t('footer.address')}</p>
              <a href="mailto:info@bhutantaekwondo.org" className="footer-email">info@bhutantaekwondo.org</a>
            </div>
            <div className="footer-col">
              <h4>{t('footer.partnersTitle')}</h4>
              <p>Korea International Cooperation Agency (KOICA)</p>
              <p>Bhutan Taekwondo Federation (BTF)</p>
            </div>
          </div>

          <div className="footer-bottom">
            <p>© 2025 Bhutan Taekwondo Federation. All rights reserved.</p>
            <Link to="/admin/login" className="admin-link">System Admin Login</Link>
          </div>
        </div>
      </footer>
    </div>
  );
}
