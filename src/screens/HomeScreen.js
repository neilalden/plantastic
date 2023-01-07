/* eslint-disable prettier/prettier */
import {Image, StyleSheet, Text, View, TextInput} from 'react-native';
import React, {useContext, useEffect, useState} from 'react';
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
import {AuthContext} from '../context/AuthContext';
import {PlantsContext} from '../context/PlantsContext';
import PlantDictionaryCard from '../components/PlantDictionaryCard';
import {
  CLUSTERS,
  cluster0,
  cluster1,
  cluster2,
  cluster3,
  cluster4,
} from '../common/constants/CLUSTERS';
const HomeScreen = ({navigation}) => {
  const route = useRoute();
  const {user} = useContext(AuthContext);
  const {plants} = useContext(PlantsContext);
  const [userPlants, setUserPlants] = useState([]);
  useEffect(() => {
    if (!user?.plants || !plants) return;
    const arr = [];
    for (const _ of user.plants) {
      for (const plant of plants) {
        if (_ === plant.id) arr.push(plant);
      }
    }
    setUserPlants(arr);
  }, [user, plants]);
  return (
    <React.Fragment>
      <Screen>
        <Header text="Recommendations" canGoBack={false} />
        {!user?.plants ? (
          <Text style={styles.textLabel}>
            Add plants to get recommendations
          </Text>
        ) : null}
        {userPlants.map((plant, index) => {
          const cluster = CLUSTERS[plant.common_name];
          return (
            <View key={index}>
              <Text style={styles.textLabel}>
                Similar plants to{' '}
                <Text style={{textDecorationLine: 'underline'}}>
                  {plant.common_name}
                </Text>
              </Text>
              <ScrollView>
                {plants.map((item, idx) => {
                  if (plant.common_name === item.common_name) return;
                  if (cluster === 0) {
                    return cluster0.map((p, i) => {
                      if (p === item.common_name)
                        return <PlantDictionaryCard key={i} item={item} />;
                    });
                  } else if (cluster === 1) {
                    return cluster1.map((p, i) => {
                      if (p === item.common_name)
                        return <PlantDictionaryCard key={i} item={item} />;
                    });
                  } else if (cluster === 2) {
                    return cluster2.map((p, i) => {
                      if (p === item.common_name)
                        return <PlantDictionaryCard key={i} item={item} />;
                    });
                  } else if (cluster === 3) {
                    return cluster3.map((p, i) => {
                      if (p === item.common_name)
                        return <PlantDictionaryCard key={i} item={item} />;
                    });
                  } else if (cluster === 4) {
                    return cluster4.map((p, i) => {
                      if (p === item.common_name)
                        return <PlantDictionaryCard key={i} item={item} />;
                    });
                  }
                })}
              </ScrollView>
            </View>
          );
        })}
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
    marginVertical: SIZE.x20,
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
    paddingHorizontal: SIZE.x40,
    borderWidth: SIZE.x1,
    borderColor: 'white',
    borderTopRightRadius: SIZE.x24,
  },
});
