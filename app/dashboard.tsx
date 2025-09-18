import { StyleSheet, Text, View, TouchableOpacity } from 'react-native';
import { router } from 'expo-router';

export default function Dashboard() {
  return (
    <View style={styles.container}>
      <View>
        <Text style={styles.title}>Dashboard</Text>
        <Text style={styles.subtitle}>Gerencie seus aluguéis</Text>
      </View>

      <TouchableOpacity style={styles.registerRent} onPress={() => router.push('/dashboard')}>
        <Text style={styles.registerRentText}>Cadastrar Aluguel</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#fff',
    height: '100%',
    padding: 20
  },
  title: {
    fontSize: 30,
    fontWeight: 'bold',
  },
  subtitle: {
    fontSize: 16,
    color: '#aaa'
  },
  registerRent: {
    marginTop: 20,
    backgroundColor: '#7e72ee',
    padding: 10,
    borderRadius: 5,
    alignItems: 'center',
    justifyContent: 'center'
  },
  registerRentText: {
    color: '#fff',
    fontSize: 16,
  }
});