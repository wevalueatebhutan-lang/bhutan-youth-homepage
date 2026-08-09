import { useTranslation } from 'react-i18next';
import '../PageShell.css';

export default function IconicCenter() {
  const { t } = useTranslation();

  return (
    <div className="page-shell">
      {/* Sub Hero */}
      <div className="page-hero" style={{ background: 'linear-gradient(135deg, #115ec9 0%, #0f172a 100%)' }}>
        <div className="container">
          <div className="page-hero-badge">{t('center.badge')}</div>
          <h1>{t('center.title')}</h1>
          <p>{t('center.subtitle')}</p>
        </div>
      </div>

      <div className="container page-content">
        {/* Section 1: Vision & Purpose */}
        <section className="content-section" style={{ textAlign: 'left' }}>
          <div className="section-header-border">
            <h2>{t('center.sectionOverview')}</h2>
          </div>
          <p style={{ lineHeight: '1.7', color: '#334155', fontSize: '0.98rem' }}>
            부탄 팀푸(Thimphu)에 조성 중인 <strong>아이코닉 센터 (Iconic Center)</strong>는 한국국제협력단(KOICA)과 부탄태권도연맹(BTF)의 긴밀한 글로벌 ODA 협정 하에 건립 중인 부탄 최초의 <strong>청소년 다목적 체육 교육관</strong>입니다. 청소년들이 태권도 수련과 보건위생 교육, 공동체 가치 학습을 결합해 건강한 사회 구성원으로 성장할 수 있는 핵심 인프라 역할을 담당합니다.
          </p>
        </section>

        {/* Section 2: Floor Facility Directory (KYWA Style Info Table) */}
        <section className="content-section" style={{ textAlign: 'left' }}>
          <div className="section-header-border">
            <h2>층별 시설 및 구역 명세 (Facilities Directory)</h2>
          </div>
          <p style={{ color: 'var(--text-muted)', marginBottom: '16px', fontSize: '0.9rem' }}>
            완공 후 운영될 복합 다목적 구역의 시설 규모 및 주요 용도 계획서입니다.
          </p>
          <div className="portal-table-container">
            <table className="portal-info-table">
              <thead>
                <tr>
                  <th style={{ width: '15%' }}>층구분 (Floor)</th>
                  <th style={{ width: '35%' }}>공간 명칭 (Facility Room)</th>
                  <th style={{ width: '20%' }}>면적 규모 (Area)</th>
                  <th style={{ width: '30%' }}>주요 운영 목적 (Main Use)</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td style={{ fontWeight: 700, color: 'var(--accent)' }}>3층 (3F)</td>
                  <td style={{ fontWeight: 600 }}>청소년 가치·보건 세미나실 및 연맹 사무소</td>
                  <td>약 150 ㎡</td>
                  <td>연맹 운영 사무, 청소년 소규모 세미나 및 보건 가치 교육실</td>
                </tr>
                <tr>
                  <td style={{ fontWeight: 700, color: 'var(--accent)' }}>2층 (2F)</td>
                  <td style={{ fontWeight: 600 }}>태권도 전용 제2수련실 및 체력 단련실</td>
                  <td>약 280 ㎡</td>
                  <td>시범단 집중 훈련, 기초 물리 치료 및 체력 기량 평가</td>
                </tr>
                <tr>
                  <td style={{ fontWeight: 700, color: 'var(--accent)' }}>1층 (1F)</td>
                  <td style={{ fontWeight: 600 }}>국제 규격 태권도 경기장 및 대강당 (도장)</td>
                  <td>약 450 ㎡</td>
                  <td>공식 태권도 승급 심사, 전국 대회 개최 및 청소년 문화 행사</td>
                </tr>
              </tbody>
            </table>
          </div>
        </section>

        {/* Section 3: Construction Road Map */}
        <section className="content-section" style={{ textAlign: 'left' }}>
          <div className="section-header-border">
            <h2>{t('center.sectionConstruction')}</h2>
          </div>
          <p style={{ color: 'var(--text-muted)', marginBottom: '20px', fontSize: '0.9rem' }}>
            2026년 말 공식 개관을 목표로 골조 및 내장 시공이 순조롭게 추진되고 있습니다.
          </p>
          
          <div className="progress-banner" style={{ background: 'var(--bg-sub)', border: '1px solid var(--border)', borderRadius: '4px', padding: '24px', display: 'flex', alignItems: 'center', gap: '24px' }}>
            <div className="progress-circle-badge" style={{ flex: '0 0 80px', height: '80px', borderRadius: '4px', background: 'var(--accent)', color: '#ffffff', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', fontWeight: 800 }}>
              <span style={{ fontSize: '0.7rem', opacity: 0.9 }}>공정률</span>
              <span style={{ fontSize: '1.3rem' }}>65%</span>
            </div>
            <div className="progress-info-box" style={{ flex: '1' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '8px', fontSize: '0.9rem', fontWeight: 700 }}>
                <span>골조 공사 완료 및 내·외장재 시공 중</span>
                <span style={{ color: 'var(--accent)' }}>Target: 2026.12</span>
              </div>
              <div className="progress-bar-bg" style={{ width: '100%', height: '12px', background: '#e2e8f0', borderRadius: '99px', overflow: 'hidden' }}>
                <div className="progress-bar-active" style={{ width: '65%', height: '100%', background: 'var(--accent-mint)', borderRadius: '99px' }} />
              </div>
            </div>
          </div>
        </section>

        {/* Section 4: Document Center */}
        <section className="content-section" style={{ paddingBottom: '40px', textAlign: 'left' }}>
          <div className="section-header-border">
            <h2>{t('center.sectionDocs')}</h2>
          </div>
          <p style={{ color: 'var(--text-muted)', marginBottom: '20px', fontSize: '0.9rem' }}>
            아이코닉 센터의 다목적 공간 대관 규칙 및 예약 서식을 다운로드할 수 있습니다.
          </p>
          <div style={{ display: 'flex', gap: '16px', flexWrap: 'wrap' }}>
            <a 
              href="https://wevalueatebhutan-6a832.web.app/rental_rule.pdf" 
              download
              className="btn btn-outline"
              style={{ fontSize: '0.88rem', fontWeight: 700, padding: '12px 24px', borderColor: 'var(--border)' }}
              onClick={() => alert('시설 대관 규정 PDF 서류 다운로드를 시작합니다.')}
            >
              대관 규정 및 규칙.pdf
            </a>
            <a 
              href="https://wevalueatebhutan-6a832.web.app/rental_form.docx" 
              download
              className="btn btn-outline"
              style={{ fontSize: '0.88rem', fontWeight: 700, padding: '12px 24px', borderColor: 'var(--border)' }}
              onClick={() => alert('시설 대관 신청서 docx 서식을 다운로드합니다.')}
            >
              대관 신청 서식.docx
            </a>
          </div>
        </section>
      </div>
    </div>
  );
}
