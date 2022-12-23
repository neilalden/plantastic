import React, {useState, createContext, useEffect} from 'react';
import {Alert} from 'react-native';
import auth from '@react-native-firebase/auth';
import {useNavigation} from '@react-navigation/native';
import {ROUTES} from '../common/routes';

export const AuthContext = createContext();

const AuthContextProvider = props => {
  const navigation = useNavigation();
  const [user, setUser] = useState();
  const [reload, setReload] = useState(false);

  useEffect(() => {
    const subscriber = auth().onAuthStateChanged(onAuthStateChanged);
    return subscriber;
  }, [reload]);

  const onAuthStateChanged = user => {
    console.log(user);
    if (user) {
      setUser(user);
      navigation.navigate(ROUTES.HOME_SCREEN);
    } else {
      setUser(null);
      navigation.navigate(ROUTES.LANDING_SCREEN);
    }
  };

  return (
    <AuthContext.Provider value={{user, setUser, setReload}}>
      {props.children}
    </AuthContext.Provider>
  );
};

export default AuthContextProvider;
