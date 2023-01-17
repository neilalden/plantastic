import {
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  TextInput,
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
import {updateDatabase} from '../functions/database/updateDatabase';
import {setDatabaseDocument} from '../functions/database/createFromDatabase';

const InsideChatScreen = props => {
  const {user} = useContext(AuthContext);
  const {messages, setMessages} = useContext(PlantsContext);
  const [text, setText] = React.useState();
  const params = props?.route?.params;
  const handleSend = () => {
    (async () => {
      const data = {
        createdAt: Date.now(),
        fromID: user.uid,
        fromName: user.name,
        message: text,
      };
      let copy = [...messages];
      for (let i = 0; i < messages.length; i++) {
        const message = messages[i];
        if (message.id === params.sellerID + params.buyerID) {
          let copyOfCopy = [...copy];
          if (copyOfCopy[i].messages) {
            copyOfCopy[i].messages.unshift(data);
          } else {
            copyOfCopy[i].messages = [data];
          }
          setMessages(copy);
          const res = await updateDatabase(
            'Messages',
            {messages: copyOfCopy, createdAt: Date.now()},
            params.sellerID + params.buyerID,
          );
        }
      }
      if (messages.length === 0) {
        copy.push([{messages: data}]);
        setMessages(copy);
        const res = await setDatabaseDocument(
          'Messages',
          {messages: [data], lastUpdated: Date.now()},
          params.sellerID + params.buyerID,
        );
      }
    })();
  };
  console.log('messages', messages);
  return (
    <>
      <Header
        text={params.sellerName}
        containerStyle={{backgroundColor: COLORS.GREEN100}}
      />
      <ScrollView
        style={[styles.container, {backgroundColor: COLORS.GREEN100}]}>
        {messages &&
          messages.map(_ => {
            return (
              _?.messages.length > 0 &&
              _?.messages.map((msg, ix) => {
                console.log(msg);
                return (
                  <View
                    key={ix}
                    style={{
                      borderRadius: SIZE.x4,
                      marginRight: msg.fromID === user.uid ? SIZE.x12 : 0,
                      backgroundColor:
                        msg.fromID === user.uid ? COLORS.DARKERGREEN : 'white',
                      alignSelf:
                        msg.fromID === user.uid ? 'flex-end' : 'flex-start',
                    }}>
                    <Text
                      style={{
                        fontWeight: 'bold',
                        color: COLORS.BLACK,
                        fontSize: SIZE.x16,
                        paddingHorizontal: SIZE.x10,
                        paddingVertical: SIZE.x6,
                      }}>
                      {msg.message}
                    </Text>
                  </View>
                );
              })
            );
          })}
      </ScrollView>
      <View style={{flexDirection: 'row'}}>
        <TextInput
          style={styles.searchInputArea}
          placeholder="Aa"
          placeholderTextColor={COLORS.M2}
          onChangeText={setText}
          value={text}
        />
        <TouchableOpacity
          onPress={handleSend}
          style={{
            width: SIZE.p16,
            backgroundColor: COLORS.DARKERGREEN,
            justifyContent: 'center',
            alignItems: 'center',
          }}>
          <Text style={styles.textSecondaryTitle}>Send</Text>
        </TouchableOpacity>
      </View>
    </>
  );
};

export default InsideChatScreen;

const styles = StyleSheet.create({
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
    color: '#FFF',
    fontSize: SIZE.x22,
    ...TEXT_SHADOW,
  },
  container: {
    flex: 1,
  },
  searchInputArea: {
    height: SIZE.x50,
    width: SIZE.p80,
    marginHorizontal: SIZE.x10,
    paddingLeft: SIZE.x14,
    color: COLORS.M2,
    fontSize: SIZE.x18,
    fontWeight: '600',
  },
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
