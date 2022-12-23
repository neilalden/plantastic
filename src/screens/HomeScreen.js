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
const HomeScreen = ({navigation}) => {
  const route = useRoute();

  return (
    <React.Fragment>
      <Screen>
        <Header text="Home" canGoBack={false} />
        <SearchBar />

        <Text style={styles.textLabel}>Plant Collection</Text>

        <View style={styles.circleCards}>
          <View style={styles.imgContainer}>
            <Icon
              source={IMAGES.ic_app_round}
              style={styles.icon}
              size={SIZE.x60}
            />
          </View>
          <View style={styles.imgContainer}>
            <Icon
              source={IMAGES.ic_app_round}
              style={styles.icon}
              size={SIZE.x60}
            />
          </View>
          <View style={styles.imgContainer}>
            <Icon
              source={IMAGES.ic_app_round}
              style={styles.icon}
              size={SIZE.x60}
            />
          </View>
        </View>

        <Text style={styles.textLabel}>Useful Tips</Text>
        <View style={styles.div} />
        <Text style={styles.textLabel}>Houseplant Care</Text>
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
    marginTop: SIZE.x20,
    marginLeft: SIZE.x20,
  },
  circleCards: {
    flex: SIZE.x1,
    marginTop: SIZE.x20,
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginHorizontal: SIZE.x16,
  },
  icon: {},
  imgContainer: {
    borderRadius: SIZE.x50,
    backgroundColor: COLORS.DARKGREEN,
    padding: SIZE.x10,
  },
  div: {
    marginVertical: SIZE.x20,
    padding: SIZE.x40,
    borderWidth: SIZE.x1,
    borderColor: 'white',
    borderTopRightRadius: SIZE.x24,
  },
});
