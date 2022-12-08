import {Image, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import React from 'react';
import {SIZE} from '../common/utils/size';
import {IMAGES} from '../common/images';

const Header = () => {
  return (
    <View style={styles.container} elevation={5}>
      <TouchableOpacity
        style={{
          backgroundColor: 'blue',
          height: SIZE.x50,
          width: SIZE.x30,
          justifyContent: 'center',
          alignItems: 'center',
          marginLeft: SIZE.x10,
        }}>
        <Image source={IMAGES.ic_back} style={styles.icon} />
      </TouchableOpacity>
      <Text>TITLE</Text>
      <TouchableOpacity
        style={{
          marginRight: SIZE.x10,
        }}>
        <Text>cancel</Text>
      </TouchableOpacity>
    </View>
  );
};

export default Header;

const styles = StyleSheet.create({
  container: {
    height: SIZE.x50,
    width: SIZE.p100,
    backgroundColor: 'red',
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  icon: {
    height: SIZE.x24,
    resizeMode: 'contain',
  },
});
