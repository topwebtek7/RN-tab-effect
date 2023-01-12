import React, { useEffect, useRef } from 'react';
import { Animated, Easing } from 'react-native';
import styled from 'styled-components/native';
import FontAwesome from '@expo/vector-icons/FontAwesome5';
import { FulfillingBouncingCircleSpinner } from './FulfillCircle';

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
  border-radius: 40px;
`;

const FontAwesomeIcon = styled(FontAwesome)`
  color: gray;
  padding: 10px;
  text-align: center;
  color: ${(props) => props.color};
`;

const AnimatedIcon = Animated.createAnimatedComponent(FontAwesomeIcon);

const IconTab = ({ isFocusedTab, icon, isShrink }) => {
  const iconSize = useRef(new Animated.Value(isFocusedTab ? 40 : 28));
  const boxSize = useRef(new Animated.Value(isFocusedTab ? 80 : 48));
  const topMargin = useRef(new Animated.Value(isFocusedTab ? -18 : 0));

  useEffect(() => {
    if (isFocusedTab) {
      Animated.timing(iconSize.current, {
        toValue: isFocusedTab ? 40 : 28,
        duration: 300,
        useNativeDriver: false,
        easing: Easing.ease,
      }).start();

      Animated.timing(boxSize.current, {
        toValue: isFocusedTab ? 80 : 48,
        duration: 100,
        useNativeDriver: false,
      }).start();

      Animated.timing(topMargin.current, {
        toValue: isFocusedTab ? -18 : 0,
        duration: 100,
        useNativeDriver: false,
      }).start();
    }
  }, [isFocusedTab, icon]);

  if (!isFocusedTab && isShrink) {
    return null;
  }

  return (
    <TabWrapper>
      <IconWrapper
        style={{
          marginTop: isFocusedTab ? topMargin.current : 0,
          width: isFocusedTab ? boxSize.current : 48,
          height: isFocusedTab ? boxSize.current : 48,
          zIndex: isFocusedTab ? 1 : 0,
          backgroundColor: isFocusedTab ? 'white' : 'transparent'
        }}
      >
        <AnimatedIcon
          name={icon}
          size={isFocusedTab ? iconSize.current : 28}
          color={isFocusedTab ? 'red' : '#A1A1A1'}
          solid
        />
      </IconWrapper>
      {isFocusedTab ? (
        <FulfillingBouncingCircleSpinner/>
      ) : null}
    </TabWrapper>
  );
};

export default IconTab;
