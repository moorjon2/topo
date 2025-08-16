import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { HistoryStackParamList } from '../types/navigation';
import { HistoryScreen } from '../screens/history/HistoryScreen';
import { TransactionDetailScreen } from '../screens/history/TransactionDetailScreen';

const Stack = createStackNavigator<HistoryStackParamList>();

export function HistoryNavigator() {
  return (
    <Stack.Navigator>
      <Stack.Screen 
        name="History" 
        component={HistoryScreen}
        options={{ title: 'Transaction History' }}
      />
      <Stack.Screen 
        name="TransactionDetail" 
        component={TransactionDetailScreen}
        options={{ title: 'Transaction Details' }}
      />
    </Stack.Navigator>
  );
}