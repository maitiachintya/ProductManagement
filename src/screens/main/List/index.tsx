import {
  View,
  Text,
  FlatList,
  TouchableOpacity,
  Image,
  Animated,
  Easing,
  ActivityIndicator,
  Pressable,
  SafeAreaView,
  TouchableWithoutFeedback,
  Keyboard,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  Modal,
  ImageBackground,
  StyleSheet,
} from 'react-native';
import React, { useEffect, useRef, useState } from 'react';
import { URL } from '../../../utils/constant';
import { styles } from './styles';
import { useAppDispatch, useAppSelector } from '../../../redux/store/Store';
import { useIsFocused } from '@react-navigation/native';
import _ from 'lodash';
import { navigate } from '../../../navigators/RootNavigation';
import { Colors } from '../../../themes/Colors';
import { getUserProfileRequest } from '../../../redux/reducer/AuthReducer';
import {
  productCreateRequest,
  productListRequest,
  productRemoveRequest,
  productUpdateRequest,
} from '../../../redux/reducer/ProductReducer';
import showMessage from '../../../utils/helper/showMessage';
import { getImageFromGallery } from '../../../utils/helper/ImageController';
import TextInput from '../../../components/TextInput';
import { CustomStatusBar } from '../../../utils/helper/CustomStatusBar';

var status = '';

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

