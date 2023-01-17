/* eslint-disable prettier/prettier */
import {Image, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import React, {useContext} from 'react';
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
import {COLORS} from '../../common/utils/colors';
import {PlantsContext} from '../../context/PlantsContext';
import {AuthContext} from '../../context/AuthContext';
import {setDatabaseDocument} from '../../functions/database/createFromDatabase';
import {updateDatabase} from '../../functions/database/updateDatabase';
const NotificationScreen = () => {
  const route = useRoute();
  const navigation = useNavigation();
  const {user} = useContext(AuthContext);
  const {notifications, setNotifications} = useContext(PlantsContext);
  const handleOnPress = route => {
    navigation.navigate(route);
  };
  const handleAccept = async (_, index) => {
    const data = {
      message: `${user.name} accepted your buy request. \n This service is pick-up only, contact the seller before going to their shop `,
      to: _.from,
      toID: _.fromID,
      from: user.name,
      fromID: user.uid,
    };
    const res = await setDatabaseDocument('Notifications', data);
    alert(res);
    updateDatabase(
      'Notifications',
      {message: `You accepted ${user.name}'s buy request`},
      _.snapShotID,
    );
    let copy = [...notifications];
    copy[index] = data;
    setNotifications(copy);
  };
  const handleDecline = async (_, index) => {
    const data = {
      message: `${user.name} declined your buy request`,
      to: _.from,
      toID: _.fromID,
      from: user.name,
      fromID: user.uid,
    };
    const res = await setDatabaseDocument('Notifications', data);
    alert(res);
    updateDatabase(
      'Notifications',
      {message: 'You declined this buy request'},
      _.snapShotID,
    );
    let copy = [...notifications];
    copy[index] = data;
    setNotifications(copy);
  };
  return (
    <React.Fragment>
      <Screen>
        <Header
          canGoBack={false}
          text="Notifications"
          Button={
            <Icon
              source={IMAGES.ic_settings2}
              size={SIZE.x26}
              onPress={() => navigation.navigate(ROUTES.SETTINGS_SCREEN)}
            />
          }
        />
        {user &&
          notifications &&
          notifications.map((_, id) => {
            if (_.toID !== user.uid) return;
            return (
              <View key={_.snapShotID} style={styles.card}>
                <Text style={styles.textPrimaryTitle}>{_.from}</Text>
                <Text style={styles.textSecondaryTitle}>{_.message}</Text>
                {_?.type === 'buy' ? (
                  <View
                    style={{
                      flexDirection: 'row',
                      justifyContent: 'space-between',
                      marginHorizontal: SIZE.x20,
                    }}>
                    <TouchableOpacity
                      onPress={() => handleAccept(_, id)}
                      style={{
                        borderWidth: 2,
                        borderRadius: 4,
                        borderColor: COLORS.DARKGREEN,
                        paddingHorizontal: SIZE.x10,
                        paddingVertical: 4,
                        marginTop: SIZE.x8,
                      }}>
                      <Text
                        style={{
                          color: COLORS.DARKGREEN,
                          fontSize: SIZE.x16,
                        }}>
                        Accept
                      </Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                      onPress={() => handleDecline(_, id)}
                      style={{
                        borderWidth: 2,
                        borderRadius: 4,
                        borderColor: COLORS.RED,
                        paddingHorizontal: SIZE.x10,
                        paddingVertical: 4,
                        marginTop: SIZE.x8,
                      }}>
                      <Text
                        style={{
                          color: COLORS.RED,
                          fontSize: SIZE.x16,
                        }}>
                        Decline
                      </Text>
                    </TouchableOpacity>
                  </View>
                ) : null}
              </View>
            );
          })}
      </Screen>
      <BottomNav routeName={route.name} navigation={navigation} />
    </React.Fragment>
  );
};

export default NotificationScreen;

const styles = StyleSheet.create({
  card: {
    padding: SIZE.x10,
    marginBottom: SIZE.x20,
    borderRadius: 4,
    backgroundColor: 'white',
    elevation: 5,
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 1},
    shadowOpacity: 0.8,
    shadowRadius: 1,
  },
  textPrimaryTitle: {
    fontWeight: 'bold',
    color: COLORS.DARKGREEN,
    fontSize: SIZE.x18,
  },
  textSecondaryTitle: {
    fontWeight: 'bold',
    fontStyle: 'italic',
    color: COLORS.BLACK,
    fontSize: SIZE.x16,
    // ...TEXT_SHADOW,
  },
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
    backgroundColor: COLORS.DARKGREEN,
    borderRadius: 25,
  },
  myIcon: {
    flex: 1,
  },
  myText: {
    marginLeft: SIZE.x20,
  },

  div2: {
    borderRadius: 4,
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
