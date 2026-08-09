import { useTranslation } from 'react-i18next';
import './Home.css';

export default function Home() {
  const { t } = useTranslation();

  return (
    <div className="home-page">
      {/* Hero Section */}
      <section className="hero-section">
        <div className="hero-bg-overlay" />
        <div className="hero-content container">
          <div className="hero-badge">{t('home.heroBadge')}</div>
          <h1 className="hero-title">
            {t('home.heroTitleLine1')}<br />
            <span>{t('home.heroTitleLine2')}</span>
          </h1>
          <p className="hero-subtitle">{t('home.heroSubtitle')}</p>
          <div className="hero-actions">
            <a href="/programs" className="btn btn-primary">{t('home.exploreBtn')}</a>
            <a href="/iconic-center" className="btn btn-outline">{t('home.iconicBtn')}</a>
          </div>
        </div>

        {/* Scroll indicator */}
        <div className="scroll-indicator" aria-hidden="true">
          <div className="scroll-dot" />
        </div>
      </section>

      {/* Stats Section */}
      <section className="stats-section">
        <div className="container stats-grid">
          {[
            { value: '1,087', label: t('home.stats.graduates'), suffix: ' 명' },
            { value: '12', label: t('home.stats.centers'), suffix: ' 개교' },
            { value: '9', label: t('home.stats.regions'), suffix: ' 개 지역' },
            { value: '4.13', label: t('home.stats.satisfaction'), suffix: ' / 5.0' },
          ].map((stat) => (
            <div className="stat-card" key={stat.label}>
              <div className="stat-value">
                {stat.value}
                <span className="stat-suffix">{stat.suffix}</span>
              </div>
              <div className="stat-label">{stat.label}</div>
            </div>
          ))}
        </div>
      </section>

      {/* Quick Links Section */}
      <section className="quick-links-section container">
        <h2 className="section-title">{t('home.quickAccess.title')}</h2>
        <div className="quick-links-grid">
          {[
            { title: t('home.quickAccess.manualsTitle'), desc: t('home.quickAccess.manualsDesc'), href: '/programs', color: '#e8832a' },
            { title: t('home.quickAccess.centerTitle'), desc: t('home.quickAccess.centerDesc'), href: '/iconic-center', color: '#115ec9' },
            { title: t('home.quickAccess.newsTitle'), desc: t('home.quickAccess.newsDesc'), href: '/community', color: '#2ecc71' },
            { title: t('home.quickAccess.aboutTitle'), desc: t('home.quickAccess.aboutDesc'), href: '/about', color: '#9b59b6' },
          ].map((item) => (
            <a href={item.href} className="quick-link-card" key={item.title} style={{ '--card-accent': item.color } as React.CSSProperties}>
              <h3>{item.title}</h3>
              <p>{item.desc}</p>
              <div className="ql-action-row">
                <span className="ql-more-text">자세히 보기</span>
                <span className="ql-arrow">→</span>
              </div>
            </a>
          ))}
        </div>
      </section>
    </div>
  );
}
