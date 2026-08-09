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
        '대상: 부탄 10개 종카(Dzongkhag) 내 초·중·고교 및 교육 기관',
        '지원 사항: 공인 유단자 사범 무료 파견 및 방과 후 교실 수련 프로그램 개설',
        '혜택: 국기원 공인 단(품) 심사 응시 지원 및 전용 기자재(도복, 매트 등) 대여',
      ],
    },
    {
      id: 'prog-2',
      title: t('programs.health.title'),
      desc: t('programs.health.desc'),
      details: [
        '대상: 전국 예선 통과 엘리트 선수 및 단원',
        '훈련 요강: 주 5회 강도 높은 체력 및 겨루기 기량 평가 시스템 작동',
        '주요 대외 활동: 부탄 독립 기념식, 국왕 탄신 축하 행사 및 한-부탄 교류전 축하 시범 공연 참가',
      ],
    },
    {
      id: 'prog-3',
      title: t('programs.value.title'),
      desc: t('programs.value.desc'),
      details: [
        '대상: 부탄 각 시범학교 전임 사범 및 주니어 리더',
        '수강 과목: 올바른 지도 교수법, 태권도 5대 덕목 연계 인성 지도, 스포츠 응급 처치 및 심폐소생술(CPR)',
        '주기: 매년 2회 팀푸 연맹 본부에서 집중 세미나 주관',
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
          <h2 className="program-category-title">핵심 교육 보급 사업 (BTF Core Programs)</h2>
          <div className="programs-grid" style={{ marginTop: '24px' }}>
            {programsData.map((p, idx) => (
              <div 
                className={`program-card reveal-fade reveal-delay-${idx + 1}`} 
                key={p.id} 
                onClick={() => setSelectedProgram(p)}
              >
                <h3>{p.title}</h3>
                <p>{p.desc}</p>
                <span className="program-card-action">수련 안내 보기 →</span>
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
                📌 세부 운영 요강 및 지원 대상
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
                닫기
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
