import React, {useContext} from 'react';
import {View, Text, Button, StyleSheet} from 'react-native';
import * as firebase from 'firebase';
import {AppContext} from '../provider/ContextProvider';
import {IS_AUTHENTICATED, IS_REGISTRATED} from '../store/actions';
import EncryptedStore from '../api/EncryptedStore';
import CustomButton from '../components/CustomButton';

const MainPage = (props) => {
  const [state, dispatch] = useContext(AppContext);
  const encryptedStore = new EncryptedStore();

  const logout = async () => {
    await encryptedStore.removeAuthCode();
    await firebase.default.auth().signOut();
    dispatch({type: IS_AUTHENTICATED, payload: false});
    dispatch({type: IS_REGISTRATED, payload: false});
  };
  return (
    <View style={styles.container}>
      <CustomButton onPress={() => logout()}>Выйти</CustomButton>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default MainPage;
