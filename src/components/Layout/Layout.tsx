import { useState, useEffect } from 'react';
import { Outlet, Link, NavLink } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import './Layout.css';

export default function Layout() {
  const { t, i18n } = useTranslation();
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 60);
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const changeLanguage = (lng: string) => {
    i18n.changeLanguage(lng);
  };

  const navLinks = [
    { path: '/', label: t('nav.home') },
    { path: '/about', label: t('nav.about') },
    { path: '/iconic-center', label: t('nav.iconicCenter') },
    { path: '/programs', label: t('nav.programs') },
    { path: '/community', label: t('nav.community') },
  ];

  return (
    <div className="site-wrapper">
      {/* ── HEADER ── */}
      <header className={`site-header ${scrolled ? 'scrolled' : ''}`}>
        <div className="header-inner container">
          <Link to="/" className="site-logo" aria-label="Bhutan Youth Development Home">
            <div className="logo-text">
              <strong>Bhutan Youth</strong>
              <span>Development Project</span>
            </div>
          </Link>

          {/* Desktop Navigation */}
          <nav className="main-nav" aria-label="Main navigation">
            {navLinks.map((link) => (
              <NavLink
                key={link.path}
                to={link.path}
                end={link.path === '/'}
                className={({ isActive }) => `nav-link ${isActive ? 'active' : ''}`}
              >
                {link.label}
              </NavLink>
            ))}
          </nav>

          {/* Language Switcher & Hamburger */}
          <div className="header-actions">
            <div className="lang-switcher">
              <button
                className={`lang-btn ${i18n.language === 'ko' ? 'active' : ''}`}
                onClick={() => changeLanguage('ko')}
              >
                KR
              </button>
              <span className="lang-divider">|</span>
              <button
                className={`lang-btn ${i18n.language === 'en' ? 'active' : ''}`}
                onClick={() => changeLanguage('en')}
              >
                EN
              </button>
            </div>

            <button
              className={`hamburger ${menuOpen ? 'open' : ''}`}
              onClick={() => setMenuOpen((v) => !v)}
              aria-label="Toggle menu"
              aria-expanded={menuOpen}
            >
              <span /><span /><span />
            </button>
          </div>
        </div>

        {/* Mobile Drawer */}
        <div className={`mobile-drawer ${menuOpen ? 'open' : ''}`}>
          {navLinks.map((link) => (
            <NavLink
              key={link.path}
              to={link.path}
              end={link.path === '/'}
              className={({ isActive }) => `mobile-nav-link ${isActive ? 'active' : ''}`}
              onClick={() => setMenuOpen(false)}
            >
              {link.label}
            </NavLink>
          ))}
        </div>
      </header>

      {/* ── PAGE CONTENT ── */}
      <main className="site-main">
        <Outlet />
      </main>

      {/* ── FOOTER ── */}
      <footer className="site-footer">
        <div className="footer-inner container">
          <div className="footer-brand">
            <div>
              <strong>Bhutan Youth Development Project</strong>
              <p>{t('footer.support')}</p>
            </div>
          </div>
          <div className="footer-links">
            <div className="footer-col">
              <h4>{t('footer.navTitle')}</h4>
              {navLinks.map((link) => (
                <Link key={link.path} to={link.path}>{link.label}</Link>
              ))}
            </div>
            <div className="footer-col">
              <h4>{t('footer.contactTitle')}</h4>
              <p>Bhutan Taekwondo Federation</p>
              <p>{t('footer.address')}</p>
              <a href="mailto:info@bhutantaekwondo.org">info@bhutantaekwondo.org</a>
            </div>
            <div className="footer-col">
              <h4>{t('footer.partnersTitle')}</h4>
              <p>KOICA</p>
              <p>Bhutan Taekwondo Federation</p>
            </div>
          </div>
        </div>
        <div className="footer-bottom">
          <span>© 2025 Bhutan Youth Development Project. All rights reserved.</span>
          <Link to="/admin/login" className="admin-link">Admin</Link>
        </div>
      </footer>
    </div>
  );
}
