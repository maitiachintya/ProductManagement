import {
  View,
  Text,
  Image,
  ScrollView,
  ActivityIndicator,
  TouchableOpacity,
  StatusBar,
  ImageBackground,
  StyleSheet,
} from 'react-native';
import React, { useEffect } from 'react';
import { useIsFocused } from '@react-navigation/native';
import { URL } from '../../../utils/constant/index';
import { useAppDispatch, useAppSelector } from '../../../redux/store/Store';
import { productDetailsRequest } from '../../../redux/reducer/ProductReducer';
import { Icons } from '../../../themes/Icons';
import { styles } from './styles';
import { CustomStatusBar } from '../../../utils/helper/CustomStatusBar';

const ProductDetails = (props: any) => {
  const dispatch = useAppDispatch();
  const isFocused = useIsFocused();
  const { loading, productDetailsRes } = useAppSelector(state => state.product);

  useEffect(() => {
    if (isFocused) {
      dispatch(productDetailsRequest({ id: props?.route?.params?.product_id }));
    }
  }, [isFocused]);

  if (loading || !productDetailsRes) {
    return (
      <View style={styles.loaderContainer}>
        <ActivityIndicator size="large" color="#4b7bec" />
      </View>
    );
  }

  const { title, description, image, status, createdAt, updatedAt }: any =
    productDetailsRes;

  return (
    <View style={styles.safeArea}>
      <ImageBackground
        source={{
          uri: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQIgvTTwtDpqNbr7gemAf34_viJ7hV-WCPXsw&s',
        }}
        resizeMode="cover"
        style={{ ...StyleSheet.absoluteFillObject }}
      >
        <View style={styles.gradientOverlay} />
        <CustomStatusBar
          backgroundColor={'transparent'}
          barStyle={'light-content'}
          translucent
        />
        <View style={styles.header}>
          <TouchableOpacity
            onPress={() => props.navigation.goBack()}
            style={styles.backButton}
          >
            <Image source={Icons.backArrow} style={styles.touchArrow} />
          </TouchableOpacity>
          <Text style={styles.headerTitle}>Product Details</Text>
        </View>

        <ScrollView contentContainerStyle={styles.scrollView}>
          <View style={styles.card}>
            <Image
              source={{ uri: `${URL.PRODUCT_IMAGE_URL}${image}` }}
              style={styles.image}
              resizeMode="cover"
            />

            <Text style={styles.title}>{title}</Text>
            <Text style={styles.status}> Status: {status}</Text>

            <Text style={styles.label}> Description</Text>
            <Text style={styles.description}>{description}</Text>

            <Text style={styles.meta}>
              {' '}
              Created: {new Date(createdAt).toLocaleString()}
            </Text>
            <Text style={styles.meta}>
              {' '}
              Updated: {new Date(updatedAt).toLocaleString()}
            </Text>
          </View>
        </ScrollView>
      </ImageBackground>
    </View>
  );
};

export default ProductDetails;
