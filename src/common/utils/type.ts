import {StackNavigationProp} from '@react-navigation/stack';
export type RootStackParamList = {
  [key: string]: undefined;
};

export type userType = 'buyer' | 'seller';
export type UserDataType = {
  createdAt: Date;
  email: string;
  uid: string;
  userType: userType;
  name: string;
  [key: string]: any;
};
export type NavigationType = StackNavigationProp<RootStackParamList>;
