import {Image, StyleSheet, Text, TouchableOpacity} from 'react-native';
import React from 'react';
import Screen from '../components/Screen';
import {COLORS} from '../common/utils/colors';
import {FONT_WEIGHT} from '../common/utils/font';
import {SIZE} from '../common/utils/size';
import {Button, ButtonOutline} from '../components/Buttons';
import {IMAGES} from '../common/images';
import {APP_NAME} from '../common/constants/text';
import {TEXT_SHADOW} from '../common/utils/styles';
import {ROUTES} from '../common/routes';
import Icon from '../components/Icon';
const LandingScreen = ({navigation}) => {
  const handleLogin = () => {
    navigation.navigate(ROUTES.LOGIN_SCREEN);
  };
  const handleRegister = () => {
    navigation.navigate(ROUTES.REGISTER_SCREEN);
  };
  return (
    <Screen>
      <Icon
        source={IMAGES.ic_app2}
        size={SIZE.x200}
        iconStyle={styles.icon}
        containerStyle={styles.iconContainer}
      />
      <Text style={[styles.title, TEXT_SHADOW, {color: COLORS.DARKGREEN}]}>
        {APP_NAME}
      </Text>
      <Button
        text={'LOGIN'}
        onPress={handleLogin}
        containerStyle={styles.buttonContainer}
        gradientColor={[COLORS.GREEN300, COLORS.DARKGREEN]}
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
  buttonContainer: {
    width: SIZE.x300,
    alignSelf: 'center',
    borderColor: COLORS.DARKGREEN,
    marginTop: SIZE.x54,
  },
  buttonText: {
    color: COLORS.DARKGREEN,
  },
});
