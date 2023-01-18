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
        {messages && messages.length > 0 ? (
          <ScrollView>
            {messages.map((message, ix) => {
              const buyerID =
                user.userType === 'buyer' ? user.uid : message.sellerID;
              const sellerID =
                user.userType === 'buyer' ? message.sellerID : user.uid;
              const sellerName =
                user.userType === 'buyer' ? message.sellerName : user.name;
              const buyerName =
                user.userType === 'buyer' ? user.name : message.buyerName;
              if (
                (user.userType === 'buyer' && message.buyerID !== user.uid) ||
                (user.userType === 'seller' && message.sellerID !== user.uid)
              )
                return;
              return (
                <TouchableOpacity
                  key={ix}
                  style={styles.chatCard}
                  onPress={() => {
                    const data =
                      user.userType === 'buyer'
                        ? {buyerID, sellerID, sellerName, buyerName}
                        : {
                            buyerID: message.buyerID,
                            sellerID: message.buyerID,
                            sellerName: message.buyerName,
                            buyerName: message.buyerName,
                          };
                    navigation.navigate(ROUTES.INSIDE_CHAT_SCREEN, data);
                  }}>
                  <Text style={styles.chatPrimaryTitle}>
                    {user.userType === 'buyer' ? sellerName : buyerName}
                  </Text>
                  <Text style={styles.chatSecondaryTitle}>
                    {message.lastMessage.message}
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
    color: COLORS.BLACK,
    fontSize: SIZE.x16,
    // ...TEXT_SHADOW,
  },
});
