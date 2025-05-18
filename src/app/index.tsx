import React, { useEffect, useState, useRef } from 'react';
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  Animated,
} from 'react-native';
import DropDownPicker from 'react-native-dropdown-picker';

const CIDADES_AMAZONAS = [
  'Manaus',
  'Parintins',
  'Itacoatiara',
  'Manacapuru',
  'Coari',
  'Tefé',
  'Eirunepé',
];

const getRandomAQI = () => Math.floor(Math.random() * 170) + 30;

const getAQIStatus = (aqi: number) => {
  if (aqi <= 50) return { status: 'Boa', color: '#2e7d32', warning: 'Qualidade do ar satisfatória.' };
  if (aqi <= 100) return { status: 'Moderada', color: '#f9a825', warning: 'Evite exercícios ao ar livre se for sensível.' };
  if (aqi <= 150) return { status: 'Ruim', color: '#ef6c00', warning: 'Pessoas sensíveis devem evitar exposição prolongada.' };
  return { status: 'Muito Ruim', color: '#c62828', warning: 'Evite atividades ao ar livre.' };
};

export default function Index() {
  const [open, setOpen] = useState(false);
  const [selectedCity, setSelectedCity] = useState(CIDADES_AMAZONAS[0]);
  const [items, setItems] = useState(
    CIDADES_AMAZONAS.map((city) => ({ label: city, value: city }))
  );

  const [aqi, setAqi] = useState(getRandomAQI());
  const [updatedTime, setUpdatedTime] = useState('Atualizado agora');
  const fadeAnim = useRef(new Animated.Value(1)).current;

  const updateAQI = () => {
    const newAQI = getRandomAQI();
    Animated.timing(fadeAnim, {
      toValue: 0,
      duration: 200,
      useNativeDriver: true,
    }).start(() => {
      setAqi(newAQI);
      setUpdatedTime('Atualizado há poucos segundos');
      fadeAnim.setValue(1);
    });
  };

  useEffect(() => {
    const interval = setInterval(() => {
      updateAQI();
    }, 5000);

    return () => clearInterval(interval);
  }, []);

  const { status, color, warning } = getAQIStatus(aqi);

  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.title}>Selecione uma cidade</Text>

      <DropDownPicker
        open={open}
        value={selectedCity}
        items={items}
        setOpen={setOpen}
        setValue={setSelectedCity}
        setItems={setItems}
        onChangeValue={() => updateAQI()}
        style={styles.dropdown}
        dropDownContainerStyle={styles.dropdownContainer}
        textStyle={styles.dropdownText}
        labelStyle={styles.dropdownLabel}
        placeholder="Escolha uma cidade"
      />

      <View style={styles.card}>
        <Text style={styles.location}>{selectedCity} - AM</Text>
        <Text style={styles.aqiLabel}>Qualidade do Ar (AQI)</Text>
        <Animated.Text style={[styles.aqiValue, { color, opacity: fadeAnim }]}>
          {aqi}
        </Animated.Text>
        <Text style={[styles.status, { color }]}>{status}</Text>
        <Text style={styles.warning}>{warning}</Text>
        <Text style={styles.updated}>{updatedTime}</Text>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#e0f7fa',
    padding: 20,
    alignItems: 'center',
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  dropdown: {
    width: '100%',
    borderRadius: 10,
    borderColor: '#90caf9',
    marginBottom: 20,
  },
  dropdownContainer: {
    borderColor: '#90caf9',
    borderRadius: 10,
  },
  dropdownText: {
    fontSize: 16,
    color: '#333',
  },
  dropdownLabel: {
    fontWeight: 'bold',
  },
  card: {
    backgroundColor: '#ffffff',
    padding: 25,
    borderRadius: 20,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 10,
    elevation: 4,
    width: '100%',
  },
  location: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  aqiLabel: {
    fontSize: 16,
    marginBottom: 5,
  },
  aqiValue: {
    fontSize: 42,
    fontWeight: 'bold',
  },
  status: {
    fontSize: 18,
    marginTop: 10,
  },
  warning: {
    marginTop: 10,
    fontSize: 14,
    textAlign: 'center',
    color: '#616161',
  },
  updated: {
    marginTop: 15,
    fontSize: 13,
    color: '#999',
  },
});
