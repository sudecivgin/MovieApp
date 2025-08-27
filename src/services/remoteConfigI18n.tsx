import remoteConfig from '@react-native-firebase/remote-config';
import i18n from '../i18n';

type Dict = Record<string, string>;
type RCShape = Dict | { common?: Dict; onboarding?: Dict };

export async function initRemoteConfig() {
  await remoteConfig().setConfigSettings({
    minimumFetchIntervalMillis: __DEV__ ? 0 : 60 * 60 * 1000,
  fetchTimeMillis: 10_000,     });

  // JSON string olmalı
  await remoteConfig().setDefaults({
    translations_tr: '{}',
    translations_en: '{}',
    translations_es: '{}',

    translations_tr_common: '{}',
    translations_tr_onboarding: '{}',
    translations_en_common: '{}',
    translations_en_onboarding: '{}',
    translations_es_common: '{}',
    translations_es_onboarding: '{}',
  });
}

function mergeIntoI18n(lang: string, data: RCShape) {

    if (typeof data === 'object' && (data as any)?.common || (data as any)?.onboarding) {
    const obj = data as { common?: Dict; onboarding?: Dict };
    if (obj.common) i18n.addResourceBundle(lang, 'common', obj.common, true, true);
    if (obj.onboarding) i18n.addResourceBundle(lang, 'onboarding', obj.onboarding, true, true);
    return;
  }
  i18n.addResourceBundle(lang, 'common', data as Dict, true, true);
}

export async function loadTranslationsFromRC(lang: string) {
  await remoteConfig().fetchAndActivate();

  let loaded = false;

  const main = remoteConfig().getValue(`translations_${lang}`).asString();
  if (main) {
    try {
      mergeIntoI18n(lang, JSON.parse(main) as RCShape);
      loaded = true;
    } catch (e) {
      console.warn('[RC] translations parse error (main):', e);
    }
  }

  const common = remoteConfig().getValue(`translations_${lang}_common`).asString();
  if (common) {
    try {
      i18n.addResourceBundle(lang, 'common', JSON.parse(common) as Dict, true, true);
      loaded = true;
    } catch (e) {
      console.warn('[RC] translations parse error (common):', e);
    }
  }

  const onboarding = remoteConfig().getValue(`translations_${lang}_onboarding`).asString();
  if (onboarding) {
    try {
      i18n.addResourceBundle(lang, 'onboarding', JSON.parse(onboarding) as Dict, true, true);
      loaded = true;
    } catch (e) {
      console.warn('[RC] translations parse error (onboarding):', e);
    }
  }

  return loaded;
}

export async function bootstrapLanguage(lang?: string) {
  await initRemoteConfig();
  const target = lang ?? i18n.language ?? 'tr';
  await loadTranslationsFromRC(target);
  return target;
}

export async function changeLanguage(lang: string) {
  const ok = await loadTranslationsFromRC(lang);
  await i18n.changeLanguage(lang);
  if (!ok) console.warn(`[RC] ${lang} için RC verisi bulunmadı; yerel fallback .`);
}
