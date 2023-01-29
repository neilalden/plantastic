import React, {useEffect} from 'react';
import PushNotification from 'react-native-push-notification';

import Navigation from './src/Navigation';
const App = () => {
  useEffect(() => {
    PushNotification.createChannel({
      channelId: 'plantastic', // (required)
      channelName: 'plantastic', // (required)
      channelDescription: 'A channel to categorise your notifications', // (optional) default: undefined.
      playSound: false, // (optional) default: true
      soundName: 'default', // (optional) See `soundName` parameter of `localNotification` function
      importance: 4, // (optional) default: 4. Int value of the Android notification importance
      vibrate: true, // (optional) default: true. Creates the default vibration patten if true.
    });
    // const unsubscribe = messaging().onMessage(async remoteMessage => {

    // });
  });

  return <Navigation />;
};

export default App;
