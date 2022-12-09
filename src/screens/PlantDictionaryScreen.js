/* eslint-disable prettier/prettier */
import {Image, StyleSheet, Text, TextInput, View} from 'react-native';
import React from 'react';
import Screen from '../components/Screen';
import {Button} from '../components/Buttons';
import BottomNav from '../components/BottomNav';
import {useRoute} from '@react-navigation/native';
import {IMAGES} from '../common/images';
import Header from '../components/Header';
import { SIZE } from '../common/utils/size';
import Icon from '../components/Icon';
import { COLORS } from '../common/utils/colors';
import {data} from '../../DUMMY_DATA';

const PlantDictionaryScreen = ({navigation}) => {
  const route = useRoute();
  const handleBack = () => {
    navigation.goBack();
  };
  
  return (
    <>
      <Screen>
        <Header text="Plant Dictionary" canGoBack={false} />

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
        {data.map((item)=>
        {console.log(item)
        return (<View style={styles.card3}>
          <Image
            source={{uri: item.image}}
            style={styles.icon}
          />
          <View style={styles.content}>
            <View>
              <Text style={styles.textTitle}>{item.scientific_name}</Text>
              <Text style={styles.textTitle}>{item.common_name}</Text>
            </View>
            <View>
              <Text style={styles.textContent}>{item.uses}</Text>
            </View>
          </View>
        </View>
        );})
        }

        {/* CARD COMPONENT */}
        <View style={styles.card}>
          <Image
            source={IMAGES.ic_app_round}
            style={styles.icon}
            width={80}
            height={80}
          />
          <View style={styles.content}>
            <View>
              <Text style={styles.textTitle}>LIME</Text>
            </View>
            <View>
              <Text style={styles.textContent}>Choose Me</Text>
            </View>
          </View>
        </View>
        {/* CARD COMPONENT */}
        <View style={styles.card2}>
          <Image
            source={IMAGES.ic_app_round}
            style={styles.icon}
            width={80}
            height={80}
          />
          <View style={styles.content}>
            <View>
              <Text style={styles.textTitle}>GLASHMORPH</Text>
            </View>
            <View>
              <Text style={styles.textContent}>Choose Glassmorph</Text>
            </View>
          </View>
        </View>
      </Screen>
      <BottomNav routeName={route.name} navigation={navigation} />
    </>
  );
};

export default PlantDictionaryScreen;

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
  card: {
    marginTop: 14,
    padding: 20,
    marginHorizontal: 14,
    borderRadius: 25,
    flex: 1,
    flexDirection: 'row',
    backgroundColor: COLORS.GREEN500,
    alignItems: 'center',
  },
  card2: {
    marginTop: 14,
    padding: 20,
    marginHorizontal: 14,
    borderRadius: 25,
    flex: 1,
    flexDirection: 'row',
    backgroundColor: 'rgba(217,217,217,0.3)',
    alignItems: 'center',
  },
  card3: {
    marginTop: 14,
    paddingLeft: 20,
    paddingVertical: SIZE.x6,
    marginHorizontal: 14,
    borderRadius: 25,
    flex: 1,
    flexDirection: 'row',
    backgroundColor: COLORS.DARKGREEN,
    alignItems: 'center',
  },
  content: {
    marginLeft: 30,
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
  icon:{
    height: SIZE.x80,
    width: SIZE.x80,
    borderRadius: SIZE.x4,
    resizeMode: 'contain',
  }
});
