import { useTranslation } from 'react-i18next';
import '../PageShell.css';

export default function IconicCenter() {
  const { t } = useTranslation();

  const facilities = [
    { floor: 'B1', name: t('iconic.floors.b1') },
    { floor: '1F', name: t('iconic.floors.1f') },
    { floor: '2F', name: t('iconic.floors.2f') },
    { floor: '3F', name: t('iconic.floors.3f') },
    { floor: 'Roof', name: t('iconic.floors.roof') ? t('iconic.floors.roof') : 'Outdoor Deck' },
  ];

  return (
    <div className="page-shell">
      <div className="page-hero" style={{ background: 'linear-gradient(135deg, rgba(232, 131, 42, 0.2), rgba(7, 13, 26, 0.95))' }}>
        <div className="container">
          <div className="page-hero-badge">{t('iconic.badge')}</div>
          <h1>{t('iconic.title')}</h1>
          <p>{t('iconic.subtitle')}</p>
        </div>
      </div>

      <div className="container page-content">
        <section className="content-section">
          <h2>{t('iconic.sectionGuide')}</h2>
          <div className="facility-list">
            {facilities.map((f) => (
              <div className="facility-item" key={f.floor}>
                <div className="facility-floor">{f.floor}</div>
                <div className="facility-name">{f.name}</div>
              </div>
            ))}
          </div>
        </section>

        <section className="content-section">
          <h2>{t('iconic.sectionProgress')}</h2>
          <div className="progress-banner">
            <div className="progress-label">{t('iconic.progressLabel')}</div>
            <div className="progress-bar-wrap">
              <div className="progress-bar" style={{ width: '65%' }} />
            </div>
            <div className="progress-pct">65%</div>
          </div>
        </section>

        <section className="content-section">
          <h2>{t('iconic.sectionBooking')}</h2>
          <p style={{ color: 'var(--color-text-muted)', lineHeight: 1.8 }}>
            {t('iconic.bookingDesc')}
          </p>
          <a href="#" className="btn btn-primary" style={{ marginTop: 20, display: 'inline-flex' }}>
            {t('iconic.downloadForm')}
          </a>
        </section>
      </div>
    </div>
  );
}
