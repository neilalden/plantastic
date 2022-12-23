/* eslint-disable prettier/prettier */
import {Image, StyleSheet, Text, View} from 'react-native';
import React from 'react';
import Screen from '../components/Screen';
import {Button, ButtonOutline} from '../components/Buttons';
import {useNavigation, useRoute} from '@react-navigation/native';
import Header from '../components/Header';
import {TEXT_SHADOW} from '../common/utils/styles';
import {IMAGES} from '../common/images';
import {COLORS} from '../common/utils/colors';
import {SIZE} from '../common/utils/size';
import {FONT_WEIGHT} from '../common/utils/font';
import {TextInput} from '../components/TextInput';
import {signUpFormValidation} from '../functions/validation/signUpFormValidation';
import {accountRegister} from '../functions/authentication/accountRegistration';

const RegisterScreen = () => {
  const navigation = useNavigation();
  const [email, setEmail] = React.useState();
  const [username, setUsername] = React.useState();
  const [password, setPassword] = React.useState();
  const [confirmPassword, setConfirmPassword] = React.useState();
  const handleRegister = () => {
    if (!signUpFormValidation(username, email, password, confirmPassword))
      return;
    accountRegister(email, password, username);
  };
  return (
    <Screen>
      <Header />
      <Image source={IMAGES.ic_app_round} style={styles.icon} />
      <Text style={[styles.title, TEXT_SHADOW]}>LOGIN</Text>
      <TextInput
        value={username}
        onChangeText={text => setUsername(text)}
        label="Username"
      />
      <TextInput
        value={email}
        onChangeText={text => setEmail(text)}
        label="Email"
        keyboardtype="email-address"
      />
      <TextInput
        secureTextEntry={true}
        value={password}
        onChangeText={text => setPassword(text)}
        label="Password"
      />
      <TextInput
        secureTextEntry={true}
        value={confirmPassword}
        onChangeText={text => setConfirmPassword(text)}
        label="Confirm Password"
      />
      <ButtonOutline
        text={'REGISTER'}
        onPress={handleRegister}
        containerStyle={styles.buttonContainer}
        textStyle={styles.buttonText}
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
    width: SIZE.x300,
    marginTop: SIZE.x50,
    alignSelf: 'center',
    marginBottom: SIZE.x30,
  },
  buttonText: {
    color: COLORS.WHITE,
  },
});
