import {StyleSheet} from 'react-native';
import React from 'react';
import Screen from '../components/Screen';
import Button from '../components/Button';

const RegisterScreen = ({navigation}) => {
  const handleBack = () => {
    navigation.goBack();
  };
  return (
    <Screen>
      <Button
        text={'BACK'}
        onPress={handleBack}
        containerStyle={styles.buttonLoginContainer}
        textStyle={styles.buttonLoginText}
      />
    </Screen>
  );
};

export default RegisterScreen;

const styles = StyleSheet.create({});
