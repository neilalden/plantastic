import React, {useState} from 'react';
import {
  StyleSheet,
  View,
  Text,
  TouchableOpacity,
  Modal,
  ScrollView,
  SafeAreaView,
  Linking,
} from 'react-native';
// import CheckBox from '@react-native-community/checkbox';
import {COLORS} from '../../common/utils/colors';
import {Button} from '../../components/Buttons';
import {useNavigation, useRoute} from '@react-navigation/native';
import CheckBox from '@react-native-community/checkbox';
import {SIZE} from '../../common/utils/size';
import {TERMS} from '../../common/utils/text';

const TermsScreen = () => {
  const [toggleCheckBox, setToggleCheckBox] = useState(false);
  const [complianceModal, setComplianceModal] = useState();

  const navigation = useNavigation();
  const handleBack = () => {
    navigation.goBack();
  };
  return (
    <View style={styles.containerStyle}>
      <View>
        <Text style={styles.modalComplianceTitle}>
          Hello You have Agreed on our Terms and Agreement
        </Text>
        <TouchableOpacity
          style={[styles.continueButton, {backgroundColor: COLORS.DARKGREEN}]}
          onPress={handleBack}>
          <Text>Back</Text>
        </TouchableOpacity>
        <Modal
          animationType="slide"
          transparent={true}
          visible={complianceModal}>
          <SafeAreaView>
            <ScrollView>
              <View style={styles.modalContainerStyle}>
                <View style={styles.modalView}>
                  <Text style={styles.modalComplianceTitle}>TERMS OF USE</Text>
                  <Text>{TERMS}</Text>

                  <TouchableOpacity
                    onPress={() => setToggleCheckBox(!toggleCheckBox)}
                    style={styles.checkboxContainer}>
                    <CheckBox
                      value={toggleCheckBox}
                      style={styles.checkBox}
                      onValueChange={newValue => setToggleCheckBox(newValue)}
                    />
                    <Text
                      style={styles.modalComplianceAgree}
                      value={toggleCheckBox}
                      disable={false}>
                      I Agree with Terms of Use
                    </Text>
                  </TouchableOpacity>
                  <View style={styles.modalButtons}>
                    <TouchableOpacity
                      style={[
                        styles.continueButton,
                        {
                          backgroundColor: toggleCheckBox
                            ? COLORS.GREEN500
                            : 'rgba(217,217,217,0.5)',
                        },
                      ]}
                      disabled={!toggleCheckBox}
                      onPress={() => setComplianceModal(false)}>
                      <Text
                        style={
                          toggleCheckBox
                            ? styles.buttonEnabled
                            : styles.buttonDisabled
                        }>
                        Proceed with the next step
                      </Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                      style={[
                        styles.continueButton,
                        {backgroundColor: COLORS.GREEN500},
                      ]}
                      onPress={handleBack}>
                      <Text>Back</Text>
                    </TouchableOpacity>
                  </View>
                </View>
              </View>
            </ScrollView>
          </SafeAreaView>
        </Modal>
      </View>
    </View>
  );
};

export default TermsScreen;

const styles = StyleSheet.create({
  buttonStyle: {
    backgroundColor: COLORS.GREEN200,
    color: COLORS.DARKGREEN,
  },
  containerStyle: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: COLORS.GREEN500,
  },
  textStyle: {
    fontSize: 20,
    textAlign: 'center',
    marginBottom: 10,
    color: COLORS.DARKGREEN,
  },
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
    padding: 20,
    alignItems: 'center',
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
    fontSize: 18,
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
    padding: 15,
    borderRadius: 10,
  },
});
