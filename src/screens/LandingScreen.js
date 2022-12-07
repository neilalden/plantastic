import {Image, StyleSheet, Text, TouchableOpacity} from 'react-native';
import React from 'react';
import Screen from '../components/Screen';
import {COLORS} from '../common/utils/colors';
import {FONTWEIGHT} from '../common/utils/font';
import {SIZE} from '../common/utils/size';
import Button from '../components/Button';
import {IMAGES} from '../common/images';
import {APP_NAME} from '../constants/text';
import {TEXTSHADOW} from '../common/utils/styles';
import {ROUTES} from '../common/routes';
const LandingScreen = ({navigation}) => {
  const handleLogin = () => {
    navigation.navigate(ROUTES.LOGINSCREEN);
  };
  return (
    <Screen>
      <Image source={IMAGES.ic_app} style={styles.icon} />
      <Text style={[styles.title, TEXTSHADOW]}>{APP_NAME}</Text>
      <Button
        text={'LOGIN'}
        onPress={handleLogin}
        containerStyle={styles.buttonLoginContainer}
        textStyle={styles.buttonLoginText}
        gradientColor={[COLORS.WHITE, COLORS.GREEN300]}
      />
      <Button
        text={'REGISTER'}
        onPress={handleLogin}
        containerStyle={styles.buttonRegisterContainer}
        textStyle={styles.buttonRegisterText}
      />
    </Screen>
  );
};

export default LandingScreen;

const styles = StyleSheet.create({
  icon: {
    alignSelf: 'center',
    resizeMode: 'contain',
    height: SIZE.x200,
    marginTop: SIZE.x150,
  },
  title: {
    fontSize: SIZE.x40,
    fontWeight: FONTWEIGHT.x700,
    color: COLORS.WHITE,
    marginTop: SIZE.x20,
    alignSelf: 'center',
  },
  buttonLoginContainer: {
    width: SIZE.p80,
    alignSelf: 'center',
    marginTop: SIZE.x54,
  },
  buttonLoginText: {
    color: COLORS.DARKGREEN,
    fontWeight: FONTWEIGHT.BOLD,
    fontSize: SIZE.x20,
  },
  buttonRegisterContainer: {
    width: SIZE.p80,
    alignSelf: 'center',
    marginTop: SIZE.x54,
    backgroundColor: 'transparent',
    borderWidth: SIZE.x2,
    borderColor: COLORS.WHITE,
  },
  buttonRegisterText: {
    color: COLORS.WHITE,
    fontWeight: FONTWEIGHT.BOLD,
    fontSize: SIZE.x20,
  },
});
