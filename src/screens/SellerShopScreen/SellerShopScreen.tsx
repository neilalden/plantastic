import {
  StyleSheet,
  Text,
  View,
  Image,
  ScrollView,
  TouchableOpacity,
} from 'react-native';
import React, { useState } from 'react';
import Header from '../../components/Header';
import Screen from '../../components/Screen';
import BottomNav from '../../components/BottomNav';
import { useNavigation, useRoute } from '@react-navigation/native';
import PlantDictionaryCard from '../../components/PlantDictionaryCard';
import { COLORS } from '../../common/utils/colors';
import { SIZE } from '../../common/utils/size';
import { ROUTES } from '../../common/routes';
import Icon from '../../components/Icon';
import { IMAGES } from '../../common/images';
import { TEXT_SHADOW } from '../../common/utils/styles';
import { AuthContext } from '../../context/AuthContext';
import { PlantsContext } from '../../context/PlantsContext';
import { setDatabaseDocument } from '../../functions/database/createFromDatabase';
import { updateDatabase } from '../../functions/database/updateDatabase';
import { ButtonOutline } from '../../components/Buttons';
import ModalTab from '../../components/ModalTab';

import { TextInput } from '../../components/TextInput';
import { STARS } from '../../common/ratings';
import { viewFile, selectImage, sendFile } from '../../screens/InsideChatScreen';

