import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import enTrans from './translation/en.json';
import viTrans from './translation/vi.json';

i18n
  .use(initReactI18next)
  .init({
    resources: {
      en: {
        translation: enTrans,
      },
      vi: {
        translation: viTrans,
      }
    },
    fallbackLng: 'vi'
  });

export default i18n;