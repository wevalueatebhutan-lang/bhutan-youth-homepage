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
            <h2>연맹 조직 및 지부 안내 (BTF Structure)</h2>
          </div>
          <p style={{ color: 'var(--text-muted)', marginBottom: '20px', fontSize: '0.9rem' }}>
            부탄 올림픽 위원회(BOC) 산하의 공식 태권도 행정 위원회 구성 명세입니다.
          </p>
          <div className="portal-table-container">
            <table className="portal-info-table">
              <thead>
                <tr>
                  <th style={{ width: '25%' }}>구분 (Division)</th>
                  <th style={{ width: '35%' }}>직위 (Position)</th>
                  <th style={{ width: '40%' }}>주요 관리 업무 (Responsibility)</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td style={{ fontWeight: 700 }}>의결 기구</td>
                  <td style={{ fontWeight: 600 }}>연맹 회장 (President) &amp; 이사회</td>
                  <td>연맹 운영 최종 의사 결정 및 BOC 조율</td>
                </tr>
                <tr>
                  <td style={{ fontWeight: 700 }}>행정 사무국</td>
                  <td style={{ fontWeight: 600 }}>사무총장 (Secretary General) &amp; 관리부</td>
                  <td>재정 집행, ODA 실무 공조 및 사범 파견 행정 처리</td>
                </tr>
                <tr>
                  <td style={{ fontWeight: 700 }}>기술/교육 위원회</td>
                  <td style={{ fontWeight: 600 }}>기술위원장 및 공인 지도자 그룹</td>
                  <td>전국 승급 승단 심사 주관, 심판 교육 및 대회 기술 기술 지도</td>
                </tr>
              </tbody>
            </table>
          </div>
        </section>
      </div>
    </div>
  );
}
