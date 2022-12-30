/* eslint-disable prettier/prettier */
import {Image, StyleSheet, Text, View, TextInput} from 'react-native';
import React from 'react';
import Screen from '../components/Screen';
import {Button} from '../components/Buttons';
import {ScrollView} from 'react-native-gesture-handler';
import {IMAGES} from '../common/images';
import BottomNav from '../components/BottomNav';
import {useRoute} from '@react-navigation/native';
import {COLORS} from '../common/utils/colors';
import Header from '../components/Header';
import {SIZE} from '../common/utils/size';
import Icon from '../components/Icon';
import SearchBar from '../components/SearchBar';
import {TEXT_SHADOW} from '../common/utils/styles';
const HomeScreen = ({navigation}) => {
  const route = useRoute();

  return (
    <React.Fragment>
      <Screen>
        <Header text="Home" canGoBack={false} />
        <Text style={styles.textLabel}>Recommendations</Text>
        <View style={styles.circleCards}>
          <Icon
            source={IMAGES.ic_app_round}
            containerStyle={styles.icon}
            size={SIZE.x100}
          />
          <Icon
            source={IMAGES.ic_app_round}
            containerStyle={styles.icon}
            size={SIZE.x100}
          />
          <Icon
            source={IMAGES.ic_app_round}
            containerStyle={styles.icon}
            size={SIZE.x100}
          />
        </View>

        <Text style={styles.textLabel}>Useful Tips</Text>
        <View style={styles.div} />
        <Text style={styles.textLabel}>Trends</Text>
        <View style={styles.div} />
      </Screen>
      <BottomNav routeName={route.name} navigation={navigation} />
    </React.Fragment>
  );
};

export default HomeScreen;

const styles = StyleSheet.create({
  textLabel: {
    fontWeight: 'bold',
    color: COLORS.WHITE,
    ...TEXT_SHADOW,
    marginTop: SIZE.x20,
    fontSize: SIZE.x26,
  },
  circleCards: {
    flex: SIZE.x1,
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginTop: SIZE.x10,
  },
  icon: {
    borderRadius: SIZE.x50,
    backgroundColor: COLORS.DARKGREEN,
  },
  div: {
    padding: SIZE.x40,
    borderWidth: SIZE.x1,
    borderColor: 'white',
    borderTopRightRadius: SIZE.x24,
  },
});
