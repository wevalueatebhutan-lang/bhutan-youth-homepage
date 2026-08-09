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

export default function Community() {
  const { t } = useTranslation();
  const [notices, setNotices] = useState<Notice[]>([]);
  const [gallery, setGallery] = useState<GalleryItem[]>([]);
  const [loadingNotices, setLoadingNotices] = useState(true);
  const [loadingGallery, setLoadingGallery] = useState(true);

  // Fetch Notices from Firestore
  useEffect(() => {
    const fetchNotices = async () => {
      try {
        const q = query(collection(db, 'notices'), orderBy('date', 'desc'), limit(10));
        const querySnapshot = await getDocs(q);
        const fetchedNotices: Notice[] = [];
        querySnapshot.forEach((doc) => {
          fetchedNotices.push({ id: doc.id, ...doc.data() } as Notice);
        });
        setNotices(fetchedNotices);
      } catch (err) {
        console.error('Error fetching notices:', err);
      } finally {
        setLoadingNotices(false);
      }
    };

    fetchNotices();
  }, []);

  // Fetch Gallery Items from Firestore
  useEffect(() => {
    const fetchGallery = async () => {
      try {
        const q = query(collection(db, 'gallery'), orderBy('uploadedAt', 'desc'), limit(12));
        const querySnapshot = await getDocs(q);
        const fetchedGallery: GalleryItem[] = [];
        querySnapshot.forEach((doc) => {
          fetchedGallery.push({ id: doc.id, ...doc.data() } as GalleryItem);
        });
        setGallery(fetchedGallery);
      } catch (err) {
        console.error('Error fetching gallery:', err);
      } finally {
        setLoadingGallery(false);
      }
    };

    fetchGallery();
  }, []);

  return (
    <div className="page-shell">
      <div className="page-hero" style={{ background: 'linear-gradient(135deg, rgba(155, 89, 182, 0.2), rgba(7, 13, 26, 0.95))' }}>
        <div className="container">
          <div className="page-hero-badge">{t('community.badge')}</div>
          <h1>{t('community.title')}</h1>
          <p>{t('community.subtitle')}</p>
        </div>
      </div>

      <div className="container page-content">
        {/* Notices Section */}
        <section className="content-section">
          <h2>{t('community.sectionNotice')}</h2>
          {loadingNotices ? (
            <div style={{ color: 'var(--color-text-muted)', padding: '20px 0' }}>Loading notices...</div>
          ) : (
            <div className="notice-list">
              {/* If Firestore is empty, load localized default notices */}
              {notices.length === 0 ? (
                ((t('community.defaultNotices', { returnObjects: true }) as any[]) || []).map((n: any) => (
                  <div className="notice-item" key={n.id}>
                    <div className="notice-tag">{n.tag}</div>
                    <div className="notice-body">
                      <h3>{n.title}</h3>
                      <p style={{ marginBlock: '8px', fontSize: '0.9rem', color: 'var(--color-text-muted)' }}>{n.content}</p>
                      <span className="notice-date">{n.date}</span>
                    </div>
                  </div>
                ))
              ) : (
                notices.map((n) => (
                  <div className="notice-item" key={n.id}>
                    <div className="notice-tag">{n.tag}</div>
                    <div className="notice-body">
                      <h3>{n.title}</h3>
                      <p style={{ marginBlock: '8px', fontSize: '0.9rem', color: 'var(--color-text-muted)' }}>{n.content}</p>
                      <span className="notice-date">{n.date}</span>
                    </div>
                  </div>
                ))
              )}
            </div>
          )}
        </section>

        {/* Gallery Section */}
        <section className="content-section">
          <h2>{t('community.sectionGallery')}</h2>
          <p style={{ color: 'var(--color-text-muted)', marginBottom: '24px' }}>
            {t('community.galleryDesc')}
          </p>

          {loadingGallery ? (
            <div className="gallery-placeholder-grid">
              {Array.from({ length: 3 }).map((_, i) => (
                <div className="gallery-placeholder" key={i}>
                  <span className="no-image-text">Loading...</span>
                </div>
              ))}
            </div>
          ) : gallery.length === 0 ? (
            <div className="gallery-placeholder-grid">
              {Array.from({ length: 3 }).map((_, i) => (
                <div className="gallery-placeholder" key={i}>
                  <span className="no-image-text">No Images</span>
                </div>
              ))}
            </div>
          ) : (
            <div className="gallery-real-grid">
              {gallery.map((item) => (
                <div className="gallery-card" key={item.id}>
                  <div className="gallery-img-wrapper">
                    <img src={item.imageUrl} alt={item.title} />
                  </div>
                  <div className="gallery-card-info">
                    <h4>{item.title}</h4>
                  </div>
                </div>
              ))}
            </div>
          )}
        </section>

        {/* Facebook Feed Section */}
        <section className="content-section" style={{ borderTop: '1px solid var(--color-border)', paddingTop: '40px' }}>
          <h2>{t('community.sectionFacebook')}</h2>
          <div className="facebook-container-layout" style={{ display: 'flex', gap: '32px', marginTop: '24px', alignItems: 'flex-start' }}>
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
    </div>
  );
}
