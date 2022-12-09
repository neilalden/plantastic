/* eslint-disable prettier/prettier */
import {Image, StyleSheet, Text, View, TextInput} from 'react-native';
import React from 'react';
import Screen from '../components/Screen';
import {Button} from '../components/Buttons';
import {IMAGES} from '../common/images';
import BottomNav from '../components/BottomNav';
import {useRoute} from '@react-navigation/native';
import Header from '../components/Header';
import Icon from '../components/Icon';
import { SIZE } from '../common/utils/size';

const PlantRecordScreen = ({navigation}) => {
  const route = useRoute();
  const handleBack = () => {
    navigation.goBack();
  };
  return (
    <>
      <Screen>
        <Header text="Records" canGoBack={false} />

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
        {/* ICONS */}
        <View style={styles.topIconsContainer}>
          <Image
            source={IMAGES.ic_folder}
            style={styles.icon}
            width={30}
            height={30}
          />
          <Image
            source={IMAGES.ic_time}
            style={styles.icon}
            width={30}
            height={30}
          />
          <Image
            source={IMAGES.ic_list}
            style={styles.icon}
            width={30}
            height={30}
          />
        </View>
        {/* SEARCH BAR */}
        <View style={styles.searchContainer}>
          <TextInput style={styles.searchInputArea} placeholder="SEARCH" />
          <Icon
            source={IMAGES.ic_search}
            style={styles.searchIcon}
            size={SIZE.x30}
          />
        </View>

        {/* CARD COMPONENT */}
        <View style={styles.card}>
          <View style={styles.imageContainer}>
            <Image
              source={IMAGES.ic_app_round}
              style={styles.icon}
              width={80}
              height={80}
            />
            <View style={styles.content}>
              <View>
                <Text style={styles.textTitle}>Hello</Text>
              </View>
              <View>
                <Text style={styles.textContent}>I Can Change Color</Text>
              </View>
            </View>
          </View>
          
          <View style={styles.icon2}>
            <Icon
              source={IMAGES.ic_three_dots}
              style={styles.dotStart}
              size={SIZE.x24}
            />
            <View style={styles.noteEnd}>
              <Icon
                source={IMAGES.ic_note}
                style={styles.bookpencil}
                size={SIZE.x20}
              />
            </View>
          </View>
        </View>


      </Screen>
      <BottomNav routeName={route.name} navigation={navigation} />
    </>
  );
};

export default PlantRecordScreen;

const styles = StyleSheet.create({
  topIconsContainer: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginTop: SIZE.x20,
    borderColor: 'black',
  },
  searchContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    borderColor: 'white',
    borderWidth: SIZE.x1,
    borderRadius: SIZE.x26,
    marginTop: SIZE.x22,
    marginHorizontal: SIZE.x24,
    paddingRight: SIZE.x10
  },
  searchInputArea: {
    height: SIZE.x50,
    width: SIZE.x240,
    marginHorizontal: SIZE.x10,
    padding: SIZE.x10
  },
  card: {
    justifyContent: 'space-between',
    marginTop: 14,
    padding: SIZE.x10,
    marginHorizontal: SIZE.x20,
    borderRadius: 20,
    flexDirection: 'row',
    backgroundColor: 'rgba(217,217,217, .3)',
    alignItems: 'center',
  },
  content: {
    marginLeft: SIZE.x20,
  },
  textTitle: {
    fontWeight: '800',
    fontSize: 16,
  },
  textContent: {
    fontWeight: '500',
    fontSize: 12,
    flexWrap: 'wrap',
  },
  icon2: {
    marginLeft: SIZE.x66,
    height: SIZE.x70,
    flexDirection: 'column',
  },
  imageContainer:{
    alignItems: 'center',
    flexDirection: 'row',
  },
  noteEnd:{
    marginTop:SIZE.x30,
    flex: 1,
    alignSelf: 'center',
    alignContent: 'flex-end'
  },
  
  
});
