import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { ChatStackParamList } from '../types/navigation';
import { ChatListScreen } from '../screens/chat/ChatListScreen';
import { ChatScreen } from '../screens/chat/ChatScreen';
import { UserSearchScreen } from '../screens/chat/UserSearchScreen';

const Stack = createStackNavigator<ChatStackParamList>();

export function ChatNavigator() {
  return (
    <Stack.Navigator>
      <Stack.Screen 
        name="ChatList" 
        component={ChatListScreen}
        options={{ title: 'Messages' }}
      />
      <Stack.Screen 
        name="Chat" 
        component={ChatScreen}
        options={({ route }) => ({ title: route.params.recipientName })}
      />
      <Stack.Screen 
        name="UserSearch" 
        component={UserSearchScreen}
        options={{ title: 'Find Users' }}
      />
    </Stack.Navigator>
  );
}