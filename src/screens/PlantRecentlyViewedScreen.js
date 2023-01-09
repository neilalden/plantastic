/* eslint-disable prettier/prettier */
import {Image, StyleSheet, Text, View, TextInput} from 'react-native';
import React, {useContext, useState} from 'react';
import Screen from '../components/Screen';
import {Button} from '../components/Buttons';
import {IMAGES} from '../common/images';
import BottomNav from '../components/BottomNav';
import {useRoute} from '@react-navigation/native';
import Header from '../components/Header';
import Icon from '../components/Icon';
import {SIZE} from '../common/utils/size';
import SearchBar from '../components/SearchBar';
import PlantDictionaryCard from '../components/PlantDictionaryCard';
import {FONT_WEIGHT} from '../common/utils/font';
import {COLORS} from '../common/utils/colors';
import {TEXT_SHADOW} from '../common/utils/styles';
import {AuthContext} from '../context/AuthContext';
import {PlantsContext} from '../context/PlantsContext';

const PlantRecentlyViewedScreen = ({navigation}) => {
  const route = useRoute();
  const {user} = useContext(AuthContext);
  const {plants, sellers} = useContext(PlantsContext);
  const [show, setShow] = useState('Recently Viewed');
  if (!plants && !user.recentlyViewed && user.recentlyViewed.length == 0)
    return;
  return (
    <>
      <Screen>
        <Header text={show} canGoBack={false} />
        <SearchBar />
        <View style={styles.topIconsContainer}>
          <Icon
            source={IMAGES.ic_folder2}
            size={SIZE.x30}
            onPress={() => setShow('Collection')}
          />
          <Icon
            source={IMAGES.ic_time2}
            size={SIZE.x30}
            onPress={() => setShow('Recently Viewed')}
          />
        </View>
        {show === 'Recently Viewed'
          ? plants.map((item, index) => {
              return user.recentlyViewed.map(rv => {
                if (rv === item.id)
                  return <PlantDictionaryCard key={index} item={item} />;
              });
            })
          : user.plants?.map((item, index) => {
              return (
                plants &&
                plants.map(plant => {
                  if (item === plant.id) {
                    return (
                      <PlantDictionaryCard key={index} item={plant} canRemove />
                    );
                  }
                })
              );
            })}
      </Screen>
      <BottomNav routeName={route.name} navigation={navigation} />
    </>
  );
};

export default PlantRecentlyViewedScreen;

const styles = StyleSheet.create({
  topIconsContainer: {
    flex: SIZE.x1,
    flexDirection: 'row',
    justifyContent: 'space-around',
    borderColor: 'black',
    marginBottom: SIZE.x20,
  },
  text: {
    ...TEXT_SHADOW,
    fontSize: SIZE.x30,
    FONT_WEIGHT: FONT_WEIGHT.x700,
    color: COLORS.WHITE,
    marginTop: SIZE.x46,
    alignSelf: 'center',
  },
});
