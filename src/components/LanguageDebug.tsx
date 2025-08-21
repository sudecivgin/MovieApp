// src/components/LanguageDebug.tsx
import React, { useEffect, useState } from 'react';
import { View, Text, Button } from 'react-native';
import { useTranslation } from 'react-i18next';
import i18n from '../i18n';
import remoteConfig from '@react-native-firebase/remote-config';
import { changeLanguage, loadTranslationsFromRC } from '../i18n/rcLoader';

const LanguageDebug: React.FC = () => {
  const { t } = useTranslation();
  const [lang, setLang] = useState(i18n.language);
  const [rcVer, setRcVer] = useState<string>('');

  useEffect(() => {
    const onChanged = (lng: string) => setLang(lng);
    i18n.on('languageChanged', onChanged);
    setRcVer(remoteConfig().getValue('translations_version').asString());
    return () => i18n.off('languageChanged', onChanged);
  }, []);

  const switchTo = async (lng: 'tr' | 'en' | 'es') => {
    await changeLanguage(lng);              // RC'den çek + i18n.changeLanguage
    setRcVer(remoteConfig().getValue('translations_version').asString());
  };

  const refetchRC = async () => {
    // Dev'de RC’yi zorla tazelemek istersen:
    await remoteConfig().setConfigSettings({ minimumFetchIntervalMillis: 0 });
    await loadTranslationsFromRC(); // aktif dil için yeniden çek
    setRcVer(remoteConfig().getValue('translations_version').asString());
  };

  return (
    <View style={{ padding: 12, backgroundColor: '#333' }}>
      <Text style={{ color: '#fff' }}>i18n.language: {lang}</Text>
      <Text style={{ color: '#fff' }}>t('WELCOME'): {t('WELCOME')}</Text>
      <Text style={{ color: '#fff' }}>RC version: {rcVer || '(yok)'}</Text>

      <View style={{ flexDirection: 'row', gap: 8, marginTop: 8 }}>
        <Button title="TR" onPress={() => switchTo('tr')} />
        <Button title="EN" onPress={() => switchTo('en')} />
        <Button title="ES" onPress={() => switchTo('es')} />
        <Button title="Refetch RC" onPress={refetchRC} />
      </View>
    </View>
  );
};

export default LanguageDebug;