const SellerShopScreen = props => {
  const route = useRoute();
  const navigation = useNavigation();
  const [file, setFile] = useState();
  const { user, setReload } = React.useContext(AuthContext);
  const { plants, sellersImage, reviews, reviewers, setReviews } =
    React.useContext(PlantsContext);
  const params = props?.route?.params;

  const [review, setReview] = React.useState('');
  const [rate, setRate] = React.useState('');
  const [fileRecieved, setRecievedFile] = useState(undefined);
  const [modalVisible, setModalVisible] = useState(false);
  const handleToggleModal = async uri => {
    if (uri) {
      const str = await viewFile(uri);
      setRecievedFile(str);
      setModalVisible(prev => !prev);
    }
  };

  const handleSubmit = async () => {
    if (user?.userType !== 'buyer') return;
    let isBuyer = false;
    let hasReviewed = false;
    params?.buyers &&
      params?.buyers.map(buyer => {
        if (buyer === user?.uid) isBuyer = true;
      });
    reviews?.map(rev => {
      console.log(rev)

      if (rev.sellerID === params?.uid && rev.userID === user?.uid) hasReviewed = true;
    });
    if (hasReviewed) {
      alert("You've already given a review");
      return;
    }
    if (!isBuyer) {
      alert('Only user that have bought in this shop can rate it');
      return;
    }
    const numRate = Number(rate);
    if (typeof numRate === 'number') {
      if (numRate > 0 && numRate <= 5) {
        const currentRate = params?.rate ?? 0;
        let currentRateBy = params?.rateBy ?? 0;
        currentRateBy += 1;
        const updateData = {
          rate: Math.round((currentRate + numRate) / currentRateBy),
          rateBy: currentRateBy,
        };
        updateDatabase('Users', updateData, params?.uid)
          .then(res => {
            alert(res);
            const reviewData = {
              sellerID: params?.uid,
              rate: numRate,
              review: review,
              userID: user.uid,
            };
            if (file) {
              sendFile(file).then(() => {
                // @ts-ignore
                reviewData.file = file?.fileName;
                setDatabaseDocument('Reviews', reviewData)
                  .then(() => {
                    setReview('');
                    setRate(undefined);
                    setFile(undefined);
                    // setReload(prev => !prev);
                    setReviews([reviewData, ...reviews]);
                  })
                  .catch(e => {
                    console.error(e);
                  });
              });
            } else {
              setDatabaseDocument('Reviews', reviewData)
                .then(() => {
                  setReview('');
                  setRate(undefined);
                  setFile(undefined);
                  // setReload(prev => !prev);
                  setReviews([reviewData, ...reviews]);
                })
                .catch(e => {
                  console.error(e);
                });
            }
          })
          .catch(e => console.error(e));
      } else {
        alert('rating has to be between 1-5');
      }
    } else {
      alert('rating is not valid');
    }
  };
  return (
    <React.Fragment>
      <Screen>
        <Header
          text="Seller Shop"
          canGoBack={false}
          Button={
            user &&
            user.userType === 'seller' && (
              <Icon
                source={IMAGES.ic_note_dark_green}
                size={SIZE.x20}
                containerStyle={styles.iconContainerStyle}
                onPress={() =>
                  // @ts-ignore
                  navigation.navigate(ROUTES.UPDATE_PASSWORD_SCREEN)
                }
              />
            )
          }
        />

        <ModalTab
          modalVisible={modalVisible}
          setModalVisible={setModalVisible}
          uri={fileRecieved}
        />

        <View style={styles.banner}>
          {params || user.image ? (
            <Image
              source={
                params && sellersImage
                  ? sellersImage[params?.uid]
                    ? { uri: sellersImage[params?.uid] }
                    : IMAGES.ic_herbshop
                  : user?.image
                    ? {
                      uri: user?.image,
                    }
                    : IMAGES.ic_herbshop
              }
              style={{ height: '100%', width: '100%' }}
            />
          ) : (
            <Text style={styles.uploadText}>No Image</Text>
          )}
        </View>

        <View
          style={[
            styles.row,
            {
              backgroundColor: COLORS.DARKGREEN,
              height: 50,
            },
          ]}>
          <Text style={styles.title}>{params ? params?.name : user.name}</Text>
          {params?.rate ? (
            <View
              style={[
                styles.row,
                {
                  marginTop: 10,
                  marginBottom: 20,
                  alignItems: 'center',
                  width: '100%',
                },
              ]}>
              {STARS.map((_, i) => {
                if (i < params.rate) {
                  return (
                    <Icon size={SIZE.x20} source={IMAGES.ic_star} key={i} />
                  );
                }
                return null;
              })}
            </View>
          ) : null}
        </View>
        <Text style={styles.availablePlantsText}>Available plants</Text>
        {params
          ? params?.plants &&
          params?.plants?.map((item, index) => {
            return (
              plants &&
              plants.map(plant => {
                if (item.id === plant.id || item === plant.id) {
                  return <PlantDictionaryCard key={index} item={plant} />;
                }
              })
            );
          })
          : user.plants &&
          user.plants?.map((item, index) => {
            return (
              plants &&
              plants.map(plant => {
                if (item.id === plant.id || item === plant.id) {
                  return (
                    <PlantDictionaryCard key={index} item={plant} canRemove />
                  );
                }
              })
            );
          })}

        {user?.userType !== 'seller' ? (
          <View style={styles.writeReviewCard}>
            <Text style={styles.writeReviewCardTitle}>WRITE REVIEW</Text>
            <TextInput
              value={review}
              onChangeText={text => setReview(text)}
              label="Review"
              tintColor={'white'}
              baseColor={'white'}
              textColor={'white'}
            />
            <TextInput
              value={rate}
              onChangeText={text => setRate(text)}
              tintColor={'white'}
              baseColor={'white'}
              textColor={'white'}
              label="Rate from 1-5"
              keyboardType="number-pad"
            />
            <View style={{ paddingHorizontal: 10 }} />
            <View style={[styles.row, { marginHorizontal: 20 }]}>
              <TouchableOpacity
                onPress={() => selectImage(setFile)}
                style={{
                  width: SIZE.p16,
                  backgroundColor: COLORS.WHITE,
                  justifyContent: 'center',
                  alignItems: 'center',

                  paddingHorizontal: 8,
                  borderRadius: 8,
                }}>
                <Text
                  style={[
                    styles.textSecondaryTitle,
                    {
                      color: COLORS.DARKGREEN,
                    },
                  ]}>
                  File
                </Text>
              </TouchableOpacity>
              <Text style={[styles.textSecondaryTitle, { marginLeft: 12 }]}>
                {/* @ts-ignore */}
                {String(file?.fileName ?? 'Select Image')}
              </Text>
            </View>
            <ButtonOutline
              text={'SUBMIT'}
              containerStyle={styles.writeReviewButtonContainer}
              textStyle={styles.writeReviewButtonText}
              onPress={handleSubmit}
            />
          </View>
        ) : null}

        {reviews && reviews.length > 0 ? (
          <React.Fragment>
            <Text style={[styles.cardTitle, { margin: SIZE.x10 }]}>REVIEWS</Text>
            <ScrollView>
              {reviews.map((review, index) => {
                if (review.sellerID !== params?.uid) return;
                let reviewer;
                reviewers.map(_ => {
                  if (_.uid === review.userID) reviewer = _;
                });
                return (
                  <ScrollView key={index} style={styles.reviewCard}>
                    <TouchableOpacity
                      onPress={() => handleToggleModal(review?.file)}
                      activeOpacity={review?.file ? 0 : 1}
                      style={styles.ratingContainer}>
                      <Text
                        style={[styles.availablePlantsText, { color: 'white' }]}>
                        {reviewer?.name}
                      </Text>
                      <View style={styles.row}>
                        {STARS.map((_, i) => {
                          if (i < review.rate) {
                            return (
                              <Icon
                                size={SIZE.x20}
                                source={IMAGES.ic_star}
                                key={i}
                              />
                            );
                          }
                          return null;
                        })}
                      </View>

                      {review.file ? (
                        <Text style={styles.textSecondaryTitle}>
                          {review.file}
                        </Text>
                      ) : null}
                      <Text style={styles.textSecondaryTitle}>
                        {review.review}
                      </Text>
                    </TouchableOpacity>
                  </ScrollView>
                );
              })}
            </ScrollView>
          </React.Fragment>
        ) : null}
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
    height: SIZE.x34,
    width: SIZE.x34,
    borderRadius: SIZE.x50,
    justifyContent: 'center',
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
    color: COLORS.WHITE,
    fontSize: SIZE.x20,
    marginTop: -6,
    marginBottom: SIZE.x20,
    alignSelf: 'flex-start',
    padding: SIZE.x10,
    paddingBottom: 0,
    fontWeight: '900',
  },
  uploadText: {
    color: COLORS.BLACK,
    textAlign: 'center',
    marginTop: SIZE.p14,
    fontSize: SIZE.x16,
    fontWeight: '600',
  },
  availablePlantsText: {
    color: COLORS.BLACK,

    fontSize: SIZE.x20,
    marginBottom: SIZE.x14,
    fontWeight: '900',
  },
  reviewCard: {
    width: SIZE.p96,
    margin: SIZE.x10,
    padding: SIZE.x10,
    backgroundColor: COLORS.DARKGREEN,
    alignSelf: 'center',
    elevation: 5,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.8,
    shadowRadius: 1,
    maxHeight: SIZE.x200,
    minHeight: SIZE.x50,
  },
  textSecondaryTitle: {
    fontWeight: '600',
    color: COLORS.WHITE,
    fontSize: SIZE.x14,
  },
  writeReviewCard: {
    width: SIZE.p96,
    margin: SIZE.x10,
    padding: SIZE.x10,
    backgroundColor: COLORS.DARKGREEN,
    alignSelf: 'center',
    elevation: 5,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.8,
    shadowRadius: 1,
    height: SIZE.x400,
  },
  writeReviewCardTitle: {
    fontSize: SIZE.x22,
    fontWeight: '600',
    color: COLORS.BLACK,
    textAlign: 'center',
  },
  writeReviewButtonContainer: {
    borderColor: COLORS.GREEN200,
    marginVertical: SIZE.x20,
  },
  writeReviewButtonText: {
    color: COLORS.GREEN200,
  },
  cardTitle: {
    fontSize: SIZE.x22,
    fontWeight: '600',
    color: COLORS.BLACK,
  },
  ratingContainer: {
    marginTop: SIZE.x4,
  },
  row: {
    flexDirection: 'row',
  },
});
