/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */
import 'react-native-gesture-handler';
import React, {useState, useEffect} from 'react';
import {StyleSheet} from 'react-native';
import {AppContext, AppProvider} from './src/provider/ContextProvider';
import {NavigationContainer} from '@react-navigation/native';
import LoginStackNavigator from './src/navigation/LoginStackNavigator';
import MainStackNavigator from './src/navigation/MainStackNavigator';
import {firebaseConfig, connectFirebase} from './src/config/firebase';

const App: () => React$Node = () => {
  const [firebaseLoaded, setFirebaseLoaded] = useState(false);
  useEffect(() => {
    if (!firebaseLoaded) {
      connectFirebase(firebaseConfig).then(() => setFirebaseLoaded(true));
    }
  }, [firebaseLoaded]);
  return (
    <AppProvider>
      {firebaseLoaded ? (
        <NavigationContainer>
          <AppContext.Consumer>
            {(ctx) => {
              const [state, dispatch] = ctx;
              return state.isRegistred && state.isAuthenticated ? (
                <MainStackNavigator />
              ) : (
                <LoginStackNavigator />
              );
            }}
          </AppContext.Consumer>
        </NavigationContainer>
      ) : null}
    </AppProvider>
  );
};

const styles = StyleSheet.create({});

export default App;
