import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import login from '../../screens/auth/Login/index';
import signup from '../../screens/auth/SignUp/index';
import Splash from '../../screens/auth/Splash/index';
import { RootAuthStackParamList, RootMainStackParamList } from '../../types';
import BottomTabNavigation from '../BottomTabNav';
import ProductDetails from '../../screens/main/ProductDetails';
import { useAppSelector } from '../../redux/store/Store';
import Home from '../../screens/main/Home';

const Stack = createStackNavigator<RootMainStackParamList>();

const StackNavigation = () => {
  const { token, splashLoading } = useAppSelector(state => state.auth);

  const AuthScreens: {
    [key in keyof RootAuthStackParamList]: React.ComponentType<any>;
  } = {
    Login: login,
    SignUp: signup,
  };

  const MainScreens: {
    [key in keyof RootMainStackParamList]: React.ComponentType<any>;
  } = {
    TabNavigation: BottomTabNavigation,
    ProductDetails: ProductDetails,
    Home: Home,
  };

  if (splashLoading) {
    return <Splash />;
  }

  const screens = token ? MainScreens : AuthScreens;

  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      {Object.entries(screens).map(([name, Component]) => (
        <Stack.Screen
          key={name}
          name={name as keyof RootMainStackParamList}
          component={Component}
          options={{ gestureEnabled: true }}
        />
      ))}
    </Stack.Navigator>
  );
};

export default StackNavigation;
