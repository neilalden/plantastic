import {StyleSheet, Text, View, Image} from 'react-native';
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

const SellerShopScreen = props => {
  const route = useRoute();
  const navigation = useNavigation();
  const {user} = React.useContext(AuthContext);
  const {plants, sellersImage} = React.useContext(PlantsContext);
  const params = props?.route?.params;
  return (
    <React.Fragment>
      <Screen>
        <Header
          text="Seller Shop"
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

        <View style={styles.banner}>
          {params || user.image ? (
            <Image
              source={
                params && sellersImage
                  ? sellersImage[params?.uid]
                    ? {uri: sellersImage[params?.uid]}
                    : IMAGES.ic_herbshop
                  : user?.image
                  ? {
                      uri: user?.image,
                    }
                  : IMAGES.ic_herbshop
              }
              style={{height: '100%', width: '100%'}}
            />
          ) : (
            <Text style={styles.uploadText}>No Image</Text>
          )}
        </View>
        <Text style={styles.title}>{params ? params.name : user.name}</Text>
        <Text style={styles.availablePlantsText}>Available plants</Text>
        {params
          ? params.plants &&
            params.plants?.map((item, index) => {
              return (
                plants &&
                plants.map(plant => {
                  if (item.id === plant.id || item === plant.id) {
                    return <PlantDictionaryCard key={index} item={plant} />;
                  }
                })
              );
            })
          : user.plants &&
            user.plants?.map((item, index) => {
              return (
                plants &&
                plants.map(plant => {
                  if (item.id === plant.id || item === plant.id) {
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

export default SellerShopScreen;

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
    color: COLORS.BLACK,
    fontSize: SIZE.x24,
    borderWidth: SIZE.x1,
    borderColor: COLORS.WHITE,
    marginTop: -1,
    marginBottom: SIZE.x20,
    alignSelf: 'flex-start',
    padding: SIZE.x10,
  },
  uploadText: {
    color: COLORS.BLACK,
    textAlign: 'center',
    marginTop: SIZE.p14,
    fontSize: SIZE.x16,
    fontWeight: '600',
  },
  availablePlantsText: {
    color: COLORS.BLACK,

    fontSize: SIZE.x20,
    marginBottom: SIZE.x14,
    fontWeight: '900',
  },
});
