import {StyleSheet, Text, View, Image} from 'react-native';
import React from 'react';
import Header from '../../components/Header';
import Screen from '../../components/Screen';
import BottomNav from '../../components/BottomNav';
import {useNavigation, useRoute} from '@react-navigation/native';
import PlantDictionaryCard from '../../components/PlantDictionaryCard';
import {Button} from '../../components/Buttons';
import {COLORS} from '../../common/utils/colors';
import {SIZE} from '../../common/utils/size';
import Icon from '../../components/Icon';
import {IMAGES} from '../../common/images';
import {TEXT_SHADOW} from '../../common/utils/styles';
import {AuthContext} from '../../context/AuthContext';
import {FONT_WEIGHT} from '../../common/utils/font';
import {fetchCollection} from '../../functions/authentication/fetchDocument';

const SellerShopScreen = () => {
  const route = useRoute();
  const navigation = useNavigation();
  const {user} = React.useContext(AuthContext);
  const [data, setData] = React.useState();
  React.useEffect(() => {
    (async () => {
      try {
        setData(await fetchCollection('Plants'));
      } catch (e) {
        alert(e);
      }
    })();
  }, []);
  return (
    <React.Fragment>
      <Screen>
        <Header
          text="Seller Shop"
          canGoBack={false}
          Button={
            <Icon
              source={IMAGES.ic_add_dark_green}
              size={SIZE.x20}
              containerStyle={styles.iconContainerStyle}
              onPress={() => console.log('first')}
            />
          }
        />

        <View style={styles.banner}>
          {user.image ? (
            <Image
              source={{uri: user.image}}
              style={{height: '100%', width: '100%'}}
            />
          ) : (
            <Text style={styles.uploadText}>UPLOAD BANNER</Text>
          )}
        </View>
        <Text style={styles.title}>{user.name}</Text>
        {data &&
          data?.map((item, index) => {
            return <PlantDictionaryCard key={index} item={item} />;
          })}
      </Screen>
      <BottomNav routeName={route.name} navigation={navigation} />
    </React.Fragment>
  );
};

export default SellerShopScreen;

const styles = StyleSheet.create({
  buttoContainer: {
    width: SIZE.x300,
    marginBottom: SIZE.x50,
    alignSelf: 'center',
  },
  buttoText: {
    color: COLORS.DARKGREEN,
  },
  iconContainerStyle: {
    backgroundColor: COLORS.WHITE,
    height: SIZE.x30,
    width: SIZE.x30,
    justifyContent: 'center',
    borderRadius: SIZE.x50,
  },
  banner: {
    marginTop: SIZE.x20,
    height: SIZE.x125,
    borderWidth: SIZE.x1,
    borderColor: COLORS.WHITE,
    borderTopRightRadius: SIZE.x24,
    overflow: 'hidden',
  },
  title: {
    ...TEXT_SHADOW,
    color: COLORS.WHITE,
    fontSize: SIZE.x24,
    borderWidth: SIZE.x1,
    borderColor: COLORS.WHITE,
    marginTop: -1,
    marginBottom: SIZE.x20,
    alignSelf: 'flex-start',
    padding: SIZE.x10,
  },
  uploadText: {
    ...TEXT_SHADOW,
    color: COLORS.WHITE,
    textAlign: 'center',
    marginTop: SIZE.p14,
    fontSize: SIZE.x16,
    fontWeight: '600',
  },
});
