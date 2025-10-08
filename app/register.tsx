import { StyleSheet, Text, TextInput, View, Keyboard, TouchableWithoutFeedback, TouchableOpacity, Platform } from 'react-native';
import { router } from 'expo-router';
import { useEffect, useState } from 'react';
import { useAuthStore } from './auth/auth';
import { register } from './_http/auth_http/routes/register';
import * as Notifications from 'expo-notifications';

Notifications.setNotificationHandler({
  handleNotification: async () => ({
    shouldShowAlert: true,
    shouldPlaySound: true,
    shouldSetBadge: false,
    shouldShowBanner: true,
    shouldShowList: true,
  }),
});

async function enviarNotificacao() {
  if (Platform.OS === 'web') {
    alert('Cadastro realizado! Use seu usuário e senha para acessar o dashboard');
    return;
  }

  try {
    const { status } = await Notifications.requestPermissionsAsync();
    
    if (status !== 'granted') {
      console.log('Permissão de notificação negada');
      return;
    }

    await Notifications.scheduleNotificationAsync({
      content: {
        title: "Cadastro realizado! ✅",
        body: 'Use seu usuário e senha para acessar o dashboard',
      },
      trigger: null,
    });
  } catch (error) {
    console.error('Erro ao enviar notificação:', error);
  }
}

export default function Login() {

  const auth = useAuthStore();
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [username, setUsername] = useState<string>('');
  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [confirmPassword, setConfirmPassword] = useState<string>('');
  const [usernameError, setUsernameError] = useState<string | null>(null);
  const [emailError, setEmailError] = useState<string | null>(null);
  const [passwordError, setPasswordError] = useState<string | null>(null);
  const [confirmPasswordError, setConfirmPasswordError] = useState<string | null>(null);

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
    setEmailError(null);
    setConfirmPasswordError(null);
    
    if (username.trim() === '') {
      setUsernameError('Campo usuário é obrigatório');
      return;
    }

    if (email.trim() === '') {
      setEmailError('Campo email é obrigatório');
      return;
    }

    if (password.trim() === '') {
      setPasswordError('Campo senha é obrigatório');
      return;
    }

    if (confirmPassword.trim() === '') {
      setConfirmPasswordError('Campo confirmar senha é obrigatório');
      return;
    }

    if (password !== confirmPassword) {
      setConfirmPasswordError('Senha e confirmação de senha devem ser iguais');
      return;
    }

    try {
      setIsLoading(true);
      await register(username, email, password);
      
      await enviarNotificacao();
      
      router.replace('/');
    } catch (err: unknown) {
      if (err instanceof Error) {
        setConfirmPasswordError(err.message);
      } else {
        setConfirmPasswordError("Erro inesperado");
      }
    } finally {
      setIsLoading(false);
    }
  }

  const content = (
    <View style={styles.container}>
      <View style={styles.card}>
        <View style={styles.cardHeader}>
          <Text style={styles.cardTitle}>Gerenciador de Aluguel</Text>
          <Text style={styles.cardSubTitle}>Crie sua conta para acessar o sistema</Text>
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
          <Text>Email</Text>
          <TextInput
            placeholder="email"
            placeholderTextColor={'#aabbcc'}
            style={styles.input}
            value={email}
            onChangeText={setEmail}
          />
          {emailError && <Text style={styles.error}>{emailError}</Text>}
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

        <View style={styles.field}>
          <Text>Confirmar Senha</Text>
          <TextInput
            placeholder="confirme sua senha"
            placeholderTextColor={'#aabbcc'}
            style={styles.input}
            secureTextEntry
            value={confirmPassword}
            onChangeText={setConfirmPassword}
          />
          {confirmPasswordError && <Text style={styles.error}>{confirmPasswordError}</Text>}
        </View>

        <TouchableOpacity style={styles.submit} onPress={handleSubmit} disabled={isLoading}>
          <Text style={styles.submitText}>{isLoading ? 'Criando...' : 'Criar Conta'}</Text>
        </TouchableOpacity>

        <TouchableOpacity onPress={() => router.replace('/')}>
          <Text style={{ color: '#7e72ee', textAlign: 'center', marginTop: 20 }}>
            Retornar Para Login
          </Text>
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
    color: 'red'
  }
});