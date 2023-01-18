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
  const {plants, notifications} = useContext(PlantsContext);
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
                {plants &&
                  plants.map((item, idx) => {
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
        <Text style={styles.textLabel}>
          Taking herbal medicine: tips and safety information
        </Text>
        <View style={styles.card}>
          <Text style={styles.textContent}>
            Buy or use herbal products from a qualified practitioner or
            reputable supplier.
            {'\n'}
          </Text>
          <Text style={styles.textContent}>
            Ask for products that are clearly labelled in English with your
            name, batch number, date, quantity, dosage, directions, safety
            information (if applicable) and your practitioner’s contact details.
            {'\n'}
          </Text>
          <Text style={styles.textContent}>
            Make sure you know how to prepare and take your herbs. Like
            conventional medicine, taking the correct dose at the right time is
            important for the herbal remedies to work safely.
            {'\n'}
          </Text>
        </View>
        <Text style={styles.textLabel}>Tips for Growing Herbs</Text>
        <View style={styles.card}>
          <Text style={styles.textContent}>
            ⦿ Provide at Least 6 Hours of Sun
            {'\n'}
          </Text>
          <Text style={styles.textContent}>
            ⦿ Plant in Well-Draining Soil
            {'\n'}
          </Text>
          <Text style={styles.textContent}>
            ⦿ Fertilize Lightly
            {'\n'}
          </Text>
          <Text style={styles.textContent}>
            ⦿ Plant Similar Herbs Together
            {'\n'}
          </Text>
          <Text style={styles.textContent}>
            ⦿ Separate Quick Spreading Herbs
            {'\n'}
          </Text>
          <Text style={styles.textContent}>
            ⦿ Plant Your Cool Season Herbs at the Right Time
            {'\n'}
          </Text>
        </View>
      </Screen>
      <BottomNav routeName={route.name} navigation={navigation} />
    </React.Fragment>
  );
};

export default HomeScreen;

const styles = StyleSheet.create({
  textLabel: {
    fontWeight: 'bold',
    color: COLORS.M2,
    marginVertical: SIZE.x20,
    fontSize: SIZE.x26,
  },

  card: {
    padding: SIZE.x10,
    marginBottom: SIZE.x20,
    borderRadius: 4,
    backgroundColor: 'white',
    elevation: 5,
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 1},
    shadowOpacity: 0.8,
    shadowRadius: 1,
  },
  textContent: {
    fontWeight: '700',
    fontSize: SIZE.x18,
    color: COLORS.BLACK,
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
