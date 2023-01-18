import {
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  TextInput,
} from 'react-native';
import React, {useContext, useEffect, useState} from 'react';
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
import firestore from '@react-native-firebase/firestore';

const InsideChatScreen = props => {
  const {user} = useContext(AuthContext);
  const {messages} = useContext(PlantsContext);
  const [text, setText] = React.useState();
  const params = props?.route?.params;

  const sellerID = user.userType === 'buyer' ? params.sellerID : user.uid;
  const buyerID = user.userType === 'buyer' ? user.uid : params.sellerID;
  const sellerName = user.userType === 'buyer' ? params.sellerName : user.name;
  const buyerName = user.userType === 'buyer' ? user.name : params.sellerName;
  const convoID = `${buyerID}${sellerID}`;
  const thisConvo = getConvo(messages, convoID);
  const [convo, setConvo] = useState([]);
  function onResult(QuerySnapshot) {
    const array = [];
    QuerySnapshot.forEach(item => {
      array.push({...item.data(), id: item.id});
    });
    setConvo(array);
  }
  function onError(error) {
    console.error(error);
  }
  React.useEffect(() => {
    if (thisConvo) {
      firestore()
        .collection(`Messages/${thisConvo.id}/Messages`)
        .orderBy('createdAt', 'asc')
        .onSnapshot(onResult, onError);
    }
  }, [thisConvo]);
  const handleSend = () => {
    (async () => {
      const data = {
        createdAt: Date.now(),
        fromID: user.uid,
        fromName: user.name,
        message: text,
      };
      if (!thisConvo) {
        setDatabaseDocument(
          'Messages',
          {
            sellerID,
            sellerName,
            buyerID,
            buyerName,
            lastUpdated: Date.now(),
            lastMessage: data,
          },
          convoID,
        ).then(() => {
          setDatabaseDocument(`Messages/${convoID}/Messages`, data);
          setText('');
        });
      } else {
        setDatabaseDocument(`Messages/${convoID}/Messages`, data).then(() => {
          updateDatabase(
            `Messages`,
            {lastUpdated: Date.now(), lastMessage: data},
            convoID,
          );
          setText('');
        });
      }
    })();
  };
  return (
    <>
      <Header
        text={params.sellerName}
        containerStyle={{backgroundColor: COLORS.GREEN100}}
      />
      <ScrollView
        style={[styles.container, {backgroundColor: COLORS.GREEN100}]}>
        {convo &&
          convo.map((_, ix) => {
            return (
              <View
                key={ix}
                style={{
                  borderRadius: SIZE.x4,
                  marginBottom: SIZE.x4,
                  marginRight: _.fromID === user.uid ? SIZE.x12 : 0,
                  marginLeft: _.fromID !== user.uid ? SIZE.x12 : 0,
                  backgroundColor:
                    _.fromID === user.uid ? COLORS.DARKERGREEN : 'white',
                  alignSelf: _.fromID === user.uid ? 'flex-end' : 'flex-start',
                }}>
                <Text
                  style={{
                    fontWeight: 'bold',
                    color: COLORS.BLACK,
                    fontSize: SIZE.x16,
                    paddingHorizontal: SIZE.x10,
                    paddingVertical: SIZE.x6,
                  }}>
                  {_?.message}
                </Text>
              </View>
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

const getConvo = (messages, convoID) => {
  for (const _ of messages) {
    if (_.id === convoID) return _;
  }
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
