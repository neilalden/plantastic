/* eslint-disable prettier/prettier */
import {Image, StyleSheet, Text, View} from 'react-native';
import React from 'react';
import Screen from '../../components/Screen';
import {Button} from '../../components/Buttons';
import BottomNav from '../../components/BottomNav';
import {useRoute} from '@react-navigation/native';
import {IMAGES} from '../../common/images';
import Header from '../../components/Header';
import Icon from '../../components/Icon';
import {SIZE} from '../../common/utils/size';
import NotificationScreen from './NotificationScreen';
import {ROUTES} from '../../common/routes';

const SettingsScreen = ({navigation}) => {
  const route = useRoute();
  const handleBack = () => {
    navigation.goBack();
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
        <Text style={styles.textLabel}>General Settings</Text>

        <View style={styles.div}>
            <View style={styles.start}>
                <Icon
                    source={IMAGES.ic_browser}
                    size={SIZE.x18}
                />
            </View>
            <Text style={styles.divText}>Set Language</Text>
            <View style={styles.end}>
              <Icon
                  source={IMAGES.ic_proceed}
                  size={SIZE.x18}
              />
            </View>
        </View>

        <View style={styles.div}>
            <View style={styles.start}>
                <Icon
                    source={IMAGES.ic_unlock}
                    size={SIZE.x18}
                />
            </View>
            <Text style={styles.divText}>Allow to Access</Text>
            <View style={styles.end}>
              <Icon
                  source={IMAGES.ic_proceed}
                  size={SIZE.x18}
              />
            </View>
        </View>

        <View style={styles.div}>
            <View style={styles.start}>
                <Icon
                    source={IMAGES.ic_bookmark}
                    size={SIZE.x18}
                />
            </View>
            <Text style={styles.divText}>Autosave Photos to Album</Text>
            <View style={styles.end}>
              <Icon
                  source={IMAGES.ic_proceed}
                  size={SIZE.x18}
              />
            </View>
        </View>

        <View style={styles.div}>
            <View style={styles.start}>
                <Icon
                    source={IMAGES.ic_paint}
                    size={SIZE.x18}
                />
            </View>
            <Text style={styles.divText}>Clear Cache</Text>
            <View style={styles.end}>
              <Icon
                  source={IMAGES.ic_proceed}
                  size={SIZE.x18}
              />
            </View>
        </View>

        <Text style={styles.textLabel}>Support</Text>

        <View style={styles.div}>
            <View style={styles.start}>
                <Icon
                    source={IMAGES.ic_robot}
                    size={SIZE.x18}
                />
            </View>
            <Text style={styles.divText}>Encourage Us</Text>
            <View style={styles.end}>
              <Icon
                  source={IMAGES.ic_proceed}
                  size={SIZE.x18}
              />
            </View>
        </View>

        <View style={styles.div}>
            <View style={styles.start}>
                <Icon
                    source={IMAGES.ic_phone}
                    size={SIZE.x18}
                />
            </View>
            <Text style={styles.divText}>Contact Us</Text>
            <View style={styles.end}>
              <Icon
                  source={IMAGES.ic_proceed}
                  size={SIZE.x18}
              />
            </View>
        </View>

        <View style={styles.div}>
            <View style={styles.start}>
                <Icon
                    source={IMAGES.ic_question}
                    size={SIZE.x18}
                />
            </View>
            <Text style={styles.divText}>Help</Text>
            <View style={styles.end}>
              <Icon
                  source={IMAGES.ic_proceed}
                  size={SIZE.x18}
              />
            </View>
        </View>

        <View style={styles.div}>
            <View style={styles.start}>
                <Icon
                    source={IMAGES.ic_bulb}
                    size={SIZE.x18}
                />
            </View>
            <Text style={styles.divText}>Suggestion</Text>
            <View style={styles.end}>
              <Icon
                  source={IMAGES.ic_proceed}
                  size={SIZE.x18}
              />
            </View>
        </View>

        <View style={styles.div}>
            <View style={styles.start}>
                <Icon
                    source={IMAGES.ic_check_list}
                    size={SIZE.x18}
                />
            </View>
            <Text style={styles.divText}>Suggest Plant to Be Added</Text>
            <View style={styles.end}>
              <Icon
                  source={IMAGES.ic_proceed}
                  size={SIZE.x18}
              />
            </View>
        </View>
        <Text style={styles.textLabel}>Legal</Text>

        <View style={styles.div}>
            <View style={styles.start}>
                <Icon
                    source={IMAGES.ic_profile}
                    size={SIZE.x18}
                />
            </View>
            <Text style={styles.divText}>Privacy Policy</Text>
            <View style={styles.end}>
              <Icon
                  source={IMAGES.ic_proceed}
                  size={SIZE.x18}
              />
            </View>
        </View>

        <View style={styles.div}>
            <View style={styles.start}>
                <Icon
                    source={IMAGES.ic_document}
                    size={SIZE.x18}
                />
            </View>
            <Text style={styles.divText}>Terms of Use</Text>
            <View style={styles.end}>
              <Icon
                  source={IMAGES.ic_proceed}
                  size={SIZE.x18}
              />
            </View>
        </View>

        <Text style={styles.textLabel}>About the App</Text>

        <View style={styles.div}>
            <View style={styles.start}>
                <Icon
                    source={IMAGES.ic_info}
                    size={SIZE.x18}
                />
            </View>
            <Text style={styles.divText}>App Info</Text>
            <View style={styles.end}>
              <Icon
                  source={IMAGES.ic_proceed}
                  size={SIZE.x18}
              />
            </View>
        </View>

        <View style={styles.div}>
            <View style={styles.start}>
                <Icon
                    source={IMAGES.ic_star}
                    size={SIZE.x18}
                />
            </View>
            <Text style={styles.divText}>Rate App</Text>
            <View style={styles.end}>
              <Icon
                  source={IMAGES.ic_proceed}
                  size={SIZE.x18}
              />
            </View>
        </View>

        <View style={styles.div}>
            <View style={styles.start}>
                <Icon
                    source={IMAGES.ic_share_desktop}
                    size={SIZE.x18}
                />
            </View>
            <View>
            <Text style={styles.divText}>Tell Friends</Text>
            </View>
            <View style={styles.end}>
              <Icon
                  source={IMAGES.ic_proceed}
                  size={SIZE.x18}
              />
            </View>
        </View>

        

       

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
    
    marginVertical: 10,
    marginLeft: 20,
  },
  start:{
    
    
  },
  end:{
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'flex-end',
    
  },
  div: {
    alignItems:'center',
    flexDirection: 'row',
    marginBottom: SIZE.x4,
    padding: SIZE.x8,
    marginHorizontal: 20,
    borderColor: 'white',
    backgroundColor: 'rgba(217,217,217,0.5)',
    borderRadius: 25,
  },
  divText:{
    marginLeft: SIZE.x10,
  }
});
