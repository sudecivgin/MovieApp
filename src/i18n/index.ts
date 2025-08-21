import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import * as RNLocalize from "react-native-localize";
import { LANGUAGES } from "../locales/languages"; 

const deviceLang =
  RNLocalize.getLocales()?.[0]?.languageCode?.toLowerCase() ?? "tr";

i18n
  .use(initReactI18next)
  .init({
    lng: deviceLang,
    fallbackLng: "tr",
    ns: ["common", "onboarding"],
    defaultNS: "common",
    resources: {
      tr: { ...LANGUAGES.tr },
      en: { ...LANGUAGES.en },
      es: { ...LANGUAGES.es },
    },

    interpolation: { escapeValue: false },
  });

export default i18n;
