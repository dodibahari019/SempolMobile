import * as React from 'react';
import { NavigationContainer } from '@react-navigation/native';
// import { createStackNavigator } from '@react-navigation/stack';
import { createStackNavigator, TransitionSpecs, CardStyleInterpolators } from '@react-navigation/stack';
import { AppProvider } from './pages/Component/VariableDash';
import LoginScreen from './pages/LoginScreen';
import DashboardScreen from './pages/DashboardScreen';
import FrameDashboard from './pages/Component/FrameDashboard';
import CreateNewLaporan from './pages/CreateNewLaporan';
import LaporanScreen from './pages/LaporanScreen';
import SettingScreen from './pages/SettingScreen';
import ProductScreen from './pages/ProductScreen';
import UsersScreen from './pages/UsersScreen';

const Stack = createStackNavigator();

export default function App() {
  return (
    <AppProvider>
      <NavigationContainer>
        <Stack.Navigator initialRouteName="Login">
          <Stack.Screen name="Login" options={{ headerShown: false, animationEnabled: false }} component={LoginScreen} />
          <Stack.Screen name="Dashboard" options={{ headerShown: false, animationEnabled: false }} component={DashboardScreen} />
          <Stack.Screen name="CreateNewLaporan" options={{ headerShown: false, animationEnabled: false }} component={CreateNewLaporan} />
          <Stack.Screen name="Laporan" options={{ headerShown: false, animationEnabled: false }} component={LaporanScreen} />
          <Stack.Screen name="Setting" options={{ headerShown: false, animationEnabled: false }} component={SettingScreen} />
          <Stack.Screen name="FrameDashboard" options={{ headerShown: false, animationEnabled: false }} component={FrameDashboard} />
          <Stack.Screen name="Product" options={{ headerShown: false, animationEnabled: false }} component={ProductScreen} />
          <Stack.Screen name="Users" options={{ headerShown: false, animationEnabled: false }} component={UsersScreen} />
        </Stack.Navigator>
      </NavigationContainer>
    </AppProvider>
  );
}
