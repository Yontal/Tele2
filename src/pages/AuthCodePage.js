import React, {useState, useEffect, useContext} from 'react';
import {View, Text, StyleSheet, Button, BackHandler} from 'react-native';
import {useFocusEffect} from '@react-navigation/native';
import EncryptedStore from '../api/EncryptedStore';
import {AppContext} from '../provider/ContextProvider';
import {IS_AUTHENTICATED} from '../store/actions';
import {SetAuthenticationCode} from '../components/SetAuthenticationCode';
import {CheckAuthenticationCode} from '../components/CheckAuthenticationCode';

const AuthCodePage = (props) => {
  const [state, dispatch] = useContext(AppContext);
  const [isAuthCodeSet, setIsAuthCodeSet] = useState(false);
  const encryptedStore = new EncryptedStore();

  const authenticate = () => {
    dispatch({type: IS_AUTHENTICATED, payload: true});
  };

  const checkIfAuthCodeExists = async () => {
    const authCode = await encryptedStore.getAuthCode();
    authCode ? setIsAuthCodeSet(true) : setIsAuthCodeSet(false);
  };

  useEffect(() => {
    checkIfAuthCodeExists();
  }, []);

  useFocusEffect(
    React.useCallback(() => {
      const onBackPress = () => {
        return true;
      };

      BackHandler.addEventListener('hardwareBackPress', onBackPress);

      return () =>
        BackHandler.removeEventListener('hardwareBackPress', onBackPress);
    }, [dispatch]),
  );

  return (
    <View style={styles.container}>
      {isAuthCodeSet ? (
        <CheckAuthenticationCode
          onAuthenticationCodeChecked={() => authenticate()}
        />
      ) : (
        <SetAuthenticationCode onAuthenticationCodeSet={() => authenticate()} />
      )}
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
});

export default AuthCodePage;
