import * as React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import LoginScreen from './pages/LoginScreen';
import DashboardScreen from './pages/DashboardScreen';
import FrameDashboard from ''
import CreateNewLaporan from './pages/CreateNewLaporan';
import ProductScreen from './pages/ProductScreen';
import UsersScreen from './pages/UsersScreen';

const Stack = createStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Login">
        <Stack.Screen name="Login" options={{ headerShown: false }} component={LoginScreen} />
        <Stack.Screen name="Dashboard" options={{ headerShown: false }} component={DashboardScreen} />
        <Stack.Screen name="CreateNewLaporan" options={{ headerShown: false }} component={CreateNewLaporan} />
        <Stack.Screen name="Product" options={{ headerShown: false }} component={ProductScreen} />
        <Stack.Screen name="Users" options={{ headerShown: false }} component={UsersScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
