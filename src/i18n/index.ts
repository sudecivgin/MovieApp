import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import * as RNLocalize from 'react-native-localize';

import en from '../locales/en.flat.json';
import tr from '../locales/tr.flat.json';
import es from '../locales/es.flat.json';

type SupportedLang = 'en' | 'tr' | 'es';

function detectLang(): SupportedLang {
  const locales = RNLocalize?.getLocales?.() ?? [];

  for (const loc of locales) {
    const code = (loc.languageCode || '').toLowerCase();
    if (code === 'tr') return 'tr';
    if (code === 'es') return 'es';
    if (code === 'en') return 'en';

    const tag = (loc.languageTag || '').toLowerCase();
    if (tag.startsWith('tr')) return 'tr';
    if (tag.startsWith('es')) return 'es';
    if (tag.startsWith('en')) return 'en';
  }
  return 'en'; 
}

const lng: SupportedLang = detectLang();

i18n
  .use(initReactI18next)
  .init({
    lng,
    fallbackLng: 'en',
    resources: {
      en: { translation: en },
      tr: { translation: tr },
      es: { translation: es },
    },
    interpolation: { escapeValue: false },
  });

export default i18n;
