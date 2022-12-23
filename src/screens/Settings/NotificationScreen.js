/* eslint-disable prettier/prettier */
import {Image, StyleSheet, Text, View} from 'react-native';
import React from 'react';
import Screen from '../../components/Screen';
import {Button, ButtonOutline} from '../../components/Buttons';
import BottomNav from '../../components/BottomNav';
import {useNavigation, useRoute} from '@react-navigation/native';
import {IMAGES} from '../../common/images';
import Header from '../../components/Header';
import Icon from '../../components/Icon';
import {SIZE} from '../../common/utils/size';
import SettingsScreen from './SettingsScreen';
import {ROUTES} from '../../common/routes';
import {signOut} from '../../functions/authentication/signOut';

const NotificationScreen = () => {
  const route = useRoute();
  const navigation = useNavigation();
  const handleLogout = () => {
    signOut();
  };
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
        <View style={styles.container}>
          <View style={styles.div}>
            <Text style={styles.numberContent}>5</Text>
            <Text style={styles.stringContent}>Collection</Text>
          </View>
          <View style={styles.div}>
            <Text style={styles.numberContent}>5</Text>
            <Text style={styles.stringContent}>History</Text>
          </View>
        </View>

        <View style={styles.section2}>
          <View>
            <Icon
              source={IMAGES.ic_people}
              style={styles.myIcon}
              size={SIZE.x40}
            />
          </View>
          <View style={styles.div2}>
            <Text style={styles.myText}>Forum</Text>
          </View>
        </View>

        <View style={styles.section2}>
          <View>
            <Icon
              source={IMAGES.ic_bell}
              style={styles.myIcon}
              size={SIZE.x40}
            />
          </View>
          <View style={styles.div2}>
            <Text style={styles.myText}>Notification</Text>
          </View>
        </View>
        <ButtonOutline
          text={'LOGOUT'}
          containerStyle={{marginTop: SIZE.p10}}
          onPress={handleLogout}
        />
      </Screen>
      <BottomNav routeName={route.name} navigation={navigation} />
    </React.Fragment>
  );
};

export default NotificationScreen;

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'space-around',
  },
  flex: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  margin: {
    top: 10,
  },
  div: {
    width: SIZE.x150,
    marginVertical: 20,
    padding: SIZE.x20,
    marginHorizontal: 20,
    borderColor: 'white',
    backgroundColor: 'rgba(217,217,217,0.5)',
    borderRadius: 25,
  },
  myIcon: {
    flex: 1,
  },
  myText: {
    marginLeft: SIZE.x20,
  },

  div2: {
    borderRadius: SIZE.x4,
    width: SIZE.x240,
    height: SIZE.x50,
    backgroundColor: 'rgba(217,217,217,0.5)',

    flexDirection: 'row',
    alignItems: 'center',
  },
  section2: {
    marginTop: SIZE.x20,
    marginHorizontal: SIZE.x24,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-around',
  },
  numberContent: {
    alignSelf: 'center',
  },
  stringContent: {
    alignSelf: 'center',
    alignContent: 'center',
  },
});
