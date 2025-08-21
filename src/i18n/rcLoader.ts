import remoteConfig from '@react-native-firebase/remote-config';
import * as RNLocalize from 'react-native-localize';
import i18n from '.'; 

type Dict = Record<string, string>;
type RCShape = Dict | { common?: Dict; onboarding?: Dict };

export async function initRemoteConfig() {
  await remoteConfig().setConfigSettings({
    fetchTimeMillis: 10_000,                               
    minimumFetchIntervalMillis: __DEV__ ? 0 : 12 * 60 * 60 * 1000,
  });

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
  const obj = data as any;
  if (obj?.common || obj?.onboarding) {
    if (obj.common) i18n.addResourceBundle(lang, 'common', obj.common, true, true);
    if (obj.onboarding) i18n.addResourceBundle(lang, 'onboarding', obj.onboarding, true, true);
  } else {
    i18n.addResourceBundle(lang, 'common', data as Dict, true, true);
  }
}

export async function loadTranslationsFromRC(lang?: string) {
  const deviceLang = RNLocalize.getLocales()?.[0]?.languageCode?.toLowerCase() ?? 'tr';
  const target = (lang ?? i18n.language ?? deviceLang).toLowerCase();

  await remoteConfig().fetchAndActivate();

  let loaded = false;

  const main = remoteConfig().getValue(`translations_${target}`).asString();
  if (main) {
    try {
      mergeIntoI18n(target, JSON.parse(main) as RCShape);
      loaded = true;
    } catch (e) {
      if (__DEV__) console.warn('[RC] parse error (main):', e);
    }
  }

  const common = remoteConfig().getValue(`translations_${target}_common`).asString();
  if (common) {
    try {
      i18n.addResourceBundle(target, 'common', JSON.parse(common) as Dict, true, true);
      loaded = true;
    } catch (e) {
      if (__DEV__) console.warn('[RC] parse error (common):', e);
    }
  }

  const onboarding = remoteConfig().getValue(`translations_${target}_onboarding`).asString();
  if (onboarding) {
    try {
      i18n.addResourceBundle(target, 'onboarding', JSON.parse(onboarding) as Dict, true, true);
      loaded = true;
    } catch (e) {
      if (__DEV__) console.warn('[RC] parse error (onboarding):', e);
    }
  }

  return loaded;
}
export async function changeLanguage(lang: string) {
  const target = (lang || 'tr').toLowerCase();
  await loadTranslationsFromRC(target);

  await i18n.changeLanguage(target);
  return target;
}
