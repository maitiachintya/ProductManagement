import {
  View,
  TextInput as Input,
  StyleProp,
  TextStyle,
  ViewStyle,
  KeyboardTypeOptions,
  StyleSheet,
  Platform,
  TouchableOpacity,
  Image,
  Animated,
} from 'react-native';
import React, { FC, useEffect, useRef } from 'react';
import { Colors } from '../themes/Colors';
import { Fonts } from '../themes/Fonts';

interface TextInputProps {
  value: string;
  onChangeText: (value: string) => void;
  onFocus?: () => void;
  onBlur?: () => void;
  icon?: any;
  style?: StyleProp<TextStyle>;
  placeholder?: string;
  placeholderColor?: string;
  multiline?: boolean;
  numberOfLines?: number;
  containerStyle?: StyleProp<ViewStyle>;
  disable?: boolean;
  editable?: boolean;
  onPress?: () => void;
  focused?: boolean;
  focusedInput?: boolean;
  secureTextEntry?: boolean;
  keyboardType?: KeyboardTypeOptions;
}
const TextInput: FC<TextInputProps> = ({
  onChangeText = () => {},
  placeholder,
  value,
  containerStyle,
  icon,
  style,
  onBlur = () => {},
  onFocus = () => {},
  placeholderColor = Colors.grey,
  multiline = false,
  numberOfLines = 1,
  disable = true,
  editable = true,
  focused,
  onPress = () => {},
  secureTextEntry = false,
  keyboardType = 'default',
}) => {
  const isAnim = useRef(new Animated.Value(0)).current;

  const isAnimation = (value: number) => {
    Animated.timing(isAnim, {
      toValue: value,
      duration: 500,
      useNativeDriver: false,
    }).start();
  };

  const translateX = isAnim.interpolate({
    inputRange: [0, 1],
    outputRange: [0, 5],
  });

  const translateY = isAnim.interpolate({
    inputRange: [0, 1],
    outputRange: [0, -18],
  });

  const scale = isAnim.interpolate({
    inputRange: [0, 1],
    outputRange: [1, 0.7],
  });
  const paddingHorizontal = isAnim.interpolate({
    inputRange: [0, 1],
    outputRange: [15, 0],
  });

  useEffect(() => {
    if (value !== '') {
      isAnimation(1);
    } else {
      isAnimation(0);
    }
  }, [value]);

  return (
    <View
      style={[styles.container, focused && styles.focusedInput, containerStyle]}
    >
      <Animated.Text
        style={[
          styles.placeHolder,
          {
            color: placeholderColor,
            paddingHorizontal: paddingHorizontal,
            transform: [
              { translateY: translateY },
              { translateX: translateX },
              { scale: scale },
            ],
          },
        ]}
      >
        {placeholder}
      </Animated.Text>
      <Input
        editable={editable}
        value={value}
        onChangeText={onChangeText}
        onBlur={() => {
          onBlur();
          if (value === '') {
            isAnimation(0);
          }
        }}
        onFocus={() => {
          onFocus();
          isAnimation(1);
        }}
        placeholderTextColor={placeholderColor}
        style={[styles.input, style]}
        secureTextEntry={secureTextEntry}
        keyboardType={keyboardType}
        multiline={multiline}
        numberOfLines={numberOfLines}
      />

      <TouchableOpacity
        onPress={onPress}
        disabled={disable}
        style={styles.touch}
      >
        {icon && <Image source={icon} style={styles.icon} />}
      </TouchableOpacity>
    </View>
  );
};

export default TextInput;

const styles = StyleSheet.create({
  container: {
    height: 58,
    width: '90%',
    alignSelf: 'center',
    backgroundColor: Colors.dark,
    marginTop: 12,
    flexDirection: 'row',
    alignItems: 'center',
  },
  placeHolder: {
    position: 'absolute',
    color: Colors.grey,
    fontFamily: Fonts.Poppins_Regular,
    fontSize: Platform.OS == 'ios' ? 14 : 12,
  },
  input: {
    flex: 1,
    paddingHorizontal: 15,
    color: Colors.grey,
    fontFamily: Fonts.Poppins_Regular,
    fontSize: Platform.OS == 'ios' ? 14 : 12,
    height: '100%',
  },
  touch: {
    justifyContent: 'center',
    alignItems: 'center',
    height: '100%',
    width: 50,
  },
  icon: {
    resizeMode: 'contain',
    height: 15,
    width: 15,
    tintColor: Colors.grey,
  },
  focusedInput: {
    borderColor: Colors.grey,
    borderWidth: 1,
  },
});
