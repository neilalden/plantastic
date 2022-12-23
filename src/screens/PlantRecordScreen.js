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
import {SIZE} from '../common/utils/size';
import SearchBar from '../components/SearchBar';
import {data} from '../../DUMMY_DATA';
import PlantRecordCard from '../components/PlantRecordCard';

const PlantRecordScreen = ({navigation}) => {
  const route = useRoute();
  const handleBack = () => {
    navigation.goBack();
  };
  return (
    <>
      <Screen>
        <Header text="Records" canGoBack={false} />

        <SearchBar />
        {/* ICONS */}
        <View style={styles.topIconsContainer}>
          <Icon source={IMAGES.ic_folder} size={SIZE.x30} />
          <Icon source={IMAGES.ic_time} size={SIZE.x30} />
          <Icon source={IMAGES.ic_list} size={SIZE.x30} />
        </View>

        {/* CARD COMPONENT */}
        {data.map(item => {
          return (
            <PlantRecordCard item={item} />
            //   <View style={styles.icon2}>
            //     <Icon
            //       source={IMAGES.ic_three_dots}
            //       style={styles.dotStart}
            //       size={SIZE.x24}
            //     />
            //     <View style={styles.noteEnd}>
            //       <Icon source={IMAGES.ic_note} size={SIZE.x20} />
            //     </View>
            //   </View>
          );
        })}
      </Screen>
      <BottomNav routeName={route.name} navigation={navigation} />
    </>
  );
};

export default PlantRecordScreen;

const styles = StyleSheet.create({
  topIconsContainer: {
    flex: SIZE.x1,
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginTop: SIZE.x20,
    borderColor: 'black',
  },

  something: {
    width: SIZE.x24,
    height: SIZE.x24,
    borderRadius: SIZE.x4,
    borderWidth: 2,
    borderColor: 'black',
    resizeMode: 'contain',
  },
  card: {
    justifyContent: 'space-between',
    marginTop: SIZE.x20,
    padding: SIZE.x10,
    marginHorizontal: SIZE.x20,
    borderRadius: SIZE.x20,
    flexDirection: 'row',
    backgroundColor: 'rgba(217,217,217, .3)',
    alignItems: 'center',
  },
  content: {
    marginLeft: SIZE.x20,
  },
  textTitle: {
    fontWeight: '800',
    fontSize: SIZE.x16,
  },
  textContent: {
    fontWeight: '500',
    fontSize: SIZE.x12,
    flexWrap: 'wrap',
  },
  icon2: {
    marginLeft: SIZE.x66,
    height: SIZE.x70,
    flexDirection: 'column',
  },
  imageContainer: {
    alignItems: 'center',
    flexDirection: 'row',
  },
  noteEnd: {
    marginTop: SIZE.x30,
    flex: SIZE.x1,
    alignSelf: 'center',
    alignContent: 'flex-end',
  },
});
