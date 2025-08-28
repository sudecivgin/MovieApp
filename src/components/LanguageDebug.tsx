// src/components/LanguageDebug.tsx
import React from 'react';
import { View, Text, Button } from 'react-native';
import { useLang } from '../providers/firebase/LangProvider';

const LanguageDebug = () => {
  const { lang, setLang, t } = useLang();
  return (
    <View style={{ padding: 16 }}>
      <Text style={{ color: '#fff', marginBottom: 8 }}>{t('WELCOME')}</Text>
      <Text style={{ color: '#aaa', marginBottom: 8 }}>Lang: {lang}</Text>
      <View style={{ flexDirection: 'row', gap: 8 }}>
        <Button title="TR" onPress={() => setLang('tr')} />
        <Button title="EN" onPress={() => setLang('en')} />
        <Button title="ES" onPress={() => setLang('es')} />
      </View>
    </View>
  );
};

export default LanguageDebug;
