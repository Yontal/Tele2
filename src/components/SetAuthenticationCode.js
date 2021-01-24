import React, {useState, useEffect} from 'react';
import {View, Text, TextInput, StyleSheet} from 'react-native';
import PropTypes from 'prop-types';
import EncryptedStore from '../api/EncryptedStore';
import CustomInput from '../components/CustomInput';
import ErrorMessage from '../components/ErrorMessage';

const SetAuthenticationCode = ({onAuthenticationCodeSet}) => {
  const [code, setCode] = useState('');
  const [codeConfirmation, setCodeConfirmation] = useState('');
  const [isInputValid, setIsInputValid] = useState(false);
  const encryptedStore = new EncryptedStore();

  const checkCodes = (code, codeConfirmation) => {
    const errors = [];
    if (code) {
      code.length < 4 && errors.push('Код должен состоять из 4 символов');
      code !== codeConfirmation && errors.push('Введенные коды не одинаковые');
    }
    return errors;
  };

  const setAuthCode = async (code) => {
    await encryptedStore.setAuthCode(code);
  };

  useEffect(() => {
    const errors = checkCodes(code, codeConfirmation);
    code && errors.length === 0
      ? setIsInputValid(true)
      : setIsInputValid(false);
  }, [code, codeConfirmation]);

  useEffect(() => {
    if (isInputValid) {
      setAuthCode(code);
      onAuthenticationCodeSet();
    }
  }, [isInputValid]);

  return (
    <View style={styles.container}>
      <Text style={styles.textBold}>Придумайте код доступа</Text>
      <Text>Он бдует использоваться для каждого входа в приложение</Text>
      <CustomInput
        placeholder="Введите код"
        keyboardType="phone-pad"
        maxLength={4}
        textContentType="password"
        value={code}
        onChangeText={(text) => setCode(text)}
        style={styles.input}
      />
      <Text>Повторите код</Text>
      <CustomInput
        placeholder="Подтвердите код"
        keyboardType="phone-pad"
        maxLength={4}
        textContentType="password"
        value={codeConfirmation}
        onChangeText={(text) => setCodeConfirmation(text)}
        style={styles.input}
      />
      {checkCodes(code, codeConfirmation).map((err, index) => (
        <ErrorMessage key={index}>{err}</ErrorMessage>
      ))}
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

SetAuthenticationCode.propTypes = {
  onAuthenticationCodeSet: PropTypes.func.isRequired,
};

export {SetAuthenticationCode};
