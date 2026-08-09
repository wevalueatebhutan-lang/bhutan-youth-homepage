import { useTranslation } from 'react-i18next';
import '../PageShell.css';

export default function About() {
  const { t } = useTranslation();

  return (
    <div className="page-shell">
      <div className="page-hero" style={{ background: 'linear-gradient(135deg, rgba(17, 94, 201, 0.2), rgba(7, 13, 26, 0.95))' }}>
        <div className="container">
          <div className="page-hero-badge">{t('about.badge')}</div>
          <h1>{t('about.title')}</h1>
          <p>{t('about.subtitle')}</p>
        </div>
      </div>

      <div className="container page-content">
        <section className="content-section">
          <h2>{t('about.sectionBackground')}</h2>
          <p>{t('about.sectionBackgroundDesc')}</p>
          <div className="timeline">
            {[
              { year: '2023', event: 'Project launch — needs assessment and expert deployment (사업 착수 및 전문가 투입)' },
              { year: '2024', event: 'Pilot programs launched across 9 regions (9개 지역 시범운영 개시)' },
              { year: '2025', event: '1,087 youth graduates — manual development completed (1,087명 수료 및 교재 개발 완료)' },
              { year: '2026', event: 'Iconic Center completion and handover (아이코닉 센터 준공 및 최종 이관)' },
            ].map((item) => (
              <div className="timeline-item" key={item.year}>
                <div className="timeline-year">{item.year}</div>
                <div className="timeline-event">{item.event}</div>
              </div>
            ))}
          </div>
        </section>

        <section className="content-section">
          <h2>{t('about.sectionPartners')}</h2>
          <div className="partner-grid">
            {[
              { name: t('about.partnerKoica'), role: t('about.roleKoica') },
              { name: t('about.partnerBtf'), role: t('about.roleBtf') },
            ].map((p) => (
              <div className="partner-card" key={p.name}>
                <h3>{p.name}</h3>
                <p>{p.role}</p>
              </div>
            ))}
          </div>
        </section>
      </div>
    </div>
  );
}
