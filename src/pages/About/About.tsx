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
        <section className="content-section reveal-fade" style={{ textAlign: 'left', paddingBottom: '30px' }}>
          <div className="section-header-border">
            <h2>{t('about.structureTitle')}</h2>
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

        {/* 찾아오는 길 (Google Maps Embed) */}
        <section className="content-section reveal-fade" style={{ textAlign: 'left', paddingBottom: '40px' }}>
          <div className="section-header-border">
            <h2>{t('about.locationTitle')}</h2>
          </div>
          <p style={{ color: 'var(--text-muted)', marginBottom: '24px', fontSize: '0.9rem' }}>
            {t('about.locationDesc')}
          </p>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '24px', alignItems: 'start' }}>
            {/* Left: Google Map Embed */}
            <div style={{ border: '1px solid var(--border)', borderRadius: '4px', overflow: 'hidden', height: '350px', boxShadow: 'var(--shadow)' }}>
              <iframe
                title="Bhutan Taekwondo Federation Location Map"
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3540.098485292376!2d89.63690327618957!3d27.466170676420556!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x39610fc92ee05b9b%3A0x56ed7f7ff79979ee!2sTaekwondo%20Training%20Center!5e0!3m2!1sko!2skr!4v1786392000000!5m2!1sko!2skr"
                width="100%"
                height="100%"
                style={{ border: 0 }}
                allowFullScreen={true}
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
              />
            </div>

            {/* Right: Address detail card */}
            <div style={{ background: '#ffffff', border: '1px solid #cbd5e1', borderLeft: '5px solid var(--accent)', borderRadius: '2px', padding: '24px', display: 'flex', flexDirection: 'column', gap: '20px', boxShadow: '0 1px 3px rgba(0,0,0,0.02)', textAlign: 'left', minHeight: '350px', justifyContent: 'space-between' }}>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
                <div>
                  <h4 style={{ fontSize: '0.85rem', fontWeight: 800, color: 'var(--accent)', textTransform: 'uppercase', margin: '0 0 6px' }}>{t('about.officeAddress')}</h4>
                  <p style={{ margin: 0, fontSize: '0.92rem', color: '#0f172a', fontWeight: 700, lineHeight: '1.5' }}>
                    {t('footer.address')}
                  </p>
                </div>

                <div>
                  <h4 style={{ fontSize: '0.85rem', fontWeight: 800, color: 'var(--accent)', textTransform: 'uppercase', margin: '0 0 6px' }}>{t('about.contacts')}</h4>
                  <p style={{ margin: '0 0 6px', fontSize: '0.92rem', color: '#0f172a', fontWeight: 700 }}>
                    Tel: +975 02 339899
                  </p>
                  <p style={{ margin: 0, fontSize: '0.92rem', color: '#0f172a', fontWeight: 700 }}>
                    Email: <a href="mailto:info@bhutantaekwondo.org" style={{ color: 'var(--accent)', textDecoration: 'underline' }}>info@bhutantaekwondo.org</a>
                  </p>
                </div>

                <div>
                  <h4 style={{ fontSize: '0.85rem', fontWeight: 800, color: 'var(--accent)', textTransform: 'uppercase', margin: '0 0 6px' }}>{t('about.googleMapsCode')}</h4>
                  <p style={{ margin: 0, fontSize: '0.92rem', color: '#475569', fontWeight: 600 }}>
                    FJCM+M7G, Doeboom Lam, Thimphu, Bhutan
                  </p>
                </div>
              </div>

              <a
                href="https://www.google.com/maps?cid=6264763284401911486"
                target="_blank"
                rel="noopener noreferrer"
                className="btn btn-primary"
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  gap: '8px',
                  padding: '12px 24px',
                  fontWeight: 700,
                  fontSize: '0.9rem',
                  textDecoration: 'none'
                }}
              >
                {t('about.openMaps')}
              </a>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}
