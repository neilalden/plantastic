import React, {useEffect} from 'react';
import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import {SIZE} from '../common/utils/size';
import {COLORS} from '../common/utils/colors';
import Icon from './Icon';
import {truncateString} from '../functions/utility/truncate';
import {IMAGES} from '../common/images';
import {PlantsContext} from '../context/PlantsContext';
import {AuthContext} from '../context/AuthContext';
import {updateDatabase} from '../functions/database/updateDatabase';
import {useNavigation} from '@react-navigation/native';
import {ROUTES} from '../common/routes';
import {TEXT_SHADOW} from '../common/utils/styles';

const PlantDictionaryCard = props => {
  const {plantsImage} = React.useContext(PlantsContext);
  const {user, setReload} = React.useContext(AuthContext);
  const navigation = useNavigation();
  const id = props.item.id;
  const scientific_name = props.item.scientific_name;
  const common_name = props.item.common_name;
  const uses = props.item.uses ? props.item.uses : '';
  const image =
    !!id && !!plantsImage && plantsImage[`${id}`]
      ? {uri: plantsImage[`${id}`]}
      : IMAGES.ic_app_round;
  const canRemove = props.canRemove;
  const handleOpenPlantDetails = () => {
    (async () => {
      try {
        const recentlyViewed = user?.recentlyViewed ?? [];

        for (let i = 0; i < recentlyViewed.length; i++) {
          if (recentlyViewed[i] === id) recentlyViewed.splice(i, 1);
        }
        recentlyViewed.unshift(id);
        const res = await updateDatabase(
          'Users',
          {recentlyViewed: recentlyViewed},
          user.uid,
        );
      } catch (e) {
        console.error(e);
      }
    })();
    navigation.navigate(ROUTES.PLANT_DETAILS_SCREEN, props.item);
  };
  return (
    <React.Fragment>
      <TouchableOpacity
        onPress={handleOpenPlantDetails}
        style={[styles.containerStyle, !canRemove && {marginBottom: SIZE.x20}]}>
        <Icon
          source={image}
          size={SIZE.x125}
          containerStyle={styles.imageViewStyle}
          imageStyle={styles.imageStyle}
        />
        <View style={{marginLeft: SIZE.x14, paddingLeft: SIZE.x2}}>
          <Text style={styles.textPrimaryTitle}>{common_name}</Text>
          <Text style={styles.textSecondaryTitle}>{scientific_name}</Text>
          <Text style={styles.textContent}>
            {truncateString(String(uses).replaceAll(',', ', '), 28)}
          </Text>
        </View>
      </TouchableOpacity>
      {canRemove ? <Remove id={id} user={user} setReload={setReload} /> : null}
    </React.Fragment>
  );
};
const Remove = props => {
  const id = props.id;
  const user = props.user;
  const setReload = props.setReload;
  const handleRemove = async () => {
    try {
      const plants = user.plants.filter(plantID => plantID !== id);
      const res = await updateDatabase('Users', {plants: plants}, user.uid);
      alert(res);
      setReload(prev => !prev);
    } catch (e) {
      console.error(e);
    }
  };
  return (
    <TouchableOpacity style={styles.removeContainer} onPress={handleRemove}>
      <Text style={styles.removeText}>Remove</Text>
    </TouchableOpacity>
  );
};
export default PlantDictionaryCard;

const styles = StyleSheet.create({
  containerStyle: {
    borderRadius: SIZE.x4,
    backgroundColor: 'white',
    elevation: 5,
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 1},
    shadowOpacity: 0.8,
    shadowRadius: 1,
    flexDirection: 'row',
    alignItems: 'center',
  },
  contentHeader: {},
  contentTextStyle: {
    padding: SIZE.x10,
  },
  textPrimaryTitle: {
    fontWeight: 'bold',

    color: COLORS.DARKGREEN,
    fontSize: SIZE.x18,
  },
  textSecondaryTitle: {
    fontWeight: 'bold',
    fontStyle: 'italic',
    color: COLORS.BLACK,
    fontSize: SIZE.x16,
    ...TEXT_SHADOW,
  },
  textContent: {
    fontWeight: '500',
    fontSize: SIZE.x16,
    color: COLORS.BLACK,
  },
  imageViewStyle: {
    borderTopLeftRadius: SIZE.x4,
    borderBottomLeftRadius: SIZE.x4,
  },
  imageStyle: {
    resizeMode: 'cover',
  },
  removeContainer: {
    marginBottom: SIZE.x18,
    marginTop: SIZE.x2,
    alignSelf: 'flex-start',
  },
  removeText: {
    color: COLORS.WHITE,
    backgroundColor: COLORS.RED,
    borderRadius: SIZE.x4,
    paddingVertical: SIZE.x2,
    paddingHorizontal: SIZE.x6,
    fontWeight: '600',
  },
});
