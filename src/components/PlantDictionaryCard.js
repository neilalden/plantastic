import React from 'react';
import {StyleSheet, Text, View} from 'react-native';
import {SIZE} from '../common/utils/size';
import {COLORS} from '../common/utils/colors';
import Icon from './Icon';
import {truncateString} from '../functions/utility/truncate';
import {fetchImage} from '../functions/storage/fetchImage';

const PlantDictionaryCard = props => {
  const scientific_name = props.item.scientific_name;
  const common_name = props.item.common_name;
  const uses = props.item.uses;
  const [image, setImage] = React.useState('Plants/sweet basil.png');
  console.log(props.item);
  React.useEffect(() => {
    (async () => {
      try {
        setImage(await fetchImage('Plants/sweet basil.png'));
      } catch (e) {
        alert(e);
      }
    })();
  }, []);
  console.log(image);
  return (
    <View style={styles.containerStyle}>
      {/* <Icon
        source={{uri: image}}
        size={SIZE.x125}
        containerStyle={styles.imageViewStyle}
        imageStyle={styles.imageStyle}
      /> */}
      <View style={{marginLeft: SIZE.x10}}>
        <Text style={styles.textPrimaryTitle}>{scientific_name}</Text>
        <Text style={styles.textSecondaryTitle}>{common_name}</Text>
        <Text style={styles.textContent}>
          {truncateString(String(uses).replaceAll(',', ', '), 25)}
        </Text>
      </View>
    </View>
  );
};

export default PlantDictionaryCard;

const styles = StyleSheet.create({
  containerStyle: {
    marginBottom: SIZE.x20,
    borderRadius: SIZE.x4,
    backgroundColor: COLORS.GREEN500,
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
    fontSize: SIZE.x16,
    color: COLORS.WHITE,
  },
  imageViewStyle: {
    borderTopLeftRadius: SIZE.x4,
    borderBottomLeftRadius: SIZE.x4,
  },
  imageStyle: {
    resizeMode: 'cover',
  },
});
