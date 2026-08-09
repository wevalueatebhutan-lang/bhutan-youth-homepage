import { useTranslation } from 'react-i18next';
import { useState, useEffect } from 'react';
import { collection, query, orderBy, limit, getDocs } from 'firebase/firestore';
import { db } from '../../firebase/config';
import './Home.css';

interface Notice {
  id: string;
  title: string;
  date: string;
  tag: string;
}

export default function Home() {
  const { t } = useTranslation();
  const [recentNotices, setRecentNotices] = useState<Notice[]>([]);
  const [loadingNotices, setLoadingNotices] = useState(true);

  // Fetch 4 recent notices for Home dashboard
  useEffect(() => {
    const fetchRecentNotices = async () => {
      try {
        const q = query(collection(db, 'notices'), orderBy('date', 'desc'), limit(4));
        const querySnapshot = await getDocs(q);
        const fetched: Notice[] = [];
        querySnapshot.forEach((doc) => {
          fetched.push({ id: doc.id, ...doc.data() } as Notice);
        });
        setRecentNotices(fetched);
      } catch (err) {
        console.error('Error fetching home notices:', err);
      } finally {
        setLoadingNotices(false);
      }
    };
    fetchRecentNotices();
  }, []);

  return (
    <div className="home-page-container">
      {/* ── 1. PORTAL HERO SLIDER BANNER ── */}
      <section className="portal-hero-slider">
        <div className="hero-slider-inner container">
          <div className="hero-slider-text">
            <span className="slider-tag">{t('home.heroBadge')}</span>
            <h1 className="slider-title">
              {t('home.heroTitleLine1')}<br />
              <strong style={{ color: '#ffffff' }}>{t('home.heroTitleLine2')}</strong>
            </h1>
            <p className="slider-desc">{t('home.heroSubtitle')}</p>
            <div className="slider-actions">
              <a href="/programs" className="btn btn-slider-primary">{t('home.exploreBtn')}</a>
              <a href="/iconic-center" className="btn btn-slider-secondary">{t('home.iconicBtn')}</a>
            </div>
          </div>
          <div className="hero-slider-image">
            <img src="/taekwondo_hero.jpg" alt="Bhutan Youth Training" />
          </div>
        </div>
      </section>

      {/* ── 2. PORTAL QUICK SERVICE GRID ── */}
      <section className="portal-quick-grid-section">
        <div className="container">
          <div className="quick-grid">
            {[
              { href: '/programs', className: 'quick-card card-blue reveal-fade reveal-delay-1', title: t('home.quickAccess.manualsTitle'), desc: t('home.quickAccess.manualsDesc') },
              { href: '/project', className: 'quick-card card-emerald reveal-fade reveal-delay-2', title: t('home.quickAccess.centerTitle'), desc: t('home.quickAccess.centerDesc') },
              { href: '/programs', className: 'quick-card card-purple reveal-fade reveal-delay-3', title: t('home.quickAccess.manualsDownloadTitle'), desc: t('home.quickAccess.manualsDownloadDesc') },
              { href: '/community', className: 'quick-card card-orange reveal-fade reveal-delay-4', title: t('home.quickAccess.newsTitle'), desc: t('home.quickAccess.newsDesc') }
            ].map((item, idx) => (
              <a href={item.href} className={item.className} key={idx}>
                <div className="quick-card-body">
                  <h3>{item.title}</h3>
                  <p>{item.desc}</p>
                  <span className="quick-card-more">More →</span>
                </div>
              </a>
            ))}
          </div>
        </div>
      </section>

      {/* ── 3. MAIN DASHBOARD: NEWS & SOCIAL (5:5 SPLIT) ── */}
      <section className="portal-dashboard-section">
        <div className="container dashboard-grid">
          {/* Left Column: Board Notices */}
          <div className="dashboard-board-card reveal-fade">
            <div className="dashboard-card-header">
              <h2>{t('community.sectionNotice')}</h2>
              <a href="/community" className="more-view-link">전체보기 +</a>
            </div>
            
            {loadingNotices ? (
              <div className="board-loading">Loading announcements...</div>
            ) : (
              <div className="portal-board-list">
                {recentNotices.length === 0 ? (
                  // Fallback default notices if Firestore is empty
                  ((t('community.defaultNotices', { returnObjects: true }) as any[]) || []).slice(0, 4).map((n) => (
                    <a href="/community" className="board-row" key={n.id}>
                      <span className="board-row-tag">{n.tag}</span>
                      <span className="board-row-title">{n.title}</span>
                      <span className="board-row-date">{n.date}</span>
                    </a>
                  ))
                ) : (
                  recentNotices.map((n) => (
                    <a href="/community" className="board-row" key={n.id}>
                      <span className="board-row-tag">{n.tag}</span>
                      <span className="board-row-title">{n.title}</span>
                      <span className="board-row-date">{n.date}</span>
                    </a>
                  ))
                )}
              </div>
            )}
          </div>

          {/* Right Column: Facebook Feed */}
          <div className="dashboard-sns-card reveal-fade reveal-delay-2">
            <div className="dashboard-card-header">
              <h2>{t('community.sectionFacebook')}</h2>
              <a href="https://www.facebook.com/bhutantaekwondo/?locale=ko_KR" target="_blank" rel="noreferrer" className="more-view-link">Facebook Page →</a>
            </div>
            <div className="dashboard-facebook-widget">
              <iframe 
                src="https://www.facebook.com/plugins/page.php?href=https%3A%2F%2Fwww.facebook.com%2Fbhutantaekwondo&tabs=timeline&width=500&height=310&small_header=true&adapt_container_width=true&hide_cover=true&show_facepile=false" 
                width="100%" 
                height="310" 
                style={{ border: 'none', overflow: 'hidden' }} 
                scrolling="no" 
                frameBorder="0" 
                allowFullScreen={true} 
                allow="autoplay; clipboard-write; encrypted-media; picture-in-picture; web-share"
                title="Bhutan Taekwondo Facebook Home Feed"
              />
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
