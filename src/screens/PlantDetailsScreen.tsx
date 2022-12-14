import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import React, {useState} from 'react';
import Screen from '../components/Screen';
import Header from '../components/Header';
import {COLORS} from '../common/utils/colors';
import {SIZE} from '../common/utils/size';
import Icon from '../components/Icon';
import {PlantsContext} from '../context/PlantsContext';
import {IMAGES} from '../common/images';
import {TEXT_SHADOW} from '../common/utils/styles';
import {ButtonOutline} from '../components/Buttons';
import {AuthContext} from '../context/AuthContext';
import {updateDatabase} from '../functions/database/updateDatabase';

const PlantDetailsScreen = ({route}) => {
  const [selected, setSelected] = useState(null);

  const {plantsImage, sellers, sellersImage} = React.useContext(PlantsContext);
  const {user, setReload} = React.useContext(AuthContext);
  const plant = route.params;
  const pid = plant.id;
  const scientific_name = plant.scientific_name;
  const common_name = plant.common_name;
  const uses = plant.uses ? plant.uses : 'Not Available';
  const preparation = plant.preparation_1 ?? 'Not Available';
  const description = plant.description ?? 'Not Available';
  const ingredient_tools = plant.ingredients_tools_1 ?? 'Not Available';
  const hasPlant = user?.plants?.includes(pid) ?? false;
  const hasCart = user?.cart?.includes(pid) ?? false;
  const image =
    !!pid && !!plantsImage && plantsImage[`${pid}`]
      ? {uri: plantsImage[`${pid}`]}
      : IMAGES.ic_app_round;
  const handleAddPlant = async () => {
    try {
      const plants = [...user.plants, pid];
      const res = await updateDatabase('Users', {plants: plants}, user.uid);
      alert(res);
      setReload(prev => !prev);
    } catch (e) {
      console.error(e);
    }
  };
  const handleAddCart = async () => {
    try {
      const cart = [...user?.cart, pid];
      const res = await updateDatabase('Users', {cart: cart}, user.uid);
      alert(res);
      setReload(prev => !prev);
    } catch (e) {
      console.error(e);
    }
  };
  return (
    <Screen>
      <Header canGoBack text={'Details'} />
      <View style={styles.containerStyle}>
        <Icon source={image} size={SIZE.x250} imageStyle={styles.imageStyle} />
        <View style={styles.descriptionContainer}>
          <Text style={styles.textPrimaryTitle}>{common_name}</Text>
          <Text style={styles.textSecondaryTitle}>{scientific_name}</Text>
          <View style={{marginVertical: SIZE.x10}} />
          <Text style={styles.textContent}>
            <Text style={styles.textUnderline}>Description :</Text>{' '}
            {description}
          </Text>
          <View style={{marginVertical: SIZE.x10}} />
          <Text style={styles.textContent}>
            <Text style={styles.textUnderline}>Uses :</Text> {uses}
          </Text>
          <View style={{marginVertical: SIZE.x10}} />
          <Text style={styles.textContent}>
            <Text style={styles.textUnderline}>Preparation :</Text>{' '}
            {preparation}
          </Text>
          <View style={{marginVertical: SIZE.x10}} />
          <Text style={styles.textContent}>
            <Text style={styles.textUnderline}>Ingredient Tools :</Text>{' '}
            {ingredient_tools}
          </Text>
        </View>
        {!hasPlant ? (
          <ButtonOutline
            text={`Add plant to your ${
              user.userType === 'seller' ? 'store' : 'collection'
            }`}
            onPress={handleAddPlant}
            containerStyle={styles.buttonContainerStyle}
            textStyle={styles.buttonTextStyle}
          />
        ) : null}
        {!hasCart && user.userType === 'buyer' ? (
          <ButtonOutline
            text={`Add to cart`}
            onPress={handleAddCart}
            containerStyle={styles.buttonContainerStyle}
            textStyle={styles.buttonTextStyle}
          />
        ) : null}
      </View>

      {sellers &&
        sellers.map((seller, index) => {
          if (!isSeller(seller, pid)) return;
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
                onPress={() => setSelected(index === selected ? null : index)}>
                <Text style={{color: COLORS.DARKGREEN}}>
                  {index === selected ? 'Hide Details' : 'Contact Seller'}
                </Text>
              </TouchableOpacity>
              {index === selected ? (
                <>
                  <Text style={styles.textSecondaryTitle}>{email}</Text>
                  <Text style={styles.textSecondaryTitle}>{contactNumber}</Text>
                  <Text style={styles.textSecondaryTitle}>{socialMedia}</Text>
                  <Text style={styles.textSecondaryTitle}>{address}</Text>
                </>
              ) : null}
            </View>
          );
        })}
    </Screen>
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
export default PlantDetailsScreen;

const styles = StyleSheet.create({
  containerStyle: {
    borderRadius: SIZE.x4,
    backgroundColor: COLORS.DARKGREEN,
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
