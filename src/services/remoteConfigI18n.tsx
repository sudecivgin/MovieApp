import remoteConfig from '@react-native-firebase/remote-config';

export type FlatDict = Record<string, string>;
export type SupportedLang = 'en' | 'tr' | 'es';

// RC param adları:
const RC_EN = 'languages_en';
const RC_TR = 'languages_tr';
const RC_ES = 'languages_es';

const keyOf = (lang: SupportedLang) =>
  lang === 'tr' ? RC_TR : lang === 'es' ? RC_ES : RC_EN;

function safeParse<T>(s: string | null | undefined): T | null {
  if (!s) return null;
  try { return JSON.parse(s) as T; } catch { return null; }
}

export async function initRemoteConfig(defaults: {
  en: FlatDict; tr: FlatDict; es: FlatDict;
}) {

  await remoteConfig().setDefaults({
    [RC_EN]: JSON.stringify(defaults.en),
    [RC_TR]: JSON.stringify(defaults.tr),
    [RC_ES]: JSON.stringify(defaults.es),
  });

  await remoteConfig().setConfigSettings({
    minimumFetchIntervalMillis: __DEV__ ? 0 : 3600 * 1000,
    fetchTimeMillis: 10_000,
  });

  try { await remoteConfig().fetchAndActivate(); }
  catch (e) { console.warn('Remote Config fetch/activate failed:', e); }
}

export function getFlatDictFromRC(lang: SupportedLang): FlatDict | null {
  const raw = remoteConfig().getString(keyOf(lang));
  return safeParse<FlatDict>(raw);
}
