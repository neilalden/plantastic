import React, {useState} from 'react';
import {
  SafeAreaView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  Pressable,
} from 'react-native';
import {SIZE} from '../common/utils/size';
import Icon from './Icon';
import {IMAGES} from '../common/images';

const Rating = ({maxRating, rating, setRating}) => {
  const CustomRatingBar = () => {
    return (
      <View style={styles.customRatingBarStyle}>
        {maxRating.map((item, key) => {
          return (
            <TouchableOpacity
              activeOpacity={0.7}
              key={item}
              style={styles.starImgStyle}
              onPress={() => setRating(item)}>
              <Icon
                size={SIZE.x40}
                source={
                  item <= rating ? IMAGES.ic_leaf : IMAGES.ic_leaf_dark_green
                }
              />
            </TouchableOpacity>
          );
        })}
      </View>
    );
  };
  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.textStyle}>Please Rate Us</Text>
      <CustomRatingBar
        setRating={setRating}
        maxRating={maxRating}
        rating={rating}
      />
      <Text style={styles.textStyle}>{rating + '/' + maxRating.length}</Text>

      <TouchableOpacity
        activeOpacity={0.7}
        style={styles.buttonStyle}
        onPress={() => alert(rating)}>
        <Text>Get Selected Value</Text>
      </TouchableOpacity>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: SIZE.x1,
    margin: SIZE.x10,
    justifyContent: 'center',
  },
  textStyle: {
    textAlign: 'center',
    fontSize: SIZE.x22,
    marginTop: SIZE.x20,
  },
  customRatingBarStyle: {
    justifyContent: 'center',
    flexDirection: 'row',
    marginTop: SIZE.x30,
  },
  starImgStyle: {
    justifyContent: 'space-around',
    marginHorizontal: SIZE.x10,
    resizeMode: 'cover',
  },
  buttonStyle: {
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: SIZE.x30,
    padding: SIZE.x16,
    backgroundColor: 'green',
  },
});

export default Rating;
