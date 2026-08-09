import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.tsx'
import './locales/i18n.ts' // 다국어(i18n) 설정 로드
import './index.css' // 전역 레이아웃 및 스타일 시스템 로드

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <App />
  </StrictMode>,
)
