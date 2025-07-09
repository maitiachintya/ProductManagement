import {
  Text,
  StyleProp,
  ViewStyle,
  TextStyle,
  TouchableOpacity,
  StyleSheet,
} from 'react-native';
import React, { FC } from 'react';
import { Colors } from '../themes/Colors';
import { Fonts } from '../themes/Fonts';

interface ButtonProps {
  style?: StyleProp<ViewStyle>;
  disable?: boolean;
  onPress?: () => void;
  title?: string;
  textStyle?: StyleProp<TextStyle>;
  backgroundColor?: string;
}

const Button: FC<ButtonProps> = ({
  disable = true,
  onPress = () => {},
  textStyle,
  title = 'Title',
  style,
  backgroundColor = 'red',
}) => {
  return (
    <TouchableOpacity
      onPress={onPress}
      style={[styles.container, { backgroundColor }, style]}
    >
      <Text style={[textStyle, styles.title]}>{title}</Text>
    </TouchableOpacity>
  );
};

export default Button;

const styles = StyleSheet.create({
  container: {
    height: 58,
    width: '100%',
    backgroundColor: Colors.red,
    marginTop: 12,
    justifyContent: 'center',
    alignItems: 'center',
  },
  title: {
    color: Colors.white,
    fontFamily: Fonts.Poppins_Regular,
    fontSize: 16,
  },
});
