import React, { createContext, useContext, useEffect, useMemo, useState } from 'react';
import i18n from './index';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { loadLanguageBundle } from './rcLoader';

export type SupportedLang = 'en' | 'tr' | 'es';
const STORAGE_KEY = '@lang';

type LangCtx = {
  lang: SupportedLang;
  setLang: (l: SupportedLang) => void;
  t: (key: string, options?: any) => string;
};

const Ctx = createContext<LangCtx | null>(null);

const LangProviderImpl: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const initial = (i18n.language?.slice(0, 2) as SupportedLang) || 'en';
  const [lang, setLangState] = useState<SupportedLang>(initial);

  // i18n dil değişince state'i güncel tut
  useEffect(() => {
    const onChanged = (lng: string) => {
      const short = (lng?.slice(0, 2) as SupportedLang) || 'en';
      setLangState(short);
    };
    i18n.on('languageChanged', onChanged);
    return () => i18n.off('languageChanged', onChanged);
  }, []);

  // Kaydedilmiş dil varsa açılışta onu yükle
  useEffect(() => {
    (async () => {
      const saved = (await AsyncStorage.getItem(STORAGE_KEY)) as SupportedLang | null;
      if (saved && ['en','tr','es'].includes(saved)) {
        loadLanguageBundle(saved); // RC varsa override et
        i18n.changeLanguage(saved);
      }
    })();
  }, []);

  const setLang = (l: SupportedLang) => {
    // RC'den dil paketini yüklemeyi dene (başarısızsa local fallback zaten var)
    loadLanguageBundle(l);
    i18n.changeLanguage(l);
    AsyncStorage.setItem(STORAGE_KEY, l).catch(() => {});
  };

  const t = (key: string, options?: any) => i18n.t(key, options) as string;

  const value = useMemo(() => ({ lang, setLang, t }), [lang]);
  return <Ctx.Provider value={value}>{children}</Ctx.Provider>;
};

export const LangProvider = LangProviderImpl;
export default LangProviderImpl;

export function useLang() {
  const ctx = useContext(Ctx);
  if (!ctx) throw new Error('useLang must be used within LangProvider');
  return ctx;
}