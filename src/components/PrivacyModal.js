import React from 'react';
import {
  Modal,
  SafeAreaView,
  ScrollView,
  Text,
  TouchableOpacity,
  View,
  StyleSheet,
} from 'react-native';
import {COLORS} from '../common/utils/colors';
import {SIZE} from '../common/utils/size';
import {TERMS} from '../common/utils/termsText';

const PrivacyModal = ({privacyVisible, setPrivacyVisible}) => {
  return (
    <Modal animationType="slide" transparent={true} visible={privacyVisible}>
      <SafeAreaView>
        <ScrollView>
          <View style={styles.modalContainerStyle}>
            <View style={styles.modalView}>
              <Text style={styles.modalComplianceTitle}>
                PRIVACY AND POLICY
              </Text>
              <Text>{TERMS}</Text>
              <TouchableOpacity
                style={[
                  styles.continueButton,
                  {backgroundColor: COLORS.GREEN500},
                ]}
                onPress={() => setPrivacyVisible(!privacyVisible)}>
                <Text>Back</Text>
              </TouchableOpacity>
            </View>
          </View>
        </ScrollView>
      </SafeAreaView>
    </Modal>
  );
};

export default PrivacyModal;

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
  buttonLoginContainer: {
    marginHorizontal: 20,
  },
  modalComplianceTitle: {
    marginBottom: 10,
    marginTop: 20,
    color: COLORS.GREEN400,
    fontWeight: 'bold',
    textAlign: 'center',
    fontSize: 20,
  },
  modalComplianceAgree: {
    color: COLORS.GREEN400,
    textAlign: 'center',
  },

  modalButtons: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  buttonEnabled: {
    color: COLORS.GREEN100,
  },
  buttonDisabled: {
    color: 'rgba(217,217,217,.5)',
  },
  checkboxContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 30,
  },
  checkBox: {
    width: 30,
    height: 30,
    marginRight: 20,
  },
  continueButton: {
    marginHorizontal: 5,
    marginTop: 20,
    marginRight: 200,
    padding: 15,
    borderRadius: 10,
  },
});
