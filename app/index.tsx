import { StyleSheet, Text, TextInput, View, Keyboard, TouchableWithoutFeedback, Button, TouchableOpacity } from 'react-native';
import { router } from 'expo-router';
import { useEffect, useState } from 'react';

export default function Login() {

  const [token, setToken] = useState<boolean | null>(false);

  useEffect(() => {
    if (token) {
      router.push('/dashboard')
    }
  }, [token])

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss} accessible={false}>
      <View style={styles.container}>
        <View style={styles.card}>
          <View style={styles.cardHeader}>
            <Text style={styles.cardTitle}>Gerenciador de Aluguel</Text>
            <Text style={styles.cardSubTitle}>Faça login para acessar o sistema</Text>
          </View>

          <View style={styles.field}>
            <Text>Usuário</Text>
            <TextInput
              placeholder="username"
              style={styles.input}
            />
          </View>

          <View style={styles.field}>
            <Text>Senha</Text>
            <TextInput
              placeholder="senha"
              style={styles.input}
              secureTextEntry
            />
          </View>

          <TouchableOpacity style={styles.submit} onPress={() => router.push('/dashboard')}>
            <Text style={styles.submitText}>Entrar</Text>
          </TouchableOpacity>
        </View>
      </View>
    </TouchableWithoutFeedback>
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
    width: 320
  },
  cardHeader: {
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 20
  },
  cardTitle: {
    fontSize: 22,
    color: '#7e72ee',
    fontWeight: 'bold',
  },
  cardSubTitle: {
    fontSize: 12,
    color: '#aeababff'
  },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    padding: 5,
    borderRadius: 5
  },
  field: {
    gap: 5,
    marginBottom: 10
  },
  submit: {
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#7e72ee',
    padding: 10,
    borderRadius: 5
  },
  submitText: {
    color: '#fff',
    fontSize: 14,
  }
});
