import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import translationKO from './ko.json';
import translationEN from './en.json';

const resources = {
  ko: {
    translation: translationKO,
  },
  en: {
    translation: translationEN,
  },
};

i18n
  .use(initReactI18next)
  .init({
    resources,
    lng: 'ko', // 기본 언어: 한국어
    fallbackLng: 'ko',
    interpolation: {
      escapeValue: false, // React는 이미 XSS 방어 처리를 합니다.
    },
  });

export default i18n;
