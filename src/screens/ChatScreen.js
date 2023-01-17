import {
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import React, {useContext} from 'react';
import Screen from '../components/Screen';
import Header from '../components/Header';
import BottomNav from '../components/BottomNav';
import {AuthContext} from '../context/AuthContext';
import {COLORS} from '../common/utils/colors';
import {TEXT_SHADOW} from '../common/utils/styles';
import {SIZE} from '../common/utils/size';
import {PlantsContext} from '../context/PlantsContext';
import {useNavigation} from '@react-navigation/native';
import {ROUTES} from '../common/routes';

const ChatScreen = props => {
  const {user} = useContext(AuthContext);
  const {messages} = useContext(PlantsContext);
  const navigation = useNavigation();
  return (
    <React.Fragment>
      <Screen>
        <Header text="Messages" />
        {!user ? (
          <Text style={styles.textPrimaryTitle}>
            Please login to access your messages
          </Text>
        ) : null}
        {messages && messages.length > 0 ? (
          <ScrollView>
            {messages.map((message, ix) => {
              return (
                <TouchableOpacity
                  key={ix}
                  style={styles.chatCard}
                  onPress={() => {
                    const data = {
                      sellerName: message.messages[0].fromName,
                      sellerID: message.messages[0].fromID,
                      buyerID: second_half(message.snapShotID),
                    };
                    navigation.navigate(ROUTES.INSIDE_CHAT_SCREEN, data);
                  }}>
                  <Text style={styles.chatPrimaryTitle}>
                    {message.messages[0].fromName}
                  </Text>
                  <Text style={styles.chatSecondaryTitle}>
                    {message.messages[0].message}
                  </Text>
                </TouchableOpacity>
              );
            })}
          </ScrollView>
        ) : (
          <Text style={styles.textPrimaryTitle}>No Messages</Text>
        )}
      </Screen>
      <BottomNav />
    </React.Fragment>
  );
};
function first_half(str) {
  if (str.length % 2 == 0) {
    return str.slice(0, str.length / 2);
  }
  return str;
}
function second_half(str) {
  if (str.length % 2 == 0) {
    return str.slice(1, str.length / 2);
  }
  return str;
}
export default ChatScreen;

const styles = StyleSheet.create({
  chatCard: {
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
    color: COLORS.DARKERGREEN,
    ...TEXT_SHADOW,
    fontSize: SIZE.x26,
    marginVertical: 10,
    textAlign: 'center',
  },
  textSecondaryTitle: {
    fontWeight: 'bold',
    fontStyle: 'italic',
    color: '#FFF',
    fontSize: SIZE.x22,
    ...TEXT_SHADOW,
  },
  chatPrimaryTitle: {
    fontWeight: 'bold',
    color: COLORS.DARKGREEN,
    fontSize: SIZE.x18,
  },
  chatSecondaryTitle: {
    fontWeight: 'bold',
    fontStyle: 'italic',
    color: COLORS.BLACK,
    fontSize: SIZE.x16,
    // ...TEXT_SHADOW,
  },
});
