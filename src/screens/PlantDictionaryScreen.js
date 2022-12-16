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
        {/* CARD COMPONENT */}
        {data.map(item => {
          return (
            <View style={styles.card2}>
              <Image source={{uri: item.image}} style={styles.icon} />
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
          );
        })}

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
  card2: {
    marginTop: SIZE.x20,
    padding: SIZE.x20,
    marginHorizontal: SIZE.x14,
    borderRadius: SIZE.x24,
    flex: SIZE.x1,
    flexDirection: 'row',
    backgroundColor: 'rgba(217,217,217,0.3)',
    alignItems: 'center',
  },
  content: {
    marginLeft: SIZE.x30,
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
  icon: {
    height: SIZE.x80,
    width: SIZE.x80,
    borderRadius: SIZE.x4,
    resizeMode: 'contain',
  },
});
