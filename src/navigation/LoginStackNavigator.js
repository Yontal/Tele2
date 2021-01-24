import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import LoginPage from '../pages/LoginPage';
import AuthCodePage from '../pages/AuthCodePage';
import {LOGIN_SCREEN, AUTHCODE_SCREEN} from './screens/LoginStackScreens';

const Stack = createStackNavigator();

const headerOptions = {
  headerShown: false,
  gestureEnabled: false,
  headerTitle: ' ',
};

const LoginStackNavigator = () => {
  return (
    <Stack.Navigator initialRouteName={LOGIN_SCREEN}>
      <Stack.Screen
        name={LOGIN_SCREEN}
        component={LoginPage}
        options={headerOptions}
      />
      <Stack.Screen
        name={AUTHCODE_SCREEN}
        component={AuthCodePage}
        options={headerOptions}
      />
    </Stack.Navigator>
  );
};

export default LoginStackNavigator;
