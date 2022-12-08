import {StyleSheet} from 'react-native';
import React from 'react';
import Screen from '../components/Screen';
import Button from '../components/Button';
import {ScrollView} from 'react-native-gesture-handler';
import BottomNav from '../components/BottomNav';
import {useRoute} from '@react-navigation/native';
const HomeScreen = ({navigation}) => {
  const route = useRoute();
  const handleBack = () => {
    navigation.goBack();
  };
  return (
    <React.Fragment>
      <Screen>
        <Button
          text={'BACK'}
          onPress={handleBack}
          containerStyle={styles.buttonLoginContainer}
          textStyle={styles.buttonLoginText}
        />
      </Screen>
      <BottomNav routeName={route.name} navigation={navigation} />
    </React.Fragment>
  );
};

export default HomeScreen;

const styles = StyleSheet.create({});
