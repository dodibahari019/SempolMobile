import React, { useState, useEffect } from 'react';
import { View, TouchableOpacity, StyleSheet, Text, FlatList, Modal, TextInput, Image, Button, Animated } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';

const ProdukScreen = ({ navigation }) => {
    const [produkKiri, setProdukKiri] = useState([]); // Data produk dari API
    const [selectedItem, setSelectedItem] = useState(null);
    const [isModalVisible, setIsModalVisible] = useState(false);
    const [editedName, setEditedName] = useState('');
    const [editedHarga, setEditedHarga] = useState('');
    const modalAnimation = useState(new Animated.Value(0))[0];

    // Fungsi untuk mengambil data produk dari API
    const fetchProducts = async () => {
        try {
            const response = await fetch('http://192.168.248.215/SempolMobileApp/sempolAPI/MasterProduct.php'); // Ganti dengan URL API Anda
            const data = await response.json();
            if (Array.isArray(data)) {
                setProdukKiri(data);
            } else {
                console.error('Unexpected data format:', data);
            }
        } catch (error) {
            console.error('Error fetching products:', error);
        }
    };

    useEffect(() => {
        fetchProducts(); // Ambil data saat komponen pertama kali dirender
    }, []);

    const handleItemPress = (item) => {
        setSelectedItem(item);
        setEditedName(item.productsName); // Sesuaikan dengan properti dari API
        setEditedHarga(item.productsPrice); // Sesuaikan dengan properti dari API
        setIsModalVisible(true);
        Animated.timing(modalAnimation, {
            toValue: 1,
            duration: 300,
            useNativeDriver: true,
        }).start();
    };

    const handleSave = () => {
        if (selectedItem) {
            setSelectedItem({ ...selectedItem, productsName: editedName, productsPrice: editedHarga });
        }
        setIsModalVisible(false);
    };

    const handleCancel = () => {
        Animated.timing(modalAnimation, {
            toValue: 0,
            duration: 300,
            useNativeDriver: true,
        }).start(() => {
            setIsModalVisible(false);
        });
    };

    const renderItem = ({ item, index }) => {
        return (
            index % 2 === 0 && (
                <View style={styles.tableRow}>
                    <TouchableOpacity style={styles.tableCellContainer} onPress={() => handleItemPress(item)}>
                        <Text style={styles.tableCellName}>{item.productsName}</Text> {/* Properti dari API */}
                        <Text style={styles.tableCell}>{item.productsPrice}</Text> {/* Properti dari API */}
                    </TouchableOpacity>

                    {produkKiri[index + 1] && (
                        <TouchableOpacity style={styles.tableCellContainer} onPress={() => handleItemPress(produkKiri[index + 1])}>
                            <Text style={styles.tableCellName}>{produkKiri[index + 1].productsName}</Text>
                            <Text style={styles.tableCell}>{produkKiri[index + 1].productsPrice}</Text>
                        </TouchableOpacity>
                    )}
                </View>
            )
        );
    };

    return (
        <View style={styles.container}>
            <View style={styles.header}>
                <TouchableOpacity style={styles.headerButton}>
                    <Icon name="arrow-left" size={24} color="#FFFF" onPress={() => navigation.goBack()} />
                </TouchableOpacity>

                <Image
                    source={require('../files/sempolAyam.png')}
                    style={styles.logo}
                />
            </View>

            <Text style={styles.title}>Data Produk</Text>

            <FlatList
                data={produkKiri}
                renderItem={renderItem}
                keyExtractor={(index) => index.toString()}
            />

            <Modal
                transparent={true}
                visible={isModalVisible}
                animationType="none"
                onRequestClose={handleCancel}
            >
                <Animated.View style={[styles.modalOverlay, { opacity: modalAnimation }]}>
                    <View style={styles.modalContainer}>
                        <Text style={styles.modalTitle}>Detail Produk</Text>

                        <Text style={styles.label}>Nama Produk</Text>
                        <TextInput
                            style={styles.input}
                            value={editedName}
                            onChangeText={setEditedName}
                        />

                        <Text style={styles.label}>Harga Produk</Text>
                        <TextInput
                            style={styles.input}
                            value={editedHarga}
                            onChangeText={setEditedHarga}
                            keyboardType="numeric"
                        />

                        <View style={styles.buttonRow}>
                            <TouchableOpacity style={styles.buttonSave} onPress={handleSave}>
                                <Text style={styles.buttonText}>Save</Text>
                            </TouchableOpacity>

                            <TouchableOpacity style={styles.buttonCancel} onPress={handleCancel}>
                                <Text style={styles.buttonText}>Cancel</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                </Animated.View>
            </Modal>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        backgroundColor: '#f5f5f5',
    },
    header: {
        width: '100%',
        height: 90,
        backgroundColor: '#545454', // Hitam
        paddingVertical: 15,
        paddingHorizontal: 10,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'flex-end',
        paddingBottom: 10,
        borderRadius: 10,
    },
    headerButton: {
        padding: 10,
    },
    logo: {
        width: 120,
        height: 40,
        resizeMode: 'contain',
        position: 'relative',
        zIndex: 1,
    },
    title: {
        color: '#000000', // Emas
        fontSize: 24,
        fontWeight: 'bold',
        textAlign: 'left',
        marginTop: 20,
        marginBottom: 20,
    },
    searchContainer: {
        width: '90%',
        top: 10,
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 16,
        borderRadius: 9,
        borderColor: '#ddd',
        paddingHorizontal: 10,
    },
    searchInputContainer: {
        flexDirection: 'row',
        borderWidth: 1,
        borderColor: '#ccc', // Abu-abu muda
        borderRadius: 9,
        alignItems: 'center',
        flex: 1,
        backgroundColor: '#fff', // Putih
    },
    searchInput: {
        flex: 1,
        height: 50,
        marginLeft: 10,
        color: '#333', // Warna teks
    },
    icon: {
        marginRight: 6,
        marginLeft: 15,
    },
    buttonTambah: {
        width: 50,
        height: 50,
        backgroundColor: '#FFA500', // Oranye
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 19,
        marginLeft: 10,
    },
    tableRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        paddingVertical: 10,
        marginBottom: 10,
    },
    tableCellContainer: {
        width: '48%',
        backgroundColor: '#fff', // Putih
        borderRadius: 5,
        padding: 15,
        elevation: 4,
    },
    tableCell: {
        fontSize: 16,
        color: '#333', // Warna teks
    },
    tableCellName: {
        fontSize: 18,
        fontWeight: 'bold',
        color: '#333', // Warna teks
    },
    modalOverlay: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
    },
    modalContainer: {
        width: 300,
        padding: 20,
        backgroundColor: '#fff', // Putih
        borderRadius: 10,
        alignItems: 'center',
    },
    modalTitle: {
        fontSize: 22,
        fontWeight: 'bold',
        marginBottom: 20,
    },
    label: {
        fontSize: 16,
        fontWeight: 'bold',
        marginBottom: 10,
        alignSelf: 'flex-start',
        color: '#333', // Warna teks label
    },
    input: {
        borderWidth: 1,
        borderColor: '#ccc', // Abu-abu muda
        borderRadius: 5,
        padding: 10,
        width: '100%',
        marginBottom: 20,
        backgroundColor: '#fff', // Putih
        color: '#333', // Warna teks input
    },
    buttonRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        width: '100%',
    },
    buttonSave: {
        backgroundColor: '#32CD32', // Hijau limau
        padding: 10,
        borderRadius: 5,
        width: '45%',
    },
    buttonCancel: {
        backgroundColor: '#FF4500', // Merah-oranye
        padding: 10,
        borderRadius: 5,
        width: '45%',
    },
    buttonText: {
        color: '#fff', // Teks putih
        fontWeight: 'bold',
        textAlign: 'center',
    },
});

export default ProdukScreen;
