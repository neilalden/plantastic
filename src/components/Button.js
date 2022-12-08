import {StyleSheet, Text, TouchableOpacity} from 'react-native';
import React from 'react';
import {COLORS} from '../common/utils/colors';
import LinearGradient from 'react-native-linear-gradient';
import {SIZE} from '../common/utils/size';
const Button = ({
  containerStyle,
  textStyle,
  onPress,
  text,
  gradientColor = [],
}) => {
  return (
    <TouchableOpacity
      onPress={onPress}
      style={[styles.buttonContainer, containerStyle]}>
      {gradientColor.length > 0 ? (
        <LinearGradient colors={gradientColor} style={styles.linearGradient}>
          <Text style={[styles.buttonText, textStyle]}>{text}</Text>
        </LinearGradient>
      ) : (
        <Text style={[styles.buttonText, textStyle]}>{text}</Text>
      )}
    </TouchableOpacity>
  );
};

export default Button;

const styles = StyleSheet.create({
  linearGradient: {
    height: SIZE.p100,
    width: SIZE.p100,
    flex: 1,
  },
  buttonContainer: {
    overflow: 'hidden',
    height: SIZE.x50,
    borderRadius: SIZE.x16,
    backgroundColor: COLORS.WHITE,
  },
  buttonText: {
    marginTop: SIZE.x14,
    alignSelf: 'center',
  },
});
