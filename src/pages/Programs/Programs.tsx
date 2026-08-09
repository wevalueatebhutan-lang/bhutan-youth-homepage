import { useState } from 'react';
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
  const [selectedProgram, setSelectedProgram] = useState<ProgramDetail | null>(null);

  const programsData: ProgramDetail[] = [
    {
      id: 'prog-1',
      title: t('programs.taekwondo.title'),
      desc: t('programs.taekwondo.desc'),
      details: [
        '수행 범위: 부탄 10개 지역 Dzongkhag 태권도 지부(DTA) 산하 국공립 학교',
        '지원 혜택: 공인 유단자 사범 무료 파견 수련 교실 운영 및 수련 물품 무상 원조',
        '주요 평가: 학기별 정기 승급 심사 주최 및 우수 청소년 장학 단증 수여',
      ],
    },
    {
      id: 'prog-2',
      title: t('programs.health.title'),
      desc: t('programs.health.desc'),
      details: [
        '훈련 관리: 부탄 올림픽 위원회(BOC) 스포츠 성능 평가 모델 적용 정기 훈련',
        '핵심 목표: 아시안게임, 아시아 청소년 게임 등 올림픽 위원회 주관 공식 국제대회 메달 획득',
        '대외 활동: 부탄 국왕 축하 행사 시범 공연 참가 및 글로벌 스포츠 교류전 파견',
      ],
    },
    {
      id: 'prog-3',
      title: t('programs.value.title'),
      desc: t('programs.value.desc'),
      details: [
        '연수 과목: 스포츠 과학 기초 코스(Sports Science Course), 부상 방지 응급 처치, 아동 청소년 스포츠 안전 지도법',
        '대상 범위: 전국 지부(DTA) 소속 지도 사범 및 예비 주니어 조교',
        '기대 성과: 부탄 스포츠 지도자 역량의 국제 표준화 규격 획득 및 dojang 운영 안전도 확보',
      ],
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
        <section className="content-section" style={{ paddingBottom: '40px' }}>
          <h2 className="program-category-title">{t('programs.title')} (BTF Core Programs)</h2>
          <div className="programs-grid" style={{ marginTop: '24px' }}>
            {programsData.map((p, idx) => (
              <div 
                className={`program-card reveal-fade reveal-delay-${idx + 1}`} 
                key={p.id} 
                onClick={() => setSelectedProgram(p)}
              >
                <h3>{p.title}</h3>
                <p>{p.desc}</p>
                <span className="program-card-action">{t('programs.viewDetails')} →</span>
              </div>
            ))}
          </div>
        </section>
      </div>

      {/* ── DETAIL MODAL POPUP (NO MANUAL DOWNLOAD) ── */}
      {selectedProgram && (
        <div className="modal-overlay" onClick={() => setSelectedProgram(null)}>
          <div className="modal-content-box" onClick={(e) => e.stopPropagation()}>
            {/* Modal Header */}
            <div className="modal-header">
              <h3>{selectedProgram.title}</h3>
              <button className="modal-close-btn" onClick={() => setSelectedProgram(null)}>×</button>
            </div>
            
            {/* Modal Body */}
            <div className="modal-body">
              <p className="modal-desc" style={{ marginBottom: '20px', lineHeight: '1.6' }}>{selectedProgram.desc}</p>
              
              <h4 style={{ fontSize: '0.9rem', fontWeight: 800, color: '#0f172a', margin: '0 0 10px' }}>
                {t('programs.modalDetailsTitle')}
              </h4>
              <ul className="modal-detail-list" style={{ paddingLeft: '20px', margin: 0 }}>
                {selectedProgram.details.map((detail, idx) => (
                  <li key={idx} style={{ marginBottom: '6px', fontSize: '0.88rem' }}>• {detail}</li>
                ))}
              </ul>
            </div>

            {/* Modal Footer */}
            <div className="modal-footer">
              <button 
                className="btn btn-outline" 
                style={{ fontSize: '0.88rem', fontWeight: 700, padding: '8px 16px', borderColor: 'var(--border)' }}
                onClick={() => setSelectedProgram(null)}
              >
                {t('programs.close')}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
