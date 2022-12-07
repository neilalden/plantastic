import * as React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import HomeScreen from './screens/HomeScreen';
import LoginScreen from './screens/LoginScreen';
import LandingScreen from './screens/LandingScreen';
import {ROUTES} from './common/routes';

const Stack = createStackNavigator();
const Navigation = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator
        initialRouteName={ROUTES.LANDINGSCREEN}
        screenOptions={{
          headerShown: false,
        }}>
        <Stack.Screen name={ROUTES.LANDINGSCREEN} component={LandingScreen} />
        <Stack.Screen name={ROUTES.HOMESCREEN} component={HomeScreen} />
        <Stack.Screen name={ROUTES.LOGINSCREEN} component={LoginScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default Navigation;
