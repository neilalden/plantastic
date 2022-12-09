/* eslint-disable prettier/prettier */
import {Image, StyleSheet, Text, View} from 'react-native';
import React from 'react';
import Screen from '../components/Screen';
import Button from '../components/Button';
import BottomNav from '../components/BottomNav';
import { useRoute } from '@react-navigation/native';
import { IMAGES } from '../common/images';
import Icon from '../components/Icon';
import { SIZE } from '../common/utils/size';


const SettingsScreen = ({navigation}) => {
  const route = useRoute();
  const handleBack = () => {
    navigation.goBack();
  };
  return (
    <>
      <Screen>
        <View style={styles.flex}>
          <View >
          <Image source={IMAGES.ic_star} style={styles.iconers} width={30} height={30} />
          <Image source={IMAGES.ic_share_desktop} style={styles.iconers} width={30} height={30} />
          <Image source={IMAGES.ic_phone} style={styles.iconers} width={30} height={30} />
          <Image source={IMAGES.ic_info} style={styles.iconers} width={30} height={30} />
          <Image source={IMAGES.ic_bookmark} style={styles.iconers} width={30} height={30} />
          <Image source={IMAGES.ic_document} style={styles.iconers} width={30} height={30} />
          <Image source={IMAGES.ic_check_list} style={styles.iconers} width={30} height={30} />
          <Image source={IMAGES.ic_question} style={styles.iconers} width={30} height={30} />
          <Image source={IMAGES.ic_robot} style={styles.iconers} width={30} height={30} />
          <Image source={IMAGES.ic_paint} style={styles.iconers} width={30} height={30} />
          <Image source={IMAGES.ic_unlock} style={styles.iconers} width={30} height={40} />
          <Image source={IMAGES.ic_browser} style={styles.iconers} width={30} height={30} />
          <Image source={IMAGES.ic_user} style={styles.iconers} width={30} height={30} />
          <Image source={IMAGES.ic_profile} style={styles.iconers} width={30} height={30} />
          </View>
        <View style={styles.margin}>
          <Image source={IMAGES.ic_proceed} style={styles.iconers} width={20} height={20} />
          <Image source={IMAGES.ic_proceed} style={styles.iconers} width={20} height={20} />
          <Image source={IMAGES.ic_proceed} style={styles.iconers} width={20} height={20} />
          <Image source={IMAGES.ic_proceed} style={styles.iconers} width={20} height={20} />
          <Image source={IMAGES.ic_proceed} style={styles.iconers} width={20} height={20} />
          <Image source={IMAGES.ic_proceed} style={styles.iconers} width={20} height={20} />
          <Image source={IMAGES.ic_proceed} style={styles.iconers} width={20} height={20} />
          <Image source={IMAGES.ic_proceed} style={styles.iconers} width={20} height={20} />
          <Image source={IMAGES.ic_proceed} style={styles.iconers} width={20} height={20} />
          <Image source={IMAGES.ic_proceed} style={styles.iconers} width={20} height={20} />
          <Image source={IMAGES.ic_proceed} style={styles.iconers} width={20} height={20} />
          <Image source={IMAGES.ic_proceed} style={styles.iconers} width={20} height={20} />
          <Image source={IMAGES.ic_proceed} style={styles.iconers} width={18} height={20} />
        </View>
        </View>

        <View style={styles.div}>
          <Text>Hello</Text>
          <Icon
                source={IMAGES.ic_paint}
                
                size={SIZE.x24}
            />
        </View>
      

        {/* <Button
          text={'BACK'}
          onPress={handleBack}
          containerStyle={styles.buttonLoginContainer}
          textStyle={styles.buttonLoginText}
        /> */}
      </Screen>
      <BottomNav routeName={route.name} navigation={navigation} />
    </>
  );
};

export default SettingsScreen;

const styles = StyleSheet.create({
  flex:{
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between'
  },
  margin:{
    top: 10
  },
  iconers:{
    marginTop: 10,
  },
  div :{
    marginVertical: 20,
    padding: 15,
    marginHorizontal: 20,
    borderColor: 'white',
    backgroundColor: 'rgba(217,217,217,0.5)',
    borderRadius: 25,
  },
});