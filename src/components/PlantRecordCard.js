import React from 'react';
import {Image, StyleSheet, Text, View} from 'react-native';
import {SIZE} from '../common/utils/size';
import {COLORS} from '../common/utils/colors';
import Icon from './Icon';
import {IMAGES} from '../common/images';

const PlantRecordCard = ({item}) => {
  return (
    <View>
      <View style={styles.containerStyle}>
        <View style={styles.contentHeader}>
          <View style={styles.imageViewStyle}>
            <Image source={{uri: item.image}} style={styles.imageStyle} />
          </View>
          <View>
            <Text style={styles.textPrimaryTitle}>{item.scientific_name}</Text>
            <Text style={styles.textSecondaryTitle}>{item.common_name}</Text>
          </View>
        </View>
        <View style={{justifyContent: 'space-between'}}>
          <Icon source={IMAGES.ic_three_dots} size={SIZE.x24} />
          <View>
            <Icon source={IMAGES.ic_note} size={SIZE.x20} />
          </View>
        </View>
      </View>
    </View>
  );
};

export default PlantRecordCard;

const styles = StyleSheet.create({
  containerStyle: {
    marginTop: SIZE.x20,
    marginHorizontal: SIZE.x10,
    borderRadius: SIZE.x4,
    flexDirection: 'row',
    paddingVertical: SIZE.x10,
    backgroundColor: 'rgba(217,217,217,0.3)',
  },
  contentHeader: {
    flexDirection: 'row',
    flex: 1,
    alignItems: 'center',
    marginLeft: SIZE.x10,
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
    paddingRight: SIZE.x10,
  },
  imageStyle: {
    width: SIZE.x100,
    height: SIZE.x100,
    borderRadius: SIZE.x1,
    resizeMode: 'contain',
  },
});
