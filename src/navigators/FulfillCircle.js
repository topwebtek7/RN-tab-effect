import React, { useEffect, useState, useRef } from 'react';
import { Animated, Easing, StyleSheet } from 'react-native';

// type EpicProps = {
//   size?: number,
//   duration?: number,
//   color?: string,
//   style?: ViewStyleProp
// };

const EpicDefaultProps = {
  size: 80,
  color: 'red',
  duration: 1000
};

export const FulfillingBouncingCircleSpinner = ({ size, color, duration, style, children, ...props }) => {
  const animate = useRef(new Animated.Value(0)).current;
  const spinnerStyle = StyleSheet.create({
    container: {
      height: size,
      width: size,
      position: 'absolute',
      zIndex: 2,
      top: -18,
    },
    circle: {
      height: size,
      width: size,
      borderColor: color,
      borderRadius: size * 0.5,
      position: 'relative',
      borderWidth: size * 0.1
    },
    orbit: {
      height: size,
      width: size,
      borderColor: color,
      position: 'absolute',
      top: 0,
      left: 0,
      borderRadius: size * 0.5,
      borderWidth: size * 0.03
    }
  });

  const animateStyle = {
    container: {
      transform: [
        {
          rotate: animate.interpolate({
            inputRange: [0, 9, 10],
            outputRange: ['0deg', '360deg', '360deg']
          })
        }
      ]
    },
    orbit: {
      transform: [
        {
          scale: animate.interpolate({
            inputRange: [0, 6, 7, 8, 9, 10],
            outputRange: [1, 1, 0.8, 1, 0.8, 1]
          })
        }
      ]
    },
    circle: {
      borderColor: animate.interpolate({
        inputRange: [0, 4, 5, 9, 10],
        outputRange: ['transparent', 'transparent', color, color, 'transparent']
      }),
      borderTopColor: animate.interpolate({
        inputRange: [0, 10],
        outputRange: [color, color]
      }),
      borderRightColor: animate.interpolate({
        inputRange: [0, 1, 2, 9, 10],
        outputRange: ['transparent', 'transparent', color, color, 'transparent']
      }),
      borderBottomColor: animate.interpolate({
        inputRange: [0, 2, 3, 9, 10],
        outputRange: ['transparent', 'transparent', color, color, 'transparent']
      })
    }
  };

  useEffect(() => {
    Animated.loop(
      Animated.timing(animate, {
        toValue: 10,
        duration: duration * 4,
        easing: Easing.inOut(Easing.ease),
        useNativeDriver: false,
      })
    ).start();
  }, [animate, duration]);

  return (
    <Animated.View style={[style, spinnerStyle.container, animateStyle.container]} {...props}>
      <Animated.View style={[spinnerStyle.circle, animateStyle.circle]}>
        {children}
      </Animated.View>
    </Animated.View>
  );
};

FulfillingBouncingCircleSpinner.defaultProps = EpicDefaultProps;