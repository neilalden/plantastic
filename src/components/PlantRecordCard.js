import React from 'react';
import {Image, StyleSheet, Text, View} from 'react-native';
import {SIZE} from '../common/utils/size';
import {COLORS} from '../common/utils/colors';
import Icon from './Icon';
import {IMAGES} from '../common/images';

const PlantRecordCard = ({item}) => {
  return (
    <View style={styles.containerStyle}>
      <View style={styles.contentHeader}>
        <Icon
          source={{uri: item.image}}
          size={SIZE.x125}
          containerStyle={styles.imageViewStyle}
          imageStyle={styles.imageStyle}
        />
        <View>
          <Text style={styles.textPrimaryTitle}>{item.scientific_name}</Text>
          <Text style={styles.textSecondaryTitle}>{item.common_name}</Text>
        </View>
      </View>
      {!item.withAction ? (
        <View style={styles.cardActionContainer}>
          <Icon source={IMAGES.ic_three_dots} size={SIZE.x24} />
          <Icon source={IMAGES.ic_note} size={SIZE.x24} />
        </View>
      ) : null}
    </View>
  );
};

export default PlantRecordCard;

const styles = StyleSheet.create({
  containerStyle: {
    flexDirection: 'row',
    marginBottom: SIZE.x20,
    borderRadius: SIZE.x4,
    backgroundColor: COLORS.GREEN500,
    elevation: 5,
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 1},
    shadowOpacity: 0.8,
    shadowRadius: 1,
  },
  contentHeader: {
    flexDirection: 'row',
    flex: 1,
    alignItems: 'center',
  },
  contentTextStyle: {
    marginLeft: SIZE.x10,
    padding: SIZE.x10,
  },
  textPrimaryTitle: {
    fontWeight: 'bold',
    color: COLORS.GREEN200,
    textShadowColor: '#313131',
    textShadowOffset: {width: 0, height: 1.2},
    textShadowRadius: 2,
    padding: SIZE.x4,

    fontSize: SIZE.x18,
  },
  textSecondaryTitle: {
    fontWeight: 'bold',
    color: '#FFF',
    fontSize: SIZE.x16,
    padding: SIZE.x4,
    textShadowColor: '#313131',
    textShadowOffset: {width: 0, height: 1.2},
    textShadowRadius: 1,
  },
  textContent: {
    fontWeight: '500',
    fontSize: SIZE.x12,
    flexWrap: 'wrap',
  },
  imageViewStyle: {
    borderTopLeftRadius: SIZE.x4,
    borderBottomLeftRadius: SIZE.x4,
  },
  imageStyle: {
    resizeMode: 'cover',
  },
  cardActionContainer: {
    justifyContent: 'space-between',
    margin: SIZE.x10,
  },
});
