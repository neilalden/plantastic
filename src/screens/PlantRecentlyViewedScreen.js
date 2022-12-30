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
import PlantRecordCard from '../components/PlantRecordCard';
import {FONT_WEIGHT} from '../common/utils/font';
import {COLORS} from '../common/utils/colors';
import {TEXT_SHADOW} from '../common/utils/styles';

const PlantRecentlyViewedScreen = ({navigation}) => {
  const route = useRoute();
  const handleBack = () => {
    navigation.goBack();
  };
  return (
    <>
      <Screen>
        <Header text="Recently Viewed" canGoBack={false} />

        <SearchBar />
        <View style={styles.topIconsContainer}>
          <Icon source={IMAGES.ic_folder} size={SIZE.x30} />
          <Icon source={IMAGES.ic_time} size={SIZE.x30} />
          <Icon source={IMAGES.ic_list} size={SIZE.x30} />
        </View>

        {false && data.length > 0 ? (
          data.map((item, index) => {
            return <PlantRecordCard key={index} item={item} />;
          })
        ) : (
          <Text style={styles.text}>No recently viewed plant</Text>
        )}
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
