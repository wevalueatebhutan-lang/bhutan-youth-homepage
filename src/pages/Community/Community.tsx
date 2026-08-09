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
      </div>
    </div>
  );
}
