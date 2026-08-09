import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import '../PageShell.css';

type ProjectTab = 'overview' | 'milestones' | 'center';

export default function Project() {
  const { t } = useTranslation();
  const [activeTab, setActiveTab] = useState<ProjectTab>('overview');

  return (
    <div className="page-shell">
      {/* Sub Hero */}
      <div className="page-hero" style={{ background: 'linear-gradient(135deg, #115ec9 0%, #0f172a 100%)' }}>
        <div className="container">
          <div className="page-hero-badge">{t('project.badge')}</div>
          <h1>{t('project.title')}</h1>
          <p>{t('project.subtitle')}</p>
        </div>
      </div>

      <div className="container page-content" style={{ marginTop: '30px' }}>
        {/* ── 3-WAY TAB CONTROLLER ── */}
        <div className="portal-tab-container">
          <button 
            className={`portal-tab-btn ${activeTab === 'overview' ? 'active' : ''}`}
            onClick={() => setActiveTab('overview')}
          >
            {t('project.tabOverview')}
          </button>
          <button 
            className={`portal-tab-btn ${activeTab === 'milestones' ? 'active' : ''}`}
            onClick={() => setActiveTab('milestones')}
          >
            {t('project.tabMilestones')}
          </button>
          <button 
            className={`portal-tab-btn ${activeTab === 'center' ? 'active' : ''}`}
            onClick={() => setActiveTab('center')}
          >
            {t('project.tabCenter')}
          </button>
        </div>

        {/* ── TAB CONTENT 1: OVERVIEW (사업 개요) ── */}
        {activeTab === 'overview' && (
          <section className="content-section" style={{ textAlign: 'left', marginTop: '24px' }}>
            <div className="section-header-border">
              <h2>{t('project.tabOverview')}</h2>
            </div>
            <div style={{ lineHeight: '1.8', color: '#334155', fontSize: '0.98rem', display: 'flex', flexDirection: 'column', gap: '20px' }}>
              <p>
                {t('project.overviewDesc')}
              </p>
              <div style={{ background: 'var(--bg-sub)', border: '1px solid var(--border)', padding: '24px', borderRadius: '4px' }}>
                <h4 style={{ margin: '0 0 12px', fontSize: '1rem', fontWeight: 800, color: '#0f172a' }}>🎯 사업의 3대 핵심 기둥 (Three Core Pillars)</h4>
                <ul style={{ margin: 0, paddingLeft: '20px', display: 'flex', flexDirection: 'column', gap: '8px' }}>
                  <li><strong>체육 수련 (Sports)</strong>: 전국 종카 학교 사범 파견을 통한 청소년 신체 단련 및 자존감 고취</li>
                  <li><strong>보건 위생 (Health)</strong>: 개인위생 지침, 감염병 대처, 성교육 가이드라인 개발 및 배포</li>
                  <li><strong>인성 덕목 (Values)</strong>: 태권도 5대 정신을 결합한 사회 공동체적 규범과 가치관 확립</li>
                </ul>
              </div>
            </div>
          </section>
        )}

        {/* ── TAB CONTENT 2: MILESTONES (사업 추진 현황) ── */}
        {activeTab === 'milestones' && (
          <section className="content-section" style={{ textAlign: 'left', marginTop: '24px' }}>
            <div className="section-header-border">
              <h2>{t('project.tabMilestones')}</h2>
            </div>
            <p style={{ color: 'var(--text-muted)', marginBottom: '32px', fontSize: '0.9rem' }}>
              연도별 세부 추진 실적 및 향후 계획 로드맵 정보입니다.
            </p>

            {/* Timeline Layout */}
            <div className="timeline-container" style={{ display: 'flex', flexDirection: 'column', gap: '24px', position: 'relative', paddingLeft: '24px', borderLeft: '2px solid var(--accent)' }}>
              {[
                { year: '2023', title: t('project.timeline.t2023'), desc: t('project.timeline.d2023') },
                { year: '2024', title: t('project.timeline.t2024'), desc: t('project.timeline.d2024') },
                { year: '2025', title: t('project.timeline.t2025'), desc: t('project.timeline.d2025') },
                { year: '2026', title: t('project.timeline.t2026'), desc: t('project.timeline.d2026') }
              ].map((step, idx) => (
                <div className="timeline-step" key={idx} style={{ position: 'relative' }}>
                  {/* Circle Pin */}
                  <div style={{ position: 'absolute', left: '-31px', top: '4px', width: '12px', height: '12px', borderRadius: '50%', background: 'var(--accent)', border: '2px solid #ffffff' }} />
                  <span style={{ fontSize: '0.85rem', fontWeight: 800, color: 'var(--accent)', textTransform: 'uppercase' }}>{step.year}</span>
                  <h4 style={{ fontSize: '1.05rem', fontWeight: 800, margin: '4px 0 8px', color: '#0f172a' }}>{step.title}</h4>
                  <p style={{ fontSize: '0.9rem', color: '#475569', margin: 0, lineHeight: '1.5' }}>{step.desc}</p>
                </div>
              ))}
            </div>
          </section>
        )}

        {/* ── TAB CONTENT 3: ICONIC CENTER (센터 건립 정보) ── */}
        {activeTab === 'center' && (
          <section className="content-section" style={{ textAlign: 'left', marginTop: '24px' }}>
            <div className="section-header-border">
              <h2>{t('project.tabCenter')}</h2>
            </div>
            <p style={{ lineHeight: '1.6', color: '#475569', marginBottom: '24px', fontSize: '0.92rem' }}>
              {t('project.centerDesc')}
            </p>

            {/* 65% Construction Progress Banner */}
            <div style={{ background: '#ffffff', border: '1px solid #cbd5e1', borderLeft: '5px solid var(--accent)', borderRadius: '2px', padding: '24px', marginBottom: '32px', boxShadow: '0 1px 3px rgba(0,0,0,0.02)' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '10px' }}>
                <span style={{ fontSize: '0.95rem', fontWeight: 800, color: '#0f172a' }}>🏗️ {t('project.centerProgressTitle')}</span>
                <span style={{ fontSize: '1.1rem', fontWeight: 900, color: 'var(--accent)' }}>65%</span>
              </div>
              {/* Progress bar */}
              <div style={{ width: '100%', height: '14px', background: '#e2e8f0', borderRadius: '99px', overflow: 'hidden', boxShadow: 'inset 0 1px 3px rgba(0,0,0,0.06)' }}>
                <div 
                  key={activeTab} // 탭이 바뀔 때마다 완전히 새로 마운트시켜 100% 애니메이션을 발생시킵니다.
                  className="animate-progress-65"
                  style={{ 
                    width: '0%', // 0%에서 시작해 애니메이션에 의해 65%로 채워짐
                    height: '100%', 
                    background: 'linear-gradient(90deg, var(--accent) 0%, #f97316 100%)', 
                    borderRadius: '99px',
                    boxShadow: '0 1px 2px rgba(249, 115, 22, 0.2)'
                  }} 
                />
              </div>
              <p style={{ fontSize: '0.82rem', color: 'var(--text-muted)', marginTop: '8px', margin: '8px 0 0' }}>
                {t('project.centerProgressDesc')}
              </p>
            </div>

            {/* Facility specs table */}
            <h4 style={{ fontSize: '1rem', fontWeight: 800, color: '#0f172a', marginBottom: '12px' }}>🏢 {t('project.centerTableTitle')}</h4>
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
                    <td>국제 규격 경기 연출, 청소년 대규모 가치 훈련 및 합동 심사</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </section>
        )}
      </div>
    </div>
  );
}
