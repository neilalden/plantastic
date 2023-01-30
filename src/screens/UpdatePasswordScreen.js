/* eslint-disable prettier/prettier */
import {Image, StyleSheet, Text, View} from 'react-native';
import React, {useContext, useState} from 'react';
import Screen from '../components/Screen';
import {ButtonOutline} from '../components/Buttons';
import {useNavigation} from '@react-navigation/native';
import Header from '../components/Header';
import {COLORS} from '../common/utils/colors';
import {SIZE} from '../common/utils/size';
import {FONT_WEIGHT} from '../common/utils/font';
import {TextInput} from '../components/TextInput';
import auth from '@react-native-firebase/auth';
import {
  validateConfirmPassword,
  validatePassword,
} from '../functions/validation/stringValidation';
import {AuthContext} from '../context/AuthContext';

const UpdatePasswordScreen = () => {
  const {user} = useContext(AuthContext);
  if (!user)
    return (
      <Screen>
        <Header text="UPDATE ACCOUNT" />
      </Screen>
    );
  const navigation = useNavigation();
  const [password, setPassword] = React.useState();
  const [name, setName] = React.useState();
  const [confirmPassword, setConfirmPassword] = React.useState();
  const [email, setEmail] = useState();
  const handleUpdateEmail = () => {
    if (!user) return;
    auth()
      .currentUser.updateEmail(email)
      .then(() => {
        alert('Update successful');
        setEmail('');
        // ...
        // ...
      })
      .catch(error => {
        alert(error);
        // An error occurred
        // ...
      });
  };

  const handleUpdateName = () => {
    if (!user) return;

    (async () => {
      try {
        const res = await updateDatabase('Users', {name: name}, user.uid);
        alert(res);
        setReload(prev => !prev);
      } catch (e) {
        console.error(e);
      }
    })();
  };

  const handlePress = () => {
    const validatedPassword = validatePassword(password);
    const validatedConfirmPassword = validateConfirmPassword(
      password,
      confirmPassword,
    );
    if (validatedPassword !== true) {
      alert(validatedPassword);
      return;
    }
    if (validatedConfirmPassword !== true) {
      alert(validatedConfirmPassword);
      return;
    }
    if (!user) return;

    auth()
      .currentUser.updatePassword(password)
      .then(() => {
        // Update successful.
        alert('Update password success!');
        setPassword('');
        setConfirmPassword('');
      })
      .catch(error => {
        // An error ocurred
        // ...
        console.error(error);
      });
  };
  return (
    <Screen>
      <Header text="UPDATE ACCOUNT" />
      <TextInput
        value={email}
        onChangeText={text => setEmail(text)}
        label="New Email"
        textColor={COLORS.DARKGREEN}
        baseColor={COLORS.DARKGREEN}
        tintColor={COLORS.DARKGREEN}
      />
      <ButtonOutline
        text={'UPDATE EMAIL'}
        containerStyle={styles.buttonContainer}
        textStyle={styles.buttonTextStyle}
        onPress={handleUpdateEmail}
      />

      <TextInput
        value={name}
        onChangeText={text => setName(text)}
        label={user.userType == 'buyer' ? 'New Name' : 'New Shop Name'}
        textColor={COLORS.DARKGREEN}
        baseColor={COLORS.DARKGREEN}
        tintColor={COLORS.DARKGREEN}
      />
      <ButtonOutline
        text={user.userType == 'buyer' ? 'UPDATE NAME' : 'UPDATE SHOP NAME'}
        containerStyle={styles.buttonContainer}
        textStyle={styles.buttonTextStyle}
        onPress={handleUpdateName}
      />

      <TextInput
        secureTextEntry={true}
        value={password}
        onChangeText={text => setPassword(text)}
        label="New Password"
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
        text={'UPDATE PASSWORD'}
        containerStyle={styles.buttonContainer}
        textStyle={styles.buttonTextStyle}
        onPress={handlePress}
      />
    </Screen>
  );
};
export default UpdatePasswordScreen;

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
    marginBottom: SIZE.x50,
  },
  buttonTextStyle: {
    color: COLORS.DARKGREEN,
  },
});
