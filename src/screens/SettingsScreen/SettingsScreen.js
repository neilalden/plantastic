/* eslint-disable prettier/prettier */
import {
  StyleSheet,
  Text,
  View,
  Modal,
  ScrollView,
  SafeAreaView,
  TouchableOpacity,
} from 'react-native';
import React from 'react';
import Screen from '../../components/Screen';
import {Button} from '../../components/Buttons';
import BottomNav from '../../components/BottomNav';
import {useRoute} from '@react-navigation/native';
import {IMAGES} from '../../common/images';
import Header from '../../components/Header';
import Icon from '../../components/Icon';
import {SIZE} from '../../common/utils/size';
import {ROUTES} from '../../common/routes';
import {useState} from 'react';
import {SettingsButton} from '../../components/Buttons';
import {COLORS} from '../../common/utils/colors';
import {TERMS} from '../../common/utils/termsText';
import ModalTab from '../../components/ModalTab';

import PrivacyModal from '../../components/PrivacyModal';
import AppInfoModal from '../../components/AppInfoModal';

const SettingsScreen = ({navigation}) => {
  const route = useRoute();
  // PRIVACY POLICY STATE
  const [privacyVisible, setPrivacyVisible] = useState(false);

  //APP INFO STATE
  const [appInfoVisible, setAppInfoVisible] = useState(false);

  //MODAL COMING SOON STATE
  const [modalVisible, setModalVisible] = useState(false);

  const handleBack = () => {
    navigation.goBack();
  };

  //MODAL COMING SOON FUNCTION
  const toggleModal = () => {
    setModalVisible(!modalVisible);
  };

  const togglePrivacy = () => {
    setPrivacyVisible(!privacyVisible);
  };

  const handleOnPress = route => {
    navigation.navigate(route);
  };

  return (
    <React.Fragment>
      <Screen>
        <Header
          canGoBack={false}
          text="Settings"
          Button={
            <Icon
              source={IMAGES.ic_settings}
              size={SIZE.x26}
              onPress={() => navigation.navigate(ROUTES.NOTIFICATION_SCREEN)}
            />
          }
        />

        <ModalTab
          modalVisible={modalVisible}
          setModalVisible={setModalVisible}
        />
        {/* PRIVACY POLICY MODAL*/}
        <PrivacyModal
          privacyVisible={privacyVisible}
          setPrivacyVisible={setPrivacyVisible}
        />
        {/* END OF PRIVACY POLICY MODAL*/}

        {/* APP INFO MODAL*/}
        <AppInfoModal
          appInfoVisible={appInfoVisible}
          setAppInfoVisible={setAppInfoVisible}
        />
        {/* END APP INFO MODAL*/}
        <Text style={styles.textLabel}>General Settings</Text>
        <SettingsButton
          text={'Account Settings'}
          onPress={toggleModal}
          containerStyle={styles.containerStyle}
          textStyle={styles.divText}
          iconStart={IMAGES.ic_user}
          iconEndStyle={styles.end1}
        />

        <SettingsButton
          text={'Allow to Access'}
          onPress={toggleModal}
          containerStyle={styles.containerStyle}
          textStyle={styles.divText}
          iconStart={IMAGES.ic_unlock}
          iconEndStyle={styles.end1}
        />
        <SettingsButton
          text={'Autosave Photos to Album'}
          onPress={() => {}}
          containerStyle={styles.containerStyle}
          textStyle={styles.divText}
          iconStart={IMAGES.ic_bookmark}
          iconEndStyle={styles.end1}
        />

        <Text style={styles.textLabel}>Support</Text>
        <SettingsButton
          text={'Encourage Us'}
          onPress={toggleModal}
          containerStyle={styles.containerStyle}
          textStyle={styles.divText}
          iconStart={IMAGES.ic_robot}
          iconEndStyle={styles.end1}
        />
        <SettingsButton
          text={'Contact Us'}
          onPress={() => handleOnPress(ROUTES.CONTACT_US_SCREEN)}
          containerStyle={styles.containerStyle}
          textStyle={styles.divText}
          iconStart={IMAGES.ic_phone}
          iconEndStyle={styles.end1}
        />
        <SettingsButton
          text={'Help'}
          onPress={() => {}}
          containerStyle={styles.containerStyle}
          textStyle={styles.divText}
          iconStart={IMAGES.ic_question}
          iconEndStyle={styles.end1}
        />
        <SettingsButton
          text={'Suggestion'}
          onPress={() => handleOnPress(ROUTES.SUGGESTION_SCREEN)}
          containerStyle={styles.containerStyle}
          textStyle={styles.divText}
          iconStart={IMAGES.ic_bulb}
          iconEndStyle={styles.end1}
        />
        <SettingsButton
          text={'Suggest Plant to Be Added'}
          onPress={() => handleOnPress(ROUTES.PLANT_SUGGESTION_SCREEN)}
          containerStyle={styles.containerStyle}
          textStyle={styles.divText}
          iconStart={IMAGES.ic_check_list}
          iconEndStyle={styles.end1}
        />
        <Text style={styles.textLabel}>Legal</Text>
        <SettingsButton
          text={'Privacy Policy'}
          onPress={togglePrivacy}
          containerStyle={styles.containerStyle}
          textStyle={styles.divText}
          iconStart={IMAGES.ic_profile}
          iconEndStyle={styles.end1}
        />
        <SettingsButton
          text={'Terms of Use'}
          onPress={() => handleOnPress(ROUTES.TERMS_SCREEN)}
          containerStyle={styles.containerStyle}
          textStyle={styles.divText}
          iconStart={IMAGES.ic_document}
          iconEndStyle={styles.end1}
        />
        <Text style={styles.textLabel}>About the App</Text>
        <SettingsButton
          text={'App Info'}
          onPress={() => setAppInfoVisible(true)}
          containerStyle={styles.containerStyle}
          textStyle={styles.divText}
          iconStart={IMAGES.ic_info}
          iconEndStyle={styles.end1}
        />
        <SettingsButton
          text={'Rate App'}
          onPress={toggleModal}
          containerStyle={styles.containerStyle}
          textStyle={styles.divText}
          iconStart={IMAGES.ic_star}
          iconEndStyle={styles.end1}
        />
        <SettingsButton
          text={'Tell Friends'}
          onPress={() => {}}
          containerStyle={styles.containerStyle}
          textStyle={styles.divText}
          iconStart={IMAGES.ic_share_desktop}
          iconEndStyle={styles.end1}
        />
        {/* <Button
          text={'BACK'}
          onPress={handleBack}
          containerStyle={styles.buttonLoginContainer}
          textStyle={styles.buttonLoginText}
        /> */}
      </Screen>
      <BottomNav routeName={route.name} navigation={navigation} />
    </React.Fragment>
  );
};

export default SettingsScreen;

const styles = StyleSheet.create({
  textLabel: {
    color: 'white',
    marginVertical: SIZE.x10,
    marginLeft: SIZE.x20,
    fontSize: SIZE.x16,
    fontWeight: 'bold',
    textShadowColor: '#313131',
    textShadowOffset: {width: 0, height: 1},
    textShadowRadius: 2,
    padding: SIZE.x2,
  },

  end1: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'flex-end',
  },
  end0: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
  },
  containerStyle: {
    alignItems: 'center',
    flexDirection: 'row',
    marginBottom: SIZE.x4,
    padding: SIZE.x8,
    backgroundColor: 'rgba(217,217,217,0.5)',
    borderRadius: SIZE.x24,
  },
  divText: {
    color: 'white',
    marginLeft: SIZE.x10,
    textShadowColor: '#313131',
    textShadowOffset: {width: 0, height: 1},
    textShadowRadius: 2,
    fontSize: SIZE.x12,
    padding: SIZE.x2,
  },
});
