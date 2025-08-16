import React from 'react';
import { View, StyleSheet } from 'react-native';
import { Text } from 'react-native-paper';

export function ChatListScreen() {
  return (
    <View style={styles.container}>
      <Text variant="headlineMedium">Chat List</Text>
      <Text>Chat functionality will be implemented in chat system task</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    justifyContent: 'center',
    alignItems: 'center',
  },
});