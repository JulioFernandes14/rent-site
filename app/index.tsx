import { StyleSheet, Text, TextInput, View, Keyboard, TouchableWithoutFeedback, Button, TouchableOpacity, Platform } from 'react-native';
import { router } from 'expo-router';
import { useEffect, useState } from 'react';
import { login } from './_http/auth_http/routes/auth';
import { useAuthStore } from './auth/auth';
import { LoginResponse } from './_http/auth_http/interface';

export default function Login() {

  const auth = useAuthStore();
  const [username, setUsername] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [usernameError, setUsernameError] = useState<string | null>(null);
  const [passwordError, setPasswordError] = useState<string | null>(null);

  useEffect(() => {
    if (auth.user?.access_token) {
      const timer = setTimeout(() => {
        router.replace('/dashboard');
      }, 0);
      return () => clearTimeout(timer);
    }
  }, [auth]);

  const handleSubmit = async () => {
    setUsernameError(null);
    setPasswordError(null);
    if (username.trim() === '') {
      setUsernameError('Campo usuário é obrigatório')
      return
    }

    if (password.trim() === '') {
      setPasswordError('Campo senha é obrigatório')
      return
    }

    const loginRes = await login(username, password);
    const data = await loginRes.json<LoginResponse>()

    if(loginRes.ok){
      auth.login({
        user: {
          access_token: data.access_token,
          email: data.email,
          username: data.username,
          id: data.id
        }
      })
      router.replace('/dashboard')
    }else{
      setPasswordError(loginRes.statusText)
    }
  }

  const content = (
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
            placeholderTextColor={'#aabbcc'}
            style={styles.input}
            value={username}
            onChangeText={setUsername}
          />
          {usernameError && <Text style={styles.error}>{usernameError}</Text>}
        </View>

        <View style={styles.field}>
          <Text>Senha</Text>
          <TextInput
            placeholder="senha"
            placeholderTextColor={'#aabbcc'}
            style={styles.input}
            secureTextEntry
            value={password}
            onChangeText={setPassword}
          />
          {passwordError && <Text style={styles.error}>{passwordError}</Text>}
        </View>

        <TouchableOpacity style={styles.submit} onPress={handleSubmit}>
          <Text style={styles.submitText}>Entrar</Text>
        </TouchableOpacity>
      </View>
    </View>
  );

  return Platform.OS === 'web' ? content : (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss} accessible={false}>
      {content}
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
  },
  error: {
    color:'red'
  }
});