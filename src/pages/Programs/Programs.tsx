import { useTranslation } from 'react-i18next';
import '../PageShell.css';

export default function Programs() {
  const { t } = useTranslation();

  const manuals = [
    {
      title: t('programs.manualList.taekwondo.title'),
      desc: t('programs.manualList.taekwondo.desc'),
      color: '#e8832a',
    },
    {
      title: t('programs.manualList.health.title'),
      desc: t('programs.manualList.health.desc'),
      color: '#115ec9',
    },
    {
      title: t('programs.manualList.value.title'),
      desc: t('programs.manualList.value.desc'),
      color: '#2ecc71',
    },
    {
      title: t('programs.manualList.mental.title'),
      desc: t('programs.manualList.mental.desc'),
      color: '#9b59b6',
    },
    {
      title: t('programs.manualList.lesson.title'),
      desc: t('programs.manualList.lesson.desc'),
      color: '#f0c040',
    },
  ];

  return (
    <div className="page-shell">
      <div className="page-hero" style={{ background: 'linear-gradient(135deg, rgba(46, 204, 113, 0.15), rgba(7, 13, 26, 0.95))' }}>
        <div className="container">
          <div className="page-hero-badge">{t('programs.badge')}</div>
          <h1>{t('programs.title')}</h1>
          <p>{t('programs.subtitle')}</p>
        </div>
      </div>

      <div className="container page-content">
        <section className="content-section">
          <h2>{t('programs.sectionManuals')}</h2>
          <div className="manual-grid">
            {manuals.map((m) => (
              <div className="manual-card" key={m.title} style={{ '--card-accent': m.color } as React.CSSProperties}>
                <h3>{m.title}</h3>
                <p>{m.desc}</p>
                <button className="btn-download">
                  {t('programs.downloadBtn')}
                </button>
              </div>
            ))}
          </div>
        </section>
      </div>
    </div>
  );
}
