import {StyleSheet, SafeAreaView, ViewStyle, View} from 'react-native';
import React from 'react';
import {COLORS} from '../common/utils/colors';
import LinearGradient from 'react-native-linear-gradient';
import {ScrollView} from 'react-native-gesture-handler';
import {SIZE} from '../common/utils/size';
type Props = {
  gradientBG?: Boolean;
  style?: ViewStyle;
  children?: React.ReactNode;
};
const Screen = ({gradientBG = false, style, children}: Props) => {
  if (gradientBG) {
    return (
      <LinearGradient
        colors={[COLORS.GREEN500, COLORS.DARKGREEN]}
        style={styles.container}>
        <SafeAreaView style={[styles.container, style]}>
          <ScrollView
            showsVerticalScrollIndicator={false}
            style={{marginHorizontal: SIZE.x14}}>
            {children}
          </ScrollView>
        </SafeAreaView>
      </LinearGradient>
    );
  } else {
    return (
      <SafeAreaView
        style={[styles.container, style, {backgroundColor: COLORS.M1}]}>
        <ScrollView
          showsVerticalScrollIndicator={false}
          style={{marginHorizontal: SIZE.x14}}>
          {children}
        </ScrollView>
      </SafeAreaView>
    );
  }
};

export default Screen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
