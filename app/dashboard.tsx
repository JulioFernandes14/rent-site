import { StyleSheet, Text, View, TouchableOpacity } from 'react-native';
import { router } from 'expo-router';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';

export default function Dashboard() {
  return (
    <View style={styles.container}>
      <View style={{marginBottom: 20}}>
        <Text style={styles.title}>Dashboard</Text>
        <Text style={styles.subtitle}>Gerencie seus aluguéis</Text>
      </View>

      <TouchableOpacity style={styles.registerRent} onPress={() => router.push('/dashboard')}>
        <MaterialIcons name="add" size={25} color="#fff" />
        <Text style={styles.registerRentText}>Cadastrar Aluguel</Text>
      </TouchableOpacity>

      <View style={styles.dataContainer}>
        <View style={styles.dataCard}>
          <View style={styles.dataCardTitleContainer}>
            <Text style={styles.dataCardTitleContainerText}>Total de Aluguéis</Text>
            <MaterialIcons name="inventory" size={20} color="#7e72ee" />
          </View>
          <Text style={{ fontSize: 20, fontWeight: 'bold', color: '#7e72ee' }}>0</Text>
          <Text style={{ color: '#8f8f8f' }}>aluguéis cadastrados</Text>
        </View>
      </View>

      <View style={styles.dataContainer}>
        <View style={styles.dataCard}>
          <View style={styles.dataCardTitleContainer}>
            <Text style={styles.dataCardTitleContainerText}>Valor Total</Text>
            <MaterialIcons name="attach-money" size={20} color="#7e72ee" />
          </View>
          <Text style={{ fontSize: 20, fontWeight: 'bold', color: '#7e72ee' }}>R$ 00,00</Text>
          <Text style={{ color: '#8f8f8f' }}>valor acumulado</Text>
        </View>
      </View>

      <View style={{ marginTop: 20 }}>
        <Text style={{ fontSize: 18, fontWeight: 'bold' }}>Aluguéis Cadastrados</Text>

        <View style={styles.noRents}>
          <MaterialIcons name="inventory" size={40} color="#aaa" />
          <Text style={{ color: '#8f8f8f' }}>Nenhum aluguel cadastrado ainda.</Text>
          <TouchableOpacity style={styles.registerRent} onPress={() => router.push('/dashboard')}>
            <MaterialIcons name="add" size={15} color="#fff" />
            <Text style={styles.registerFirstRentText}>Cadastrar Primeiro Aluguel</Text>
          </TouchableOpacity>
        </View>
      </View>
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
    backgroundColor: '#7e72ee',
    padding: 10,
    borderRadius: 5,
    alignItems: 'center',
    justifyContent: 'center',
    display: 'flex',
    flexDirection: 'row',
  },
  registerRentText: {
    color: '#fff',
    fontSize: 16,
    padding: 0,
    height: '100%',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center'
  },
  dataContainer: {
    marginTop: 20,
  },
  dataCard: {
    borderWidth: 1,
    borderColor: '#ccc',
    padding: 20,
    borderRadius: 10,
    gap: 10
  },
  dataCardTitleContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between'
  },
  dataCardTitleContainerText: {
    fontSize: 14,
    fontWeight: 'bold'
  },
  noRents: {
    borderWidth: 1,
    borderColor: '#ccc',
    padding: 20,
    borderRadius: 5,
    marginTop: 15,
    alignItems: 'center',
    gap: 10
  },
  registerFirstRentText: {
    color: '#fff',
    fontSize: 12,
    padding: 0,
    height: '100%',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center'
  }
});