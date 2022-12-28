import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  ViewStyle,
  TextStyle,
} from 'react-native';
import React from 'react';
import {COLORS} from '../common/utils/colors';
import {FONT_WEIGHT} from '../common/utils/font';
import {SIZE} from '../common/utils/size';
import {userType} from '../common/utils/type';
type Props = {
  value: string;
  setValue: React.Dispatch<React.SetStateAction<string>>;
  values: Array<{
    label: string;
    value: userType;
  }>;
  switchContainerStyle: ViewStyle;
  switchStyle: ViewStyle;
  switchTextStyle: TextStyle;
  switchActiveStyle: ViewStyle;
};
const Switch = (props: Props) => {
  const value = props.value;
  const values = props.values;
  const setValue = props.setValue;
  const switchContainerStyle = [
    styles.switchContainer,
    props.switchContainerStyle,
  ];
  const switchStyle = [styles.switch, props.switchStyle];
  const switchTextStyle = [styles.switchText, props.switchTextStyle];
  const switchActiveStyle = [styles.switchActive, props.switchActiveStyle];
  return (
    <View style={switchContainerStyle}>
      <TouchableOpacity
        onPress={() => setValue(values[0].value)}
        style={[switchStyle, value === values[0].value && switchActiveStyle]}>
        <Text
          style={[
            switchTextStyle,
            value === values[0].value && switchActiveStyle,
          ]}>
          {values[0].label}
        </Text>
      </TouchableOpacity>
      <TouchableOpacity
        onPress={() => setValue(values[1].value)}
        style={[switchStyle, value === values[1].value && switchActiveStyle]}>
        <Text
          style={[
            switchTextStyle,
            value === values[1].value && switchActiveStyle,
          ]}>
          {values[1].label}
        </Text>
      </TouchableOpacity>
    </View>
  );
};

export default Switch;

const styles = StyleSheet.create({
  switchContainer: {
    height: SIZE.x50,
    width: SIZE.x300,
    borderWidth: SIZE.x2,
    borderRadius: SIZE.x16,
    borderColor: COLORS.WHITE,
    flexDirection: 'row',
    justifyContent: 'space-between',
    backgroundColor: 'transparent',
    alignSelf: 'center',
    overflow: 'hidden',
  },
  switch: {
    width: SIZE.x150,
    height: SIZE.x50,
    justifyContent: 'center',
    alignItems: 'center',
  },
  switchText: {
    color: COLORS.WHITE,
    fontWeight: FONT_WEIGHT.BOLD,
    fontSize: SIZE.x20,
  },
  switchActive: {
    backgroundColor: COLORS.WHITE,
    color: COLORS.GREEN500,
  },
});
