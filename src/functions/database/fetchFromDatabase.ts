import firestore from '@react-native-firebase/firestore';
import {UserDataType} from '../../common/utils/type';

export const fetchUser = async (
  id,
  collection,
): Promise<undefined | UserDataType> => {
  try {
    const res = await firestore().collection(collection).doc(id).get();
    const resData = res.data();
    if (resData !== undefined) {
      const userData: UserDataType = {
        createdAt: resData.createdAt.toDate(),
        email: resData.email,
        uid: resData.uid,
        userType: resData.userType,
        name: resData.name,
        image: resData.image,
        plants: resData?.plants ?? [],
        cart: resData?.cart ?? [],
        contactNumber: resData.contactNumber,
        socialMedia: resData.socialMedia,
        address: resData.address,
        recentlyViewed: resData.recentlyViewed ?? [],
      };
      return userData;
    } else {
      return undefined;
    }
  } catch (error) {
    console.error(error.message);
  }
};

export const fetchCollection = async collection => {
  try {
    const res = await firestore().collection(collection).get();
    const array: any = [];
    res.forEach(snapShot =>
      array.push({...snapShot.data(), snapShotID: snapShot.id}),
    );
    return array;
  } catch (error) {
    console.error(error.message);
  }
};

export const fetchSellers = async collection => {
  try {
    const res = await firestore()
      .collection(collection)
      .where('userType', '==', 'seller')
      .get();
    const array: any = [];
    res.forEach(snapShot => array.push(snapShot.data()));
    return array;
  } catch (e) {
    console.error(e.message);
  }
};
