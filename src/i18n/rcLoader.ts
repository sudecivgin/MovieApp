// src/i18n/rcLoader.ts
import remoteConfig from '@react-native-firebase/remote-config';
import i18n from './index';
import RNLocalize from 'react-native-localize';

const RC_KEYS = {
  en: 'languages_en',
  tr: 'languages_tr',
  es: 'languages_es',
} as const;

type SupportedLang = keyof typeof RC_KEYS;
const SUPPORTED: SupportedLang[] = ['en', 'tr', 'es'];

/** findBestAvailableLanguage yerine getLocales ile tespit */
function detectLang(): SupportedLang {
  try {
    const locales = RNLocalize.getLocales?.() ?? [];
    // Örn: [{ languageCode: 'tr', countryCode: 'TR', languageTag: 'tr-TR', ...}]
    for (const loc of locales) {
      const code = (loc.languageCode || '').toLowerCase();
      if (SUPPORTED.includes(code as SupportedLang)) {
        return code as SupportedLang;
      }
      // Yedek: languageTag üzerinden bak
      const tag = (loc.languageTag || '').toLowerCase();
      if (tag.startsWith('tr')) return 'tr';
      if (tag.startsWith('es')) return 'es';
      if (tag.startsWith('en')) return 'en';
    }
  } catch {}
  return 'en';
}

export const initRemoteConfig = async () => {
  await remoteConfig().setConfigSettings({
    minimumFetchIntervalMillis: __DEV__ ? 0 : 3600 * 1000,
    fetchTimeMillis: 10_000,
  });

  try {
    await remoteConfig().fetchAndActivate();
  } catch (e) {
    if (__DEV__) console.warn('Remote Config fetch/activate failed:', e);
  }
};

/**
 * RC'den aktif dil paketini yükler.
 * - preferred verilirse onu kullanır; verilmezse cihaz dilini detectLang() ile seçer.
 * - RC JSON geçerliyse i18n bundle'ını günceller ve dili değiştirir.
 */
export const loadTranslationsFromRC = async (preferred?: SupportedLang) => {
  const lang: SupportedLang =
    (preferred && SUPPORTED.includes(preferred) ? preferred : detectLang());

  const key = RC_KEYS[lang];
  const raw = remoteConfig().getString(key);
  if (!raw) return;

  try {
    const parsed = JSON.parse(raw);
    // mevcutları override et + deep merge
    i18n.addResourceBundle(lang, 'translation', parsed, true, true);
    i18n.changeLanguage(lang);
  } catch (err) {
    if (__DEV__) console.warn('RC parse error:', err);
  }
};

export function loadLanguageBundle(lang: 'en'|'tr'|'es'): boolean {
  try {
    const map = { en: 'languages_en', tr: 'languages_tr', es: 'languages_es' } as const;
    const raw = remoteConfig().getString(map[lang]);
    if (!raw) return false;
    const parsed = JSON.parse(raw);
    i18n.addResourceBundle(lang, 'translation', parsed, true, true);
    return true;
  } catch {
    return false;
  }
}
