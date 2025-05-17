// App.js

import 'react-native-reanimated';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createDrawerNavigator } from '@react-navigation/drawer';
import { AuthProvider, useAuth } from './components/AuthContext';

import Welcome from './components/Welcome';
import LoginScreen from './components/LoginScreen';
import SignUp from './components/SignUp';
import Home from './components/Home';
import LegalAid from './components/LegalAid';
import Premium from './components/Premium';
import Rights from './components/Rights';
import LawScreen from './components/LawScreen';


const Stack = createNativeStackNavigator();
const Drawer = createDrawerNavigator();

const DrawerScreens = () => (
  <Drawer.Navigator
    screenOptions={{ headerShown: false }}
   >
    <Drawer.Screen name="Home" component={Home} />
    <Drawer.Screen name="LegalAid" component={LegalAid} />
    <Drawer.Screen name="Premium" component={Premium} />
    <Stack.Screen name="Rights" component={Rights} />
     <Drawer.Screen name="LawScreen" component={LawScreen} />
   
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
          <Stack.Screen name="LegalAid" component={LegalAid} />
           <Stack.Screen name="Premium" component={Premium} />
            <Stack.Screen name="Rights" component={Rights} />
            <Stack.Screen name="LawScreen" component={LawScreen} />
          
          
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
