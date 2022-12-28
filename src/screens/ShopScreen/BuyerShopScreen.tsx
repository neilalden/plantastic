import {StyleSheet, Text, View} from 'react-native';
import React from 'react';
import Header from '../../components/Header';
import Screen from '../../components/Screen';
import BottomNav from '../../components/BottomNav';
import {useNavigation, useRoute} from '@react-navigation/native';

const BuyerShopScreen = () => {
  const route = useRoute();
  const navigation = useNavigation();
  return (
    <React.Fragment>
      <Screen>
        <Header text="Buyyer Shop" canGoBack={false} />
      </Screen>
      <BottomNav routeName={route.name} navigation={navigation} />
    </React.Fragment>
  );
};

export default BuyerShopScreen;

const styles = StyleSheet.create({});
