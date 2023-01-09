import {KeyboardAvoidingView, StyleSheet, Text, View} from 'react-native';
import React from 'react';
import {SIZE} from '../common/utils/size';
import {COLORS} from '../common/utils/colors';
import {TextField} from 'rn-material-ui-textfield';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
export const TextInput = props => {
  const value = props.value ?? '';
  const onChangeText = props.onChangeText;
  const label = props.label;
  const inputStyle = props.inputStyle ?? null;
  const containerStyle = [styles.textInputContainer, props.containerStyle];
  const fontSize = props.fontSize ?? SIZE.x22;
  const labelFontSize = props.labelFontSize ?? SIZE.x16;
  const tintColor = props.tintColor ?? COLORS.GREEN100;
  const baseColor = props.baseColor ?? COLORS.WHITE;
  const textColor = props.textColor ?? COLORS.WHITE;
  const keyboardtype = props.keyboardtype ?? 'default';
  const secureTextEntry = props.secureTextEntry ?? false;
  if (onChangeText === undefined || label === undefined)
    return <Text>TextInput lacks the required props</Text>;
  return (
    <KeyboardAwareScrollView style={containerStyle}>
      <TextField
        value={value}
        onChangeText={onChangeText}
        tintColor={tintColor}
        baseColor={baseColor}
        textColor={textColor}
        fontSize={fontSize}
        labelFontSize={labelFontSize}
        label={label}
        keyboardtype={keyboardtype}
        secureTextEntry={secureTextEntry}
        style={inputStyle}
      />
    </KeyboardAwareScrollView>
  );
};

const styles = StyleSheet.create({
  textInputContainer: {
    width: SIZE.x300,
    alignSelf: 'center',
  },
});
