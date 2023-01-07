import {
  Image,
  SafeAreaView,
  StyleSheet,
  Text,
  Touchable,
  View,
} from 'react-native';
import React from 'react';
import {COLORS} from '../common/utils/colors';
import {SIZE} from '../common/utils/size';
import {IMAGES} from '../common/images';
import Icon from './Icon';
import {ROUTES} from '../common/routes';
import {useNavigation, useRoute} from '@react-navigation/native';

const BottomNav = props => {
  const routeName = useRoute().name;
  const navigation = useNavigation();
  const handleOnPress = route => {
    navigation.navigate(route);
  };
  return (
    <SafeAreaView style={styles.container}>
      <Icon
        onPress={() => handleOnPress(ROUTES.HOME_SCREEN)}
        size={SIZE.x40}
        containerStyle={[
          styles.icon_container,
          {marginVertical: SIZE.x14, marginLeft: SIZE.x14},
        ]}
        source={
          routeName === ROUTES.HOME_SCREEN
            ? IMAGES.ic_home
            : IMAGES.ic_home_dark_green
        }
      />
      <Icon
        onPress={() => handleOnPress(ROUTES.PLANT_DICTIONARY_SCREEN)}
        size={SIZE.x40}
        containerStyle={[styles.icon_container, {marginVertical: SIZE.x14}]}
        source={
          routeName === ROUTES.PLANT_DICTIONARY_SCREEN
            ? IMAGES.ic_leaf
            : IMAGES.ic_leaf_dark_green
        }
      />
      <Icon
        onPress={() => handleOnPress(ROUTES.SHOP_SCREEN)}
        size={SIZE.x40}
        containerStyle={[
          styles.icon_container,
          {marginVertical: SIZE.x14, marginHorizontal: SIZE.x4},
        ]}
        source={
          routeName === ROUTES.SHOP_SCREEN
            ? IMAGES.ic_shop
            : IMAGES.ic_shop_dark_green
        }
      />
      <Icon
        onPress={() => handleOnPress(ROUTES.RECENTLY_VIEWED_SCREEN)}
        size={SIZE.x40}
        containerStyle={[styles.icon_container, {marginVertical: SIZE.x14}]}
        source={
          routeName === ROUTES.RECENTLY_VIEWED_SCREEN
            ? IMAGES.ic_recent
            : IMAGES.ic_recent_dark_green
        }
      />
      <Icon
        onPress={() => handleOnPress(ROUTES.SETTINGS_SCREEN)}
        size={SIZE.x40}
        imageStyle={{resizeMode: 'contain'}}
        containerStyle={[
          styles.icon_container,
          {marginVertical: SIZE.x14, marginRight: SIZE.x14},
        ]}
        source={
          routeName === ROUTES.SETTINGS_SCREEN ||
          routeName === ROUTES.NOTIFICATION_SCREEN
            ? IMAGES.ic_hamburger
            : IMAGES.ic_hamburger_dark_green
        }
      />
    </SafeAreaView>
  );
};
export default BottomNav;

const styles = StyleSheet.create({
  icon_container: {},
  container: {
    backgroundColor: COLORS.M2,
    height: SIZE.x80,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
});
