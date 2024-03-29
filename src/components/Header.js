import {Image, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import React from 'react';
import {SIZE} from '../common/utils/size';
import {IMAGES} from '../common/images';
import {TEXT_SHADOW} from '../common/utils/styles';
import {COLORS} from '../common/utils/colors';
import {truncateString} from '../functions/utility/truncate';
import {useNavigation} from '@react-navigation/native';
const Header = props => {
  const text = props?.text;
  const Button = props?.Button;
  const canGoBack = props?.canGoBack ?? true;
  const goBack = () => navigation.goBack();
  const navigation = useNavigation();
  const containerStyle = props?.containerStyle;

  return (
    <View style={[styles.container, containerStyle]} elevation={5}>
      {canGoBack ? (
        <TouchableOpacity style={styles.icon_container} onPress={goBack}>
          <Image source={IMAGES.ic_back2} style={styles.icon} />
        </TouchableOpacity>
      ) : (
        <View style={styles.button}></View>
      )}
      {text ? (
        <Text style={styles.title}>{String(truncateString(text), 18)}</Text>
      ) : (
        <></>
      )}
      <View style={styles.button}>{Button}</View>
    </View>
  );
};

export default Header;

const styles = StyleSheet.create({
  container: {
    height: SIZE.x50,
    width: SIZE.p100,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  icon_container: {
    height: SIZE.x50,
    width: SIZE.x30,
    justifyContent: 'center',
    alignItems: 'center',
    marginLeft: SIZE.x10,
  },
  icon: {
    height: SIZE.x24,
    resizeMode: 'contain',
  },
  title: {
    ...TEXT_SHADOW,
    color: COLORS.DARKGREEN,
    fontSize: SIZE.x24,
    alignSelf: 'center',
  },
  button: {
    marginRight: SIZE.x10,
    alignSelf: 'center',
    width: SIZE.x30,
  },
});
