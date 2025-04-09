import React from 'react';
import { View, Text, StyleSheet, SafeAreaView } from 'react-native';

export default function Index() {
  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.location}>Manaus - AM</Text>

      <View style={styles.aqiBox}>
        <Text style={styles.aqiLabel}>Qualidade do Ar (AQI)</Text>
        <Text style={styles.aqiValue}>85</Text>
        <Text style={styles.status}>Moderada</Text>
        <Text style={styles.warning}>Evite exercícios ao ar livre se for sensível.</Text>
      </View>

      <Text style={styles.updated}>Atualizado há 2 minutos</Text>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#e0f7fa',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 20,
  },
  location: {
    fontSize: 22,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  aqiBox: {
    backgroundColor: '#ffffff',
    padding: 30,
    borderRadius: 20,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 10,
    elevation: 5,
  },
  aqiLabel: {
    fontSize: 18,
    marginBottom: 10,
  },
  aqiValue: {
    fontSize: 50,
    fontWeight: 'bold',
    color: '#ffa000',
  },
  status: {
    fontSize: 20,
    marginTop: 10,
    color: '#f57c00',
  },
  warning: {
    marginTop: 10,
    fontSize: 14,
    textAlign: 'center',
    color: '#616161',
  },
  updated: {
    marginTop: 30,
    fontSize: 14,
    color: '#999',
  },
});
