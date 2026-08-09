import { useTranslation } from 'react-i18next';
import '../PageShell.css';

export default function About() {
  const { t } = useTranslation();

  return (
    <div className="page-shell">
      {/* Sub Hero */}
      <div className="page-hero" style={{ background: 'linear-gradient(135deg, #1e3a8a 0%, #0f172a 100%)' }}>
        <div className="container">
          <div className="page-hero-badge">{t('about.badge')}</div>
          <h1>{t('about.title')}</h1>
          <p>{t('about.subtitle')}</p>
        </div>
      </div>

      <div className="container page-content">
        {/* 미션 및 비전 */}
        <section className="content-section reveal-fade" style={{ textAlign: 'left' }}>
          <div className="section-header-border">
            <h2>{t('about.visionTitle')}</h2>
          </div>
          <p style={{ lineHeight: '1.8', color: '#334155', fontSize: '0.98rem', margin: 0 }}>
            {t('about.visionDesc')}
          </p>
        </section>

        {/* 연맹의 4대 역사 단계 */}
        <section className="content-section" style={{ textAlign: 'left' }}>
          <div className="section-header-border reveal-fade">
            <h2>{t('about.historyTitle')}</h2>
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
            {[
              { num: '01', title: '1997', desc: t('about.historyStep1'), delay: 'reveal-fade reveal-delay-1' },
              { num: '02', title: '2000', desc: t('about.historyStep2'), delay: 'reveal-fade reveal-delay-2' },
              { num: '03', title: '2010', desc: t('about.historyStep3'), delay: 'reveal-fade reveal-delay-3' },
              { num: '04', title: '2023', desc: t('about.historyStep4'), delay: 'reveal-fade reveal-delay-4' }
            ].map((step, idx) => (
              <div key={idx} className={step.delay} style={{ display: 'flex', gap: '20px', alignItems: 'flex-start', background: 'var(--bg-sub)', padding: '20px', borderRadius: '4px', border: '1px solid var(--border)' }}>
                <span style={{ fontSize: '1.4rem', fontWeight: 800, color: 'var(--accent)', lineHeight: 1 }}>{step.title}</span>
                <div style={{ flex: '1' }}>
                  <p style={{ margin: 0, fontWeight: 700, fontSize: '0.92rem', color: '#0f172a' }}>{step.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* 조직도 / 연맹 지부 정보 */}
        <section className="content-section reveal-fade" style={{ textAlign: 'left', paddingBottom: '40px' }}>
          <div className="section-header-border">
            <h2>{t('about.structureTitle')} (BTF Structure)</h2>
          </div>
          
          <div className="portal-table-container" style={{ marginTop: '20px' }}>
            <table className="portal-info-table">
              <thead>
                <tr>
                  <th>{t('about.tableColDivision')}</th>
                  <th>{t('about.tableColMembers')}</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td style={{ fontWeight: 700 }}>{t('about.execBoard')}</td>
                  <td>{t('about.execBoardMembers')}</td>
                </tr>
                <tr>
                  <td style={{ fontWeight: 700 }}>{t('about.secretariat')}</td>
                  <td>{t('about.secretariatMembers')}</td>
                </tr>
                <tr>
                  <td style={{ fontWeight: 700 }}>{t('about.regionalDTA')}</td>
                  <td>{t('about.regionalDTAMembers')}</td>
                </tr>
              </tbody>
            </table>
          </div>
        </section>
      </div>
    </div>
  );
}
