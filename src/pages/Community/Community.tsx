import { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { collection, query, orderBy, limit, getDocs } from 'firebase/firestore';
import { db } from '../../firebase/config';
import '../PageShell.css';

interface Notice {
  id: string;
  title: string;
  date: string;
  tag: string;
  content: string;
}

interface GalleryItem {
  id: string;
  imageUrl: string;
  title: string;
  uploadedAt: any;
}

type TabFilter = 'all' | 'notices' | 'gallery' | 'facebook';

export default function Community() {
  const { t } = useTranslation();
  const [notices, setNotices] = useState<Notice[]>([]);
  const [gallery, setGallery] = useState<GalleryItem[]>([]);
  const [loadingNotices, setLoadingNotices] = useState(true);
  const [loadingGallery, setLoadingGallery] = useState(true);

  // Tab Control State
  const [activeFilter, setActiveFilter] = useState<TabFilter>('all');
  
  // Accordion notice control (stores expanded notice id)
  const [expandedNoticeId, setExpandedNoticeId] = useState<string | null>(null);

  const toggleNotice = (id: string) => {
    setExpandedNoticeId(expandedNoticeId === id ? null : id);
  };

  // Fetch Notices
  useEffect(() => {
    const fetchNotices = async () => {
      try {
        const q = query(collection(db, 'notices'), orderBy('date', 'desc'), limit(15));
        const querySnapshot = await getDocs(q);
        const fetched: Notice[] = [];
        querySnapshot.forEach((doc) => {
          fetched.push({ id: doc.id, ...doc.data() } as Notice);
        });
        setNotices(fetched);
      } catch (err) {
        console.error('Error fetching notices:', err);
      } finally {
        setLoadingNotices(false);
      }
    };
    fetchNotices();
  }, []);

  // Fetch Gallery
  useEffect(() => {
    const fetchGallery = async () => {
      try {
        const q = query(collection(db, 'gallery'), orderBy('uploadedAt', 'desc'), limit(12));
        const querySnapshot = await getDocs(q);
        const fetched: GalleryItem[] = [];
        querySnapshot.forEach((doc) => {
          fetched.push({ id: doc.id, ...doc.data() } as GalleryItem);
        });
        setGallery(fetched);
      } catch (err) {
        console.error('Error fetching gallery:', err);
      } finally {
        setLoadingGallery(false);
      }
    };
    fetchGallery();
  }, []);

  // Final Notice list (combines Firestore data and fallback default notices)
  const allNotices = notices.length > 0 ? notices : ((t('community.defaultNotices', { returnObjects: true }) as Notice[]) || []);

  return (
    <div className="page-shell">
      {/* KYWA Style Sub Hero */}
      <div className="page-hero" style={{ background: 'linear-gradient(135deg, #1e3a8a 0%, #0f172a 100%)' }}>
        <div className="container">
          <div className="page-hero-badge">{t('community.badge')}</div>
          <h1>{t('community.title')}</h1>
          <p>{t('community.subtitle')}</p>
        </div>
      </div>

      <div className="container page-content" style={{ marginTop: '30px' }}>
        {/* ── TAB FILTER CONTROLLER ── */}
        <div className="portal-tab-container">
          {[
            { key: 'all', label: '전체 (All)' },
            { key: 'notices', label: '공지사항 (Notices)' },
            { key: 'gallery', label: '활동 사진첩 (Gallery)' },
            { key: 'facebook', label: '페이스북 소식 (Facebook)' },
          ].map((tab) => (
            <button
              key={tab.key}
              className={`portal-tab-btn ${activeFilter === tab.key ? 'active' : ''}`}
              onClick={() => {
                setActiveFilter(tab.key as TabFilter);
                setExpandedNoticeId(null);
              }}
            >
              {tab.label}
            </button>
          ))}
        </div>

        {/* ── SECTION 1: NOTICES BOARD (TABLE VIEW + ACCORDION) ── */}
        {(activeFilter === 'all' || activeFilter === 'notices') && (
          <section className="content-section" style={{ marginTop: '24px' }}>
            <div className="section-header-border">
              <h2>{t('community.sectionNotice')}</h2>
            </div>
            
            {loadingNotices ? (
              <div style={{ color: 'var(--color-text-muted)', padding: '40px 0', textAlign: 'center' }}>Loading notices...</div>
            ) : (
              <div className="portal-table-container">
                <table className="portal-notice-table">
                  <thead>
                    <tr>
                      <th style={{ width: '10%' }}>No.</th>
                      <th style={{ width: '15%' }}>분류 (Tag)</th>
                      <th style={{ width: '60%' }}>제목 (Title)</th>
                      <th style={{ width: '15%' }}>등록일 (Date)</th>
                    </tr>
                  </thead>
                  <tbody>
                    {allNotices.map((n, index) => {
                      const isExpanded = expandedNoticeId === n.id;
                      return (
                        <>
                          {/* Table Row */}
                          <tr 
                            key={n.id} 
                            onClick={() => toggleNotice(n.id)}
                            className={`table-interactive-row ${isExpanded ? 'row-expanded' : ''}`}
                          >
                            <td className="col-num">{allNotices.length - index}</td>
                            <td>
                              <span className="notice-tag-badge">{n.tag}</span>
                            </td>
                            <td className="col-title">{n.title}</td>
                            <td className="col-date">{n.date}</td>
                          </tr>
                          {/* Accordion Content Row */}
                          {isExpanded && (
                            <tr className="accordion-content-row" key={`${n.id}-content`}>
                              <td colSpan={4}>
                                <div className="accordion-body-box">
                                  <p>{n.content}</p>
                                </div>
                              </td>
                            </tr>
                          )}
                        </>
                      );
                    })}
                  </tbody>
                </table>
              </div>
            )}
          </section>
        )}

        {/* ── SECTION 2: PHOTO GALLERY (REAL SYNC GRID) ── */}
        {(activeFilter === 'all' || activeFilter === 'gallery') && (
          <section className="content-section" style={{ marginTop: '50px' }}>
            <div className="section-header-border">
              <h2>{t('community.sectionGallery')}</h2>
            </div>
            <p style={{ color: 'var(--text-muted)', margin: '12px 0 24px' }}>
              {t('community.galleryDesc')}
            </p>

            {loadingGallery ? (
              <div style={{ padding: '40px 0', textAlign: 'center', color: 'var(--text-muted)' }}>Loading photos...</div>
            ) : (
              <div className="gallery-real-grid">
                {gallery.length === 0 ? (
                  // Fallback high-quality sports photos if Firestore gallery is empty
                  [
                    { id: 'def-1', title: 'National Youth Taekwondo Training in Thimphu', url: 'https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?auto=format&fit=crop&w=800&q=80' },
                    { id: 'def-2', title: 'BTF Junior Sparring & Kick Practice Sessions', url: 'https://images.unsplash.com/photo-1599058917212-d750089bc07e?auto=format&fit=crop&w=800&q=80' },
                    { id: 'def-3', title: 'Regional Safety & Sports Seminar for Instructors', url: 'https://images.unsplash.com/photo-1517649763962-0c623066013b?auto=format&fit=crop&w=800&q=80' }
                  ].map((item) => (
                    <div className="gallery-card" key={item.id}>
                      <div className="gallery-img-wrapper">
                        <img src={item.url} alt={item.title} />
                      </div>
                      <div className="gallery-card-info">
                        <h4>{item.title}</h4>
                      </div>
                    </div>
                  ))
                ) : (
                  gallery.map((item) => (
                    <div className="gallery-card" key={item.id}>
                      <div className="gallery-img-wrapper">
                        <img src={item.imageUrl} alt={item.title} />
                      </div>
                      <div className="gallery-card-info">
                        <h4>{item.title}</h4>
                      </div>
                    </div>
                  ))
                )}
              </div>
            )}
          </section>
        )}

        {/* ── SECTION 3: FACEBOOK TIMELINE FEED ── */}
        {(activeFilter === 'all' || activeFilter === 'facebook') && (
          <section className="content-section" style={{ marginTop: '50px', paddingBottom: '60px' }}>
            <div className="section-header-border">
              <h2>{t('community.sectionFacebook')}</h2>
            </div>
            <div className="facebook-container-layout" style={{ display: 'flex', gap: '32px', marginTop: '24px', alignItems: 'flex-start' }}>
              {/* Widget Iframe */}
              <div className="facebook-widget-box" style={{ flex: '0 0 340px', background: 'var(--bg)', border: '1px solid var(--border)', borderRadius: '6px', overflow: 'hidden', boxShadow: 'var(--shadow)' }}>
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
              <div className="facebook-info-box" style={{ flex: '1', display: 'flex', flexDirection: 'column', gap: '16px', justifyContent: 'center', minHeight: '300px', textAlign: 'left' }}>
                <span style={{ fontSize: '0.8rem', color: '#1877F2', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.05em' }}>Social Media Channel</span>
                <h3 style={{ fontSize: '1.4rem', fontWeight: 800, margin: 0 }}>Bhutan Taekwondo Federation Facebook Page</h3>
                <p style={{ color: 'var(--text-muted)', lineHeight: '1.6', fontSize: '0.95rem', maxWidth: '600px', margin: 0 }}>
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
        )}
      </div>
    </div>
  );
}
