import {Image, StyleSheet, Text, View} from 'react-native';
import React from 'react';
import Screen from '../components/Screen';
import {Button} from '../components/Buttons';
import {COLORS} from '../common/utils/colors';
import {SIZE} from '../common/utils/size';
import {FONT_WEIGHT} from '../common/utils/font';
import {IMAGES} from '../common/images';
import {TextField} from 'rn-material-ui-textfield';
import {TEXT_SHADOW} from '../common/utils/styles';
import {TouchableOpacity} from 'react-native-gesture-handler';
import Header from '../components/Header';
import {ROUTES} from '../common/routes';
import {TextInput} from '../components/TextInput';
import {signIn} from '../functions/authentication/signIn';
const LoginScreen = () => {
  const [email, setEmail] = React.useState();
  const [password, setPassword] = React.useState();

  return (
    <Screen>
      <Header text="" route={ROUTES.REGISTER_SCREEN} />
      <Image source={IMAGES.ic_app2_round} style={styles.icon} />
      <Text style={[styles.title, TEXT_SHADOW, {color: COLORS.DARKGREEN}]}>
        LOGIN
      </Text>
      <TextInput
        value={email}
        onChangeText={text => setEmail(text)}
        label="Email"
        containerStyle={styles.textInputContainer}
        textColor={COLORS.DARKGREEN}
        baseColor={COLORS.DARKGREEN}
        tintColor={COLORS.DARKGREEN}
      />
      <TextInput
        secureTextEntry={true}
        value={password}
        onChangeText={text => setPassword(text)}
        label="Password"
        containerStyle={styles.textInputContainer}
        textColor={COLORS.DARKGREEN}
        baseColor={COLORS.DARKGREEN}
        tintColor={COLORS.DARKGREEN}
      />
      <Button
        text={'LOGIN'}
        onPress={() => signIn(email, password)}
        containerStyle={styles.buttoContainer}
        textStyle={styles.buttoText}
        gradientColor={[COLORS.GREEN300, COLORS.DARKGREEN]}
      />
    </Screen>
  );
};

export default LoginScreen;

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
    marginTop: SIZE.x46,
    alignSelf: 'center',
  },
  textInputContainer: {
    marginTop: SIZE.x10,
  },
  buttoContainer: {
    width: SIZE.x300,
    marginTop: SIZE.x50,
    alignSelf: 'center',
  },
  buttonText: {
    color: COLORS.DARKGREEN,
  },
  textColor: {
    color: COLORS.DARKGREEN,
  },
});
