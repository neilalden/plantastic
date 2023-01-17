import {
  StyleSheet,
  SafeAreaView,
  ViewStyle,
  View,
  Button,
  ScrollView,
} from 'react-native';
import React, {useContext, useEffect, useState} from 'react';
import {COLORS} from '../common/utils/colors';
import LinearGradient from 'react-native-linear-gradient';
import {SIZE} from '../common/utils/size';

import {
  ALERT_TYPE,
  Dialog,
  AlertNotificationRoot,
  Toast,
} from 'react-native-alert-notification';
import {PlantsContext} from '../context/PlantsContext';
import {AuthContext} from '../context/AuthContext';
type Props = {
  gradientBG?: Boolean;
  style?: ViewStyle;
  children?: React.ReactNode;
};
const Screen = ({gradientBG = false, style, children}: Props) => {
  const [myNotifs, setMyNotifs] = useState([]);
  const {notifications} = useContext(PlantsContext);
  const {user} = useContext(AuthContext);

  useEffect(() => {
    if (!user || !notifications || notifications.length == 0) return;
    // const notifArr = [];
    for (const _ of notifications) {
      // if (_?.toID === user.uid) notifArr.push(_);

      Toast.show({
        type: ALERT_TYPE.SUCCESS,
        title: 'Success',
        textBody: _.message,
      });
    }
    // setMyNotifs(notifArr);
  }, [notifications]);
  if (gradientBG) {
    return (
      <LinearGradient
        colors={[COLORS.GREEN500, COLORS.DARKGREEN]}
        style={styles.container}>
        <SafeAreaView style={[styles.container, style]}>
          <ScrollView
            showsVerticalScrollIndicator={false}
            style={{marginHorizontal: SIZE.x14}}>
            {myNotifs.length > 0
              ? myNotifs.map((_, ix) => {
                  return (
                    <AlertNotificationRoot>
                      <View>
                        {/* // dialog box */}
                        <Button
                          title={'dialog box'}
                          onPress={() =>
                            Dialog.show({
                              type: ALERT_TYPE.SUCCESS,
                              title: 'Success',
                              textBody: 'Congrats! this is dialog box success',
                              button: 'close',
                            })
                          }
                        />
                        {/* // toast notification */}
                        <Button
                          title={'toast notification'}
                          onPress={() =>
                            Toast.show({
                              type: ALERT_TYPE.SUCCESS,
                              title: 'Success',
                              textBody:
                                'Congrats! this is toast notification success',
                            })
                          }
                        />
                      </View>
                    </AlertNotificationRoot>
                  );
                })
              : null}
            {children}
          </ScrollView>
        </SafeAreaView>
      </LinearGradient>
    );
  } else {
    return (
      <SafeAreaView
        style={[styles.container, style, {backgroundColor: COLORS.GREEN100}]}>
        <ScrollView
          showsVerticalScrollIndicator={false}
          style={{marginHorizontal: SIZE.x14}}>
          {/* <AlertNotificationRoot children={undefined} autoClose /> */}
          {children}
        </ScrollView>
      </SafeAreaView>
    );
  }
};

export default Screen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
