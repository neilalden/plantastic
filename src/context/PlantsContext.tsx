import React, {useState, createContext, useEffect, useContext} from 'react';
import {
  fetchCollection,
  fetchSellers,
} from '../functions/database/fetchFromDatabase';
import {fetchImage} from '../functions/storage/fetchImage';
import {AuthContext} from './AuthContext';

export const PlantsContext = createContext<any>('Default Value');
const PlantsContextProvider = props => {
  const {user} = useContext(AuthContext);
  const [plants, setPlants] = useState<Array<any>>();
  const [plantsImage, setPlantsImage] = useState<Object>();
  const [sellers, setSellers] = useState<Array<any>>();
  const [sellersImage, setSellersImage] = useState<Object>();
  React.useEffect(() => {
    (async () => {
      try {
        if (user) {
          setPlants(await fetchCollection('Plants'));
          if (user.userType === 'buyer')
            setSellers(await fetchSellers('Users'));
        }
      } catch (e) {
        alert(e);
      }
    })();
  }, [user]);
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
          user.userType === 'buyer'
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
      value={{plants, sellers, plantsImage, sellersImage}}>
      {props.children}
    </PlantsContext.Provider>
  );
};

export default PlantsContextProvider;
