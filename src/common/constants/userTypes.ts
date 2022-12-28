import {userType} from '../utils/type';

export const userTypes: Array<{
  label: 'Buyer' | 'Seller';
  value: userType;
}> = [
  {
    label: 'Buyer',
    value: 'buyer',
  },
  {
    label: 'Seller',
    value: 'seller',
  },
];
