import { Animated, Easing, Pressable, StyleSheet, Text } from "react-native";
import { Pressble, Txt, Wrapper, LoadPlaceholder } from "./button.styled";
// import Load from "../../../assets/screens/location/load.svg";
import React from "react";

export const BButton: React.FC<{
  title?: string;
  background?: string;
  onPress?: Function;
  position?: string;
  positionType?: string;
  load?: any;
}> = ({ title, position, positionType, load, ...props }) => {
  // const spinValue = React.useRef(new Animated.Value(0)).current;

  // Animated.loop(
  //   Animated.timing(spinValue, {
  //     toValue: 360,
  //     duration: 300000,
  //     easing: Easing.linear,
  //     useNativeDriver: true,
  //   })
  // ).start();

  return (
    <Wrapper
      position={position}
      positionType={positionType}>
      {
        load && <LoadPlaceholder />
      }
      <Pressble {...props}>
        <Txt>{title}</Txt>
      </Pressble>
    </Wrapper>
  )
}
