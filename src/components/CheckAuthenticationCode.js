import React, {useState, useEffect} from 'react';
import {View, Text, TextInput, StyleSheet} from 'react-native';
import PropTypes from 'prop-types';
import EncryptedStore from '../api/EncryptedStore';
import FingerprintScanner from 'react-native-fingerprint-scanner';
import CustomInput from '../components/CustomInput';
import ErrorMessage from '../components/ErrorMessage';

const CheckAuthenticationCode = ({onAuthenticationCodeChecked}) => {
  const [code, setCode] = useState('');
  const [error, setError] = useState('');
  const encryptedStore = new EncryptedStore();

  const checkCode = async (code) => {
    setError();
    if (code.length === 4) {
      const storedCode = await encryptedStore.getAuthCode();
      if (storedCode === code) {
        onAuthenticationCodeChecked();
      } else {
        setError('Введен неверный код');
      }
    }
  };

  const startFingerPrintScanner = async () => {
    const BiometricsAvailability = await FingerprintScanner.isSensorAvailable();
    if (
      BiometricsAvailability === 'Biometrics' ||
      BiometricsAvailability === 'Face ID' ||
      BiometricsAvailability === 'Touch ID'
    ) {
      FingerprintScanner.authenticate({title: 'Войти в приложение'})
        .then(() => {
          onAuthenticationCodeChecked();
          console.log('Fingerprint readed');
        })
        .catch(() => {
          console.log('Error while fingerprint reading');
          setError('Ошибка распознавания отпечатка');
          FingerprintScanner.release();
        });
    }
  };

  useEffect(() => {
    const errors = checkCode(code);
  }, [code]);

  useEffect(() => {
    startFingerPrintScanner();
  }, []);

  return (
    <View style={styles.container}>
      <Text style={styles.textBold}>Введите код доступа</Text>
      <CustomInput
        placeholder="Введите код"
        keyboardType="phone-pad"
        maxLength={4}
        textContentType="password"
        value={code}
        onChangeText={(text) => setCode(text)}
        style={styles.input}
      />
      <ErrorMessage>{error}</ErrorMessage>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
  },
  textBold: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  input: {
    width: 200,
  },
});

CheckAuthenticationCode.propTypes = {
  onAuthenticationCodeChecked: PropTypes.func.isRequired,
};

export {CheckAuthenticationCode};
