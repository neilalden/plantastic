import {Image, StyleSheet, Text, TouchableOpacity} from 'react-native';
import React from 'react';
import Screen from '../components/Screen';
import {COLORS} from '../common/utils/colors';
import {FONT_WEIGHT} from '../common/utils/font';
import {SIZE} from '../common/utils/size';
import Button from '../components/Button';
import {IMAGES} from '../common/images';
import {APP_NAME} from '../constants/text';
import {TEXT_SHADOW} from '../common/utils/styles';
import {ROUTES} from '../common/routes';
import Icon from '../components/Icon';
const LandingScreen = ({navigation}) => {
  const handleLogin = () => {
    navigation.navigate(ROUTES.HOME_SCREEN);
  };
  return (
    <Screen>
      <Icon
        source={IMAGES.ic_app}
        size={SIZE.x200}
        iconStyle={styles.icon}
        containerStyle={styles.iconContainer}
      />
      <Text style={[styles.title, TEXT_SHADOW]}>{APP_NAME}</Text>
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
  iconContainer: {
    alignSelf: 'center',
    marginTop: SIZE.x150,
  },
  title: {
    fontSize: SIZE.x40,
    FONT_WEIGHT: FONT_WEIGHT.x700,
    color: COLORS.WHITE,
    marginTop: SIZE.x20,
    alignSelf: 'center',
  },
  buttonLoginContainer: {
    width: SIZE.x300,
    alignSelf: 'center',
    marginTop: SIZE.x54,
  },
  buttonLoginText: {
    color: COLORS.DARKGREEN,
    FONT_WEIGHT: FONT_WEIGHT.BOLD,
    fontSize: SIZE.x20,
  },
  buttonRegisterContainer: {
    width: SIZE.x300,
    alignSelf: 'center',
    marginTop: SIZE.x54,
    backgroundColor: 'transparent',
    borderWidth: SIZE.x2,
    borderColor: COLORS.WHITE,
  },
  buttonRegisterText: {
    color: COLORS.WHITE,
    FONT_WEIGHT: FONT_WEIGHT.BOLD,
    fontSize: SIZE.x20,
  },
});
