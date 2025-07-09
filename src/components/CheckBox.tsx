import { TouchableOpacity, StyleSheet, Image } from 'react-native';
import React, { FC } from 'react';
import { Colors } from '../themes/Colors';

interface checkBoxProps {
  box: any;
  disable?: boolean;
  onPress?: () => void;
}

const CheckBox: FC<checkBoxProps> = ({
  disable = true,
  onPress = () => {},
  box,
}) => {
  return (
    <TouchableOpacity disabled={disable} onPress={onPress}>
      {box && <Image source={box} style={styles.box} />}
    </TouchableOpacity>
  );
};

export default CheckBox;

const styles = StyleSheet.create({
  box: {
    resizeMode: 'contain',
    width: 20,
    height: 20,
    tintColor: Colors.white,
  },
});
