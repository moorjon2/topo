import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createStackNavigator } from '@react-navigation/stack';
import { Ionicons } from '@expo/vector-icons';
import { MainTabParamList, ModalStackParamList } from '../types/navigation';
import { HomeScreen } from '../screens/home/HomeScreen';
import { ChatNavigator } from './ChatNavigator';
import { HistoryNavigator } from './HistoryNavigator';
import { ProfileNavigator } from './ProfileNavigator';
import { RechargeScreen } from '../screens/recharge/RechargeScreen';
import { RechargeConfirmationScreen } from '../screens/recharge/RechargeConfirmationScreen';
import { RemittanceScreen } from '../screens/remittance/RemittanceScreen';
import { RemittanceConfirmationScreen } from '../screens/remittance/RemittanceConfirmationScreen';

const Tab = createBottomTabNavigator<MainTabParamList>();
const ModalStack = createStackNavigator<ModalStackParamList>();

function TabNavigator() {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        tabBarIcon: ({ focused, color, size }) => {
          let iconName: keyof typeof Ionicons.glyphMap;

          if (route.name === 'Home') {
            iconName = focused ? 'home' : 'home-outline';
          } else if (route.name === 'Chat') {
            iconName = focused ? 'chatbubbles' : 'chatbubbles-outline';
          } else if (route.name === 'History') {
            iconName = focused ? 'time' : 'time-outline';
          } else if (route.name === 'Profile') {
            iconName = focused ? 'person' : 'person-outline';
          } else {
            iconName = 'help-outline';
          }

          return <Ionicons name={iconName} size={size} color={color} />;
        },
        tabBarActiveTintColor: '#007AFF',
        tabBarInactiveTintColor: 'gray',
        headerShown: false,
      })}
    >
      <Tab.Screen name="Home" component={HomeScreen} />
      <Tab.Screen name="Chat" component={ChatNavigator} />
      <Tab.Screen name="History" component={HistoryNavigator} />
      <Tab.Screen name="Profile" component={ProfileNavigator} />
    </Tab.Navigator>
  );
}

export function MainNavigator() {
  return (
    <ModalStack.Navigator
      screenOptions={{
        presentation: 'modal',
        headerShown: false,
      }}
    >
      <ModalStack.Screen name="Tabs" component={TabNavigator} />
      <ModalStack.Screen name="Recharge" component={RechargeScreen} />
      <ModalStack.Screen name="RechargeConfirmation" component={RechargeConfirmationScreen} />
      <ModalStack.Screen name="Remittance" component={RemittanceScreen} />
      <ModalStack.Screen name="RemittanceConfirmation" component={RemittanceConfirmationScreen} />
    </ModalStack.Navigator>
  );
}