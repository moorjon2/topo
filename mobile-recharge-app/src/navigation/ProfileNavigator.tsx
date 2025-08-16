import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { ProfileStackParamList } from '../types/navigation';
import { ProfileScreen } from '../screens/profile/ProfileScreen';
import { VerificationScreen } from '../screens/profile/VerificationScreen';
import { SettingsScreen } from '../screens/profile/SettingsScreen';

const Stack = createStackNavigator<ProfileStackParamList>();

export function ProfileNavigator() {
  return (
    <Stack.Navigator>
      <Stack.Screen 
        name="Profile" 
        component={ProfileScreen}
        options={{ title: 'Profile' }}
      />
      <Stack.Screen 
        name="Verification" 
        component={VerificationScreen}
        options={{ title: 'Account Verification' }}
      />
      <Stack.Screen 
        name="Settings" 
        component={SettingsScreen}
        options={{ title: 'Settings' }}
      />
    </Stack.Navigator>
  );
}