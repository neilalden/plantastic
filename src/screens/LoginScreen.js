import {StyleSheet, Text, View} from 'react-native';
import React from 'react';
import Screen from '../components/Screen';
import Button from '../components/Button';

const LoginScreen = ({navigation}) => {
  const handleBack = () => {
    navigation.goBack();
  };
  return (
    <Screen>
      <Text>Ay ho login</Text>
      <Button
        text={'BALEK'}
        onPress={handleBack}
        containerStyle={styles.buttonLoginContainer}
        textStyle={styles.buttonLoginText}
      />
    </Screen>
  );
};

export default LoginScreen;

const styles = StyleSheet.create({});
