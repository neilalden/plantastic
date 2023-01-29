import {
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
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
import {useNavigation} from '@react-navigation/native';
import {ROUTES} from '../common/routes';
import {setDatabaseDocument} from '../functions/database/createFromDatabase';
import {Message} from '../components/PlantDictionaryCard';
const PlantDetailsScreen = ({route}) => {
  const [selected, setSelected] = useState(null);
  const navigation = useNavigation();
  const {plantsImage, sellers, sellersImage, notifications, setNotifications} =
    React.useContext(PlantsContext);
  const {user, setReload} = React.useContext(AuthContext);
  const plant = route.params;
  const pid = plant.id;
  const scientific_name = plant.scientific_name;
  const common_name = plant.common_name;
  const uses = plant.uses ? plant.uses : 'Not Available';
  const preparation = plant.preparation_1 ?? 'Not Available';
  const description = plant.description ?? 'Not Available';
  const ingredient_tools = plant.ingredients_tools_1 ?? 'Not Available';
  const hasPlant =
    (user &&
      user?.plants?.some(_ => {
        return typeof _ === 'string' ? _ == pid : _.id == pid;
      })) ??
    false;
  const hasCart = (user && user?.cart?.some(p => p.id === pid)) ?? false;
  const image =
    !!pid && !!plantsImage && plantsImage[`${pid}`]
      ? {uri: plantsImage[`${pid}`]}
      : IMAGES.ic_app_round;
  const [value, setValue] = useState('');
  const onChangeText = text => {
    setValue(text);
  };
  const handleAddPlant = async () => {
    try {
      if (!user) {
        // @ts-ignore
        navigation.navigate(ROUTES.LANDING_SCREEN);
        return;
      }
      const plants = [
        ...user?.plants,
        user?.userType == 'seller' ? {id: pid} : pid,
      ];
      const res = await updateDatabase('Users', {plants: plants}, user?.uid);
      alert(res);
      setReload(prev => !prev);
    } catch (e) {
      console.error(e);
    }
  };
  const handleAddCart = seller => {
    (async () => {
      try {
        if (!user) {
          // @ts-ignore
          navigation.navigate(ROUTES.LANDING_SCREEN);
          return;
        }
        if (!value || value.length == 0) {
          alert('Enter how many plants you want to buy');
          return;
        }
        if (isNaN(Number(value))) {
          alert('Please enter a valid amount');
          return;
        }
        const cart = [
          ...user?.cart,
          {
            id: pid,
            amount: value,
            sellerName: seller.name,
            sellerID: seller.uid,
            buyerID: user.uid,
          },
        ];
        const ress = await updateDatabase('Users', {cart: cart}, user?.uid);

        const data = {
          message: `${user.name} has requested to buy ${value} - ${common_name}.`,
          to: seller.name,
          toID: seller.uid,
          from: user.name,
          fromID: user.uid,
          type: 'buy',
          read: false,
        };
        const res = await setDatabaseDocument('Notifications', data);
        alert(res);
        let copy = [...notifications];
        copy.push(data);
        setNotifications(copy);
        setValue('');
        setReload(prev => !prev);
      } catch (e) {
        console.error(e);
      }
    })();
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
              user && user?.userType === 'seller' ? 'store' : 'collection'
            }`}
            onPress={handleAddPlant}
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
              : IMAGES.ic_herbshop;

          const sellerPrice = getPrice(seller, pid);
          return (
            <View key={index} style={styles.containerStyle}>
              <Text style={styles.textPrimaryTitle}>{name}</Text>

              <Icon
                source={banner}
                size={SIZE.x250}
                containerStyle={styles.bannerContainerStyle}
                imageStyle={styles.bannerStyle}
              />
              {user && user?.userType === 'buyer' ? (
                <View
                  style={{
                    flexDirection: 'row',
                    justifyContent: 'space-between',
                    width: '70%',
                  }}>
                  <Message
                    style={{
                      marginVertical: SIZE.x10,
                      backgroundColor: COLORS.GREEN300,
                      padding: 4,
                      borderRadius: SIZE.x10,
                    }}
                    handleMessage={() => {
                      const item = {
                        buyerID: user.uid,
                        sellerID: uid,
                        sellerName: name,
                      };
                      navigation.navigate(ROUTES.INSIDE_CHAT_SCREEN, item);
                    }}
                  />
                  <TouchableOpacity
                    style={{
                      marginVertical: SIZE.x10,
                      backgroundColor: COLORS.GREEN300,
                      padding: 4,
                      borderRadius: SIZE.x10,
                    }}
                    key={index}
                    onPress={() =>
                      setSelected(index === selected ? null : index)
                    }>
                    <Text
                      style={{
                        color: COLORS.DARKGREEN,
                        fontSize: 16,
                        fontWeight: '600',
                      }}>
                      {index === selected ? 'Cancel' : 'Buy from Seller'}
                    </Text>
                  </TouchableOpacity>
                </View>
              ) : null}
              {index === selected ? (
                <>
                  <Text style={styles.textSecondaryTitle}>{common_name}</Text>
                  <Text style={styles.textSecondaryTitle}>
                    {sellerPrice ? `₱${sellerPrice}` : 'Price: N/A'}
                  </Text>
                  {!hasCart && (!user || user?.userType === 'buyer') ? (
                    <View style={{width: '90%'}}>
                      <Text style={styles.textPrimaryTitle}>Quantity</Text>
                      <View
                        style={{
                          flexDirection: 'row',
                          justifyContent: 'space-between',
                        }}>
                        <TouchableOpacity
                          onPress={() => {
                            if (value === '') setValue('0');
                            else setValue(prev => String(Number(prev) - 1));
                          }}
                          style={{
                            borderColor: COLORS.WHITE,
                            borderWidth: SIZE.x2,
                            borderRadius: SIZE.x4,
                            width: SIZE.x40,
                            height: SIZE.x46,
                            marginTop: SIZE.x8,
                            alignSelf: 'center',
                            alignItems: 'center',
                            justifyContent: 'center',
                          }}>
                          <Text style={styles.textContent}>-</Text>
                        </TouchableOpacity>

                        <TextInput
                          value={value}
                          onChangeText={onChangeText}
                          multiline
                          style={styles.textArea}
                          placeholder="Amount"
                          keyboardType="decimal-pad"
                        />
                        <TouchableOpacity
                          onPress={() => {
                            if (value === '') setValue('1');
                            else setValue(prev => String(Number(prev) + 1));
                          }}
                          style={{
                            borderColor: COLORS.WHITE,
                            borderWidth: SIZE.x2,
                            borderRadius: SIZE.x4,
                            width: SIZE.x40,
                            height: SIZE.x46,
                            marginTop: SIZE.x8,
                            alignSelf: 'center',
                            alignItems: 'center',
                            justifyContent: 'center',
                          }}>
                          <Text style={styles.textContent}>+</Text>
                        </TouchableOpacity>
                      </View>
                      <ButtonOutline
                        text={`Add to cart`}
                        onPress={() => handleAddCart(seller)}
                        containerStyle={styles.buttonContainerStyle}
                        textStyle={styles.buttonTextStyle}
                      />
                    </View>
                  ) : (
                    <Text style={{paddingBottom: SIZE.x10}}>
                      You have this in your cart already
                    </Text>
                  )}
                </>
              ) : null}
            </View>
          );
        })}
    </Screen>
  );
};
const getPrice = (seller, pid) => {
  for (const plant of seller.plants) {
    if (plant.id === pid) return plant.price;
  }
  return undefined;
};
const isSeller = (seller, pID) => {
  if (seller && seller.plants) {
    for (const plant of seller?.plants) {
      if (typeof plant !== 'string') {
        if (plant.id === pID) return true;
      } else {
        if (plant === pID) return true;
      }
    }
  }
  return false;
};
export default PlantDetailsScreen;

const styles = StyleSheet.create({
  textArea: {
    backgroundColor: '#ffffff',
    borderRadius: 4,
    marginTop: 8,
    color: 'black',
    width: SIZE.x250,
    fontSize: 22,
    textAlign: 'center',
  },
  containerStyle: {
    borderRadius: 4,
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
    alignSelf: 'center',
    paddingBottom: SIZE.x10,
  },
  buttonTextStyle: {
    marginTop: SIZE.x8,
  },
});
