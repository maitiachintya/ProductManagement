import {
  View,
  Text,
  StatusBar,
  ImageBackground,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  TouchableOpacity,
  Image,
  StyleSheet,
  Animated,
  Easing,
  Pressable,
} from 'react-native';
import React, { useEffect, useRef, useState } from 'react';
import { styles } from './styles';
import { Icons } from '../../../themes/Icons';
import { Colors } from '../../../themes/Colors';
import TextInput from '../../../components/TextInput';
import CheckBox from '../../../components/CheckBox';
import { getImageFromGallery } from '../../../utils/helper/ImageController';
import { useAppDispatch, useAppSelector } from '../../../redux/store/Store';
import showMessage from '../../../utils/helper/showMessage';
import { signUpRequest } from '../../../redux/reducer/AuthReducer';
import Loader from '../../../utils/helper/Loader';
import { navigate } from '../../../navigators/RootNavigation';
import { CustomStatusBar } from '../../../utils/helper/CustomStatusBar';
import {
  SafeAreaView,
  useSafeAreaInsets,
} from 'react-native-safe-area-context';

const index = () => {
  const Touchable = Animated.createAnimatedComponent(Pressable);

  const fadeAnim = useRef(new Animated.Value(0)).current;
  const slideYAnim = useRef(new Animated.Value(100)).current;
  const scaleAnim = useRef(new Animated.Value(0.8)).current;
  const transformX = useRef(new Animated.Value(-200)).current;
  const colorValue = useRef(new Animated.Value(0)).current;
  const colorValueLogin = useRef(new Animated.Value(0)).current;

  const dispatch = useAppDispatch();
  const { loading } = useAppSelector(state => state.auth);
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [isPasswordSequre, setIsPasswordSequre] = useState<boolean>(true);
  const [isConfirmPasswordSequre, setIsConfirmPasswordSequre] =
    useState<boolean>(true);
  const [showFocus, setShowFocus] = useState<string | null>(null);
  const [isTerms, setIsTerms] = useState<boolean>(false);
  const [imageUri, setImgaeUri] = useState<{
    uri: string;
    path: any;
  }>({
    uri: 'https://cdn-icons-png.flaticon.com/128/847/847969.png',
    path: null,
  });

  const hasInvalidStartOrEnd = (value: any) => {
    const trimmed = value.trim();
    if (trimmed === '') return false;
    const firstChar = trimmed[0];
    const lastChar = trimmed[trimmed.length - 1];
    const regex = /[^a-zA-Z0-9\s]/;
    return regex.test(firstChar) || regex.test(lastChar);
  };

  const validate = () => {
    const invalidCharRegex = /[\s]/;

    if (
      !imageUri.uri ||
      imageUri.uri.trim() === '' ||
      imageUri.uri === 'https://cdn-icons-png.flaticon.com/128/847/847969.png'
    ) {
      showMessage('Please upload your profile photo.');
      return false;
    }

    if (!firstName.trim()) {
      showMessage('FirstName is required');
      return false;
    }

    if (firstName.length < 3 || firstName.length > 20) {
      showMessage('First name must be between 3 and 20 letters.');
      return false;
    }

    if (firstName[0] !== firstName[0].toUpperCase()) {
      showMessage('First Name must start with a capital letter.');
      return false;
    }

    if (invalidCharRegex.test(firstName)) {
      showMessage('First Name must not contain spaces.');
      return false;
    }

    if (hasInvalidStartOrEnd(firstName)) {
      showMessage('First name cannot start or end with symbols.');
      return false;
    }

    if (!lastName.trim()) {
      showMessage('Last Name is required');
      return false;
    }

    if (lastName.length < 3 || lastName.length > 20) {
      showMessage('Last name must be between 3 and 20 letters.');
      return false;
    }

    if (lastName[0] !== lastName[0].toUpperCase()) {
      showMessage('Last Name must start with a capital letter.');
      return false;
    }

    if (invalidCharRegex.test(lastName)) {
      showMessage('Last Name must not contain spaces.');
      return false;
    }

    if (hasInvalidStartOrEnd(lastName)) {
      showMessage('Last name cannot start or end with symbols.');
      return false;
    }

    if (!email.trim()) {
      showMessage('Email is required');
      return false;
    }

    if (email.length < 6 || email.length > 100) {
      showMessage('Email must be between 6 and 100 characters.');
      return false;
    }

    if (email[0] === email[0].toUpperCase()) {
      showMessage('The first letter of email should not be capital.');
      return false;
    }

    const specialCharRegex = /[@._-]/;
    if (!specialCharRegex.test(email)) {
      showMessage(
        'Email must contain at least one special symbol (e.g., @ . _ - ).',
      );
      return false;
    }

    if (invalidCharRegex.test(email)) {
      showMessage('Email must not contain spaces.');
      return false;
    }

    if (hasInvalidStartOrEnd(email)) {
      showMessage('Email cannot start or end with symbols.');
      return false;
    }

    if (!password.trim()) {
      showMessage('Password is required');
      return false;
    }

    if (password.length < 8 || password.length > 64) {
      showMessage('Password must be between 8 and 64 characters.');
      return false;
    }

    const hasUppercase = /[A-Z]/.test(password);
    if (!hasUppercase) {
      showMessage('Password should have at least one capital letter.');
      return false;
    }

    const hasLowercase = /[a-z]/.test(password);
    if (!hasLowercase) {
      showMessage('Password should have at least one small letter.');
      return false;
    }

    const hasSpecialChar = /[!@#$%^&*(),.?":{}|<>]/.test(password);
    if (!hasSpecialChar) {
      showMessage('Password should have at least one symbol.');
      return false;
    }

    if (invalidCharRegex.test(password)) {
      showMessage('Password must not contain spaces');
      return false;
    }

    if (hasInvalidStartOrEnd(password)) {
      showMessage('Password cannot start or end with symbols.');
      return false;
    }

    if (!confirmPassword.trim()) {
      showMessage('Confirm Password is required');
      return false;
    }

    if (confirmPassword.length < 8 || confirmPassword.length > 64) {
      showMessage('Confirm Password must be between 8 and 64 characters.');
      return false;
    }

    if (invalidCharRegex.test(confirmPassword)) {
      showMessage('Confirm Password must not contain spaces.');
      return false;
    }

    if (password !== confirmPassword) {
      showMessage('Passwords do not match');
      return false;
    }

    if (!isTerms) {
      showMessage('You must agree to the terms and conditions.');
      return false;
    }

    return true;
  };

  const handleSignup = () => {
    if (validate()) {
      const formData = new FormData();
      formData.append('email', email.toLocaleLowerCase());
      formData.append('first_name', firstName);
      formData.append('last_name', lastName);
      formData.append('password', password);

      if (imageUri.path !== null) {
        formData.append('profile_pic', imageUri.path);
      }

      dispatch(signUpRequest(formData));
    }
  };

  useEffect(() => {
    fadeAnim.setValue(0);
    slideYAnim.setValue(100);
    scaleAnim.setValue(0.8);

    Animated.parallel([
      Animated.timing(fadeAnim, {
        toValue: 1,
        duration: 2000,
        easing: Easing.out(Easing.ease),
        useNativeDriver: true,
      }),
      Animated.timing(slideYAnim, {
        toValue: 0,
        duration: 2000,
        easing: Easing.out(Easing.ease),
        useNativeDriver: true,
      }),
      Animated.timing(scaleAnim, {
        toValue: 1,
        duration: 2000,
        easing: Easing.out(Easing.ease),
        useNativeDriver: true,
      }),
      Animated.timing(transformX, {
        toValue: 0,
        duration: 2000,
        easing: Easing.out(Easing.ease),
        useNativeDriver: true,
      }),
    ]).start();
  }, []);

  const changeColor = (value: number) => {
    Animated.timing(colorValue, {
      toValue: value,
      duration: 200,
      useNativeDriver: false,
    }).start();
  };

  const backgroundColor = colorValue.interpolate({
    inputRange: [0, 1],
    outputRange: [Colors.blue, Colors.green],
  });

  const changeLoginBtnColor = (value: number) => {
    Animated.timing(colorValueLogin, {
      toValue: value,
      duration: 200,
      useNativeDriver: false,
    }).start();
  };

  const backgroundColorLogin = colorValueLogin.interpolate({
    inputRange: [0, 1],
    outputRange: [Colors.dark, Colors.lightBlue],
  });

  const scaleLogin = colorValueLogin.interpolate({
    inputRange: [0, 1],
    outputRange: [1, 0.95],
  });

  const scale = colorValue.interpolate({
    inputRange: [0, 1],
    outputRange: [1, 0.95],
  });

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <CustomStatusBar
        backgroundColor={'transparent'}
        barStyle={'light-content'}
        translucent
      />
      <ImageBackground
        source={Icons.bgTheme}
        resizeMode="cover"
        style={{ ...StyleSheet.absoluteFillObject }}
      >
        <View style={styles.gradientOverlay} />
        <Loader visible={loading} />
        <KeyboardAvoidingView
          style={styles.container}
          behavior={Platform.OS == 'android' ? 'padding' : 'height'}
        >
          <StatusBar backgroundColor={Colors.main} barStyle={'light-content'} />
          <View style={styles.scrollContainer}>
            <ScrollView
              showsVerticalScrollIndicator={false}
              style={styles.main}
              contentContainerStyle={{
                paddingBottom: 30,
              }}
            >
              <Animated.Text
                style={[
                  styles.title,
                  {
                    opacity: fadeAnim,
                    transform: [
                      { translateY: slideYAnim },
                      { scale: scaleAnim },
                    ],
                  },
                ]}
              >
                Create Account
              </Animated.Text>
              <Animated.Text
                style={[
                  styles.subTitle,
                  {
                    opacity: fadeAnim,
                    transform: [
                      { translateY: slideYAnim },
                      { scale: scaleAnim },
                    ],
                  },
                ]}
              >
                Fill in the details below to create your account.
              </Animated.Text>

              <TouchableOpacity
                activeOpacity={0.8}
                style={styles.v}
                onPress={() => {
                  getImageFromGallery({
                    isCrop: true,
                    cropperCircleOverlay: true,
                    callback(res) {
                      if (res.path !== null && res.uri !== '') {
                        setImgaeUri({
                          uri: res.uri,
                          path: res.path,
                        });
                      }
                    },
                  });
                }}
              >
                <Image
                  source={{
                    uri: imageUri.uri,
                  }}
                  style={styles.img}
                />
                <View style={styles.add}>
                  <Image
                    source={{
                      uri: 'https://cdn-icons-png.flaticon.com/128/3524/3524388.png',
                    }}
                    style={styles.plus}
                    tintColor={'lightgrey'}
                  />
                </View>
              </TouchableOpacity>

              <TextInput
                value={firstName}
                onChangeText={v => setFirstName(v)}
                placeholder="First Name"
                onFocus={() => setShowFocus('firstName')}
                onBlur={() => setShowFocus(null)}
                focused={showFocus === 'firstName'}
                icon={{ uri: Icons.profile }}
              />

              <TextInput
                value={lastName}
                onChangeText={v => setLastName(v)}
                placeholder="Last Name"
                onFocus={() => setShowFocus('lastName')}
                onBlur={() => setShowFocus(null)}
                focused={showFocus === 'lastName'}
                icon={{ uri: Icons.profile }}
              />

              <TextInput
                value={email}
                onChangeText={v => setEmail(v)}
                placeholder="Email Address"
                onFocus={() => setShowFocus('email')}
                onBlur={() => setShowFocus(null)}
                focused={showFocus === 'email'}
                icon={{ uri: Icons.email }}
              />

              <TextInput
                value={password}
                onChangeText={v => setPassword(v)}
                placeholder="Password"
                icon={
                  isPasswordSequre
                    ? { uri: Icons.invisible }
                    : { uri: Icons.visible }
                }
                disable={false}
                onFocus={() => setShowFocus('password')}
                onBlur={() => setShowFocus(null)}
                focused={showFocus === 'password'}
                onPress={() => setIsPasswordSequre(!isPasswordSequre)}
                secureTextEntry={isPasswordSequre}
              />

              <TextInput
                value={confirmPassword}
                onChangeText={v => setConfirmPassword(v)}
                placeholder="Confirm Password"
                icon={
                  isConfirmPasswordSequre
                    ? { uri: Icons.invisible }
                    : { uri: Icons.visible }
                }
                disable={false}
                onFocus={() => setShowFocus('confirmPassword')}
                onBlur={() => setShowFocus(null)}
                focused={showFocus === 'confirmPassword'}
                onPress={() =>
                  setIsConfirmPasswordSequre(!isConfirmPasswordSequre)
                }
                secureTextEntry={isConfirmPasswordSequre}
              />

              <View style={styles.v1}>
                <CheckBox
                  box={
                    isTerms
                      ? { uri: Icons.showCheck }
                      : { uri: Icons.emptyCheck }
                  }
                  disable={false}
                  onPress={() => setIsTerms(!isTerms)}
                />
                <Text style={[styles.text, { marginLeft: 8 }]}>
                  Agree with Terms & Conditions
                </Text>
              </View>
              <Touchable
                onPress={() => {
                  handleSignup();
                }}
                onPressIn={() => changeColor(1)}
                onPressOut={() => changeColor(0)}
                style={[
                  styles.fullWidthButton,
                  { backgroundColor, transform: [{ scale }] },
                ]}
              >
                <Text style={styles.btnText}>Create Account</Text>
              </Touchable>
              <Touchable
                onPress={() => navigate('Login')}
                onPressIn={() => changeLoginBtnColor(1)}
                onPressOut={() => changeLoginBtnColor(0)}
                style={[
                  styles.navigateButton,
                  {
                    backgroundColor: backgroundColorLogin,
                    transform: [{ scale: scaleLogin }],
                  },
                ]}
              >
                <Text style={styles.btnText}>Back to Login</Text>
              </Touchable>
            </ScrollView>
          </View>
        </KeyboardAvoidingView>
      </ImageBackground>
    </SafeAreaView>
  );
};

export default index;
