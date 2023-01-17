import React, {useEffect} from 'react';
import {AuthContext} from '../context/AuthContext';
import BuyerShopScreen from './BuyerShopScreen/BuyerShopScreen';
import SellerShopScreen from './SellerShopScreen/SellerShopScreen';

export default () => {
  const {user, setReload} = React.useContext(AuthContext);
  useEffect(() => {
    if (!user) setReload(prev => !prev);
  }, []);
  if (!user) return <BuyerShopScreen />;
  if (user?.userType === 'seller') return <SellerShopScreen />;
  if (user?.userType === 'buyer') return <BuyerShopScreen />;
};
