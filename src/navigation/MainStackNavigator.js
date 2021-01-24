import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import MainPage from '../pages/MainPage';
import {MAIN_SCREEN} from './screens/MainStackScreen';

const Stack = createStackNavigator();

const MainStackNavigator = () => {
  return (
    <Stack.Navigator initialRouteName={MAIN_SCREEN}>
      <Stack.Screen
        name={MAIN_SCREEN}
        component={MainPage}
        options={{headerTitle: 'Главная'}}
      />
    </Stack.Navigator>
  );
};

export default MainStackNavigator;
