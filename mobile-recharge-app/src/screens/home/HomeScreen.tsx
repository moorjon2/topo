import React from 'react';
import { View, StyleSheet, ScrollView } from 'react-native';
import { Text, Card, Button } from 'react-native-paper';
import { SafeAreaView } from 'react-native-safe-area-context';

export function HomeScreen() {
  return (
    <SafeAreaView style={styles.container}>
      <ScrollView style={styles.scrollView}>
        <View style={styles.content}>
          <Text variant="headlineMedium" style={styles.title}>
            Mobile Recharge & Remittance
          </Text>
          
          <Card style={styles.card}>
            <Card.Content>
              <Text variant="titleMedium">Mobile Recharge</Text>
              <Text variant="bodyMedium" style={styles.cardDescription}>
                Top up mobile phones in South America quickly and securely
              </Text>
            </Card.Content>
            <Card.Actions>
              <Button mode="contained">Recharge Now</Button>
            </Card.Actions>
          </Card>
          
          <Card style={styles.card}>
            <Card.Content>
              <Text variant="titleMedium">Send Money</Text>
              <Text variant="bodyMedium" style={styles.cardDescription}>
                Send money across borders to family and friends
              </Text>
            </Card.Content>
            <Card.Actions>
              <Button mode="contained">Send Money</Button>
            </Card.Actions>
          </Card>
          
          <Card style={styles.card}>
            <Card.Content>
              <Text variant="titleMedium">Chat & Pay</Text>
              <Text variant="bodyMedium" style={styles.cardDescription}>
                Message friends and send money or top-ups instantly
              </Text>
            </Card.Content>
            <Card.Actions>
              <Button mode="contained">Open Chat</Button>
            </Card.Actions>
          </Card>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  scrollView: {
    flex: 1,
  },
  content: {
    padding: 16,
  },
  title: {
    textAlign: 'center',
    marginBottom: 24,
  },
  card: {
    marginBottom: 16,
  },
  cardDescription: {
    marginTop: 8,
    opacity: 0.7,
  },
});