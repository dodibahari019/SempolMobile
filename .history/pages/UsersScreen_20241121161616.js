import React, { useState } from 'react';
import { View, Text, FlatList, TouchableOpacity, StyleSheet, Image, Modal, Pressable, TextInput } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome'; // Import ikon dari FontAwesome

let initialData = [
    { id: '1', name: 'Nadhil Wirasetya', email: 'nadhil@gmail.com' },
    { id: '2', name: 'Dody Bahari', email: 'dody@gmail.com' },
    { id: '3', name: 'Gintara Saputra', email: 'gintara@gmail.com' },
    { id: '4', name: 'Marcelian Teguh', email: 'marcelian@gmail.com' },
    { id: '5', name: 'Brian halo bang', email: 'brian@gmail.com' },
];

const AkunScreen = ({ navigation }) => {
    const [data, setData] = useState(initialData);
    const [modalVisible, setModalVisible] = useState(false);
    const [selectedUser, setSelectedUser] = useState(null);
    const [newName, setNewName] = useState('');

    // Function to open modal with selected user data
    const openModal = (user) => {
        setSelectedUser(user);
        setNewName(user.name); // Initialize input with current name
        setModalVisible(true);
    };

    // Function to edit user name
    const editName = () => {
        setData((prevData) =>
            prevData.map((item) =>
                item.id === selectedUser.id ? { ...item, name: newName } : item
            )
        );
        setModalVisible(false);
    };

    // Function to delete user
    const deleteUser = () => {
        setData((prevData) => prevData.filter((item) => item.id !== selectedUser.id));
        setModalVisible(false);
    };

    // Render item function for FlatList
    const renderItem = ({ item }) => (
        <View style={styles.item}>
            <Icon name="user" size={24} color="#FFF" style={styles.profileIcon} />
            <Text style={styles.title}>{item.name}</Text>
            <TouchableOpacity style={styles.button} onPress={() => openModal(item)}>
                <Text style={styles.buttonText}>!</Text>
            </TouchableOpacity>
        </View>
    );

    return (
        <View style={styles.container}>
            {/* Header */}
            <View style={styles.header}>
                {/* Tombol Back di kiri */}
                <TouchableOpacity style={styles.headerButton}>
                    <Icon name="arrow-left" size={24} color="#FFF" onPress={() => navigation.goBack()} />
                </TouchableOpacity>
lagra
                {/* Teks Header di tengah */}
                {/* <Image
                    source={require('../files/sempolAyam.png')}
                    style={styles.logo}
                /> */}

                {/* Tombol Akun di kanan */}
                {/* <TouchableOpacity style={styles.headerButton}>
                    <Icon name="user" size={24} color="#FFF" />
                </TouchableOpacity> */}
            </View>

            <View style={styles.containerfield}>
                <Text style={styles.headerText}>Data Pengguna</Text>

                <FlatList
                    data={data}
                    renderItem={renderItem}
                    keyExtractor={item => item.id}
                />
            </View>

            {/* Modal for user details */}
            <Modal
                animationType="slide"
                transparent={true}
                visible={modalVisible}
                onRequestClose={() => setModalVisible(false)}
            >
                <View style={styles.modalOverlay}>
                    <View style={styles.modalView}>
                        {selectedUser && (
                            <>
                                <Text style={styles.modalText}>Detail Akun</Text>
                                {/* Nama Field */}
                                <Text style={styles.label}>Nama</Text>
                                <TextInput
                                    style={styles.input}
                                    value={newName}
                                    onChangeText={setNewName}
                                    placeholder="Masukkan Nama Baru"
                                />
                                
                                {/* Email Field */}
                                <Text style={styles.label}>Email</Text>
                                <TextInput
                                    style={styles.input}
                                    value={selectedUser.email}
                                    editable={false} // Non-editable email field
                                />

                                <View style={styles.buttonRow}>
                                    <Pressable
                                        style={[styles.button, styles.buttonSave]}
                                        onPress={editName}
                                    >
                                        <Text style={styles.textStyle}>Simpan</Text>
                                    </Pressable>
                                    <Pressable
                                        style={[styles.button, styles.buttonDelete]}
                                        onPress={deleteUser}
                                    >
                                        <Text style={styles.textStyle}>Hapus</Text>
                                    </Pressable>
                                    <Pressable
                                        style={[styles.button, styles.buttonClose]}
                                        onPress={() => setModalVisible(false)}
                                    >
                                        <Text style={styles.textStyle}>Tutup</Text>
                                    </Pressable>
                                </View>
                            </>
                        )}
                    </View>
                </View>
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
    logo: {
        width: 120,
        height: 40,
        resizeMode: 'contain',
        position: 'relative',
        zIndex: 1,
    },
    header: {
        width: '100%',
        height: 90,
        backgroundColor: '#333',
        paddingVertical: 15,
        paddingHorizontal: 10,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'flex-end',
        paddingBottom: 10,
        borderRadius: 10,
    },
    headerText: {
        color: '#000000',
        fontSize: 30,
        fontWeight: 'bold',
        padding: 20,
    },
    headerButton: {
        padding: 10,
    },
    item: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        backgroundColor: '#3C3C3C',
        elevation: 4,
        width: 350,
        padding: 20,
        marginVertical: 8,
        borderRadius: 10,
    },
    title: {
        fontSize: 18,
        color: 'white',
        flex: 1,
        marginLeft: 10,
    },
    button: {
        backgroundColor: '#ffcc00',
        borderRadius: 50,
        width: 40,
        height: 40,
        justifyContent: 'center',
        alignItems: 'center',
    },
    buttonText: {
        fontSize: 18,
        color: '#000',
    },
    profileIcon: {
        marginRight: 10,
    },
    modalOverlay: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
    },
    modalView: {
        width: 300,
        backgroundColor: 'white',
        borderRadius: 10,
        padding: 20,
        alignItems: 'center',
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.25,
        shadowRadius: 4,
        elevation: 5,
    },
    modalText: {
        fontSize: 20,
        fontWeight: 'bold',
        marginBottom: 15,
    },
    label: {
        alignSelf: 'flex-start',
        fontSize: 16,
        fontWeight: 'bold',
        marginBottom: 5,
    },
    input: {
        borderWidth: 1,
        borderColor: '#ccc',
        borderRadius: 5,
        padding: 10,
        marginVertical: 10,
        width: '100%',
    },
    buttonRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        width: '100%',
        marginTop: 20,
    },
    buttonSave: {
        backgroundColor: '#4CAF50',
        borderRadius: 10,
        padding: 10,
        elevation: 2,
        flex: 1,
        marginRight: 5,
    },
    buttonDelete: {
        backgroundColor: '#F44336',
        borderRadius: 10,
        padding: 10,
        elevation: 2,
        flex: 1,
        marginLeft: 5,
        marginRight: 5,
    },
    buttonClose: {
        backgroundColor: '#ffcc00',
        borderRadius: 10,
        padding: 10,
        elevation: 2,
        flex: 1,
        marginLeft: 5,
    },
    textStyle: {
        color: '#fff',
        fontWeight: 'bold',
        textAlign: 'center',
    },
});

export default AkunScreen;
