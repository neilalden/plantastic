/* eslint-disable prettier/prettier */
import {Image, StyleSheet, Text, View} from 'react-native';
import React from 'react';
import Screen from '../../components/Screen';
import {Button} from '../../components/Buttons';
import BottomNav from '../../components/BottomNav';
import {useNavigation, useRoute} from '@react-navigation/native';
import {IMAGES} from '../../common/images';
import Header from '../../components/Header';
import Icon from '../../components/Icon';
import {SIZE} from '../../common/utils/size';
import SettingsScreen from './SettingsScreen';
import {ROUTES} from '../../common/routes';

const NotificationScreen = () => {
  const route = useRoute();
  const navigation = useNavigation();
  return (
    <React.Fragment>
      <Screen>
        <Header
          canGoBack={false}
          text="Settings"
          Button={
            <Icon
              source={IMAGES.ic_settings}
              size={SIZE.x26}
              onPress={() => navigation.navigate(ROUTES.SETTINGS_SCREEN)}
            />
          }
        />
        <Text>Notification daw</Text>
      </Screen>
      <BottomNav routeName={route.name} navigation={navigation} />
    </React.Fragment>
  );
};

export default NotificationScreen;

const styles = StyleSheet.create({
  flex: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  margin: {
    top: 10,
  },
  iconers: {
    marginTop: 10,
  },
  div: {
    marginVertical: 20,
    padding: 15,
    marginHorizontal: 20,
    borderColor: 'white',
    backgroundColor: 'rgba(217,217,217,0.5)',
    borderRadius: 25,
  },
});
