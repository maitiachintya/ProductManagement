import {
  View,
  Text,
  TouchableWithoutFeedback,
  Keyboard,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  TouchableOpacity,
  Image,
  Animated,
  Easing,
  Pressable,
  StyleSheet,
  ImageBackground,
} from 'react-native';
import React, { useEffect, useRef, useState } from 'react';
import { styles } from './styles';
import TextInput from '../../../components/TextInput';
import { getImageFromGallery } from '../../../utils/helper/ImageController';
import { useAppDispatch, useAppSelector } from '../../../redux/store/Store';
import { useIsFocused, useNavigation } from '@react-navigation/native';
import { Colors } from '../../../themes/Colors';
import _ from 'lodash';
import showMessage from '../../../utils/helper/showMessage';
import { getUserProfileRequest } from '../../../redux/reducer/AuthReducer';
import { productCreateRequest } from '../../../redux/reducer/ProductReducer';
import { BottomTabNavigationProp } from '@react-navigation/bottom-tabs';
import { RootMainTabParamList } from '../../../types';
import { CustomStatusBar } from '../../../utils/helper/CustomStatusBar';
import Loader from '../../../utils/helper/Loader';

interface ProductInfoProps {
  visible: boolean;
  type: 'create' | 'update' | 'delete';
  id: string;
  title: string;
  description: string;
  uri: string;
  path: any;
}

const Touchable = Animated.createAnimatedComponent(Pressable);

