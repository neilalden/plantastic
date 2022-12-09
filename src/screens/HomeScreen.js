/* eslint-disable prettier/prettier */
import {Image, StyleSheet, Text, View, TextInput} from 'react-native';
import React from 'react';
import Screen from '../components/Screen';
import {Button} from '../components/Buttons';
import {ScrollView} from 'react-native-gesture-handler';
import {IMAGES} from '../common/images';
import BottomNav from '../components/BottomNav';
import {useRoute} from '@react-navigation/native';
import {COLORS} from '../common/utils/colors';
import Header from '../components/Header';
import { SIZE } from '../common/utils/size';
import Icon from '../components/Icon';
const HomeScreen = ({navigation}) => {
  const route = useRoute();

  return (
    <React.Fragment>
      <Screen>
        <Header text="Home" canGoBack={false} />
        {/* SEARCH BAR */}
        <View style={styles.searchContainer}>
          <TextInput style={styles.searchInputArea} placeholder="SEARCH" />
          <Icon
            source={IMAGES.ic_search}
            style={styles.searchIcon}
            size={SIZE.x30}
          />
        </View>

        <Text style={styles.textLabel}>Plant Collection</Text>

        <View style={styles.collection}>
          <View style={styles.imgContainer}>
            <Image
              source={IMAGES.ic_app_round}
              style={styles.icon}
              width={60}
              height={60}
            />
          </View>
          <View style={styles.imgContainer}>
            <Image
              source={IMAGES.ic_app_round}
              style={styles.icon}
              width={60}
              height={60}
            />
          </View>
          <View style={styles.imgContainer}>
            <Image
              source={IMAGES.ic_app_round}
              style={styles.icon}
              width={60}
              height={60}
            />
          </View>
        </View>

        
       

        

        <Text style={styles.textLabel}>Useful Tips</Text>
        <View style={styles.div} />
        <Text style={styles.textLabel}>Houseplant Care</Text>
        <View style={styles.div} />
        <Text style={styles.textLabel}>Trends</Text>
        <View style={styles.div} />
      </Screen>
      <BottomNav routeName={route.name} navigation={navigation} />
    </React.Fragment>
  );
};

export default HomeScreen;

const styles = StyleSheet.create({
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
  searchIcon:{
    position: 'relative',
    marginRight: SIZE.x10,
  },
  textLabel: {
    marginTop: 20,
    marginLeft: 20,
  },
  collection: {
    flex: 1,
    marginTop: 20,
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginHorizontal: 15,
  },
  icon: {},
  imgContainer: {
    borderRadius: 50,
    backgroundColor: COLORS.DARKGREEN,
    padding: 10,
  },
  div: {
    marginVertical: 20,
    padding: 40,
    marginHorizontal: 20,
    borderWidth: 1,
    borderColor: 'white',
    borderTopRightRadius: 25,
  },
});
