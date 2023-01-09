/* eslint-disable prettier/prettier */
import {Image, StyleSheet, Text, View} from 'react-native';
import React from 'react';
import Screen from '../components/Screen';
import {ButtonOutline} from '../components/Buttons';
import {useNavigation, useRoute} from '@react-navigation/native';
import Header from '../components/Header';
import {TEXT_SHADOW} from '../common/utils/styles';
import {IMAGES} from '../common/images';
import {COLORS} from '../common/utils/colors';
import {SIZE} from '../common/utils/size';
import {FONT_WEIGHT} from '../common/utils/font';
import {TextInput} from '../components/TextInput';
import {accountRegister} from '../functions/authentication/accountRegistration';
import Switch from '../components/Switch';
import {userTypes} from '../common/constants/userTypes';

const RegisterScreen = () => {
  const navigation = useNavigation();
  const [email, setEmail] = React.useState();
  const [name, setname] = React.useState();
  const [password, setPassword] = React.useState();
  const [confirmPassword, setConfirmPassword] = React.useState();
  const [userType, setUserType] = React.useState(userTypes[0].value);
  return (
    <Screen>
      <Header text="REGISTER" />
      <Image source={IMAGES.ic_app_round} style={styles.icon} />
      <Text style={[styles.title, TEXT_SHADOW, {color: COLORS.DARKGREEN}]}>
        REGISTER
      </Text>
      <Switch
        value={userType}
        setValue={setUserType}
        values={userTypes}
        switchContainerStyle={{marginTop: SIZE.x30}}
      />
      <TextInput
        value={name}
        onChangeText={text => setname(text)}
        label="Name"
        textColor={COLORS.DARKGREEN}
        baseColor={COLORS.DARKGREEN}
        tintColor={COLORS.DARKGREEN}
      />
      <TextInput
        value={email}
        onChangeText={text => setEmail(text)}
        label="Email"
        keyboardtype="email-address"
        textColor={COLORS.DARKGREEN}
        baseColor={COLORS.DARKGREEN}
        tintColor={COLORS.DARKGREEN}
      />
      <TextInput
        secureTextEntry={true}
        value={password}
        onChangeText={text => setPassword(text)}
        label="Password"
        textColor={COLORS.DARKGREEN}
        baseColor={COLORS.DARKGREEN}
        tintColor={COLORS.DARKGREEN}
      />
      <TextInput
        secureTextEntry={true}
        value={confirmPassword}
        onChangeText={text => setConfirmPassword(text)}
        label="Confirm Password"
        textColor={COLORS.DARKGREEN}
        baseColor={COLORS.DARKGREEN}
        tintColor={COLORS.DARKGREEN}
      />
      <ButtonOutline
        text={'REGISTER'}
        containerStyle={styles.buttonContainer}
        textStyle={styles.buttonTextStyle}
        onPress={() =>
          accountRegister(userType, name, email, password, confirmPassword)
        }
      />
    </Screen>
  );
};
export default RegisterScreen;

const styles = StyleSheet.create({
  icon: {
    height: SIZE.x150,
    marginTop: SIZE.x20,
    alignSelf: 'center',
    resizeMode: 'contain',
  },
  title: {
    fontSize: SIZE.x30,
    FONT_WEIGHT: FONT_WEIGHT.x700,
    color: COLORS.WHITE,
    marginTop: SIZE.x20,
    alignSelf: 'center',
  },
  buttonContainer: {
    marginVertical: SIZE.x30,
    width: SIZE.x300,
    alignSelf: 'center',
    borderColor: COLORS.DARKGREEN,
  },
  buttonTextStyle: {
    color: COLORS.DARKGREEN,
  },
});
