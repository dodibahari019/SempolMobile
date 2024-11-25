import { StatusBar } from 'expo-status-bar';
import React, { Component, useState, useEffect } from 'react';
import { Ionicons } from '@expo/vector-icons';
import {Text, View, StyleSheet, ScrollView, TouchableOpacity, TextInput, Dimensions, Image, Button} from 'react-native';
import { useFonts } from 'expo-font';
import AppLoading from 'expo-app-loading';
import * as SplashScreen from 'expo-splash-screen';
import { BarChart } from 'react-native-chart-kit';
import Modal from 'react-native-modal';
import DateTimePicker from '@react-native-community/datetimepicker';
import axios from 'axios';
import Icon from 'react-native-vector-icons/FontAwesome';
import 

const { height, width } = Dimensions.get('window');
// Mencegah splash screen hilang otomatis
SplashScreen.preventAutoHideAsync();

export default function App({ navigation }) {
  const [isVisible, setIsVisible] = useState('Beranda');
  const [activeButton, setActiveButton] = useState('Beranda');
  const [subMenu, setSubMenu] = useState('StockAwal');
  const [activeSubmenuButton, setActiveSubmenuButton] = useState('StockAwal');
  const [isModalVisible, setModalVisible] = useState(false);
  const [currentDate, setCurrentDate] = useState('');
  const [date, setDate] = useState(new Date());  // State untuk menyimpan tanggal
  const [show, setShow] = useState(false);       // State untuk menampilkan DatePicker
  const [showStart, setShowStart] = useState(false); 
  const [showEnd, setShowEnd] = useState(false); 
  const [formattedDate, setFormattedDate] = useState(''); // State untuk menampilkan tanggal yang diformat
  const [formattedDateStart, setFormattedDateStart] = useState('');
  const [formattedDateEnd, setFormattedDateEnd] = useState('');
  const [dataDashboard, setDataDashboard] = useState([]);
  const [error, setError] = useState(null);
  //Date Time
  const [startDate, setStartDate] = useState(new Date()); // Tanggal awal
  const [endDate, setEndDate] = useState(new Date());     // Tanggal akhir
  const [showStartDatePicker, setShowStartDatePicker] = useState(false);
  const [showEndDatePicker, setShowEndDatePicker] = useState(false);
  // STOCK AWAL
  const [stockAwalO, setStockAwalO] = useState('');
  const [stockAwalJ, setStockAwalJ] = useState('');
  const [stockAwalH, setStockAwalH] = useState('');
  const [stockAwalMP, setStockAwalMP] = useState('');
  const [stockAwalK, setStockAwalK] = useState('');
  // STOCK AKHIR
  const [stockAkhirO, setStockAkhirO] = useState('');
  const [stockAkhirJ, setStockAkhirJ] = useState('');
  const [stockAkhirH, setStockAkhirH] = useState('');
  const [stockAkhirMP, setStockAkhirMP] = useState('');
  const [stockAkhirK, setStockAkhirK] = useState('');
  // STOCK KELEBIHAN
  const [stockKelebihanO, setStockKelebihanO] = useState('');
  const [stockKelebihanJ, setStockKelebihanJ] = useState('');
  const [stockKelebihanH, setStockKelebihanH] = useState('');
  const [stockKelebihanMP, setStockKelebihanMP] = useState('');
  const [stockKelebihanK, setStockKelebihanK] = useState('');
  // STOCK KEKURANGAN
  const [stockKekuranganO, setStockKekuranganO] = useState('');
  const [stockKekuranganJ, setStockKekuranganJ] = useState('');
  const [stockKekuranganH, setStockKekuranganH] = useState('');
  const [stockKekuranganMP, setStockKekuranganMP] = useState('');
  const [stockKekuranganK, setStockKekuranganK] = useState('');
  // PRODUCT GAGAL
  const [qtyBSO, setQtyBSO] = useState('');
  const [qtyBSJ, setQtyBSJ] = useState('');
  const [qtyBSH, setQtyBSH] = useState('');
  const [qtyBSMP, setQtyBSMP] = useState('');
  const [qtyBSK, setQtyBSK] = useState('');
  // QTY BONUS PELANGGAN
  const [qtyBonusO, setQtyBonusO] = useState('');
  const [qtyBonusJ, setQtyBonusJ] = useState('');
  const [qtyBonusH, setQtyBonusH] = useState('');
  const [qtyBonusMP, setQtyBonusMP] = useState('');
  const [qtyBonusK, setQtyBonusK] = useState('');
  // OPERASIONAL
  const [bagiHasil, setBagiHasil] = useState('');
  const [makan, setMakan] = useState('');
  const [bensin, setBensin] = useState('');
  const [jumatBerkah, setJumatBerkah] = useState('');
  const [tissue, setTissue] = useState('');
  const [gas, setGas] = useState('');
  const [kresek15, setKresek15] = useState('');
  const [kresek10, setKresek10] = useState('');
  const [minyakGoreng, setMinyakGoreng] = useState('');
  const [telor1kg, setTelor1kg] = useState('');
  const [plastikSempol, setPlastikSempol] = useState('');
  const [kasbon, setKasbon] = useState('');
  const [roico, setRoico] = useState('');
  const [spon, setSpon] = useState('');
  const [sunlight, setSunlight] = useState('');
  const [bonusHabis, setBonusHabis] = useState('');
  const [kebersihan, setKebersihan] = useState('');
  const [kelabang, setKelabang] = useState('');
  const [takjil, setTakjil] = useState('');
  // GOFOOD
  const [rpGofood, setRpGofood] = useState('');
  // OTHER OPERASINAL
  const [freeCengek, setFreeCengek] = useState('');
  const [cengek, setCengek] = useState('');
  const [stokAwalTelor, setStokAwalTelor] = useState('');
  const [stokAkhirTelor, setStokAkhirTelor] = useState('');
  const [stokAwalSaos, setStokAwalSaos] = useState('');
  const [stokAkhirSaos, setStokAkhirSaos] = useState('');
  const [btAyamBawang, setBtAyamBawang] = useState('');
  const [btBalado, setBtBalado] = useState('');
  const [btKeju, setBtKeju] = useState('');
  const [cengekAbah, setCengekAbah] = useState('');
  const [minyakBawang, setMinyakBawang] = useState('');
  const [plastik1530, setPlastik1530] = useState('');
  const [plastik1225, setPlastik1225] = useState('');
  const [plastikSaos, setPlastikSaos] = useState('');

  // Muat font custom
  const [fontsLoaded] = useFonts({
    'HowdyLemon': require('../assets/fonts/HowdyLemon.ttf'),  // Sesuaikan path ke font
  });

  const fetchData = async () => {
    try {
        const response = await axios.get('http://192.168.28.215/MyMobileProjectReal/sempolAPI/getDataDashboard.php');
        
        if (response.data && response.data.success === true) {
            setDataDashboard(response.data.data);
        } else {
            setError(response.data.error || 'Error fetching data');
        }
    } catch (error) {
        console.error('Error fetching data:', error.message);
        setError('Error fetching data: ' + error.message);
    }
};

const handleSubmit = () => {
  const [day, month, year] = formattedDate.split('-');
  const formattedDateISO = `${year}-${month}-${day}`;
  const data = {
    tanggal: formattedDateISO,
    // STOCK AWAL
    stockAwalO,
    stockAwalJ,
    stockAwalH,
    stockAwalMP,
    stockAwalK,
    // STOCK AKHIR
    stockAkhirO,
    stockAkhirJ,
    stockAkhirH,
    stockAkhirMP,
    stockAkhirK,
    // STOCK KELEBIHAN
    stockKelebihanO,
    stockKelebihanJ,
    stockKelebihanH,
    stockKelebihanMP,
    stockKelebihanK,
    // STOCK KEKURANGAN
    stockKekuranganO,
    stockKekuranganJ,
    stockKekuranganH,
    stockKekuranganMP,
    stockKekuranganK,
    // PRODUCT GAGAL
    qtyBSO,
    qtyBSJ,
    qtyBSH,
    qtyBSMP,
    qtyBSK,
    // QTY BONUS PELANGGAN
    qtyBonusO,
    qtyBonusJ,
    qtyBonusH,
    qtyBonusMP,
    qtyBonusK,
    // OPERASIONAL
    bagiHasil,
    makan,
    bensin,
    jumatBerkah,
    tissue,
    gas,
    kresek10,
    kresek15,
    minyakGoreng,
    telor1kg,
    plastikSempol,
    kasbon,
    roico,
    spon,
    sunlight,
    bonusHabis,
    kebersihan,
    kelabang,
    takjil,
    // GOFOOD
    rpGofood,
    // OTHER OPERASIONAL
    freeCengek,
    cengek,
    stokAwalTelor,
    stokAkhirTelor,
    stokAwalSaos,
    stokAkhirSaos,
    btAyamBawang,
    btBalado,
    btKeju,
    cengekAbah,
    minyakBawang,
    plastik1530,
    plastik1225,
    plastikSaos,
};

  // Contoh POST ke API
  fetch('http://192.168.28.215/MyMobileProjectReal/sempolAPI/insertDataBaru.php', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(data),
  })
    .then(response => response.json())
    .then(result => {
      console.log('Success:', result);
      toggleModal();
      setStockAwalO('');
      setStockAwalJ('');
      setStockAwalH('');
      setStockAwalMP('');
      setStockAwalK('');
      setStockAkhirO('');
      setStockAkhirJ('');
      setStockAkhirH('');
      setStockAkhirMP('');
      setStockAkhirK('');
      setStockKelebihanO('');
      setStockKelebihanJ('');
      setStockKelebihanH('');
      setStockKelebihanMP('');
      setStockKelebihanK('');
      setStockKekuranganO('');
      setStockKekuranganJ('');
      setStockKekuranganH('');
      setStockKekuranganMP('');
      setStockKekuranganK('');
      setQtyBSO('');
      setQtyBSJ('');
      setQtyBSH('');
      setQtyBSMP('');
      setQtyBSK('');
      setQtyBonusO('');
      setQtyBonusJ('');
      setQtyBonusH('');
      setQtyBonusMP('');
      setQtyBonusK('');
      setBagiHasil('');
      setMakan('');
      setBensin('');
      setJumatBerkah('');
      setTissue('');
      setGas('');
      setKresek10('');
      setKresek15('');
      setMinyakGoreng('');
      setTelor1kg('');
      setPlastikSempol('');
      setKasbon('');
      setRoico('');
      setSpon('');
      setSunlight('');
      setBonusHabis('');
      setKebersihan('');
      setKelabang('');
      setTakjil('');
      setRpGofood('');
      setFreeCengek('');
      setCengek('');
      setStokAwalTelor('');
      setStokAkhirTelor('');
      setStokAwalSaos('');
      setStokAkhirSaos('');
      setBtAyamBawang('');
      setBtBalado('');
      setBtKeju('');
      setCengekAbah('');
      setMinyakBawang('');
      setPlastik1530('');
      setPlastik1225('');
      setPlastikSaos('');
    })
    .catch(error => {
      console.error('Error:', error);
    });
};

