import React, { useEffect, useState, useRef } from 'react';
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  Animated,
  Easing,
} from 'react-native';

const getRandomAQI = () => {
  // Simula um valor aleatório de AQI entre 30 e 200
  return Math.floor(Math.random() * 170) + 30;
};

const getAQIStatus = (aqi: number) => {
  if (aqi <= 50) return { status: 'Boa', color: '#2e7d32', warning: 'Qualidade do ar satisfatória.' };
  if (aqi <= 100) return { status: 'Moderada', color: '#f9a825', warning: 'Evite exercícios ao ar livre se for sensível.' };
  if (aqi <= 150) return { status: 'Ruim', color: '#ef6c00', warning: 'Pessoas sensíveis devem evitar exposição prolongada.' };
  return { status: 'Muito Ruim', color: '#c62828', warning: 'Evite atividades ao ar livre.' };
};

export default function Index() {
  const [aqi, setAqi] = useState(getRandomAQI());
  const [updatedTime, setUpdatedTime] = useState('Atualizado agora');
  const fadeAnim = useRef(new Animated.Value(0)).current;

  const animateAQI = () => {
    fadeAnim.setValue(0);
    Animated.timing(fadeAnim, {
      toValue: 1,
      duration: 800,
      easing: Easing.out(Easing.ease),
      useNativeDriver: true,
    }).start();
  };

  useEffect(() => {
    const interval = setInterval(() => {
      const newAQI = getRandomAQI();
      setAqi(newAQI);
      setUpdatedTime('Atualizado há poucos segundos');
      animateAQI();
    }, 5000);

    return () => clearInterval(interval);
  }, []);

  const { status, color, warning } = getAQIStatus(aqi);

  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.location}>Manaus - AM</Text>

      <View style={styles.aqiBox}>
        <Text style={styles.aqiLabel}>Qualidade do Ar (AQI)</Text>
        <Animated.Text style={[styles.aqiValue, { color, opacity: fadeAnim }]}>
          {aqi}
        </Animated.Text>
        <Text style={[styles.status, { color }]}>{status}</Text>
        <Text style={styles.warning}>{warning}</Text>
      </View>

      <Text style={styles.updated}>{updatedTime}</Text>
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
  },
  status: {
    fontSize: 20,
    marginTop: 10,
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
