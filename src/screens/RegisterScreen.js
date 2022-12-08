/* eslint-disable prettier/prettier */
import {StyleSheet} from 'react-native';
import React from 'react';
import Screen from '../components/Screen';
import Button from '../components/Button';
import BottomNav from '../components/BottomNav';
import { useRoute } from '@react-navigation/native';

const RegisterScreen = ({navigation}) => {
  const route = useRoute();
  const handleBack = () => {
    navigation.goBack();
  };
  return (
    <>
      <Screen>
        <Button
          text={'BACK'}
          onPress={handleBack}
          containerStyle={styles.buttonLoginContainer}
          textStyle={styles.buttonLoginText}
        />
      </Screen>
      <BottomNav routeName={route.name} navigation={navigation} />
    </>
  );
};

export default RegisterScreen;

const styles = StyleSheet.create({});
