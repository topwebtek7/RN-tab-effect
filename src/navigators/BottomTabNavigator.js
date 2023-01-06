import React, { useEffect, useState } from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Animated, TouchableHighlight } from 'react-native';
import Screen from '../screens/GenericScreen';
import styled from 'styled-components/native';
import FontAwesome from '@expo/vector-icons/FontAwesome5';

const Tab = createBottomTabNavigator();

const mappable = [0, 1, 2, 3, 4];
const pages = [
  {
    title: 'Home',
    icon: 'home',
  },
  {
    title: 'HashTag',
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

const TabWrapper = styled.View`
  display: flex;
  flex: 1;
  flex-direction: row;
  align-self: stretch;
  justify-content: center;
  align-content: center;
`;

const IconWrapper = styled(Animated.View)`
  position: relative;
  width: 80px;
  height: 80px;
  justify-content: center;
  margin-top: -10px;
  border-radius: 40px;
`;

const FontAwesomeIcon = styled(FontAwesome)`
  color: gray;
  padding: 10px;
  text-align: center;
  color: ${(props) => props.color};
`;

const TabBarBg = styled.View`
  background-color: #eaeaea;
  display: flex;
  flex: 1;
`;

const BottomTabNavigatorStyle2 = () => {
  const [focusedTab, setFocusedTab] = useState(2);

  const colors = mappable.map((item, index) => {
    return useState(
      index === focusedTab ? new Animated.Value(1) : new Animated.Value(0)
    )[0];
  });

  const iconSizes = mappable.map((item, index) => {
    return useState(
      index === focusedTab ? new Animated.Value(40) : new Animated.Value(28)
    )[0];
  });

  const boxSizes = mappable.map((item, index) => {
    return useState(
      index === focusedTab ? new Animated.Value(80) : new Animated.Value(50)
    )[0];
  });

  const topMargins = mappable.map((item, index) => {
    return useState(
      index === focusedTab ? new Animated.Value(-45) : new Animated.Value(-10)
    )[0];
  });

  useEffect(() => {
    colors.forEach((c, index) => {
      let value = focusedTab === index ? 1 : 0;
      Animated.timing(c, {
        toValue: value,
        duration: 200,
        useNativeDriver: false,
      }).start();
    });
    iconSizes.forEach((s, index) => {
      let value = focusedTab === index ? 40 : 28;
      Animated.timing(s, {
        toValue: value,
        duration: 200,
        useNativeDriver: false,
      }).start();
    });
    boxSizes.forEach((s, index) => {
      let value = focusedTab === index ? 80 : 50;
      Animated.timing(s, {
        toValue: value,
        duration: 200,
        useNativeDriver: false,
      }).start();
    });
    topMargins.forEach((s, index) => {
      let value = focusedTab === index ? -45 : -10;
      Animated.timing(s, {
        toValue: value,
        duration: 200,
        useNativeDriver: false,
      }).start();
    });
  }, [focusedTab]);

  console.log({colors, boxSizes, topMargins, iconSizes})

  return (
    <Tab.Navigator
      screenOptions={{
        headerShown: false,
        tabBarShowLabel: false,
        tabBarStyle: { position: 'absolute' },
        tabBarBackground: () => <TabBarBg />,
      }}
    >
      {pages.map((page, index) => (
        <Tab.Screen
          name={page.title}
          options={{
            tabBarIcon: ({ focused }) => (
              <TabWrapper>
                <IconWrapper
                  style={{
                    backgroundColor: 'white',
                    marginTop: topMargins[index],
                    width: boxSizes[index],
                    height: boxSizes[index],
                  }}
                >
                  <FontAwesomeIcon
                    name={page.icon}
                    iconStyle={{ fontSize: iconSizes[index] }}
                    size={Number(iconSizes[index]._value)}
                    color={focusedTab === index ? 'red' : 'gray'}
                    solid
                  />
                </IconWrapper>
              </TabWrapper>
            ),
          }}
          listeners={{
            tabPress: (e) => {
              console.log('index---', index, iconSizes[index]._value);
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

export default BottomTabNavigatorStyle2;
