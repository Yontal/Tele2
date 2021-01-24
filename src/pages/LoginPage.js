import React, {useState, useEffect, useContext} from 'react';
import {View, Text, StyleSheet, Button, TextInput} from 'react-native';
import {AppContext} from '../provider/ContextProvider';
import * as firebase from 'firebase';
import {IS_REGISTRATED} from '../store/actions';
import CustomInput from '../components/CustomInput';
import CustomButton from '../components/CustomButton';
import ErrorMessage from '../components/ErrorMessage';

const LoginPage = ({navigation}) => {
  const [state, dispatch] = useContext(AppContext);
  const [login, setLogin] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const signIn = async (email, password) => {
    firebase.default
      .auth()
      .signInWithEmailAndPassword(email, password)
      .then(() => {
        dispatch({type: IS_REGISTRATED, payload: true});
      })
      .catch((err) => {
        switch (err.code) {
          case 'auth/invalid-email': {
            setError('Неверный формат электронной почты');
            break;
          }
          case 'auth/user-disabled': {
            setError('Пользователь заблокирован');
            break;
          }
          case 'auth/user-not-found': {
            setError('Пользователь не найден');
            break;
          }
          case 'auth/wrong-password': {
            setError('Неверный пароль');
            break;
          }
        }
      });
  };

  useEffect(() => {
    if (state.isRegistred) {
      navigation.navigate('AUTHCODE_SCREEN');
    }
  }, [state.isRegistred]);

  useEffect(() => {
    const unsubscribe = firebase.default.auth().onAuthStateChanged((user) => {
      if (user) {
        dispatch({type: IS_REGISTRATED, payload: true});
        navigation.navigate('AUTHCODE_SCREEN');
      } else {
      }
    });
    return () => unsubscribe();
  }, []);

  return (
    <View style={styles.container}>
      <Text style={styles.textBold}>Авторизация</Text>
      <CustomInput
        placeholder="Email"
        textContentType="emailAddress"
        onChangeText={(login) => setLogin(login)}
        autoCapitalize="none"
        style={styles.input}
      />
      <CustomInput
        placeholder="Пароль"
        textContentType="password"
        onChangeText={(password) => setPassword(password)}
        autoCapitalize="none"
        style={styles.input}
      />
      {error ? <ErrorMessage>{error}</ErrorMessage> : null}
      <CustomButton onPress={() => signIn(login, password)}>Войти</CustomButton>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: '5%',
  },
  textBold: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  input: {
    width: '100%',
  },
  button: {},
});

export default LoginPage;
