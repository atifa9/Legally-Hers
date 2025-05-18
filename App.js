// App.js
import React from 'react';
import 'react-native-reanimated';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createDrawerNavigator } from '@react-navigation/drawer';
import { AuthProvider, useAuth } from './components/AuthContext';

import Welcome from './components/Welcome';
import LoginScreen from './components/LoginScreen';
import SignUp from './components/SignUp';
import Home from './components/Home';
import AccountDrawer from './components/AccountDrawer';
import Accinfo from './components/Accinfo';
import Accplan from './components/Accplan';
import Setting from './components/Setting';
import SavedConvo from './components/SavedConvo';
import Premium from './components/Premium';
import ChatBot from './components/ChatBot';
import LegalAid from './components/LegalAid';
import Rights from './components/Rights';
import LawScreen from './components/LawScreen';
import Lawyers from './components/Lawyers';
import Advocates from './components/Advocates';
import Evidence from './components/Evidence';
import evidence from './backend/models/evidence';


const Stack = createNativeStackNavigator();
const Drawer = createDrawerNavigator();

const DrawerScreens = () => (
  <Drawer.Navigator
    screenOptions={{ headerShown: false }}
    drawerContent={(props) => <AccountDrawer {...props} />}
  >
    <Drawer.Screen name="Home" component={Home} />
    <Drawer.Screen name="Premium" component={Premium} />
    <Drawer.Screen name="ChatBot" component={ChatBot} />
    <Drawer.Screen name="LegalAid" component={LegalAid} />
    <Drawer.Screen name="Rights" component={Rights} />
    <Drawer.Screen name="LawScreen" component={LawScreen} />
    <Drawer.Screen name="Accinfo" component={Accinfo} />
    <Drawer.Screen name="Accplan" component={Accplan} />
    <Drawer.Screen name="Setting" component={Setting} />
    <Drawer.Screen name="SavedConvo" component={SavedConvo} />
    <Drawer.Screen name="Lawyers" component={Lawyers} />
    <Drawer.Screen name="Advocates" component={Advocates} />
    <Drawer.Screen name="Evidence" component={Evidence} />

   
  </Drawer.Navigator>
);

const MainNavigation = () => {
  const { isLoggedIn } = useAuth();

  return (
    <NavigationContainer>
      {isLoggedIn ? (
        <DrawerScreens />
      ) : (
        <Stack.Navigator screenOptions={{ headerShown: false }}>
          <Stack.Screen name="Welcome" component={Welcome} />
          <Stack.Screen name="LoginScreen" component={LoginScreen} />
          <Stack.Screen name="SignUp" component={SignUp} />
          <Stack.Screen name="Home" component={Home} />
          <Stack.Screen name="Premium" component={Premium} />
          <Stack.Screen name="ChatBot" component={ChatBot} />
          <Stack.Screen name="LegalAid" component={LegalAid} />
          <Stack.Screen name="Rights" component={Rights} />
          <Stack.Screen name="LawScreen" component={LawScreen} />
          <Stack.Screen name="Lawyers" component={Lawyers} />
           <Stack.Screen name="Advocates" component={Advocates} />
            <Stack.Screen name="Evidence" component={Evidence} />
   
        </Stack.Navigator>
      )}
    </NavigationContainer>
  );
};

export default function App() {
  return (
    <AuthProvider>
      <MainNavigation />
    </AuthProvider>
  );
}
