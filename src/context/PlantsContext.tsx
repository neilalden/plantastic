import React, {
  useState,
  createContext,
  useEffect,
  useContext,
  useRef,
} from 'react';
import {
  fetchCollection,
  fetchSellers,
  fetchUser,
} from '../functions/database/fetchFromDatabase';
import {fetchImage} from '../functions/storage/fetchImage';
import {AuthContext} from './AuthContext';
import firestore from '@react-native-firebase/firestore';
import PushNotification from 'react-native-push-notification';

import {IMAGES} from '../common/images';
import {updateDatabase} from '../functions/database/updateDatabase';
import {clockRunning} from 'react-native-reanimated';

export const PlantsContext = createContext<any>('Default Value');
const PlantsContextProvider = props => {
  const {user} = useContext(AuthContext);
  const [plants, setPlants] = useState<Array<any>>([]);
  const [plantsImage, setPlantsImage] = useState<Object>();
  const [sellers, setSellers] = useState<Array<any>>();
  const [sellersImage, setSellersImage] = useState<Object>();
  const [notifications, setNotifications] = useState<Array<any>>([]);
  const [messages, setMessages] = useState<Array<any>>([]);
  const [reviews, setReviews] = useState([]);
  const [reviewers, setReviewers] = useState([]);
  const prevMessages = useRef<Array<any>>();

  const arraysEqual = (a1, a2) =>
    a1?.length === a2?.length && a1.every((o, idx) => objectsEqual(o, a2[idx]));

  function onResult(QuerySnapshot) {
    const array = [];
    QuerySnapshot.forEach(item => {
      array.push({...item.data(), id: item.id});
    });
    const equal = arraysEqual(prevMessages?.current, array);
    if (equal) return;
    if (user) {
      prevMessages.current = array;
      setMessages(array);
    }
  }
  useEffect(() => {
    for (const message of messages) {
      if (
        (user.userType === 'buyer' && message.buyerID !== user.uid) ||
        (user.userType === 'seller' && message.sellerID !== user.uid)
      ) {
        return;
      }
      if (
        // true ||
        // message.lastMessage?.read === undefined ||
        message.lastMessage.fromID !== user.uid &&
        message.lastMessage?.read === false
      ) {
        console.log(message);

        PushNotification.localNotification({
          message: message.lastMessage.message,
          title: message.lastMessage.fromName,
          bigPictureUrl: IMAGES.ic_add_dark_green,
          smallIcon: IMAGES.ic_herbshop,
        });
      }
    }
  }, []);

  function onError(error) {
    console.error(error);
  }
  useEffect(() => {
    if (user) {
      firestore()
        .collection('Messages')
        .where(
          user?.userType === 'buyer' ? 'buyerID' : 'sellerID',
          '==',
          user?.uid,
        )
        .orderBy('lastUpdated', 'desc')
        .onSnapshot(onResult, onError);
    }
  });
  React.useEffect(() => {
    (async () => {
      try {
        setPlants(await fetchCollection('Plants'));
        if (user) setNotifications(await fetchCollection('Notifications'));
        const reviewsRes = await fetchCollection('Reviews');
        if (Array.isArray(reviewsRes)) {
          setReviews(reviewsRes);
        }
        if (!user || user?.userType === 'buyer')
          setSellers(await fetchSellers('Users'));
      } catch (e) {
        alert(e);
      }
    })();
  }, [user]);

  useEffect(() => {
    (async () => {
      if (reviews?.length === 0) return;
      try {
        const arr: any = [];
        for (const review of reviews) {
          arr.push(await fetchUser(review.userID));
        }
        setReviewers(arr);
      } catch (e) {
        console.error(e);
      }
    })();
  }, [reviews]);
  React.useEffect(() => {
    if (!user) return;
    for (const notif of notifications) {
      if (notif.toID === user.uid) {
        if (notif.read === true) {
          // do nothing
        } else {
          PushNotification.localNotification({
            message: notif.message,
            title: notif.from,
            bigPictureUrl: IMAGES.ic_add_dark_green,
            smallIcon: IMAGES.ic_herbshop,
          });
          updateDatabase('Notifications', {read: true}, notif.snapShotID);
        }
      }
    }
  }, [notifications]);
  React.useEffect(() => {
    (async () => {
      try {
        if (plants && plants.length > 0 && !plantsImage) {
          const images: Object = {};
          for (const plant of plants) {
            if (plant.image)
              images[`${String(plant.id)}`] = await fetchImage(plant.image);
          }
          setPlantsImage(images);
        }
        if (
          sellers &&
          sellers.length > 0 &&
          !sellersImage &&
          (!user || user?.userType === 'buyer')
        ) {
          const images: Object = {};
          for (const seller of sellers) {
            if (seller.image)
              images[`${String(seller.uid)}`] = await fetchImage(seller.image);
          }
          setSellersImage(images);
        }
      } catch (e) {
        alert(e);
      }
    })();
  }, [plants, sellers]);
  return (
    <PlantsContext.Provider
      value={{
        plants,
        sellers,
        plantsImage,
        sellersImage,
        notifications,
        setNotifications,
        messages,
        setMessages,
        reviews,
        setReviews,
        reviewers,
        setReviewers,
      }}>
      {props.children}
    </PlantsContext.Provider>
  );
};

export default PlantsContextProvider;

const objectsEqual = (o1, o2) =>
  typeof o1 === 'object' && Object.keys(o1).length > 0
    ? Object.keys(o1).length === Object.keys(o2).length &&
      Object.keys(o1).every(p => objectsEqual(o1[p], o2[p]))
    : o1 === o2;
