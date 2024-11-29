import * as React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
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
          <Stack.Screen name="Login" options={{ headerShown: false }} component={LoginScreen} options={{ animationEnabled: false }} />
          <Stack.Screen name="Dashboard" options={{ headerShown: false }} component={DashboardScreen} options={{ animationEnabled: false }} />
          <Stack.Screen name="CreateNewLaporan" options={{ headerShown: false }} component={CreateNewLaporan} options={{ animationEnabled: false }} />
          <Stack.Screen name="Laporan" options={{ headerShown: false }} component={LaporanScreen} options={{ animationEnabled: false }} />
          <Stack.Screen name="Setting" options={{ headerShown: false }} component={SettingScreen} options={{ animationEnabled: false }} />
          <Stack.Screen name="FrameDashboard" options={{ headerShown: false }} component={FrameDashboard} options={{ animationEnabled: false }} />
          <Stack.Screen name="Product" options={{ headerShown: false }} component={ProductScreen} options={{ animationEnabled: false }} />
          <Stack.Screen name="Users" options={{ headerShown: false }} component={UsersScreen} options={{ animationEnabled: false }} />
        </Stack.Navigator>
      </NavigationContainer>
    </AppProvider>
  );
}
