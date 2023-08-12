// import GestureHandlerRootView from 'react-native-gesture-handler';
import * as React from 'react';
// import  { View } from "react-native";
import { NavigationContainer, NavigationHelpersContext } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { HomeScreen } from '@screens/Home';
// import { DetailsScreen } from '@screens/Details';
import { Theme } from '@theme/Theme';
import { ThemeProvider } from 'styled-components';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
// import { LocationScreen } from '@screens/Location';
import { Location } from '@screens/LocationScreen';
import { Splash } from '@screens/Splash';
import { Boarding } from '@screens/Boarding';
import { Map } from '@screens/MapScreen';
import { SearchBar } from './src/screens/map/components/search-bar';
import SearchProvider from './src/screens/map/context/';
import { SearchResult } from "./src/screens/map/components/search-results";
import { AuthNav } from './src/screens/auth';
import { OTPPhoneVerification } from './src/screens/auth/screens/sign-in/phone-otp-verification'
import { PhoneSignUp } from './src/screens/auth/screens/sign-up/screens';
import { ResetPassword } from './src/screens/auth/screens/sign-in/reset-password';
import { PasswordResetted } from './src/screens/auth/screens/sign-in/reset-password/screens/password-resetted';
// import { SearchBar } from '@components/SearchBar';
// import SplashScreen from 'react-native-splash-screen';

const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();

function App(): JSX.Element {
  return (
    <>
    {/* <GestureHandlerRootView> */}
    <ThemeProvider theme={Theme}>
      <SearchProvider>
        <NavigationContainer>
          <Stack.Navigator>
            <Stack.Screen
              name="Splash"
              component={Splash}
              options={{
                title: '',
                headerTransparent: true,
                headerBackVisible: false,
                animation: 'fade',
              }}
            />
            <Stack.Screen
              name="Boarding"
              component={Boarding}
              options={{
                title: '',
                headerTransparent: true,
                headerBackVisible: false,
                animation: 'fade',
              }}
            />
            <Stack.Screen
              name="Location"
              component={Location}
              options={{
                title: '',
                headerTransparent: true,
                headerBackVisible: false,
                animation: 'fade',
              }}
            />
            <Stack.Screen
              name="Map"
              component={Map}
              options={{
                title: '',
                headerTitle: (props) => (
                  <SearchBar />
                ),
                headerTransparent: false,
                headerBackVisible: true,
                animation: 'fade',
                headerTintColor: '#000000',
                headerShadowVisible: true,
                headerStyle: {
                  // backgroundColor: '#2F95D6',
                },
              }}
            />
            <Stack.Screen
              name="AuthNav"
              component={AuthNav}
              options={{
                title: '',
                headerTransparent: true,
                headerBackVisible: false,
                animation: 'fade',
                headerTintColor: '#000000',
                headerShadowVisible: false,
                headerStyle: {
                  // backgroundColor: '#2F95D6',
                },
              }}
            />
            <Stack.Screen
              name="PhoneSignUp"
              component={PhoneSignUp}
              options={{
                title: 'Add Phone Number',
                headerTitleAlign: 'center',
                headerTransparent: false,
                headerBackVisible: true,
                animation: 'fade',
                headerTintColor: '#000000',
                headerShadowVisible: false,
                headerStyle: {
                  // backgroundColor: '#f9f9f9',
                },
              }}
            />
            <Stack.Screen
              name="OTPPhoneVerification"
              component={OTPPhoneVerification}
              options={{
                title: 'Verify Phone Number',
                headerTitleAlign: 'center',
                headerTransparent: false,
                headerBackVisible: true,
                animation: 'fade',
                headerTintColor: '#000000',
                headerShadowVisible: true,
                headerStyle: {
                  // backgroundColor: '#2F95D6',
                },
              }}
            />
            <Stack.Screen
              name="ResetPassword"
              component={ResetPassword}
              options={{
                title: 'Reset Password',
                headerTitleAlign: 'center',
                headerTransparent: false,
                headerBackVisible: true,
                animation: 'fade',
                headerTintColor: '#000000',
                headerShadowVisible: true,
                headerStyle: {
                  // backgroundColor: '#2F95D6',
                },
              }}
            />
            <Stack.Screen
              name="PasswordResetted"
              component={PasswordResetted}
              options={{
                title: '',
                headerTitleAlign: 'center',
                headerTransparent: true,
                headerBackVisible: false,
                animation: 'fade',
                headerTintColor: '#000000',
                headerShadowVisible: false,
                headerStyle: {
                  // backgroundColor: '#2F95D6',
                },
              }}
            />
            <Stack.Screen
              name="Home"
              component={HomeScreen}
            />
          </Stack.Navigator>
        </NavigationContainer>
      </SearchProvider>
      {/* <NavigationContainer>
        <Tab.Navigator
          screenOptions={{
            tabBarStyle: { backgroundColor: '#000' },
          }}
        >
          <Tab.Screen
            name="Home"
            component={HomeScreen}
          />
          <Tab.Screen
            name="Details"
            component={DetailsScreen}
          />
        </Tab.Navigator>
      </NavigationContainer> */}
    </ThemeProvider>
    {/* </GestureHandlerRootView> */}
    </>
  );
}

export default App;
