import React, {useState} from 'react';
import {
  Alert,
  Modal,
  StyleSheet,
  Text,
  Pressable,
  View,
  Image,
} from 'react-native';
import {IMAGES} from '../common/images';
import {COLORS} from '../common/utils/colors';
import {SIZE} from '../common/utils/size';

const ModalTab = ({modalVisible, setModalVisible, uri}) => {
  return (
    <>
      <View style={styles.centeredView}>
        <Modal
          statusBarTranslucent={true}
          animationType="slide"
          transparent={true}
          visible={modalVisible}
          onRequestClose={() => {
            setModalVisible(!modalVisible);
          }}>
          <View style={styles.centeredView}>
            {uri && typeof uri === 'string' ? (
              <View style={styles.modalView}>
                <Image
                  source={{
                    uri: uri,
                  }}
                  height={100}
                  width={100}
                  style={{width: 400, height: 400}}
                />
              </View>
            ) : (
              <View style={styles.modalView}>
                <Text style={styles.modalText}>Coming Soon . . .</Text>
                <Pressable
                  style={[styles.button, styles.buttonClose]}
                  onPress={() => setModalVisible(!modalVisible)}>
                  <Text style={styles.textStyle}>Hide Modal</Text>
                </Pressable>
              </View>
            )}
          </View>
        </Modal>
      </View>
    </>
  );
};

const styles = StyleSheet.create({
  centeredView: {
    backgroundColor: 'rgba(0, 0, 0, 0.7)',
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: SIZE.x22,
  },
  modalView: {
    margin: 20,
    backgroundColor: COLORS.DARKGREEN,
    borderRadius: 20,
    padding: 35,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  button: {
    borderRadius: 5,
    padding: 10,
    elevation: 2,
  },

  buttonClose: {
    backgroundColor: COLORS.GREEN500,
  },
  textStyle: {
    color: COLORS.GREEN100,
    fontWeight: 'bold',
    fontSize: 10,
    textAlign: 'center',
  },
  modalText: {
    marginBottom: 15,
    fontWeight: 'bold',
    fontSize: 20,
    textAlign: 'center',
    color: COLORS.GREEN100,
    textShadowColor: '#313131',
    textShadowOffset: {width: 0, height: 1.2},
    textShadowRadius: 2,
    padding: SIZE.x2,
  },
});

export default ModalTab;
