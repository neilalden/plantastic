import {StyleSheet, Text, View} from 'react-native';
import React from 'react';
import Header from '../../components/Header';
import Screen from '../../components/Screen';
import BottomNav from '../../components/BottomNav';
import {useNavigation, useRoute} from '@react-navigation/native';
import PlantDictionaryCard from '../../components/PlantDictionaryCard';
import {COLORS} from '../../common/utils/colors';
import {SIZE} from '../../common/utils/size';
import Icon from '../../components/Icon';
import {IMAGES} from '../../common/images';
import {TEXT_SHADOW} from '../../common/utils/styles';
import {AuthContext} from '../../context/AuthContext';
import {PlantsContext} from '../../context/PlantsContext';

const BuyerShopScreen = () => {
  const route = useRoute();
  const navigation = useNavigation();
  const {user} = React.useContext(AuthContext);
  const {plants} = React.useContext(PlantsContext);
  return (
    <React.Fragment>
      <Screen>
        <Header
          text="Plant Collection"
          canGoBack={false}
          Button={
            <Icon
              source={IMAGES.ic_note_dark_green}
              size={SIZE.x20}
              containerStyle={styles.iconContainerStyle}
              onPress={() => alert('Edit account coming soon')}
            />
          }
        />
        {user.plants &&
          user.plants?.map((item, index) => {
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
    </React.Fragment>
  );
};

export default BuyerShopScreen;

const styles = StyleSheet.create({
  buttoContainer: {
    width: SIZE.x300,
    marginBottom: SIZE.x50,
    alignSelf: 'center',
  },
  buttoText: {
    color: COLORS.DARKGREEN,
  },
  iconContainerStyle: {
    backgroundColor: COLORS.WHITE,
    height: SIZE.x34,
    width: SIZE.x34,
    borderRadius: SIZE.x50,
    justifyContent: 'center',
  },
  banner: {
    marginTop: SIZE.x20,
    height: SIZE.x125,
    borderWidth: SIZE.x1,
    borderColor: COLORS.WHITE,
    borderTopRightRadius: SIZE.x24,
    overflow: 'hidden',
  },
  title: {
    ...TEXT_SHADOW,
    color: COLORS.WHITE,
    fontSize: SIZE.x24,
    borderWidth: SIZE.x1,
    borderColor: COLORS.WHITE,
    marginTop: -1,
    marginBottom: SIZE.x20,
    alignSelf: 'flex-start',
    padding: SIZE.x10,
  },
  uploadText: {
    ...TEXT_SHADOW,
    color: COLORS.WHITE,
    textAlign: 'center',
    marginTop: SIZE.p14,
    fontSize: SIZE.x16,
    fontWeight: '600',
  },
  availablePlantsText: {
    ...TEXT_SHADOW,
    color: COLORS.WHITE,
    fontSize: SIZE.x20,
    marginBottom: SIZE.x14,
    fontWeight: '900',
  },
});
