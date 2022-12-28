import firestore from '@react-native-firebase/firestore';
import {UserDataType} from '../../common/utils/type';

export const fetchDocument = async (
  id,
  collection,
): Promise<undefined | UserDataType> => {
  try {
    const res = await firestore().collection(collection).doc(id).get();
    const resData = res.data();
    if (resData !== undefined) {
      const userData: UserDataType = {
        createdAt: new Date(resData.createdAt),
        email: resData.email,
        uid: resData.uid,
        userType: resData.userType,
        name: resData.name,
        image: resData.image,
      };
      return userData;
    } else {
      return undefined;
    }
  } catch (error) {
    alert(error.message);
  }
};

export const fetchCollection = async collection => {
  try {
    const res = await firestore().collection(collection).get();
    const array = [];
    res.forEach(snapShot => array.push(snapShot.data()));
    return array;
  } catch (error) {
    alert(error.message);
  }
};
