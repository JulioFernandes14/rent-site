import { StyleSheet, Text, View, TouchableOpacity, ActivityIndicator, ScrollView } from 'react-native';
import { router } from 'expo-router';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import { useEffect, useState } from 'react';
import { useAuthStore } from './auth/auth';
import { Rent, TotalRentsResponse, TotalRentsValueResponse } from './_http/rent/interfaces';
import { getTotalRents } from './_http/rent/routes/total-rents';
import { getTotalRentsValue } from './_http/rent/routes/total-rents-value';
import { getRents } from './_http/rent/routes/rents';

export function formatCurrency(value: number | string): string {
  const numberValue = Number(value);
  if (isNaN(numberValue)) return 'R$ 00,00';

  const [intPart, decimalPart] = numberValue.toFixed(2).split('.');

  const formattedInt = intPart.padStart(2, '0');

  return `R$ ${formattedInt},${decimalPart}`;
}


export function formatDate(dateString: string): string {
  const date = new Date(dateString);

  return date.toLocaleString('pt-BR', {
    day: '2-digit',
    month: '2-digit',
    year: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
    hour12: false,
  });
}

export function truncateText(text: string, maxLength = 10): string {
  if (text.length <= maxLength) return text;
  return text.slice(0, maxLength) + '...';
}