const List = () => {
  const fadeAnim = useRef(new Animated.Value(0)).current;
  const slideYAnim = useRef(new Animated.Value(100)).current;
  const scaleAnim = useRef(new Animated.Value(0.8)).current;
  const transformX = useRef(new Animated.Value(-200)).current;
  const colorValue = useRef(new Animated.Value(0)).current;
  const dispatch = useAppDispatch();
  const isFocused = useIsFocused();
  const { loading, productList, currentRequest } = useAppSelector(
    state => state.product,
  );

  const [searchText, setSearchText] = useState('');
  const [typedText, setTypedText] = useState('');
  const [filteredData, setFilteredData] = useState([]);

  const [data, setData] = useState([]);
  const [page, setPage] = useState<number>(1);
  const [showFocus, setShowFocus] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [isDataEmpty, setIsDataEmpty] = useState(false);

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
      getAllProduct(1);
    }
  }, [isFocused]);

  const scale = colorValue.interpolate({
    inputRange: [0, 1],
    outputRange: [1, 0.95],
  });

  const merge = (first: any, second: any) => {
    for (let i = 0; i < second.length; i++) {
      first.push(second[i]);
    }
    return first;
  };

  if (status == '' || currentRequest != status) {
    switch (currentRequest) {
      case 'product/productListRequest':
        status = currentRequest;
        setIsLoading(true);
        break;
      case 'product/productListSuccess':
        status = currentRequest;
        let data1 = productList;
        if (!_.isEmpty(data1) && page !== 1) {
          let arr1 = [...data];
          let arr = merge(arr1, data1);
          setData(arr);
        } else if (!_.isEmpty(data1)) {
          setData(data1);
        } else {
          setIsDataEmpty(true);
        }
        setIsLoading(false);
        break;

      case 'product/productListFailure':
        status = currentRequest;
        setIsLoading(false);
        setIsDataEmpty(true);
        break;
    }
  }

  const getAllProduct = async (_page: number, query?: string) => {
    if (_page === 1) {
      setPage(1);
      setIsDataEmpty(false);
    }

    try {
      dispatch(
        productListRequest({
          page: _page,
          perpage: 5,
          // search: query
        }),
      );
    } catch (error) {
      console.log('Error in handleSignIn:', error);
    }
  };

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
    } else if (productInfo?.title.trim() === '') {
      showMessage('Title is required');
    } else if (productInfo?.description.trim() === '') {
      showMessage('Description is required');
    } else {
      const formData = new FormData();
      formData.append('title', productInfo.title);
      formData.append('description', productInfo.description);

      if (productInfo?.path !== null) {
        formData.append('image', productInfo.path);
      }

      dispatch(productCreateRequest(formData));

      setProductInfo(pre => ({
        ...pre,
        visible: false,
        description: '',
        title: '',
        path: null,
        uri: '',
      }));
    }
  }

  function handleUpdateProduct() {
    if (productInfo?.title.trim() === '') {
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
      formData.append('id', productInfo.id);
      formData.append('title', productInfo.title);
      formData.append('description', productInfo.description);

      if (productInfo?.path !== null) {
        formData.append('image', productInfo.path);
      }

      dispatch(productUpdateRequest(formData));

      setProductInfo(pre => ({
        ...pre,
        visible: false,
        description: '',
        title: '',
        path: null,
        uri: '',
      }));
    }
  }

  const isCloseToBottom = ({
    layoutMeasurement,
    contentOffset,
    contentSize,
  }: any) => {
    const paddingToBottom = 20;
    return (
      layoutMeasurement.height + contentOffset.y >=
      contentSize.height - paddingToBottom
    );
  };

  const refreshData = () => {
    if (!isDataEmpty && currentRequest !== 'product/productListRequest') {
      getAllProduct(page + 1);
      // getAllProduct(page + 1,searchText);
      setPage(prev => prev + 1);
    }
  };

  function ListFooterComponent() {
    return (
      <>
        {isLoading ? (
          <ActivityIndicator
            size={'small'}
            color={'black'}
            style={{
              marginTop: 10,
            }}
          />
        ) : null}
      </>
    );
  }

  useEffect(() => {
    if (searchText.trim() === '') {
      setFilteredData(data);
    } else {
      const filtered = data.filter((item: any) =>
        item?.title?.toLowerCase().includes(searchText.toLowerCase()),
      );
      setFilteredData(filtered);
      // getAllProduct(1,searchText)
    }
  }, [searchText, data]);

  useEffect(() => {
    const delayDebounce = setTimeout(() => {
      setSearchText(typedText); // this will now trigger useEffect for filtering
    }, 300);

    return () => clearTimeout(delayDebounce);
  }, [typedText]);

  return (
    <View style={styles.container}>
      <ImageBackground
        source={{
          uri: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcREZ5SkoTggRwwN_lzl0RurU38E4nsdVnKvTg&s',
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
          <Text style={styles.headerTitle}>Product Lists</Text>
        </View>

        <View style={{ width: '105%', alignSelf: 'center', marginTop: 10 }}>
          <TextInput
            value={typedText}
            placeholder="Search product by title"
            onFocus={() => setShowFocus('search')}
            onBlur={() => setShowFocus(null)}
            focused={showFocus === 'search'}
            onChangeText={setTypedText}
            containerStyle={[
              styles.searchTextContainer,
              {
                backgroundColor: showFocus === 'search' ? '#333333' : '#1E1E1E',
                borderColor: showFocus === 'search' ? '#1F80E0' : '#333333',
              },
            ]}
            style={{
              color: Colors.black,
            }}
            placeholderColor="#888"
          />
        </View>
        <FlatList
          data={filteredData} // products
          numColumns={2}
          showsVerticalScrollIndicator={false}
          keyExtractor={(item, index) => index.toString()}
          columnWrapperStyle={{ justifyContent: 'space-between' }}
          contentContainerStyle={styles.cardListContainer}
          renderItem={({ item, index }: any) => (
            <TouchableOpacity
              onPress={() => {
                navigate('ProductDetails', { product_id: item?._id });
              }}
              onLongPress={() => {
                setProductInfo(pre => ({
                  ...pre,
                  id: item?._id,
                  type: 'delete',
                  visible: true,
                }));
              }}
              style={[styles.card]}
            >
              <Image
                source={{ uri: URL.PRODUCT_IMAGE_URL.concat(item?.image) }}
                style={styles.productImage}
              />
              <View
                style={{
                  padding: 5,
                }}
              >
                <Text numberOfLines={1} style={styles.cardTitle}>
                  {item?.title}
                </Text>
                <Text numberOfLines={1} style={styles.cardDescription}>
                  {item?.description}
                </Text>
                <TouchableOpacity
                  onPress={() => {
                    setProductInfo(pre => ({
                      ...pre,
                      id: item?._id,
                      title: item?.title,
                      description: item?.description,
                      uri: URL.PRODUCT_IMAGE_URL.concat(item.image),
                      type: 'update',
                      visible: true,
                    }));
                  }}
                  style={styles.editBtn}
                >
                  <Text style={styles.editText}>Edit</Text>
                </TouchableOpacity>
              </View>
            </TouchableOpacity>
          )}
          scrollEventThrottle={16}
          onMomentumScrollEnd={e => {
            if (isCloseToBottom(e.nativeEvent)) {
              refreshData();
            }
          }}
          ListFooterComponent={ListFooterComponent}
          ListEmptyComponent={() => (
            <View style={{ alignItems: 'center', padding: 20 }}>
              <Text style={{ color: Colors.greyWhite, fontSize: 16 }}>
                The item not found
              </Text>
            </View>
          )}
        />

        {/* Create & Update Modal */}
        <Modal
          animationType="slide"
          transparent={true}
          visible={
            (productInfo.visible && productInfo.type === 'create') ||
            (productInfo.visible && productInfo.type === 'update')
          }
          onRequestClose={() =>
            setProductInfo(pre => ({
              ...pre,
              visible: false,
              id: '',
              description: '',
              title: '',
              uri: '',
            }))
          }
        >
          <TouchableOpacity
            style={styles.overlay}
            activeOpacity={1}
            onPressOut={() =>
              setProductInfo(pre => ({
                ...pre,
                visible: false,
                id: '',
                description: '',
                title: '',
                uri: '',
              }))
            }
          />

          <View style={styles.bottomSheet}>
            <Text style={styles.sheetText}>Update Product</Text>
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
                        tintColor={'lightgrey'}
                      />
                    </View>
                  </TouchableOpacity>

                  <TextInput
                    value={productInfo.title}
                    placeholder="Enter Title"
                    onFocus={() => setShowFocus('title')}
                    onBlur={() => setShowFocus(null)}
                    focused={showFocus === 'title'}
                    containerStyle={[
                      styles.textInputContainer,
                      {
                        backgroundColor:
                          showFocus === 'title' ? '#333333' : '#1E1E1E',
                        borderColor:
                          showFocus === 'title' ? '#1F80E0' : '#333333',
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
                      } else {
                        handleUpdateProduct();
                      }
                    }}
                  >
                    <Text style={styles.submitText}>Submit</Text>
                  </Touchable>
                </ScrollView>
              </KeyboardAvoidingView>
            </TouchableWithoutFeedback>
          </View>
        </Modal>

        {/* Delete Modal Display */}
        <Modal
          visible={productInfo.visible && productInfo?.type === 'delete'}
          transparent
          animationType="fade"
        >
          <View style={styles.deleteOverlay}>
            <View style={styles.deleteModal}>
              <Text style={styles.textAction}>
                Are you sure that you want to delete this card?
              </Text>
              <View style={styles.action}>
                <TouchableOpacity
                  onPress={() => {
                    dispatch(productRemoveRequest({ id: productInfo.id }));
                    setProductInfo(pre => ({
                      ...pre,
                      visible: false,
                    }));
                  }}
                  style={styles.yesAction}
                >
                  <Text style={styles.yesText}>Yes</Text>
                </TouchableOpacity>

                <TouchableOpacity
                  onPress={() => {
                    setProductInfo(pre => ({
                      ...pre,
                      visible: false,
                    }));
                  }}
                  style={styles.noAction}
                >
                  <Text style={styles.noText}>No</Text>
                </TouchableOpacity>
              </View>
            </View>
          </View>
        </Modal>
      </ImageBackground>
    </View>
  );
};

export default List;
