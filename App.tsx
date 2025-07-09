import 'react-native-gesture-handler';
import React, { useEffect } from 'react';
import StackNavigation from './src/navigators/StackNavigation/index';
import Storage from './src/utils/storage';
import { useAppDispatch } from './src/redux/store/Store';
import { setToken } from './src/redux/reducer/AuthReducer';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { NavigationContainer, DefaultTheme } from '@react-navigation/native';
import { navigationRef } from './src/navigators/RootNavigation';
import 'react-native-gesture-handler';

const App = () => {
  const dispatch = useAppDispatch();

  // useEffect(() => {
  //   const unsubscribe = registerListenerWithFCM();
  //   return () => {
  //     unsubscribe();
  //   };
  // }, []);

  async function getUserToken() {
    let token = await Storage.getItem('token');
    let refreshToken = await Storage.getItem('refresh-token');

    console.log('Token -- ', token);
    console.log('Refresh Token --- ', refreshToken);

    dispatch(
      setToken({
        token: token || '',
        refreshToken: refreshToken || '',
      }),
    );
  }

  useEffect(() => {
    setTimeout(() => {
      getUserToken();
    }, 4500);
  }, []);

  return (
    <SafeAreaProvider>
      <NavigationContainer
        ref={navigationRef}
        theme={{
          ...DefaultTheme,
          colors: {
            ...DefaultTheme.colors,
            background: 'white',
          },
        }}
      >
        <StackNavigation />
      </NavigationContainer>
    </SafeAreaProvider>
  );
};

export default App;
