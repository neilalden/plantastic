import React from 'react';
import {Image, StyleSheet, Text, View} from 'react-native';
import {SIZE} from '../common/utils/size';
import {COLORS} from '../common/utils/colors';

const PlantDictionaryCard = ({item}) => {
  return (
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

      <View style={styles.contentTextStyle}>
        <Text style={styles.textContent}>{item.uses}</Text>
      </View>
    </View>
  );
};

export default PlantDictionaryCard;

const styles = StyleSheet.create({
  containerStyle: {
    marginTop: SIZE.x20,
    marginHorizontal: SIZE.x10,
    borderRadius: SIZE.x4,
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
    textShadowRadius: 2,
  },
  textContent: {
    fontWeight: '500',
    fontSize: SIZE.x12,
    flexWrap: 'wrap',
  },
  imageViewStyle: {
    marginLeft: SIZE.x10,
    paddingRight: SIZE.x10,
  },
  imageStyle: {
    width: SIZE.x100,
    height: SIZE.x100,
    borderBottomRightRadius: SIZE.x4,
    borderBottomLeftRadius: SIZE.x4,

    resizeMode: 'contain',
  },
});
