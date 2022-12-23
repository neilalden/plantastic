/* eslint-disable prettier/prettier */
import {Image, StyleSheet, Text, TextInput, View} from 'react-native';
import React from 'react';
import Screen from '../components/Screen';
import {Button} from '../components/Buttons';
import BottomNav from '../components/BottomNav';
import {useRoute} from '@react-navigation/native';
import {IMAGES} from '../common/images';
import Header from '../components/Header';
import {SIZE} from '../common/utils/size';
import Icon from '../components/Icon';
import {COLORS} from '../common/utils/colors';
import {data} from '../../DUMMY_DATA';
import SearchBar from '../components/SearchBar';
import PlantDictionaryCard from '../components/PlantDictionaryCard';

const PlantDictionaryScreen = ({navigation}) => {
  const route = useRoute();
  const handleBack = () => {
    navigation.goBack();
  };

  return (
    <>
      <Screen>
        <Header text="Plant Dictionary" canGoBack={false} />
        <SearchBar />

        {data.map(item => {
          return <PlantDictionaryCard item={item} />;
        })}
      </Screen>
      <BottomNav routeName={route.name} navigation={navigation} />
    </>
  );
};

export default PlantDictionaryScreen;
