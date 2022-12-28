/* eslint-disable prettier/prettier */
import React from 'react';
import Screen from '../components/Screen';
import BottomNav from '../components/BottomNav';
import {useRoute} from '@react-navigation/native';
import Header from '../components/Header';
// import {data} from '../../DUMMY_DATA';
import SearchBar from '../components/SearchBar';
import PlantDictionaryCard from '../components/PlantDictionaryCard';

const PlantDictionaryScreen = ({navigation}) => {
  const route = useRoute();
  const handleBack = () => {
    navigation.goBack();
  };
  const [data, setData] = React.useState();
  React.useEffect(() => {
    (async () => {
      try {
        setData(await fetchCollection('Plants'));
      } catch (e) {
        alert(e);
      }
    })();
  }, []);

  return (
    <>
      <Screen>
        <Header text="Plant Dictionary" canGoBack={false} />
        <SearchBar />

        {data &&
          data.map((item, index) => {
            return <PlantDictionaryCard key={index} item={item} />;
          })}
      </Screen>
      <BottomNav routeName={route.name} navigation={navigation} />
    </>
  );
};

export default PlantDictionaryScreen;