//Date Picker
  const onChangeX = (event, selectedDate) => {
    if (selectedDate !== null) {
      const currentDate = selectedDate || date;
      setDate(currentDate);
      setShow(false);
    }
  };
  const showDatepicker = () => {
    setShow(true);
  };

  //Tanggal
  //Tanggal
  const onChangeStartDate = (event, selectedDate) => {
    if (selectedDate !== null) {
      setStartDate(selectedDate);
      setShowStartDatePicker(false);
    }
  };

  const onChangeEndDate = (event, selectedDate) => {
    if (selectedDate !== null) {
      setEndDate(selectedDate);
      setShowEndDatePicker(false);
    }
  };

  const showStartDatepicker = () => {
    setShowStartDatePicker(true);
  };

  const showEndDatepicker = () => {
    setShowEndDatePicker(true);
  };
  const handleExport = () => {
    Alert.alert(
      "Pilih Format Ekspor",
      "Pilih format yang ingin Anda ekspor",
      [
        {
          text: "PDF",
          onPress: handlePdfExport,
        },
        {
          text: "Excel",
          onPress: handleExcelExport,
        },
        { text: "Batal", style: "cancel" },
      ],
      { cancelable: true }
    );
  };

  useEffect(() => {
    const today = new Date();
    // Format tanggal, misal: "14-10-2024"
    const formattedDate = today.getDate() + '-' + (today.getMonth() + 1) + '-' + today.getFullYear();
    const formattedDateStart = today.getDate() + '-' + (today.getMonth() + 1) + '-' + today.getFullYear();
    const formattedDateEnd = today.getDate() + '-' + (today.getMonth() + 1) + '-' + today.getFullYear();
    setCurrentDate(formattedDate);
    setFormattedDate(formattedDate); // Simpan tanggal di state
    setFormattedDateStart(formattedDateStart);
    setFormattedDateEnd(formattedDateEnd);
    fetchData();
    if (fontsLoaded) {
      SplashScreen.hideAsync();
    }
  }, [fontsLoaded]);

  // Jika font belum dimuat, tidak render apa pun
  if (!fontsLoaded) {
    return null;
  }

  const toggleModal = () => {
    setModalVisible(!isModalVisible);
  };

  const onChange = (event, selectedDate) => {
    const currentDate = selectedDate || date;
    setShow(false);  // Menyembunyikan DatePicker setelah tanggal dipilih
    setDate(currentDate);  // Simpan tanggal yang dipilih
    // Format tanggal yang dipilih menjadi string
    const formatted = currentDate.getDate() + '-' + (currentDate.getMonth() + 1) + '-' + currentDate.getFullYear();
    setFormattedDate(formatted);
  };

  const onChangeDateStart = (event, selectedDate) => {
    const currentDate = selectedDate || date;
    setShowStart(false);  // Menyembunyikan DatePicker setelah tanggal dipilih
    // Format tanggal yang dipilih menjadi string
    const formatted = currentDate.getDate() + '-' + (currentDate.getMonth() + 1) + '-' + currentDate.getFullYear();
    setFormattedDateStart(formatted);
  };

   const onChangeDateEnd = (event, selectedDate) => {
    const currentDate = selectedDate || date;
    setShowEnd(false);  // Menyembunyikan DatePicker setelah tanggal dipilih
    // Format tanggal yang dipilih menjadi string
    const formatted = currentDate.getDate() + '-' + (currentDate.getMonth() + 1) + '-' + currentDate.getFullYear();
    setFormattedDateEnd(formatted);
  };

  // Data untuk batang
  // const pemasukan = dataDashboard.totalPendapatan || 0;
  const pemasukan = dataDashboard.length > 0 ? dataDashboard[0].totalPendapatan : 0;
  const pengeluaran = dataDashboard.length > 0 ? dataDashboard[0].totalPengeluaran : 0;
  const pendapatanBersih = dataDashboard.length > 0 ? dataDashboard[0].pendapatanBersih : 0;
  const selisih = pemasukan - pengeluaran;

  // Menghitung tinggi batang relatif berdasarkan nilai maksimal
  const maxValue = Math.max(pemasukan, pengeluaran);
  const pemasukanHeight = (pemasukan / maxValue) * 100;
  const pengeluaranHeight = (pengeluaran / maxValue) * 100;

  const formatRupiah = (num) => {
    return 'Rp' + num.toLocaleString('id-ID');
  };

  const formatRupiahAndRibuan = (angka) => {
    return angka.toLocaleString('id-ID');
    console.log('Angka yang diformat:', angka.toLocaleString('id-ID'));
  }

  const formatRibuan = (num) => {
        if (num === 0) return 'Rp0';
        
        // Konversi menjadi string, ambil bagian integer dan format
        const strNum = num.toString();
        const parts = strNum.split('.');
        const integerPart = parts[0];
        const formattedInteger = integerPart.replace(/\B(?=(\d{3})+(?!\d))/g, '.'); // Tambahkan titik setiap 3 digit

        return `Rp${formattedInteger}`;
    };

  const getSelisihStyle = (selisih) => {
    if (selisih < 0) {
      return { color: 'red', formattedSelisih: ' -' + formatRupiah(Math.abs(selisih)) };
    } else if (selisih > 0) {
      return { color: 'green', formattedSelisih: ' +' + formatRupiah(selisih) };
    } else {
      return { color: '#7f7f7c', formattedSelisih: '  ' + formatRupiah(selisih) };
    }
  };

  // Dapatkan style dan format selisih berdasarkan nilai
  const selisihStyle = getSelisihStyle(selisih);

  const fungsiTombol = (valueData) => {
    if(valueData == 'Beranda'){
      setIsVisible('Beranda');
      setActiveButton('Beranda');
    }else if(valueData == 'NewData'){
      setIsVisible('NewData');
      setActiveButton('NewData');
    }else if(valueData == 'Laporan'){
      setIsVisible('Laporan');
      setActiveButton('Laporan');
    }else if(valueData == 'Setting'){
      setIsVisible('Setting');
      setActiveButton('Setting');
    }
  }

  const PushTombolSubmenu = (valueOfSubmenu) => {
    if(valueOfSubmenu == 'StockAwal'){
      setSubMenu('StockAwal');
      setActiveSubmenuButton('StockAwal');
    }else if(valueOfSubmenu == 'Operasional'){
      setSubMenu('Operasional');
      setActiveSubmenuButton('Operasional');
    }else if(valueOfSubmenu == 'ProdukGagal'){
      setSubMenu('ProdukGagal');
      setActiveSubmenuButton('ProdukGagal');
    }else if(valueOfSubmenu == 'BonusPelanggan'){
      setSubMenu('BonusPelanggan');
      setActiveSubmenuButton('BonusPelanggan');
    }
  }
  
  return (
    
  );
}

