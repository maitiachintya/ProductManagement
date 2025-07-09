// components/CustomStatusBar.tsx
import React from 'react';
import {
  Platform,
  StatusBar,
  View,
  StyleSheet,
  ColorValue,
} from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

type Props = {
  backgroundColor: ColorValue;
  barStyle?: 'light-content' | 'dark-content';
  translucent?: boolean;
};

export const CustomStatusBar = ({
  backgroundColor,
  barStyle = 'light-content',
  translucent = true,
}: Props) => {
  const insets = useSafeAreaInsets();

  return (
    <View style={[styles.statusBar, { height: insets.top, backgroundColor }]}>
      <StatusBar
        translucent={translucent}
        backgroundColor={backgroundColor}
        barStyle={barStyle}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  statusBar: {
    width: '100%',
    height: '100%',
  },
});
