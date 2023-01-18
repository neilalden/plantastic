/* eslint-disable prettier/prettier */
import React, {useState} from 'react';
import Screen from '../components/Screen';
import BottomNav from '../components/BottomNav';
import {useRoute} from '@react-navigation/native';
import Header from '../components/Header';
// import {data} from '../../DUMMY_DATA';
import SearchBar from '../components/SearchBar';
import PlantDictionaryCard from '../components/PlantDictionaryCard';
import {useContext} from 'react';
import {PlantsContext} from '../context/PlantsContext';
import {ButtonOutline, SettingsButton} from '../components/Buttons';
import {ROUTES} from '../common/routes';
import {IMAGES} from '../common/images';
import {StyleSheet} from 'react-native';
import {SIZE} from '../common/utils/size';
import {FONT_WEIGHT} from '../common/utils/font';
import {COLORS} from '../common/utils/colors';

const PlantDictionaryScreen = ({navigation}) => {
  const route = useRoute();
  const {plants} = useContext(PlantsContext);
  const handleBack = () => {
    navigation.goBack();
  };
  const [filteredPlants, setFilteredPlants] = useState(plants);
  const onChangeText = text => {
    setFilteredPlants(plants);
    if (text && text.length > 0) {
      setFilteredPlants(
        [...plants].filter(plant =>
          plant.common_name.toLowerCase().includes(text.toLowerCase()),
        ),
      );
    }
  };
  return (
    <>
      <Screen>
        <Header text="Plant Dictionary" canGoBack={false} />
        <SearchBar onChangeText={onChangeText} />

        {plants &&
          filteredPlants.map((item, index) => {
            return <PlantDictionaryCard key={index} item={item} />;
          })}
      </Screen>
      <BottomNav routeName={route.name} navigation={navigation} />
    </>
  );
};

export default PlantDictionaryScreen;

const styles = StyleSheet.create({
  iconContainer: {
    alignSelf: 'center',
    marginTop: SIZE.x150,
  },
  title: {
    fontSize: SIZE.x40,
    FONT_WEIGHT: FONT_WEIGHT.x700,
    color: COLORS.WHITE,
    marginTop: SIZE.x20,
    alignSelf: 'center',
  },
  buttonContainer: {
    width: SIZE.x300,
    alignSelf: 'center',
    borderColor: COLORS.DARKGREEN,
    marginBottom: SIZE.x54,
  },
  buttonText: {
    color: COLORS.DARKGREEN,
  },
});
