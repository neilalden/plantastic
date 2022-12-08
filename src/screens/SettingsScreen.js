/* eslint-disable prettier/prettier */
import {Image, StyleSheet} from 'react-native';
import React from 'react';
import Screen from '../components/Screen';
import Button from '../components/Button';
import BottomNav from '../components/BottomNav';
import { useRoute } from '@react-navigation/native';
import { IMAGES } from '../common/images';


const SettingsScreen = ({navigation}) => {
  const route = useRoute();
  const handleBack = () => {
    navigation.goBack();
  };
  return (
    <>
      <Screen>
      <Image source={IMAGES.ic_star} style={styles.iconers} width={30} height={30} />
      <Image source={IMAGES.ic_star} style={styles.iconers} width={30} height={30} />
      <Image source={IMAGES.ic_star} style={styles.iconers} width={30} height={30} />
      <Image source={IMAGES.ic_star} style={styles.iconers} width={30} height={30} />
      <Image source={IMAGES.ic_star} style={styles.iconers} width={30} height={30} />
      <Image source={IMAGES.ic_star} style={styles.iconers} width={30} height={30} />
      <Image source={IMAGES.ic_star} style={styles.iconers} width={30} height={30} />
      <Image source={IMAGES.ic_star} style={styles.iconers} width={30} height={30} />
      <Image source={IMAGES.ic_star} style={styles.iconers} width={30} height={30} />
      <Image source={IMAGES.ic_star} style={styles.iconers} width={30} height={30} />
      <Image source={IMAGES.ic_star} style={styles.iconers} width={30} height={30} />
      <Image source={IMAGES.ic_star} style={styles.iconers} width={30} height={30} />
      <Image source={IMAGES.ic_star} style={styles.iconers} width={30} height={30} />
      <Image source={IMAGES.ic_star} style={styles.iconers} width={30} height={30} />
        {/* <Button
          text={'BACK'}
          onPress={handleBack}
          containerStyle={styles.buttonLoginContainer}
          textStyle={styles.buttonLoginText}
        /> */}
      </Screen>
      <BottomNav routeName={route.name} navigation={navigation} />
    </>
  );
};

export default SettingsScreen;

const styles = StyleSheet.create({});
