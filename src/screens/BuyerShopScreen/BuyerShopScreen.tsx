import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';
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
  const [selected, setSelected] = React.useState(null);
  const {user} = React.useContext(AuthContext);
  const {plants, sellers, sellersImage} = React.useContext(PlantsContext);
  return (
    <React.Fragment>
      <Screen>
        <Header
          text="Shops"
          canGoBack={false}
          // Button={
          //   <Icon
          //     source={IMAGES.ic_note_dark_green}
          //     size={SIZE.x20}
          //     containerStyle={styles.iconContainerStyle}
          //     onPress={() => alert('Edit account coming soon')}
          //   />
          // }
        />
        {sellers &&
          sellers.map((seller, index) => {
            const uid = seller.uid;
            const name = seller.name ?? 'Not Available';
            const email = seller.email ?? 'Not Available';
            const contactNumber = seller.contactNumber ?? 'Not Available';
            const socialMedia = seller.socialMedia ?? 'Not Available';
            const address = seller.address ?? 'Not Available';
            const banner =
              !!uid && !!sellersImage && sellersImage[`${uid}`]
                ? {uri: sellersImage[`${uid}`]}
                : IMAGES.ic_app_round;
            return (
              <View
                key={index}
                style={[styles.containerStyle, {paddingBottom: SIZE.x10}]}>
                <Text style={styles.textPrimaryTitle}>{name}</Text>

                <Icon
                  source={banner}
                  size={SIZE.x250}
                  containerStyle={styles.bannerContainerStyle}
                  imageStyle={styles.bannerStyle}
                />

                <TouchableOpacity
                  style={{
                    marginTop: SIZE.x10,
                    backgroundColor: COLORS.GREEN300,
                    padding: SIZE.x4,
                    borderRadius: SIZE.x10,
                  }}
                  key={index}
                  onPress={() =>
                    setSelected(index === selected ? null : index)
                  }>
                  <Text style={{color: COLORS.DARKGREEN}}>
                    {index === selected ? 'Hide Details' : 'Contact Seller'}
                  </Text>
                </TouchableOpacity>
                {index === selected ? (
                  <>
                    <Text style={styles.textSecondaryTitle}>{email}</Text>
                    <Text style={styles.textSecondaryTitle}>
                      {contactNumber}
                    </Text>
                    <Text style={styles.textSecondaryTitle}>{socialMedia}</Text>
                    <Text style={styles.textSecondaryTitle}>{address}</Text>
                  </>
                ) : null}
              </View>
            );
          })}
      </Screen>
      <BottomNav routeName={route.name} navigation={navigation} />
    </React.Fragment>
  );
};
const isSeller = (seller, pID) => {
  if (seller && seller.plants) {
    for (const plant of seller?.plants) {
      if (plant === pID) return true;
    }
  }
  return false;
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

  containerStyle: {
    borderRadius: SIZE.x4,
    backgroundColor: COLORS.GREEN500,
    elevation: 5,
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 1},
    shadowOpacity: 0.8,
    shadowRadius: 1,
    alignItems: 'center',
    marginVertical: SIZE.x20,
  },
  descriptionContainer: {
    margin: SIZE.x10,
    alignSelf: 'flex-start',
  },
  textPrimaryTitle: {
    fontWeight: 'bold',
    color: COLORS.GREEN200,
    ...TEXT_SHADOW,
    fontSize: SIZE.x26,
    marginVertical: 10,
  },
  textSecondaryTitle: {
    fontWeight: 'bold',
    fontStyle: 'italic',
    color: '#FFF',
    fontSize: SIZE.x22,
    ...TEXT_SHADOW,
  },
  textContent: {
    fontWeight: '500',
    fontSize: SIZE.x20,
    color: COLORS.WHITE,
  },
  bannerContainerStyle: {
    width: SIZE.p100,
    height: SIZE.x125,
  },
  bannerStyle: {
    width: SIZE.p100,
    height: SIZE.x125,
    resizeMode: 'cover',
  },
  imageStyle: {
    resizeMode: 'cover',
  },
  textUnderline: {
    fontWeight: '900',
    ...TEXT_SHADOW,
  },
  buttonContainerStyle: {
    width: SIZE.p90,
    marginVertical: SIZE.x10,
  },
  buttonTextStyle: {
    marginTop: SIZE.x8,
  },
});