export default function Dashboard() {

  const auth = useAuthStore();
  const [totalRents, setTotalRents] = useState<TotalRentsResponse | string | undefined>(undefined);
  const [totalRentsLoading, setTotalRentsLoading] = useState<boolean>(false);

  const [totalRentsValue, setTotalRentsValue] = useState<TotalRentsValueResponse | string | undefined>(undefined);
  const [totalRentsValueLoading, setTotalRentsValueLoading] = useState<boolean>(false);

  const [rents, setRents] = useState<Rent[] | string | undefined>(undefined);
  const [rentsLoading, setRentsLoading] = useState<boolean>(false);

  const getTotalRentsFunc = async () => {
    try {
      setTotalRentsLoading(true);
      const total = await getTotalRents();
      setTotalRents(total);
    } catch (err: unknown) {
      if (err instanceof Error) {
        setTotalRents(err.message);
      } else {
        setTotalRents("Erro inesperado");
      }
    } finally {
      setTotalRentsLoading(false);
    }
  }

  const getTotalRentsValueFunc = async () => {
    try {
      setTotalRentsValueLoading(true);
      const total = await getTotalRentsValue();
      setTotalRentsValue(total);
    } catch (err: unknown) {
      if (err instanceof Error) {
        setTotalRentsValue(err.message);
      } else {
        setTotalRentsValue("Erro inesperado");
      }
    } finally {
      setTotalRentsValueLoading(false);
    }
  }

  const getRentsFunc = async () => {
    try {
      setRentsLoading(true);
      const total = await getRents();
      setRents(total);
    } catch (err: unknown) {
      if (err instanceof Error) {
        setRents(err.message);
      } else {
        setRents("Erro inesperado");
      }
    } finally {
      setRentsLoading(false);
    }
  }

  useEffect(() => {
    if (!auth.user?.access_token) {
      const timer = setTimeout(() => {
        router.replace('/');
      }, 0);
      return () => clearTimeout(timer);
    }
  }, [auth]);

  useEffect(() => {
    getTotalRentsFunc();
    getTotalRentsValueFunc();
    getRentsFunc();
  }, [])

  return (
    <ScrollView style={styles.container}>
      <View style={{ marginBottom: 20, display: 'flex', flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' }}>
        <View>
          <Text style={styles.title}>Dashboard</Text>
          <Text style={styles.subtitle}>Gerencie seus aluguéis</Text>
        </View>

        <TouchableOpacity onPress={() => auth.logout()}>
          <MaterialIcons name="logout" size={35} color="#7e72ee" />
        </TouchableOpacity>
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
          {totalRentsLoading
            ? <ActivityIndicator size={'small'} color={'#7e72ee'} />
            : <Text style={{ fontSize: 20, fontWeight: 'bold', color: '#7e72ee' }}> {typeof totalRents === 'string' ? totalRents : totalRents?.total} </Text>
          }
          <Text style={{ color: '#8f8f8f' }}>aluguéis cadastrados</Text>
        </View>
      </View>

      <View style={styles.dataContainer}>
        <View style={styles.dataCard}>
          <View style={styles.dataCardTitleContainer}>
            <Text style={styles.dataCardTitleContainerText}>Valor Total</Text>
            <MaterialIcons name="attach-money" size={20} color="#7e72ee" />
          </View>
          {totalRentsValueLoading
            ? <ActivityIndicator size={'small'} color={'#7e72ee'} />
            : <Text style={{ fontSize: 20, fontWeight: 'bold', color: '#7e72ee' }}> {typeof totalRentsValue === 'string' ? totalRentsValue : `${formatCurrency(totalRentsValue?.totalValue || 0)}`} </Text>
          }
          <Text style={{ color: '#8f8f8f' }}>valor acumulado</Text>
        </View>
      </View>

      <View style={{ marginTop: 20 }}>
        <Text style={{ fontSize: 18, fontWeight: 'bold' }}>Aluguéis Cadastrados</Text>

        {rentsLoading
          ? <ActivityIndicator size={'large'} color={'#7e72ee'} style={{ paddingTop: 50 }} />
          : typeof rents !== 'string' && typeof rents !== 'undefined'
            ? rents?.length === 0 ?
              <View style={styles.noRents}>
                <MaterialIcons name="inventory" size={40} color="#aaa" />
                <Text style={{ color: '#8f8f8f' }}>Nenhum aluguel cadastrado ainda.</Text>
                <TouchableOpacity style={styles.registerRent} onPress={() => router.push('/dashboard')}>
                  <MaterialIcons name="add" size={15} color="#fff" />
                  <Text style={styles.registerFirstRentText}>Cadastrar Primeiro Aluguel</Text>
                </TouchableOpacity>
              </View>
              :
              <View style={{ paddingTop: 20 }}>
                {
                  rents.map((rent) => (
                    <View style={styles.rentCard} key={rent.id}>
                      <View style={styles.rentCardHeader}>
                        <View>
                          <Text style={{fontWeight: 'bold'}}>Aluguel: {truncateText(rent.id)}</Text>
                          <Text style={{fontSize: 12, color: '#aaa'}}>{formatDate(rent.createdAt)}</Text>
                        </View>

                        <View>
                          <Text style={styles.rentValue}>{formatCurrency(rent.totalValue)}</Text>
                        </View>
                      </View>

                      <View>
                        <Text style={{fontSize: 14, color:'#838383ff', fontWeight: 'bold', marginBottom: 5}}>Produtos:</Text>
                        {rent.items?.map((item) => (
                          <View key={item.id} style={{flexDirection: 'row', gap: 5, backgroundColor: '#eee', borderRadius: 5, padding: 10, justifyContent: 'space-between'}}>
                            <View>
                              <Text style={{fontWeight: 'bold'}}>{item.name}</Text>
                              <Text style={{fontWeight: 'bold', color: '#b3b0b0ff'}}>x{item.quantity}</Text>
                            </View>

                            <View>
                              <Text style={{color:'#a3a3a3ff'}}>{formatCurrency(item.valueAdjusted)} cada</Text>
                              <Text style={{fontWeight: 'bold'}}>{formatCurrency(item.valueAdjusted * item.quantity)}</Text>
                            </View>
                          </View>
                        ))
                        }
                      </View>
                    </View>
                  ))
                }
              </View>
            : <Text style={{ fontSize: 16, fontWeight: 'bold', color: '#7e72ee', textAlign: 'center', paddingTop: 50 }}>Erro ao carregar aluguéis</Text>
        }
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#fff',
    height: '100%',
    padding: 20,
    paddingTop: 70,
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
  },
  rentCard: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 5,
    gap: 10,
    padding: 10,
    marginBottom: 20,
  },
  rentCardHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between'
  },
  rentValue: { 
    fontSize: 10, 
    backgroundColor: '#f3f3f7', 
    paddingTop: 5, paddingBottom: 5, 
    paddingLeft: 10, 
    paddingRight: 10, 
    borderRadius: 15, 
    fontWeight: 'bold',
    color: '#7e72ee' 
  }
});