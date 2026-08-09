import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import '../PageShell.css';

interface ProgramDetail {
  id: string;
  category: 'sports' | 'health' | 'value' | 'cooperation';
  icon: string;
  title: string;
  desc: string;
  details: string[];
  pdfLink: string;
}

export default function Programs() {
  const { t } = useTranslation();
  const [selectedProgram, setSelectedProgram] = useState<ProgramDetail | null>(null);

  const programsData: ProgramDetail[] = [
    {
      id: 'prog-1',
      category: 'sports',
      icon: '🥋',
      title: t('programs.taekwondo.title'),
      desc: t('programs.taekwondo.desc'),
      details: [
        '대상: 부탄 9개 지역 내 초·중·고 청소년 수련생',
        '핵심 내용: 태권도 기본 품새, 겨루기 기술 및 국기원 공인 단(품)증 취득 프로세스 지원',
        '성과: ODA 사업 1차 만족도 4.00/5.00점 획득, 신체적 역량 증대 확인',
      ],
      pdfLink: 'https://wevalueatebhutan-6a832.web.app/taekwondo_manual.pdf', // Mock / placeholder to download
    },
    {
      id: 'prog-2',
      category: 'health',
      icon: '🩺',
      title: t('programs.health.title'),
      desc: t('programs.health.desc'),
      details: [
        '대상: 부탄 현지 학교 및 훈련센터 청소년',
        '핵심 내용: 기초 개인위생(손 씻기, 양치 등), 구급 상황 대처법 및 청소년기 성교육/감염병 예방 교육',
        '성과: 보건위생 인지도 85% 상승, 시범 운영 만족도 4.13/5.00점',
      ],
      pdfLink: 'https://wevalueatebhutan-6a832.web.app/health_manual.pdf',
    },
    {
      id: 'prog-3',
      category: 'value',
      icon: '🤝',
      title: t('programs.value.title'),
      desc: t('programs.value.desc'),
      details: [
        '대상: 부탄 전역 태권도 시범 운영학교 교육생',
        '핵심 내용: 태권도 5대 정신(예의, 염치, 인내, 극기, 백절불굴)을 기반으로 한 부탄 청소년 맞춤형 인성 덕목 개발',
        '성과: 정서적 조절 능력 향상 증명, 만족도 4.14/5.00점(최고 만족)',
      ],
      pdfLink: 'https://wevalueatebhutan-6a832.web.app/value_manual.pdf',
    },
    {
      id: 'prog-4',
      category: 'cooperation',
      icon: '🌍',
      title: 'KOICA × BTF ODA Partnership',
      desc: '한국과 부탄의 청소년 체육 발전을 위한 국제 협력 프로젝트 정보와 연차 보고서 아카이브를 제공합니다.',
      details: [
        '기관: 한국국제협력단(KOICA) 지원, 부탄태권도연맹(BTF) 현지 수행',
        '범위: 태권도 기자재 무상 원조, 지도자 역량강화 세미나 개최, 현지 태권도원(아이코닉 센터) 건립 추진',
        '의의: 스포츠를 활용한 글로벌 가치 교육 실천 모델 정립',
      ],
      pdfLink: 'https://wevalueatebhutan-6a832.web.app/annual_report.pdf',
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
        {/* Category: Sports Education */}
        <section className="content-section">
          <h2 className="program-category-title">🎯 Sports & Martial Arts (스포츠 수련 교육)</h2>
          <div className="programs-grid">
            {programsData.filter(p => p.category === 'sports').map((p) => (
              <div className="program-card" key={p.id} onClick={() => setSelectedProgram(p)}>
                <div className="program-card-icon">{p.icon}</div>
                <h3>{p.title}</h3>
                <p>{p.desc}</p>
                <span className="program-card-action">상세보기 &amp; 다운로드 →</span>
              </div>
            ))}
          </div>
        </section>

        {/* Category: Health & Value Education */}
        <section className="content-section">
          <h2 className="program-category-title">🌱 Health &amp; Value Development (보건 및 가치 성장 교육)</h2>
          <div className="programs-grid">
            {programsData.filter(p => p.category === 'health' || p.category === 'value').map((p) => (
              <div className="program-card" key={p.id} onClick={() => setSelectedProgram(p)}>
                <div className="program-card-icon">{p.icon}</div>
                <h3>{p.title}</h3>
                <p>{p.desc}</p>
                <span className="program-card-action">상세보기 &amp; 다운로드 →</span>
              </div>
            ))}
          </div>
        </section>

        {/* Category: Cooperation */}
        <section className="content-section" style={{ paddingBottom: '40px' }}>
          <h2 className="program-category-title">🌐 Global Partnership &amp; ODA (국제협력 및 공적 개발 원조)</h2>
          <div className="programs-grid">
            {programsData.filter(p => p.category === 'cooperation').map((p) => (
              <div className="program-card" key={p.id} onClick={() => setSelectedProgram(p)}>
                <div className="program-card-icon">{p.icon}</div>
                <h3>{p.title}</h3>
                <p>{p.desc}</p>
                <span className="program-card-action">상세보기 &amp; 다운로드 →</span>
              </div>
            ))}
          </div>
        </section>
      </div>

      {/* ── INTERACTIVE DETAIL MODAL POPUP ── */}
      {selectedProgram && (
        <div className="modal-overlay" onClick={() => setSelectedProgram(null)}>
          <div className="modal-content-box" onClick={(e) => e.stopPropagation()}>
            {/* Modal Header */}
            <div className="modal-header">
              <h3>{selectedProgram.icon} {selectedProgram.title}</h3>
              <button className="modal-close-btn" onClick={() => setSelectedProgram(null)}>×</button>
            </div>
            
            {/* Modal Body */}
            <div className="modal-body">
              <p className="modal-desc">{selectedProgram.desc}</p>
              
              <h4 style={{ fontSize: '0.9rem', fontWeight: 800, color: '#0f172a', margin: '0 0 10px' }}>
                📋 주요 교육 개요 &amp; 성과 지표
              </h4>
              <ul className="modal-detail-list">
                {selectedProgram.details.map((detail, idx) => (
                  <li key={idx}>• {detail}</li>
                ))}
              </ul>
            </div>

            {/* Modal Footer */}
            <div className="modal-footer">
              <a 
                href={selectedProgram.pdfLink} 
                download
                className="btn btn-primary"
                style={{ fontSize: '0.88rem', fontWeight: 700, padding: '10px 20px' }}
                onClick={() => alert('교육용 교재 매핑 PDF 다운로드를 시작합니다.')}
              >
                💾 교재 PDF 다운로드
              </a>
              <button 
                className="btn btn-outline" 
                style={{ fontSize: '0.88rem', fontWeight: 700, padding: '8px 16px', borderColor: 'var(--border)' }}
                onClick={() => setSelectedProgram(null)}
              >
                닫기
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
