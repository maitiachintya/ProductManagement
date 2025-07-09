import React from 'react';
import Home from '../../screens/main/Home/index';
import List from '../../screens/main/List/index'
import ProfileScreen from '../../screens/main/Profile/index';
import Settings from '../../screens/main/Settings/index'
import {
  BottomTabScreenProps,
  createBottomTabNavigator,
} from '@react-navigation/bottom-tabs';
import TabBar from './TabBar';
import {RootMainTabParamList} from '../../types';

const Tab = createBottomTabNavigator<RootMainTabParamList>();

export default function BottomTabNavigation() {
  const Screens = {
    Home: Home,
    List: List,
    Profile: ProfileScreen,
  };

  return (
    <Tab.Navigator
      tabBar={props => <TabBar {...props} />}
      screenOptions={{
        headerShown: false,
      }}>
      {Object.entries(Screens).map(([name, component], index) => (
        <Tab.Screen
          key={index}
          name={name as keyof RootMainTabParamList}
          component={
            component as React.ComponentType<
              BottomTabScreenProps<RootMainTabParamList>
            >
          }
        />
      ))}
    </Tab.Navigator>
  );
}
