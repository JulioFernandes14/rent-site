import { StyleSheet, Text, View, TouchableOpacity, ScrollView, TextInput } from 'react-native';
import { router } from 'expo-router';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import { useEffect, useState } from 'react';
import { useAuthStore } from './store/auth/auth';
import { formatCurrency } from './dashboard';

const generateId = () => `${Date.now()}-${Math.random()}`;
interface RentInputItem {
    id: string;
    name?: string;
    nameError?: string;
    quantity?: number;
    quantityError?: string;
    value?: string;
    valueError?: string
}

export default function CreateRent() {

    const auth = useAuthStore();
    const [rentItems, setRentItems] = useState<RentInputItem[]>([]);

    useEffect(() => {
        setRentItems(prev => [
            ...prev,
            {
                id: generateId(),
                name: undefined,
                nameError: undefined,
                quantity: undefined,
                quantityError: undefined,
                value: undefined,
                valueError: undefined
            }
        ])
    }, [])

    useEffect(() => {
        if (!auth.user?.access_token) {
            const timer = setTimeout(() => {
                router.replace('/');
            }, 0);
            return () => clearTimeout(timer);
        }
    }, [auth]);

    const handleChangeName = (index: number, newName: string) => {
        const prevState = [...rentItems];
        prevState[index] = {
            ...rentItems[index],
            name: newName,
        }
        setRentItems(prevState);
    }

    const handleChangeQuantity = (index: number, newQuantity: string) => {
        const onlyNumbers = newQuantity.replace(/\D/g, '');

        const numericValue = onlyNumbers === '' ? undefined : Number(onlyNumbers);

        const updated = [...rentItems];
        updated[index] = {
            ...updated[index],
            quantity: numericValue,
        };
        setRentItems(updated);
    };


    const handleChangeValue = (index: number, newQuantity: string) => {
        const onlyNumbers = newQuantity.replace(/\D/g, '');

        let formatted = '';
        if (onlyNumbers.length === 0) {
            formatted = '';
        } else if (onlyNumbers.length === 1) {
            formatted = '0,0' + onlyNumbers;
        } else if (onlyNumbers.length === 2) {
            formatted = '0,' + onlyNumbers;
        } else {
            const integerPart = onlyNumbers.slice(0, -2);
            const decimalPart = onlyNumbers.slice(-2);
            formatted = `${Number(integerPart).toLocaleString('pt-BR')},${decimalPart}`;
        }

        const updated = [...rentItems];
        updated[index] = {
            ...updated[index],
            value: formatted,
        };
        setRentItems(updated);
    };

    const handleDeleteRentItem = (index: number) => {
        const test = rentItems.filter((_rent, idx) => idx !== index)
        setRentItems(test)
    }


    return (
        <ScrollView style={styles.container}>
            <View style={{ marginBottom: 20, display: 'flex', flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' }}>
                <View>
                    <Text style={styles.title}>Cadastro de Aluguéis</Text>
                    <Text style={styles.subtitle}>Adicione produtos ao aluguel</Text>
                </View>

                <TouchableOpacity onPress={() => router.push('/dashboard')} style={{ flexDirection: 'row', alignItems: 'center' }}>
                    <MaterialIcons name="arrow-back" size={25} color="#7e72ee" />
                </TouchableOpacity>
            </View>

            <View style={styles.createRentContainer}>
                <Text style={{ marginBottom: 10, fontWeight: 'bold', fontSize: 20 }}>Produtos do Aluguel</Text>

                <View>
                    {rentItems.length > 0 &&
                        rentItems.map((rent, index) => (
                            <View style={styles.createRentCard} key={rent.id}>
                                <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                                    <Text style={{ marginBottom: 10, fontWeight: 'bold', fontSize: 16 }}>Produto {index + 1}</Text>
                                    {rentItems.length > 1 &&
                                        <TouchableOpacity onPress={() => handleDeleteRentItem(index)}>
                                            <MaterialIcons name="delete" size={25} color="#f75959ff" />
                                        </TouchableOpacity>
                                    }
                                </View>

                                <View style={styles.field}>
                                    <Text>Nome do Produto</Text>
                                    <TextInput
                                        placeholder="Ex: Kit louça 2"
                                        placeholderTextColor={'#aabbcc'}
                                        style={styles.input}
                                        value={rent.name}
                                        onChangeText={(e) => handleChangeName(index, e)}
                                    />
                                    {/* {passwordError && <Text style={styles.error}>{passwordError}</Text>} */}
                                </View>

                                <View style={styles.field}>
                                    <Text>Quantidade</Text>
                                    <TextInput
                                        placeholder="Ex: 2"
                                        placeholderTextColor={'#aabbcc'}
                                        style={styles.input}
                                        keyboardType="numeric"
                                        value={String(rent.quantity ?? '')}
                                        onChangeText={(e) => handleChangeQuantity(index, e)}
                                    />
                                    {/* {passwordError && <Text style={styles.error}>{passwordError}</Text>} */}
                                </View>

                                <View style={styles.field}>
                                    <Text>Valor Unitário (R$)</Text>
                                    <TextInput
                                        placeholder="Ex: 2"
                                        placeholderTextColor={'#aabbcc'}
                                        style={styles.input}
                                        keyboardType="numeric"
                                        value={String(rent.value ?? '')}
                                        onChangeText={(e) => handleChangeValue(index, e)}
                                    />
                                    {/* {passwordError && <Text style={styles.error}>{passwordError}</Text>} */}
                                </View>
                            </View>
                        ))
                    }
                </View>

                <TouchableOpacity style={styles.registerRent} onPress={() => setRentItems((prev) => (
                    [
                        ...prev,
                        {
                            id: generateId(),
                            name: undefined,
                            nameError: undefined,
                            quantity: undefined,
                            quantityError: undefined,
                            value: undefined,
                            valueError: undefined
                        }
                    ]
                ))}>
                    <MaterialIcons name="add" size={25} color="#fff" />
                    <Text style={styles.registerRentText}>Adicionar Produto</Text>
                </TouchableOpacity>
            </View>

            <View style={styles.totalValueCard}>
                <Text style={{ fontWeight: 'bold', fontSize: 14 }}>Valor Total do Aluguel:</Text>
                <Text style={{ color: '#7e72ee', fontWeight: 'bold', fontSize: 14 }}>{formatCurrency(rentItems.reduce((total, rent) => {
                    if (!rent.quantity || !rent.value) return total;

                    const numericValue = Number(rent.value.replace(/\./g, '').replace(',', '.'));

                    return total + rent.quantity * numericValue;
                }, 0))}</Text>
            </View>

            <View style={styles.actionCard}>
                <TouchableOpacity style={{
                    borderWidth: 1,
                    borderColor: '#ccc',
                    borderRadius: 5,
                    flex: 1,
                    padding: 10,
                }}>
                    <Text style={{textAlign: 'center'}}>Cancelar</Text>
                </TouchableOpacity>
                <TouchableOpacity style={{ backgroundColor: '#7e72ee', flex: 1, borderRadius: 5, padding: 10 }}>
                    <Text style={{ textAlign: 'center', color: '#fff' }}>Salvar Aluguel</Text>
                </TouchableOpacity>
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
    createRentContainer: {
        borderWidth: 1,
        borderColor: '#ccc',
        padding: 20,
        borderRadius: 10,
    },
    createRentCard: {
        borderWidth: 1,
        borderColor: '#ccc',
        borderRadius: 10,
        padding: 15,
        marginBottom: 15,
    },
    field: {
        gap: 10,
        marginBottom: 10
    },
    input: {
        borderWidth: 1,
        borderColor: '#ccc',
        padding: 5,
        borderRadius: 5
    },
    registerRent: {
        backgroundColor: '#7e72ee',
        alignItems: 'center',
        justifyContent: 'center',
        display: 'flex',
        flexDirection: 'row',
        borderWidth: 1,
        borderColor: '#ccc',
        borderRadius: 5,
        padding: 10,
        marginTop: 20,
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
    totalValueCard: {
        flexDirection: 'row',
        borderWidth: 1,
        borderColor: '#ccc',
        borderRadius: 10,
        padding: 20,
        marginTop: 30,
        justifyContent: 'space-between',
    },
    actionCard: {
        flexDirection: 'row',
        marginTop: 20,
        gap: 20
    }
});