import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import * as React from 'react';
import {ROUTES} from './common/routes';
import HomeScreen from './screens/HomeScreen';
import LandingScreen from './screens/LandingScreen';
import LoginScreen from './screens/LoginScreen';
import PlantDictionaryScreen from './screens/PlantDictionaryScreen';
import PlantRecordScreen from './screens/PlantRecordScreen';
import RegisterScreen from './screens/RegisterScreen';
import NotificationScreen from './screens/Settings/NotificationScreen';
import SettingsScreen from './screens/Settings/SettingsScreen';
import TermsScreen from './screens/Settings/TermsScreen';
import ContactUsScreen from './screens/Settings/ContactUsScreen';
import SuggestionScreen from './screens/Settings/SuggestionScreen';
import PlantSuggestionScreen from './screens/PlantSuggestionScreen';
import AuthContextProvider from './context/AuthContext';
const Stack = createStackNavigator();
const Navigation = () => {
  return (
    <NavigationContainer>
      <AuthContextProvider>
        <Stack.Navigator
          initialRouteName={ROUTES.LANDING_SCREEN}
          screenOptions={{
            headerShown: false,
            animationEnabled: false,
          }}>
          <Stack.Screen
            name={ROUTES.LANDING_SCREEN}
            component={LandingScreen}
          />
          <Stack.Screen name={ROUTES.LOGIN_SCREEN} component={LoginScreen} />
          <Stack.Screen
            name={ROUTES.REGISTER_SCREEN}
            component={RegisterScreen}
          />
          <Stack.Screen name={ROUTES.HOME_SCREEN} component={HomeScreen} />
          <Stack.Screen
            name={ROUTES.PLANT_DICTIONARY_SCREEN}
            component={PlantDictionaryScreen}
          />
          <Stack.Screen
            name={ROUTES.PLANT_RECORD_SCREEN}
            component={PlantRecordScreen}
          />
          <Stack.Screen
            name={ROUTES.SETTINGS_SCREEN}
            component={SettingsScreen}
          />
          <Stack.Screen name={ROUTES.TERMS_SCREEN} component={TermsScreen} />
          <Stack.Screen
            name={ROUTES.CONTACT_US_SCREEN}
            component={ContactUsScreen}
          />
          <Stack.Screen
            name={ROUTES.SUGGESTION_SCREEN}
            component={SuggestionScreen}
          />
          <Stack.Screen
            name={ROUTES.PLANT_SUGGESTION_SCREEN}
            component={PlantSuggestionScreen}
          />
          <Stack.Screen
            name={ROUTES.NOTIFICATION_SCREEN}
            component={NotificationScreen}
          />
        </Stack.Navigator>
      </AuthContextProvider>
    </NavigationContainer>
  );
};

export default Navigation;