const styles = StyleSheet.create({
    Header:{
        backgroundColor:'#d9d9d9',
        paddingHorizontal:10,
        paddingVertical:20,
        display:'flex',
        flexDirection:'row',
        justifyContent:'space-between',
        alignItems:'center',
        top:0,
    },
    BodyTop:{
        backgroundColor:'#d9d9d9',
        paddingHorizontal:10,
        paddingVertical:20,
        display:'flex',
        flexDirection:'row',
        justifyContent:'space-between',
        alignItems:'center',
    },
    iconHeader:{
        backgroundColor:'#d9d9d9',
        borderWidth:0.75,
        borderColor:'#afaeae',
        borderRadius:20,
        elevation:20,
        paddingVertical:8,
        paddingHorizontal:8,
        display:'flex',
        flexDirection:'row',
        justifyContent:'space-between',
        alignItems:'center'
    },
    FirstText:{
        color:'#000000',
        marginHorizontal:10,
        fontSize:12,
        fontFamily:'HowdyLemon'
    },
    container: {
      padding: 20,
      borderWidth: 0.5,
      borderColor: '#afaeae',
      borderRadius: 10,
      margin: 10,
      backgroundColor: '#fff',
    },
    header: {
      fontSize: 18,
      fontWeight: 'bold',
      marginBottom: 5,
    },
    date: {
      fontSize: 14,
      color: '#888',
      marginBottom: 20,
    },
    selisih: {
      fontSize: 16,
      textAlign: 'center',
    },
})
