import React, { useState, useRef, useEffect, useMemo } from 'react';
import { Animated, Dimensions } from 'react-native';
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

const TabBarBg = styled(Animated.View)`
  background-color: #fff;
  position: absolute;
  height: 48px;
  margin-bottom: 31px;
  border-radius: 30px;
  ${(props) => props.width
    ? `
      width: ${props.width}px;
    `
    : ''
  };
`;

const BottomTabNavigator = () => {
  const [focusedTab, setFocusedTab] = useState(2);
  const [isShrink, setIsShrink] = useState(false);
  const bgWidth = useRef(new Animated.Value(isShrink ? 70 : 400));
  const bgLeft = useRef(new Animated.Value(0));

  useEffect(() => {
    Animated.timing(bgWidth.current, {
      toValue: isShrink ? 70 : 400,
      duration: 200,
      useNativeDriver: false,
    }).start();

    Animated.timing(bgLeft.current, {
      toValue: (Dimensions.get('window').width - (isShrink ? 70 : 400)) / 2 + (isShrink ? ((focusedTab - 2) * 81) : 0),
      duration: 200,
      useNativeDriver: false,
    }).start();
  }, [isShrink]);

  return (
    <Tab.Navigator
      screenOptions={{
        headerShown: true,
        tabBarShowLabel: false,
        tabBarStyle: { position: 'absolute', bottom: 30, borderTopWidth: 0 },
        tabBarBackground: () => <TabBarBg style={{ width: bgWidth.current, left: bgLeft.current }} />,
      }}
    >
      {pages.map((page, index) => (
        <Tab.Screen
          name={page.title}
          options={{
            tabBarIcon: () => <IconTab isFocusedTab={focusedTab === index} icon={page.icon} isShrink={isShrink} />,
          }}
          listeners={{
            tabPress: (e) => {
              if (focusedTab === index) {
                setIsShrink(state => !state);
              } else {
                setIsShrink(true);
                if (!isShrink) {
                  setFocusedTab(index);
                } else {
                  e.preventDefault();
                }
              }
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
