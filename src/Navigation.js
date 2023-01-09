import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import * as React from 'react';
import {ROUTES} from './common/routes';
import HomeScreen from './screens/HomeScreen';
import LandingScreen from './screens/LandingScreen';
import LoginScreen from './screens/LoginScreen';
import PlantDictionaryScreen from './screens/PlantDictionaryScreen';
import PlantRecentlyViewedScreen from './screens/PlantRecentlyViewedScreen';
import RegisterScreen from './screens/RegisterScreen';
import NotificationScreen from './screens/SettingsScreen/NotificationScreen';
import SettingsScreen from './screens/SettingsScreen/SettingsScreen';
import TermsScreen from './screens/SettingsScreen/TermsScreen';
import ContactUsScreen from './screens/SettingsScreen/ContactUsScreen';
import SuggestionScreen from './screens/SettingsScreen/SuggestionScreen';
import PlantSuggestionScreen from './screens/PlantSuggestionScreen';
import AuthContextProvider from './context/AuthContext';
import PlantsContextProvider from './context/PlantsContext';
import ShopScreen from './screens/ShopScreen';
import PlantDetailsScreen from './screens/PlantDetailsScreen';
const Stack = createStackNavigator();
const Navigation = () => {
  return (
    <NavigationContainer>
      <AuthContextProvider>
        <PlantsContextProvider>
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
              name={ROUTES.PLANT_DETAILS_SCREEN}
              component={PlantDetailsScreen}
            />
            <Stack.Screen
              name={ROUTES.PLANT_DICTIONARY_SCREEN}
              component={PlantDictionaryScreen}
            />
            <Stack.Screen name={ROUTES.SHOP_SCREEN} component={ShopScreen} />
            <Stack.Screen
              name={ROUTES.RECENTLY_VIEWED_SCREEN}
              component={PlantRecentlyViewedScreen}
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
        </PlantsContextProvider>
      </AuthContextProvider>
    </NavigationContainer>
  );
};

export default Navigation;
