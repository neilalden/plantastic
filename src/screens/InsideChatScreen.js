import {
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  TextInput,
  PermissionsAndroid,
  Platform,
  ToastAndroid,
  Image,
} from 'react-native';
import React, {memo, useContext, useEffect, useState} from 'react';
import Screen from '../components/Screen';
import Header from '../components/Header';
import BottomNav from '../components/BottomNav';
import {AuthContext} from '../context/AuthContext';
import {COLORS} from '../common/utils/colors';
import storage from '@react-native-firebase/storage';
import {TEXT_SHADOW} from '../common/utils/styles';
import {SIZE} from '../common/utils/size';
import {PlantsContext} from '../context/PlantsContext';
import {updateDatabase} from '../functions/database/updateDatabase';
import {setDatabaseDocument} from '../functions/database/createFromDatabase';
import firestore from '@react-native-firebase/firestore';
import RNFS from 'react-native-fs';
import RNFetchBlob from 'rn-fetch-blob';
import DocumentPicker from 'react-native-document-picker';
import FileViewer from 'react-native-file-viewer';
import ModalTab from '../components/ModalTab';

const InsideChatScreen = props => {
  const {user} = useContext(AuthContext);
  const {messages} = useContext(PlantsContext);
  const [text, setText] = React.useState('');
  const [image, setImage] = React.useState();
  if (!user) return;
  const params = props?.route?.params;
  const sellerID = user.userType === 'buyer' ? params.sellerID : user.uid;
  const buyerID = user.userType === 'buyer' ? user.uid : params.sellerID;
  const sellerName = user.userType === 'buyer' ? params.sellerName : user.name;
  const buyerName = user.userType === 'buyer' ? user.name : params.sellerName;
  const convoID = `${buyerID}${sellerID}`;
  const thisConvo = getConvo(messages, convoID);
  const [convo, setConvo] = useState([]);
  const [file, setFile] = useState(undefined);
  const [modalVisible, setModalVisible] = useState(false);
  const handleToggleModal = async uri => {
    if (uri) {
      const str = await viewFile(uri);
      setFile(str);
      setModalVisible(prev => !prev);
    }
  };
  function onResult(QuerySnapshot) {
    const array = [];
    QuerySnapshot.forEach(item => {
      array.push({...item.data(), id: item.id});
    });

    setConvo(array);
    const data = thisConvo.lastMessage;
    if (data.fromID !== user.uid) {
      data.read = true;
      updateDatabase(`Messages`, {lastMessage: data}, convoID);
    }
  }
  function onError(error) {
    console.error(error);
  }
  React.useEffect(() => {
    if (file) {
      setText(file.fileName);
    }
  }, [file]);
  React.useEffect(() => {
    if (thisConvo) {
      firestore()
        .collection(`Messages/${thisConvo.id}/Messages`)
        .orderBy('createdAt', 'asc')
        .onSnapshot(onResult, onError);
    }
  }, [thisConvo]);
  const handleSend = () => {
    if (text === '' || file === undefined) return;
    (async () => {
      const data = {
        createdAt: Date.now(),
        fromID: user.uid,
        fromName: user.name,
        message: text,
        read: false,
      };
      if (file) {
        sendFile(file)
          .then(() => {
            data.file = file.fileName;
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
              setDatabaseDocument(`Messages/${convoID}/Messages`, data).then(
                () => {
                  updateDatabase(
                    `Messages`,
                    {lastUpdated: Date.now(), lastMessage: data},
                    convoID,
                  );
                  setText('');
                },
              );
            }
            setFile(undefined);
            setText('');
          })
          .catch(e => console.error(e));
      } else {
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
            setFile(undefined);
          });
        } else {
          setDatabaseDocument(`Messages/${convoID}/Messages`, data).then(() => {
            updateDatabase(
              `Messages`,
              {lastUpdated: Date.now(), lastMessage: data},
              convoID,
            );
            setText('');
            setFile(undefined);
          });
        }
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
        <ModalTab
          modalVisible={modalVisible}
          setModalVisible={setModalVisible}
          uri={file}
        />

        {convo &&
          convo.map((_, ix) => {
            return (
              <TouchableOpacity
                onPress={() => handleToggleModal(_?.file)}
                activeOpacity={_?.file ? 0 : 1}
                ena
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
                  {String(_?.message)}
                </Text>
              </TouchableOpacity>
            );
          })}
      </ScrollView>
      <View style={{flexDirection: 'row'}}>
        <TouchableOpacity
          onPress={() => selectImage(setFile)}
          style={{
            width: SIZE.p16,
            backgroundColor: COLORS.DARKERGREEN,
            justifyContent: 'center',
            alignItems: 'center',
          }}>
          <Text style={styles.textSecondaryTitle}>File</Text>
        </TouchableOpacity>
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
  if (!messages) return false;
  for (const _ of messages) {
    if (_.id === convoID) return _;
  }
};

const selectImage = async setFile => {
  try {
    const permission = await requestStoragePermission();
    if (permission) {
      DocumentPicker.pickMultiple({
        type: [DocumentPicker.types.images],
        mode: 'open',
        copyTo: 'cachesDirectory',
      })
        .then(res => {
          setFile({fileName: res[0].name, uri: res[0].fileCopyUri});
        })
        .catch(e => alert(`${e}`));
    } else {
      alert('Alert', 'Unable to upload file');
    }
  } catch (e) {
    alert(e);
  }
};
export default memo(InsideChatScreen);

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
    width: SIZE.p64,
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
const requestStoragePermission = async () => {
  try {
    const granted = await PermissionsAndroid.request(
      PermissionsAndroid.PERMISSIONS.READ_EXTERNAL_STORAGE,
      {
        title: 'ReadApp Storage Permission',
        message:
          'ReadApp needs access to your storage ' +
          'so you can upload files from your storage',
        buttonNeutral: 'Ask Me Later',
        buttonNegative: 'Cancel',
        buttonPositive: 'OK',
      },
    );
    if (granted === PermissionsAndroid.RESULTS.GRANTED) {
      return true;
    } else {
      return false;
    }
  } catch (err) {
    alert('Error', `${err}`);
  }
};
const viewFile = async file => {
  if (!file) return;

  ToastAndroid.showWithGravity(
    'Loading',
    ToastAndroid.SHORT,
    ToastAndroid.CENTER,
  );

  return storage()
    .ref(file)
    .getDownloadURL()
    .then(url => {
      return url;
    })
    .catch(e => console.error(e, 'storages'));
};
const sendFile = async file => {
  const documentUri = await getPathForFirebaseStorage(file.uri);
  const reference = storage().ref(file.fileName);

  ToastAndroid.showWithGravity(
    'File name will disappear in chatbox when file is sent',
    ToastAndroid.SHORT,
    ToastAndroid.CENTER,
  );
  return await reference
    .putFile(documentUri)
    .then(() => {
      return true;
    })
    .catch(e => {
      alert(e);
    });
};

const getPathForFirebaseStorage = async uri => {
  if (Platform.OS === 'ios') {
    return uri;
  }
  try {
    const stat = await RNFetchBlob.fs.stat(uri);
    return stat.path;
  } catch (e) {
    alert(`${e}`, 'Move file to internal storage');
  }
};
