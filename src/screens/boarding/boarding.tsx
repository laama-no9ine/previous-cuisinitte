import { Animated, StyleSheet, Text, View } from "react-native";
import { BtnLabel, BtnPressable, Button, Callout, Contents, Title } from "./boarding.styled.ios";
import Video from "react-native-video";
import React from "react";

const INITIALS = {
  FADE_IN: 0,
  FADE_OUT: 1,
  SLIDE_IN: 50,
  SLIDE_OUT: 0,
};

export const Boarding = ({ navigation }) => {
  const fadeInValue = React.useRef(new Animated.Value(INITIALS.FADE_IN)).current;
  const fadeOutValue = React.useRef(new Animated.Value(INITIALS.FADE_OUT)).current;
  const slideInValue = React.useRef(new Animated.Value(INITIALS.SLIDE_IN)).current;
  const slideOutValue = React.useRef(new Animated.Value(INITIALS.SLIDE_OUT)).current;
  const slideCounter = React.useRef<number>(1);
  let intervalRef = React.useRef<number>(3000).current;
  const [slide, updateSlide] = React.useState({
    delivery: true,
    quality: false,
    offers: false,
  });
  
  const props = {
    'source': require('../../../assets/screens/on-boarding/intro.mp4'),
    'style': { width: '100%', height: '100%' },
    "resizeMode": "cover",
    "controls": false,
    "repeat": true,
  };

  let interval;

  React.useEffect(() => {
    // console.log({ slide });
    slideIn();
  }, [slide]);

  React.useEffect(() => {
    startReel();
  }, [intervalRef]);

  const startReel = () => {
    interval = setInterval(() => {
      updateState();
    }, intervalRef);
  }

  const slideIn = () => {
    fadeInValue.setValue(INITIALS.FADE_IN);
    fadeOutValue.setValue(INITIALS.FADE_OUT);
    slideInValue.setValue(INITIALS.SLIDE_IN);
    slideOutValue.setValue(INITIALS.SLIDE_OUT);

    Animated.parallel([
      Animated.timing(fadeInValue, {
        toValue: 1,
        duration: 100,
        useNativeDriver: true,
      }),
      Animated.timing(slideInValue, {
        toValue: 0,
        duration: 100,
        useNativeDriver: true,
      }),
      Animated.timing(slideOutValue, {
        toValue: 50,
        duration: 0,
        useNativeDriver: true,
      }),
      Animated.timing(fadeOutValue, {
        toValue: 0,
        duration: 0,
        useNativeDriver: true,
      }),
    ]).start();
  };

  const updateState = (event = '') => {
    if (slideCounter.current === 3) {
      slideCounter.current = 1;
      interval = null;
      navigation.navigate('Map');
    }
    // @ts-ignore
    updateSlide((prev) => {
      if (prev?.delivery) {
        return {
          'delivery': false,
          'quality': true,
          'offers': false,
        }
      }

      if (prev?.quality) {
        return {
          'delivery': false,
          'quality': false,
          'offers': true,
        }
      }

      if (prev?.offers) {
        return {
          'delivery': false,
          'quality': false,
          'offers': false,
        }
      }
    });

    slideCounter.current++;
  }

  console.log(slide, fadeInValue, fadeOutValue);

  return (
    <View>
      <Button>
        <BtnPressable>
          <BtnLabel onPress={() => updateState()}>Next</BtnLabel>
        </BtnPressable>
      </Button>
        {/* <Animated.View
          style={{
            opacity: slide?.delivery ? fadeInValue : fadeOutValue,
            transform: [{
              translateX: slide?.delivery ? slideInValue : slideOutValue,
            }]
          }}> */}
          <Contents className={slide?.delivery}>
            <Title>All in one delivery</Title>
            <Callout>Select from different restaurants and get one delivery</Callout>
          </Contents>
        {/* </Animated.View> */}
        {/* <Animated.View
          style={{
            opacity: slide?.quality ? fadeInValue : fadeOutValue,
            transform: [{
              translateX: slide?.quality ? slideInValue : slideOutValue,
            }]
          }}> */}
          <Contents className={slide?.quality}>
            <Title>High Quality Food</Title>
            <Callout>Cooked by our trusted top Chefs just for you</Callout>
          </Contents>
        {/* </Animated.View> */}
        {/* <Animated.View
          style={{
            opacity: slide?.offers ? fadeInValue : fadeOutValue,
            transform: [{
              translateX: slide?.offers ? slideInValue : slideOutValue,
            }]
          }}> */}
          <Contents className={slide?.offers}>
            <Title>Best offers in UAE</Title>
            <Callout>Amazing deals to ensure you get the best meals</Callout>
          </Contents>
        {/* </Animated.View> */}
      {/** @ts-ignore */}
      <Video {...props} />
    </View>
  )
}
