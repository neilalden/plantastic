import React from 'react';
import {Modal, Text, TouchableOpacity, View, StyleSheet} from 'react-native';
import {COLORS} from '../common/utils/colors';
import {SIZE} from '../common/utils/size';
import {INFO} from '../common/utils/text';

const AppInfoModal = ({setAppInfoVisible, appInfoVisible}) => {
  return (
    <Modal
      animationType="slide"
      transparent={true}
      visible={appInfoVisible}
      style={styles.appInfoModalStyle}>
      <View style={styles.modalContainerStyle}>
        <View style={styles.modalView}>
          <Text style={styles.modalComplianceTitle}>
            PLANTASTIC for Android
          </Text>
          <Text>{INFO}</Text>
          <TouchableOpacity
            style={[styles.continueButton, {backgroundColor: COLORS.GREEN500}]}
            onPress={() => setAppInfoVisible(!appInfoVisible)}>
            <Text>Back</Text>
          </TouchableOpacity>
        </View>
      </View>
    </Modal>
  );
};

export default AppInfoModal;

const styles = StyleSheet.create({
  modalContainerStyle: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0,0,0,.7)',
  },
  modalView: {
    flex: 1,
    backgroundColor: COLORS.DARKGREEN,
    borderRadius: 20,
    margin: 20,
    height: SIZE.p100,
    padding: 20,
    justifyContent: 'center',
  },
  continueButton: {
    marginHorizontal: 5,
    marginTop: 20,
    marginRight: 200,
    padding: 15,
    borderRadius: 10,
  },
  appInfoModalStyle: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalComplianceTitle: {
    marginBottom: 20,
    color: COLORS.GREEN400,
    fontWeight: 'bold',
    fontSize: 20,
  },
});