const Home = () => {
  const fadeAnim = useRef(new Animated.Value(0)).current;
  const slideYAnim = useRef(new Animated.Value(100)).current;
  const scaleAnim = useRef(new Animated.Value(0.8)).current;
  const transformX = useRef(new Animated.Value(-200)).current;
  const colorValue = useRef(new Animated.Value(0)).current;

  const dispatch = useAppDispatch();
  const isFocused = useIsFocused();

  const navigation =
    useNavigation<BottomTabNavigationProp<RootMainTabParamList>>();
  const [showFocus, setShowFocus] = useState<string | null>(null);
  const { loading } = useAppSelector(state => state.auth);

  const [productInfo, setProductInfo] = useState<ProductInfoProps>({
    visible: false,
    type: 'create',
    id: '',
    title: '',
    description: '',
    uri: '',
    path: null,
  });

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
    outputRange: [Colors.blue, Colors.grey],
  });

  useEffect(() => {
    if (isFocused) {
      dispatch(getUserProfileRequest());
    }
  }, [isFocused]);

  const scale = colorValue.interpolate({
    inputRange: [0, 1],
    outputRange: [1, 0.95],
  });

  const hasInvalidStartOrEnd = (value: any) => {
    const trimmed = value.trim();
    if (trimmed === '') return false;
    const firstChar = trimmed[0];
    const lastChar = trimmed[trimmed.length - 1];
    const regex = /[^a-zA-Z0-9\s]/;
    return regex.test(firstChar) || regex.test(lastChar);
  };

  function handleCreateProduct() {
    if (productInfo.uri === '') {
      showMessage('Please upload product image');
    } else if (productInfo?.title.trim() === '') {
      showMessage('Title is required');
    } else if (
      productInfo?.title?.length < 3 ||
      productInfo?.title?.length > 25
    ) {
      showMessage('Title must be between 3 and 25 letters');
    } else if (productInfo?.title[0] !== productInfo?.title[0].toUpperCase()) {
      showMessage('Tilte must start with a capital letter.');
    } else if (
      productInfo.title.startsWith(' ') ||
      productInfo.title.endsWith(' ')
    ) {
      showMessage('Title must not start or end with spaces.');
    } else if (hasInvalidStartOrEnd(productInfo?.title)) {
      showMessage('Title cannot start or end with symbols.');
    } else if (productInfo?.description.trim() === '') {
      showMessage('Description is required');
    } else if (productInfo?.description.trim() === '') {
      showMessage('Description is required');
    } else if (productInfo?.description?.length < 3) {
      showMessage('Description must be minimum 3 letters');
    } else if (
      productInfo?.description[0] !== productInfo?.description[0].toUpperCase()
    ) {
      showMessage('Description must start with a capital letter.');
    } else if (
      productInfo?.description.startsWith(' ') ||
      productInfo?.description.endsWith(' ')
    ) {
      showMessage('Description must not start or end with spaces.');
    } else if (hasInvalidStartOrEnd(productInfo?.description)) {
      showMessage('Description cannot start or end with symbols.');
    } else {
      const formData = new FormData();
      formData.append('title', productInfo.title);
      formData.append('description', productInfo.description);

      if (productInfo?.path !== null) {
        formData.append('image', productInfo.path);
      }

      dispatch(productCreateRequest(formData));

      // Clear form
      setProductInfo(pre => ({
        ...pre,
        visible: false,
        description: '',
        title: '',
        path: null,
        uri: '',
      }));

      // Navigate to List tab
      navigation.navigate('List');
    }
  }

  return (
    <View style={styles.container}>
      <CustomStatusBar
        backgroundColor={'transparent'}
        barStyle={'light-content'}
        translucent
      />
      <ImageBackground
        source={{
          uri: 'data:image/jpeg;base64,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',
        }}
        resizeMode="cover"
        style={{ ...StyleSheet.absoluteFillObject }}
      >
        <View style={styles.gradientOverlay} />
        <Loader visible={loading && isFocused} />
        <Text style={styles.sheetText}>Create Product</Text>
        <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
          <KeyboardAvoidingView
            behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
            style={styles.centeredView}
          >
            <ScrollView
              keyboardShouldPersistTaps="handled"
              nestedScrollEnabled={true}
              showsVerticalScrollIndicator={false}
              contentContainerStyle={styles.scrollContainer}
            >
              <TouchableOpacity
                activeOpacity={0.8}
                style={styles.v}
                onPress={() => {
                  getImageFromGallery({
                    isCrop: false,
                    cropperCircleOverlay: false,
                    callback(res) {
                      if (res.path !== null && res.uri !== '') {
                        setProductInfo(pre => ({
                          ...pre,
                          uri: res?.uri,
                          path: res?.path,
                        }));
                      }
                    },
                  });

                  // getImageFromCamera({
                  //   isCrop: true,
                  //   cropperCircleOverlay: true,
                  //   callback(res) {
                  //     if (res.path !== null && res.uri !== '') {
                  //       setProductInfo(pre => ({
                  //         ...pre,
                  //         uri: res?.uri,
                  //         path: res?.path,
                  //       }));
                  //     }
                  //   },
                  // });
                }}
              >
                {productInfo?.uri !== '' ? (
                  <Image
                    source={{
                      uri: productInfo?.uri,
                    }}
                    style={styles.img}
                  />
                ) : (
                  <Text style={styles.txt}>{'Upload\nImage'}</Text>
                )}
                <View style={styles.add}>
                  <Image
                    source={{
                      uri: 'https://cdn-icons-png.flaticon.com/128/3524/3524388.png',
                    }}
                    style={styles.plus}
                  />
                </View>
              </TouchableOpacity>

              <TextInput
                value={productInfo.title}
                placeholder="Enter Title"
                placeholderColor="#AAAAAA"
                onFocus={() => setShowFocus('title')}
                onBlur={() => setShowFocus(null)}
                focused={showFocus === 'title'}
                containerStyle={[
                  styles.textInputContainer,
                  {
                    backgroundColor:
                      showFocus === 'title' ? '#333333' : '#1E1E1E',
                    borderColor: showFocus === 'title' ? '#1F80E0' : '#333333',
                  },
                ]}
                onChangeText={v => {
                  setProductInfo(pre => ({
                    ...pre,
                    title: v,
                  }));
                }}
              />
              <TextInput
                value={productInfo.description}
                placeholder="Enter Description"
                placeholderColor="#AAAAAA"
                multiline
                numberOfLines={4}
                onFocus={() => setShowFocus('description')}
                onBlur={() => setShowFocus(null)}
                focused={showFocus === 'description'}
                containerStyle={[
                  styles.textInputContainer,
                  {
                    backgroundColor:
                      showFocus === 'description' ? '#333333' : '#1E1E1E',
                    borderColor:
                      showFocus === 'description' ? '#1F80E0' : '#333333',
                  },
                ]}
                onChangeText={v => {
                  setProductInfo(pre => ({
                    ...pre,
                    description: v,
                  }));
                }}
              />

              <Touchable
                onPressIn={() => changeColor(1)}
                onPressOut={() => changeColor(0)}
                style={[
                  styles.submitButton,
                  { backgroundColor, transform: [{ scale }] },
                ]}
                onPress={() => {
                  if (productInfo.type === 'create') {
                    handleCreateProduct();
                  }
                }}
              >
                <Text style={styles.submitText}>Add Product</Text>
              </Touchable>
            </ScrollView>
          </KeyboardAvoidingView>
        </TouchableWithoutFeedback>
      </ImageBackground>
    </View>
  );
};

export default Home;
