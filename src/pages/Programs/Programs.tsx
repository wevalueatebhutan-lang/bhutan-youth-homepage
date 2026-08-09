import { useTranslation } from 'react-i18next';
import '../PageShell.css';

interface ProgramDetail {
  id: string;
  title: string;
  desc: string;
  details: string[];
}

export default function Programs() {
  const { t } = useTranslation();

  const programsData: ProgramDetail[] = [
    {
      id: 'prog-1',
      title: t('programs.taekwondo.title'),
      desc: t('programs.taekwondo.desc'),
      details: (t('programs.taekwondo.details', { returnObjects: true }) as string[]) || [],
    },
    {
      id: 'prog-2',
      title: t('programs.health.title'),
      desc: t('programs.health.desc'),
      details: (t('programs.health.details', { returnObjects: true }) as string[]) || [],
    },
    {
      id: 'prog-3',
      title: t('programs.value.title'),
      desc: t('programs.value.desc'),
      details: (t('programs.value.details', { returnObjects: true }) as string[]) || [],
    },
  ];

  return (
    <div className="page-shell">
      {/* Sub Hero */}
      <div className="page-hero" style={{ background: 'linear-gradient(135deg, #0d9488 0%, #0f172a 100%)' }}>
        <div className="container">
          <div className="page-hero-badge">{t('programs.badge')}</div>
          <h1>{t('programs.title')}</h1>
          <p>{t('programs.subtitle')}</p>
        </div>
      </div>

      <div className="container page-content">
        <section className="content-section" style={{ paddingBottom: '60px' }}>
          <h2 className="program-category-title">{t('programs.title')}</h2>
          <div className="programs-grid" style={{ marginTop: '24px' }}>
            {programsData.map((p, idx) => (
              <div 
                className={`program-card reveal-fade reveal-delay-${idx + 1}`} 
                key={p.id}
              >
                <div className="program-card-main">
                  <h3>{p.title}</h3>
                  <p>{p.desc}</p>
                </div>
                
                {/* Hover Slide Details (마우스 호버 시 스르륵 열리는 영역) */}
                <div className="program-details-hover">
                  <div className="hover-inner">
                    <h4>{t('programs.viewDetails')}</h4>
                    <ul>
                      {p.details.map((detail, dIdx) => (
                        <li key={dIdx}>{detail}</li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>
      </div>
    </div>
  );
}
