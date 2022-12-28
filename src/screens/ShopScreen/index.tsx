import React from 'react';
import {AuthContext} from '../../context/AuthContext';
import BuyerShopScreen from './BuyerShopScreen';
import SellerShopScreen from './SellerShopScreen';

export default () => {
  const {user} = React.useContext(AuthContext);
  if (!user) return null;
  if (user?.userType === 'seller') return <SellerShopScreen />;
  if (user?.userType === 'buyer') return <BuyerShopScreen />;
};
