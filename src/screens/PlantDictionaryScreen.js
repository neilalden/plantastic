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

const PlantDictionaryScreen = ({navigation}) => {
  const route = useRoute();
  const {plants} = useContext(PlantsContext);
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
  const handleBack = () => {
    navigation.goBack();
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
