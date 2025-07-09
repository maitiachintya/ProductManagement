import React, {useEffect, useRef} from 'react';
import {Animated, Easing, Image, ImageBackground, View} from 'react-native';
import {Icons} from '../../../themes/Icons';
import {styles} from './styles';
import {CustomStatusBar} from '../../../utils/helper/CustomStatusBar.tsx';

const Index = () => {
  const rotateValue = useRef(new Animated.Value(0)).current;

  // Text animations
  const fadeWelcome = useRef(new Animated.Value(0)).current;
  const fadeTo = useRef(new Animated.Value(0)).current;
  const fadeAcademy = useRef(new Animated.Value(0)).current;

  const slideWelcome = useRef(new Animated.Value(100)).current;
  const slideTo = useRef(new Animated.Value(100)).current;
  const slideAcademy = useRef(new Animated.Value(100)).current;

  // Tagline and button animations
  const fadeTagline = useRef(new Animated.Value(0)).current;
  const fadeButton = useRef(new Animated.Value(0)).current;

  // Logo rotation
  useEffect(() => {
    Animated.loop(
      Animated.timing(rotateValue, {
        toValue: 1,
        duration: 2000,
        easing: Easing.circle,
        useNativeDriver: true,
      }),
    ).start();
  }, []);

  // Sequential text + tagline + button animation
  useEffect(() => {
    Animated.sequence([
      Animated.parallel([
        Animated.timing(fadeWelcome, {
          toValue: 1,
          duration: 1000,
          easing: Easing.out(Easing.ease),
          useNativeDriver: true,
        }),
        Animated.timing(slideWelcome, {
          toValue: 0,
          duration: 1000,
          easing: Easing.out(Easing.ease),
          useNativeDriver: true,
        }),
      ]),
      Animated.parallel([
        Animated.timing(fadeTo, {
          toValue: 1,
          duration: 800,
          useNativeDriver: true,
        }),
        Animated.timing(slideTo, {
          toValue: 0,
          duration: 800,
          useNativeDriver: true,
        }),
      ]),
      Animated.parallel([
        Animated.timing(fadeAcademy, {
          toValue: 1,
          duration: 800,
          useNativeDriver: true,
        }),
        Animated.timing(slideAcademy, {
          toValue: 0,
          duration: 800,
          useNativeDriver: true,
        }),
      ]),
      // Tagline fade in
      Animated.timing(fadeTagline, {
        toValue: 1,
        duration: 800,
        useNativeDriver: true,
      }),
      // Button fade in
      Animated.timing(fadeButton, {
        toValue: 1,
        duration: 800,
        useNativeDriver: true,
      }),
    ]).start();
  }, []);

  const rotation = rotateValue.interpolate({
    inputRange: [0, 1],
    outputRange: ['0deg', '360deg'],
  });

  return (
    <>
      <CustomStatusBar
        backgroundColor="transparent"
        barStyle="light-content"
        translucent
      />
      <ImageBackground
        source={Icons.bgTheme}
        resizeMode="cover"
        style={styles.background}>
        <View style={styles.gradientOverlay} />

        <View style={styles.imageLogo}>
          <Animated.View
            style={[
              styles.loader,
              {
                transform: [{rotate: rotation}],
              },
            ]}
          />
          <Image
            source={Icons.wtsLogo}
            resizeMode="contain"
            style={styles.logo}
          />
        </View>

        {/* Animated Texts */}
        <View style={styles.textContainer}>
          <Animated.Text
            style={[
              styles.titleText,
              {opacity: fadeWelcome, transform: [{translateY: slideWelcome}]},
            ]}>
            WELCOME
          </Animated.Text>
          <Animated.Text
            style={[
              styles.titleText,
              {opacity: fadeTo, transform: [{translateY: slideTo}]},
            ]}>
            {' '}
            TO
          </Animated.Text>
          <Animated.Text
            style={[
              styles.titleText,
              {opacity: fadeAcademy, transform: [{translateY: slideAcademy}]},
            ]}>
            {' '}
            ACADEMY
          </Animated.Text>
        </View>

        {/* Tagline */}
        <Animated.Text style={[styles.tagline, {opacity: fadeTagline}]}>
          Your Learning Partner
        </Animated.Text>
      </ImageBackground>
    </>
  );
};

export default Index;
