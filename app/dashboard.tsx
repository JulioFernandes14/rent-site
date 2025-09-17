import { StyleSheet, Text, View, TouchableOpacity } from 'react-native';
import { router } from 'expo-router';

export default function Dashboard() {
  return (
    <View style={styles.container}>
      <View style={styles.card}>
        <View style={styles.cardHeader}>
          <Text style={styles.cardTitle}>Dashboard</Text>
          <Text style={styles.cardSubTitle}>Bem-vindo ao Gerenciador de Aluguel</Text>
        </View>

        <View style={styles.content}>
          <Text style={styles.welcomeText}>
            Você está logado no sistema!
          </Text>
          
          <TouchableOpacity 
            style={styles.button} 
            onPress={() => router.push('/')}
          >
            <Text style={styles.buttonText}>Voltar ao Login</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  card: {
    borderWidth: 1,
    borderColor: '#ccc',
    padding: 20,
    borderRadius: 10,
    width: '90%',
    maxWidth: 400,
  },
  cardHeader: {
    alignItems: 'center',
    marginBottom: 20,
  },
  cardTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 5,
  },
  cardSubTitle: {
    fontSize: 16,
    color: '#666',
  },
  content: {
    alignItems: 'center',
  },
  welcomeText: {
    fontSize: 18,
    marginBottom: 20,
    textAlign: 'center',
  },
  button: {
    backgroundColor: '#007bff',
    padding: 15,
    borderRadius: 5,
    width: '100%',
    alignItems: 'center',
  },
  buttonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
  },
});