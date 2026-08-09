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

      {/* Facebook Feed Section */}
      <section className="facebook-feed-section container" style={{ borderTop: '1px solid var(--color-border)', paddingTop: '40px', paddingBottom: '60px', textAlign: 'left' }}>
        <h2 className="section-title" style={{ marginBottom: '24px' }}>{t('community.sectionFacebook')}</h2>
        <div className="facebook-container-layout" style={{ display: 'flex', gap: '32px', alignItems: 'flex-start' }}>
          {/* Widget Iframe */}
          <div className="facebook-widget-box" style={{ flex: '0 0 340px', background: 'var(--color-surface)', border: '1px solid var(--color-border)', borderRadius: '6px', overflow: 'hidden', boxShadow: 'var(--shadow-card)' }}>
            <iframe 
              src="https://www.facebook.com/plugins/page.php?href=https%3A%2F%2Fwww.facebook.com%2Fbhutantaekwondo&tabs=timeline&width=340&height=450&small_header=false&adapt_container_width=true&hide_cover=false&show_facepile=true" 
              width="340" 
              height="450" 
              style={{ border: 'none', overflow: 'hidden' }} 
              scrolling="no" 
              frameBorder="0" 
              allowFullScreen={true} 
              allow="autoplay; clipboard-write; encrypted-media; picture-in-picture; web-share"
              title="Bhutan Taekwondo Facebook Feed"
            />
          </div>
          {/* Info Text Box */}
          <div className="facebook-info-box" style={{ flex: '1', display: 'flex', flexDirection: 'column', gap: '16px', justifyContent: 'center', minHeight: '300px' }}>
            <span style={{ fontSize: '0.8rem', color: '#1877F2', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.05em' }}>Social Media Channel</span>
            <h3 style={{ fontSize: '1.4rem', fontWeight: 800, margin: 0 }}>Bhutan Taekwondo Federation Facebook Page</h3>
            <p style={{ color: 'var(--color-text-muted)', lineHeight: '1.6', fontSize: '0.95rem', maxWidth: '600px', margin: 0 }}>
              {t('community.facebookDesc')}
            </p>
            <div style={{ marginTop: '12px' }}>
              <a 
                href="https://www.facebook.com/bhutantaekwondo/?locale=ko_KR" 
                target="_blank" 
                rel="noopener noreferrer" 
                className="btn btn-primary"
                style={{ 
                  display: 'inline-flex', 
                  alignItems: 'center', 
                  gap: '10px', 
                  backgroundColor: '#1877F2', 
                  borderColor: '#1877F2',
                  padding: '12px 24px',
                  fontWeight: 700
                }}
              >
                <svg width="18" height="18" fill="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
                </svg>
                Visit Facebook Page
              </a>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
