/* eslint-disable prettier/prettier */
import {Image, StyleSheet, Text, View, TextInput} from 'react-native';
import React from 'react';
import Screen from '../components/Screen';
import Button from '../components/Button';
import {IMAGES} from '../common/images';
import BottomNav from '../components/BottomNav';
import { useRoute } from '@react-navigation/native';

const PlantRecordScreen = ({navigation}) => {
  const route = useRoute();
  const handleBack = () => {
    navigation.goBack();
  };
  return (
    <><Screen>
      {/* <Screen>
    <Image source={IMAGES.ic_app} style={styles.icon} />
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
  </Screen> */}

      <View style={styles.container}>
        <Image source={IMAGES.ic_folder} style={styles.icon} width={30} height={30} />
        <Image source={IMAGES.ic_time} style={styles.icon} width={30} height={30} />
        <Image source={IMAGES.ic_list} style={styles.icon} width={30} height={30} />
      </View>
      <TextInput style={styles.searchBar} placeholder='SEARCH'>
      </TextInput>

      <Image source={IMAGES.ic_search} style={styles.icon} width={30} height={30} />
      <View style={styles.card}>
        <Image source={IMAGES.ic_app_round} style={styles.icon} width={30} height={30} />
        <View>
          <View><Text>Hello</Text></View>
          <View><Text>Hello</Text></View>
        </View>
        <View>
          <Image source={IMAGES.ic_three_dots} style={styles.icon} width={30} height={30} />
          <Image source={IMAGES.ic_note} style={styles.icon} width={30} height={30} />
        </View>
      </View>


      <Button

        text={'BACK'}
        onPress={handleBack}
        containerStyle={styles.buttonLoginContainer}
        textStyle={styles.buttonLoginText} />
    </Screen>
    <BottomNav routeName={route.name} navigation={navigation} />
    </>
  );
};

export default PlantRecordScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginTop: 50,
    borderColor: 'black',
  },
  searchBar: {
    marginTop: 50,
    marginRight: 35,
    marginLeft: 35,
    padding: 6,
    borderWidth: 1,
    borderColor: 'white',
    borderRadius:25,
    paddingLeft: 20,
    alignItems: 'center',
  },
  card: {
    padding: 40,
    flex: 1,
    flexDirection: "row",
    justifyContent: "space-around",
    backgroundColor: 'd9d9d9',
  }
  
});
