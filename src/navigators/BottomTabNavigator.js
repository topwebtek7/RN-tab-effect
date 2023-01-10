import React, { useState } from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Screen from '../screens/GenericScreen';
import styled from 'styled-components/native';
import IconTab from './IconTab';

const Tab = createBottomTabNavigator();
const pages = [
  {
    title: 'Home',
    icon: 'home',
  },
  {
    title: 'Transactions',
    icon: 'hashtag',
  },
  {
    title: 'Bitcoin',
    icon: 'btc',
  },
  {
    title: 'Tasks',
    icon: 'tasks',
  },
  {
    title: 'Profile',
    icon: 'id-card-alt',
  },
];

const TabBarBg = styled.View`
  background-color: transparent;
`;

const BottomTabNavigator = () => {
  const [focusedTab, setFocusedTab] = useState(2);
  return (
    <Tab.Navigator
      screenOptions={{
        headerShown: true,
        tabBarShowLabel: false,
        tabBarStyle: { position: 'absolute', bottom: 30, paddingHorizontal: 20, borderTopWidth: 0 },
        tabBarBackground: () => <TabBarBg />,
      }}
    >
      {pages.map((page, index) => (
        <Tab.Screen
          name={page.title}
          options={{
            tabBarIcon: () => <IconTab isFocusedTab={focusedTab === index} icon={page.icon} />,
          }}
          listeners={{
            tabPress: (e) => {
              setFocusedTab(index);
            },
          }}
          key={index}
        >
          {(props) => <Screen {...props} title={page.title} />}
        </Tab.Screen>
      ))}
    </Tab.Navigator>
  );
};

export default BottomTabNavigator;
