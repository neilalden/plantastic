import React, {useState, createContext, useEffect, useContext} from 'react';
import {
  fetchCollection,
  fetchSellers,
} from '../functions/database/fetchFromDatabase';
import {fetchImage} from '../functions/storage/fetchImage';
import {AuthContext} from './AuthContext';
import firestore from '@react-native-firebase/firestore';

export const PlantsContext = createContext<any>('Default Value');
const PlantsContextProvider = props => {
  const {user} = useContext(AuthContext);
  const [plants, setPlants] = useState<Array<any>>([]);
  const [plantsImage, setPlantsImage] = useState<Object>();
  const [sellers, setSellers] = useState<Array<any>>();
  const [sellersImage, setSellersImage] = useState<Object>();
  const [notifications, setNotifications] = useState<Array<any>>();
  const [messages, setMessages] = useState<Array<any>>([]);

  // function onResult(QuerySnapshot) {
  //   const array = [];
  //   QuerySnapshot.forEach(item => {
  //     console.log(item.data());
  //     array.push(item.data());
  //   });
  //   setMessages(array);
  // }

  // function onError(error) {
  //   console.error(error);
  // }
  // if (user) {
  //   firestore()
  //     .collection('Messages')
  //     .where(
  //       user?.userType == 'buyer' ? 'buyerID' : 'sellerID',
  //       '==',
  //       user?.uid,
  //     )
  //     .orderBy('lastUpated', 'desc')
  //     .onSnapshot(onResult, onError);
  // }
  React.useEffect(() => {
    (async () => {
      try {
        setPlants(await fetchCollection('Plants'));
        setNotifications(await fetchCollection('Notifications'));
        const msgs = await fetchCollection('Messages');
        setMessages(msgs);
        if (!user || user?.userType === 'buyer')
          setSellers(await fetchSellers('Users'));
      } catch (e) {
        alert(e);
      }
    })();
  }, [user]);
  console.log('messages', messages);
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
      }}>
      {props.children}
    </PlantsContext.Provider>
  );
};

export default PlantsContextProvider;
