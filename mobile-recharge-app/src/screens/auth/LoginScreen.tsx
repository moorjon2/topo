import React from 'react';
import { View, StyleSheet } from 'react-native';
import { Text, Button } from 'react-native-paper';
import { SafeAreaView } from 'react-native-safe-area-context';

export function LoginScreen() {
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.content}>
        <Text variant="headlineMedium" style={styles.title}>
          Welcome Back
        </Text>
        <Text variant="bodyLarge" style={styles.subtitle}>
          Sign in to your account
        </Text>
        
        {/* Login form will be implemented in later tasks */}
        <View style={styles.placeholder}>
          <Text>Login form will be implemented in authentication task</Text>
        </View>
        
        <Button mode="contained" style={styles.button}>
          Sign In
        </Button>
        
        <Button mode="text" style={styles.button}>
          Create Account
        </Button>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  content: {
    flex: 1,
    padding: 24,
    justifyContent: 'center',
  },
  title: {
    textAlign: 'center',
    marginBottom: 8,
  },
  subtitle: {
    textAlign: 'center',
    marginBottom: 32,
    opacity: 0.7,
  },
  placeholder: {
    padding: 20,
    backgroundColor: '#f5f5f5',
    borderRadius: 8,
    marginBottom: 24,
  },
  button: {
    marginVertical: 8,
  },
});