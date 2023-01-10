import React, { useEffect, useRef } from 'react';
import { Animated, Easing } from 'react-native';
import styled from 'styled-components/native';
import FontAwesome from '@expo/vector-icons/FontAwesome5';
import { FulfillingBouncingCircleSpinner } from './FulfillCircle';

const TabWrapper = styled(Animated.View)`
  display: flex;
  flex: 1;
  flex-direction: row;
  align-self: stretch;
  justify-content: center;
  align-content: center;
  background-color: white;
`;

const IconWrapper = styled(Animated.View)`
  position: relative;
  width: 80px;
  height: 80px;
  justify-content: center;
  border-radius: 40px;
  background-color: white;
`;

const FontAwesomeIcon = styled(FontAwesome)`
  color: gray;
  padding: 10px;
  text-align: center;
  color: ${(props) => props.color};
`;

const AnimatedIcon = Animated.createAnimatedComponent(FontAwesomeIcon);

const IconTab = ({ isFocusedTab, icon }) => {
  const iconSize = useRef(new Animated.Value(isFocusedTab ? 40 : 28));
  const boxSize = useRef(new Animated.Value(isFocusedTab ? 80 : 50));
  const topMargin = useRef(new Animated.Value(isFocusedTab ? -18 : 0));

  useEffect(() => {
    console.log({isFocusedTab});
    if (icon === 'home') {
      console.log({isFocusedTab});
    }
    Animated.timing(iconSize.current, {
      toValue: isFocusedTab ? 40 : 28,
      duration: 300,
      useNativeDriver: false,
    }).start();

    Animated.timing(boxSize.current, {
      toValue: isFocusedTab ? 80 : 50,
      duration: 300,
      useNativeDriver: false,
    }).start();

    Animated.timing(topMargin.current, {
      toValue: isFocusedTab ? -18 : 0,
      duration: 300,
      useNativeDriver: false,
    }).start();
  }, [isFocusedTab, icon]);

  if (icon === 'home') {
    return <FulfillingBouncingCircleSpinner />
  }

  return (
    <TabWrapper>
      <IconWrapper
        style={{
          marginTop: topMargin.current,
          width: boxSize.current,
          height: boxSize.current,
          fontSize: iconSize.current,
        }}
      >
        <AnimatedIcon
          name={icon}
          size={iconSize.current}
          color={isFocusedTab ? 'red' : '#A1A1A1'}
          solid
        />
      </IconWrapper>
    </TabWrapper>
  );
};

export default IconTab;
