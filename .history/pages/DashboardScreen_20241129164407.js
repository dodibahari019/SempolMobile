import { StatusBar } from 'expo-status-bar';
import React, { Component, useState, useEffect, useContext } from 'react';
import { Ionicons } from '@expo/vector-icons';
import {Text, View, StyleSheet, ScrollView, TouchableOpacity, TextInput, Dimensions, Image, Button} from 'react-native';
import { useFonts } from 'expo-font';
import AppLoading from 'expo-app-loading';
import * as SplashScreen from 'expo-splash-screen';
import { BarChart, PieChart } from 'react-native-chart-kit';
import Modal from 'react-native-modal';
import DateTimePicker from '@react-native-community/datetimepicker';
import axios from 'axios';
import Icon from 'react-native-vector-icons/FontAwesome';
import { Svg, Circle, Rect, Line } from 'react-native-svg';
import FrameDashboard from './Component/FrameDashboard';
import {VariableDash} from './Component/VariableDash';

const { height, width } = Dimensions.get('window');
const screenWidth = Dimensions.get("window").width;
// Mencegah splash screen hilang otomatis
SplashScreen.preventAutoHideAsync();

export default function App({ navigation }) {
  const { 
  isVisible, setIsVisible, 
  activeButton, setActiveButton, 
  typeButton, setTypeButton,
  subMenu, setSubMenu, 
  activeSubmenuButton, setActiveSubmenuButton, 
  isModalVisible, setModalVisible, 
  isModalVisibleChartOne, setModalVisibleChartOne, 
  currentDate, setCurrentDate, 
  date, setDate, 
  show, setShow, 
  showStart, setShowStart, 
  showEnd, setShowEnd, 
  formattedDate, setFormattedDate, 
  formattedDateStart, setFormattedDateStart, 
  formattedDateEnd, setFormattedDateEnd, 
  dataDashboard, setDataDashboard, 
  error, setError, 
  startDate, setStartDate, 
  endDate, setEndDate, 
  showStartDatePicker, setShowStartDatePicker, 
  showEndDatePicker, setShowEndDatePicker 
} = useContext(VariableDash);
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
  const chartSize = width * 0.4; // Grafik 40% dari lebar layar (lebih kecil)
  const radius = chartSize / 4; // Radius lingkaran (1/4 dari ukuran chart)
  const circumference = 2 * Math.PI * radius; // Keliling lingkaran
  const data = [
    { percentage: 60, color: '#9b59b6', label: 'Cash' },
    { percentage: 25, color: '#f39c12', label: 'QRIS' },
    { percentage: 15, color: '#2980b9', label: 'GoFood' },
  ];
  let cumulativePercentage = 0;
  const dataProduct = [
    { data:'Original', label: 'O', value: 120, color: '#5041cd' },
    { data:'Hot Spicy', label: 'H', value: 80, color: '#63c380' },
    { data:'Merah Putih', label: 'MP', value: 100, color: '#e76e55' },
    { data:'Kulit', label: 'K', value: 60, color: '#f5a623' },
    { data:'Mozarela', label: 'MZ', value: 76, color: '#9b59b6' },
  ];

  const chartWidth = width * 0.9; // Lebar chart (90% dari lebar layar)
  const chartHeight = 200; // Tinggi chart
  const barWidth = chartWidth / (dataProduct.length * 2); // Lebar tiap batang
  const maxValueBar = Math.max(...dataProduct.map((item) => item.value));
  // Muat font custom
  const [fontsLoaded] = useFonts({
    'HowdyLemon': require('../assets/fonts/HowdyLemon.ttf'),  // Sesuaikan path ke font
  });
   
  const dataPen = [
    { month: "Jul", totalSales: 700, avgSales: 500 },
    { month: "Ags", totalSales: 600, avgSales: 450 },
    { month: "Sep", totalSales: 750, avgSales: 550 },
    { month: "Okt", totalSales: 900, avgSales: 600 },
  ];

  const chartWidthPen = 300; // Lebar grafik
  const chartHeightPen = 200; // Tinggi grafik
  const barWidthPen = 30; // Lebar batang
  const maxValuePen = Math.max(...dataPen.map((item) => item.totalSales)); // Nilai maksimal untuk skala
  const xGap = chartWidth / dataPen.length;

  const fetchData = async () => {
    try {
        const response = await axios.get('http://192.168.115.215/SempolMobileApp/sempolAPI/getDataDashboard.php');
        
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
  fetch('http://192.168.115.215/SempolMobileApp/sempolAPI/insertDataBaru.php', {
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

  const toggleModalChartOne = () => {
    setModalVisibleChartOne(!isModalVisibleChartOne);
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
    if(valueData == 'Pemasukan'){
      setIsVisible('Pemasukan');
      setActiveButton('Pemasukan');
    }else if(valueData == 'Pengeluaran'){
      setIsVisible('NewData');
      setActiveButton('NewData');
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
    <FrameDashboard navigation={navigation}>
      <View>
        <Text style={{ fontFamily:'HowdyLemon', margin:10, fontSize:20, color:'#000000' }}>Statistik Penjualan</Text>
        <Text style={{ fontWeight:'500', fontFamily:'HowdyLemon', marginHorizontal:10, fontSize:10 }}>Periode 1 Sep 2024 - 27 Sep 2024</Text>
      </View>
      <ScrollView style={{ borderWidth:0.5, display:'flex', flex:1, borderColor:'#afaeae', margin:10, padding:20, borderRadius:10, }}>
          <TouchableOpacity style={{ marginTop:10, borderWidth:0.5, borderColor:'#afaeae', borderRadius: 10, color:'#545454', padding:6, justifyContent:'center',}}>
            <Text style={{fontFamily:'HowdyLemon', color:'#545454', padding:5,}}>Semua Pemasukan & Pengeluaran</Text>
          </TouchableOpacity>
          <View style={{ display:'flex', marginTop:25, marginBottom:15, flexDirection:'row', justifyContent:'space-around', alignItems:'center' }}>
              <View style={{ display:'flex', flexDirection:'column' }}>
                  <View style={{ display:'flex', flexDirection:'row', justifyContent:'space-between', alignItems:'center' }}>
                    <Ionicons name="ellipse-outline" size={15} color="#188d00" />
                    <Text style={{ marginHorizontal:5, fontSize:12, fontWeight:'400', fontFamily:'HowdyLemon', }}>Pemasukan</Text>
                  </View>
                  <Text style={{ fontWeight:'600', fontSize:16, fontFamily:'HowdyLemon', marginTop:5 }}>{formatRibuan(pemasukan)}</Text>
              </View>
              <View style={{ display:'flex', flexDirection:'column' }}>
                  <View style={{ display:'flex', flexDirection:'row', justifyContent:'space-between', alignItems:'center' }}>
                    <Ionicons name="ellipse-outline" size={15} color="#8d0000" />
                    <Text style={{ marginHorizontal:5, fontSize:12, fontWeight:'400', fontFamily:'HowdyLemon', }}>Pengeluaran</Text>
                  </View>
                  <Text style={{ fontWeight:'600', fontSize:16, fontFamily:'HowdyLemon', marginTop:5 }}>{formatRibuan(pengeluaran)}</Text>
              </View>
          </View>
          <View style={{ display:'flex', marginBottom:20, justifyContent:'space-around', alignItems:'center' }}>
              <View>
                  <Text style={{ fontWeight:'400', fontSize:15, fontFamily:'HowdyLemon', }}>
                    Selisih 
                    <Text style={[{fontWeight:'600', fontSize:16, fontFamily:'HowdyLemon',}, { color: selisihStyle.color }]}>
                      {selisihStyle.formattedSelisih}
                    </Text>
                  </Text>
              </View>
          </View>
          <View style={{ display:'flex', flex:1, height:height * 0.35, borderWidth:0.5, borderColor:'#afaeae', padding:20, borderRadius:10, }}>
            <TouchableOpacity onPress={toggleModalChartOne} style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'flex-end', paddingHorizontal:10, paddingVertical:20 }}>
              {/* Batang Pemasukan */}
              <View style={{ alignItems: 'center', width: '35%',}}>
                <View style={[{width: '100%', borderRadius: 5,}, { height: `${pemasukanHeight}%`, backgroundColor: '#63c380' }]} />
                <Text style={{ fontSize: 14, marginTop: 10, fontWeight: '600', fontFamily:'HowdyLemon', }}>Pemasukan</Text>
              </View>

              {/* Batang Pengeluaran */}
              <View style={{ alignItems: 'center', width: '35%', }}>
                <View style={[{width: '100%', borderRadius: 5,}, { height: `${pengeluaranHeight}%`, backgroundColor: '#e76e55' }]} />
                <Text style={{ fontSize: 14, marginTop: 10, fontWeight: '600', fontFamily:'HowdyLemon', }}>Pengeluaran</Text>
              </View>
            </TouchableOpacity>
          </View>
          <TouchableOpacity style={{ marginTop:8, borderWidth:0.5, borderColor:'#afaeae', borderRadius: 10, color:'#545454', padding:5, paddingLeft:10, justifyContent:'space-between', flexDirection:'row'}}>
              <Text style={{fontFamily:'HowdyLemon', flex:1, color:'#545454', padding:5,}}>Total Pendapatan Kotor</Text>
              <Text style={{fontFamily:'HowdyLemon', color:'#545454', padding:5,}}>{formatRibuan(pemasukan)}</Text>
          </TouchableOpacity>
          <TouchableOpacity style={{ marginTop:8, borderWidth:0.5, borderColor:'#afaeae', borderRadius: 10, color:'#545454', padding:5, paddingLeft:10, justifyContent:'space-between', flexDirection:'row'}}>
              <Text style={{fontFamily:'HowdyLemon', flex:1, color:'#545454', padding:5,}}>Total Pengeluaran</Text>
              <Text style={{fontFamily:'HowdyLemon', color:'#545454', padding:5,}}>{formatRibuan(pengeluaran)}</Text>
          </TouchableOpacity>
          <TouchableOpacity style={{ marginTop:8, borderWidth:0.5, borderColor:'#afaeae', borderRadius: 10, color:'#545454', padding:5, paddingLeft:10, justifyContent:'space-between', flexDirection:'row'}}>
              <Text style={{fontFamily:'HowdyLemon', flex:1, color:'#545454', padding:5,}}>Total Pendapatan Bersih</Text>
              <Text style={{fontFamily:'HowdyLemon', color:'#545454', padding:5,}}>{formatRibuan(pendapatanBersih)}</Text>
          </TouchableOpacity>
          {/* MODAL */}
          <Modal isVisible={isModalVisibleChartOne} style={{ justifyContent: 'flex-end', margin: 0 }}>
            <View style={{ backgroundColor: 'white', borderRadius: 10, height: height,}}>
              <ScrollView>
                <View style={{backgroundColor:'#d9d9d9', padding:10,}}>
                  <View style={{ display:'flex', flexDirection:'row', justifyContent:'flex-start', alignItems:'center', alignContent:'center' }}>
                    <TouchableOpacity onPress={toggleModalChartOne} style={{ justifyContent:'center', alignItems:'center'}}>
                      <Ionicons name="chevron-back-outline" size={25} color="#545454" />
                    </TouchableOpacity>
                    <TouchableOpacity style={{ padding:6, justifyContent:'center', alignItems:'center'}}>
                      <Text style={{fontFamily:'HowdyLemon', color:'#545454', padding:5, textAlign:'center', fontSize:18}}>Rekap Keuanganmu</Text>
                    </TouchableOpacity>
                  </View>
                  <TouchableOpacity style={{ marginTop:10, padding:6, justifyContent:'center',}}>
                    <Text style={{fontFamily:'HowdyLemon', color:'#545454',}}>Semua Pemasukan & Pengeluaran</Text>
                  </TouchableOpacity>
                  <View style={{ marginTop:8, borderWidth:0.5, borderColor:'#afaeae', borderRadius: 10, color:'#545454', padding:8, paddingLeft:10, justifyContent:'space-between', flexDirection:'row'}}>
                      <Text style={{fontFamily:'HowdyLemon', flex:1, color:'#545454', padding:3,}}>Tanggal Awal</Text>
                      <Text style={{fontFamily:'HowdyLemon', color:'#545454', padding:3,}}>{formattedDate}</Text>
                  </View>
                  <View style={{ marginTop:8, marginBottom:100, borderWidth:0.5, borderColor:'#afaeae', borderRadius: 10, color:'#545454', padding:8, paddingLeft:10, justifyContent:'space-between', flexDirection:'row'}}>
                      <Text style={{fontFamily:'HowdyLemon', flex:1, color:'#545454', padding:3,}}>Tanggal Akhir</Text>
                      <Text style={{fontFamily:'HowdyLemon', color:'#545454', padding:3,}}>{formattedDate}</Text>
                  </View>
                </View>
                <View style={{ flex: 1, elevation:20, marginTop:-70, zIndex:1, backgroundColor:'#FFF', borderWidth:1, borderColor:'#d9d9d9', padding:5, margin:15, borderRadius:20 }}>
                  <View style={{ display:'flex', marginTop:25, marginBottom:15, flexDirection:'row', justifyContent:'space-around', alignItems:'center' }}>
                    <View style={{ display:'flex', flexDirection:'column' }}>
                        <View style={{ display:'flex', flexDirection:'row', justifyContent:'space-between', alignItems:'center' }}>
                          <Ionicons name="ellipse-outline" size={15} color="#188d00" />
                          <Text style={{ marginHorizontal:5, fontSize:12, fontWeight:'400', fontFamily:'HowdyLemon', }}>Pemasukan</Text>
                        </View>
                        <Text style={{ fontWeight:'600', fontSize:16, fontFamily:'HowdyLemon', marginTop:5 }}>{formatRibuan(pemasukan)}</Text>
                    </View>
                    <View style={{ display:'flex', flexDirection:'column' }}>
                        <View style={{ display:'flex', flexDirection:'row', justifyContent:'space-between', alignItems:'center' }}>
                          <Ionicons name="ellipse-outline" size={15} color="#8d0000" />
                          <Text style={{ marginHorizontal:5, fontSize:12, fontWeight:'400', fontFamily:'HowdyLemon', }}>Pengeluaran</Text>
                        </View>
                        <Text style={{ fontWeight:'600', fontSize:16, fontFamily:'HowdyLemon', marginTop:5 }}>{formatRibuan(pengeluaran)}</Text>
                    </View>
                  </View>
                  <View style={{ display:'flex', marginBottom:20, justifyContent:'space-around', alignItems:'center' }}>
                      <View>
                          <Text style={{ fontWeight:'400', fontSize:15, fontFamily:'HowdyLemon', }}>
                            Selisih 
                            <Text style={[{fontWeight:'600', fontSize:16, fontFamily:'HowdyLemon',}, { color: selisihStyle.color }]}>
                              {selisihStyle.formattedSelisih}
                            </Text>
                          </Text>
                      </View>
                  </View>
                </View>
                <View style={{ display:'flex', flex:1, margin:10, padding:10, }}>
                  <View style={{ display:'flex', flex:1, height:height * 0.35, padding:10,}}>
                    <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'flex-end', paddingHorizontal:10, paddingVertical:20 }}>
                      {/* Batang Pemasukan */}
                      <View style={{ alignItems: 'center', width: '35%',}}>
                        <View style={[{width: '100%', borderRadius: 5,}, { height: `${pemasukanHeight}%`, backgroundColor: '#63c380' }]} />
                        <Text style={{ fontSize: 14, marginTop: 10, fontWeight: '600', fontFamily:'HowdyLemon', }}>Pemasukan</Text>
                      </View>

                      {/* Batang Pengeluaran */}
                      <View style={{ alignItems: 'center', width: '35%', }}>
                        <View style={[{width: '100%', borderRadius: 5,}, { height: `${pengeluaranHeight}%`, backgroundColor: '#e76e55' }]} />
                        <Text style={{ fontSize: 14, marginTop: 10, fontWeight: '600', fontFamily:'HowdyLemon', }}>Pengeluaran</Text>
                      </View>
                    </View>
                  </View>
                  <View style={[{ backgroundColor: '#FFF', height: 50, width: '100%', marginVertical: 5, marginTop: 15, paddingHorizontal:5, borderRadius: 30, display: 'flex', flexDirection: 'row', justifyContent: 'space-between', alignItems: 'stretch', borderWidth: 1, borderColor: '#d9d9d9' }]}>
                    <View style={{ flexDirection: 'column', width: '50%', justifyContent: 'center', alignItems: 'center' }}>
                      <TouchableOpacity style={{ backgroundColor: typeButton === 'Pemasukan' ? '#545454' : '#FFF', height: 40, borderRadius: 30, paddingHorizontal: 10, justifyContent: 'center', alignItems: 'center', borderWidth: 2, borderColor: '#d9d9d9', flexDirection: 'row', width: '100%' }}>
                        <Text style={{ color: '#000000', fontWeight: 'bold' }}>
                          <Ionicons name="arrow-down-circle-outline" size={18} color={typeButton === 'Pemasukan' ? '#FFF' : '#545454'} />
                        </Text>
                        <Text style={{ color:typeButton === 'Pemasukan' ? '#FFF' : '#545454', fontWeight: 'bold', fontFamily: 'HowdyLemon', marginHorizontal: 10 }}>Pemasukan</Text>
                      </TouchableOpacity>
                    </View>
                    <View style={{ flexDirection: 'column', width: '50%', justifyContent: 'center', alignItems: 'center' }}>
                      <TouchableOpacity style={{ backgroundColor: typeButton === 'Pengeluaran' ? '#545454' : '#FFF', height: 40, borderRadius: 30, paddingHorizontal: 10, justifyContent: 'center', alignItems: 'center', borderWidth: 2, borderColor: '#d9d9d9', flexDirection: 'row', width: '100%' }}>
                        <Text style={{ color: '#000000', fontWeight: 'bold' }}>
                          <Ionicons name="arrow-up-circle-outline" size={18} color={typeButton === 'Pengeluaran' ? '#FFF' : '#545454'} />
                        </Text>
                        <Text style={{ color:typeButton === 'Pengeluaran' ? '#FFF' : '#545454', fontWeight: 'bold', fontFamily: 'HowdyLemon', marginHorizontal: 10 }}>Pengeluaran</Text>
                      </TouchableOpacity>
                    </View>
                  </View>
                  <TouchableOpacity style={{ marginTop:8, borderWidth:0.5, borderColor:'#afaeae', borderRadius: 10, color:'#545454', padding:5, paddingLeft:10, justifyContent:'space-between', flexDirection:'row'}}>
                      <Text style={{fontFamily:'HowdyLemon', flex:1, color:'#545454', padding:5,}}>Total Pendapatan Kotor</Text>
                      <Text style={{fontFamily:'HowdyLemon', color:'#545454', padding:5,}}>{formatRibuan(pemasukan)}</Text>
                  </TouchableOpacity>
                  <TouchableOpacity style={{ marginTop:8, borderWidth:0.5, borderColor:'#afaeae', borderRadius: 10, color:'#545454', padding:5, paddingLeft:10, justifyContent:'space-between', flexDirection:'row'}}>
                      <Text style={{fontFamily:'HowdyLemon', flex:1, color:'#545454', padding:5,}}>Total Pengeluaran</Text>
                      <Text style={{fontFamily:'HowdyLemon', color:'#545454', padding:5,}}>{formatRibuan(pengeluaran)}</Text>
                  </TouchableOpacity>
                  <TouchableOpacity style={{ marginTop:8, borderWidth:0.5, borderColor:'#afaeae', borderRadius: 10, color:'#545454', padding:5, paddingLeft:10, justifyContent:'space-between', flexDirection:'row'}}>
                      <Text style={{fontFamily:'HowdyLemon', flex:1, color:'#545454', padding:5,}}>Total Pendapatan Bersih</Text>
                      <Text style={{fontFamily:'HowdyLemon', color:'#545454', padding:5,}}>{formatRibuan(pendapatanBersih)}</Text>
                  </TouchableOpacity>
                </View>
              </ScrollView>
            </View>
          </Modal>

          {/* GRAFIK METODE PEMBAYRAN */}
          <TouchableOpacity style={{ marginTop:30, borderWidth:0.5, borderColor:'#afaeae', borderRadius: 10, color:'#545454', padding:6, justifyContent:'center',}}>
            <Text style={{fontFamily:'HowdyLemon', color:'#545454', padding:5,}}>Metode Pembayaran Bulan Berjalan</Text>
          </TouchableOpacity>
          <View style={{ display:'flex', flex:1, marginTop:8, borderWidth:0.5, borderColor:'#afaeae', padding:10, borderRadius:10, justifyContent:'center', alignItems:'center'}}>
            <View style={{ position: "relative", width: '100%', justifyContent:'center', alignItems:'center'}}>
              <Svg height="270" width="270" viewBox="0 0 120 120">
                {data.map((item, index) => {
                  const strokeDasharray = `${(item.percentage / 100) * circumference} ${
                    circumference
                  }`;
                  const strokeDashoffset = cumulativePercentage * circumference;
                  cumulativePercentage += item.percentage / 100;

                  return (
                    <Circle
                      key={index}
                      cx="60"
                      cy="60"
                      r={radius}
                      fill="transparent"
                      stroke={item.color}
                      strokeWidth="20"
                      strokeDasharray={strokeDasharray}
                      strokeDashoffset={-strokeDashoffset}
                      rotation="-90"
                      origin="60,60"
                    />
                  );
                })}
              </Svg>
              <View
                style={{
                  position: "absolute",
                  top: "50%",
                  left: "50%",
                  transform: [{ translateX: -30 }, { translateY: -20 }],
                  alignItems: "center",
                }}
              >
                <Text style={{ fontFamily:'HowdyLemon', fontSize: 14, color: "#333", fontWeight: "600" }}>
                  Total
                </Text>
                <Text style={{ fontFamily:'HowdyLemon', fontSize: 12, color: "#555" }}>Rp1.491.000</Text>
              </View>
            </View>

            {/* Legend */}
            <View
              style={{
                flexDirection: "row",
                justifyContent: "space-between",
                marginBottom: 10,
                width: "80%",
              }}
            >
              {data.map((item, index) => (
                <View
                  key={index}
                  style={{
                    flexDirection: "row",
                    alignItems: "center",
                    marginHorizontal: 10,
                  }}
                >
                  <View
                    style={{
                      width: 15,
                      height: 15,
                      borderRadius: 7.5,
                      backgroundColor: item.color,
                      marginRight: 5,
                    }}
                  />
                  <Text style={{ fontFamily:'HowdyLemon', fontSize: 12, color: "#333" }}>{item.label}</Text>
                </View>
              ))}
            </View>
            {data.map((item, index) => (
              <TouchableOpacity key={index} style={{ marginTop:8, borderWidth:0.5, borderColor:'#afaeae', borderRadius: 10, color:'#545454', padding:5, paddingLeft:10, justifyContent:'space-between', flexDirection:'row'}}>
                  <Text style={{fontFamily:'HowdyLemon', flex:1, color:'#545454', padding:5,}}>{item.label}</Text>
                  <Text style={{fontFamily:'HowdyLemon', color:'#545454', padding:5,}}>{item.percentage}%</Text>
              </TouchableOpacity>
            ))}
          </View>

          {/* GRAFIK PRODUCT TERTINGGI */}
          <TouchableOpacity style={{ marginTop:30, borderWidth:0.5, borderColor:'#afaeae', borderRadius: 10, color:'#545454', padding:6, justifyContent:'center',}}>
            <Text style={{fontFamily:'HowdyLemon', color:'#545454', padding:5,}}>Produk Tertinggi Bulan Berjalan</Text>
          </TouchableOpacity>
          <View style={{ display:'flex', flex:1, marginTop:8, borderWidth:0.5, borderColor:'#afaeae', padding:10, borderRadius:10, justifyContent:'center', alignItems:'center'}}>
            <View style={{ position: "relative", width: '100%', justifyContent:'center', alignItems:'center'}}>
              <Svg height={chartHeight} width={chartWidth}>
                {dataProduct.map((item, index) => {
                  const barHeight = (item.value / maxValueBar) * chartHeight; // Skala tinggi batang

                  return (
                    <Rect
                      key={index}
                      x={index * barWidth * 2 + barWidth / 2} // Posisi horizontal
                      y={chartHeight - barHeight} // Posisi vertikal
                      width={barWidth} // Lebar batang
                      height={barHeight} // Tinggi batang
                      fill={item.color} // Warna batang
                      rx={5} // Sudut melengkung
                      ry={5}
                    />
                  );
                })}
              </Svg>
              <View
                style={{
                  flexDirection: 'row',
                  justifyContent: 'space-between',
                  marginTop: 10,
                }}
              >
                {dataProduct.map((item, index) => (
                  <Text
                    key={index}
                    style={{
                      fontSize: 12,
                      fontFamily:'HowdyLemon',
                      color: '#333',
                      textAlign: 'center',
                      width: barWidth * 2, // Lebar label sesuai jarak antar batang
                    }}
                  >
                    {item.label}
                  </Text>
                ))}
              </View>
              {dataProduct.map((item, index) => (
                <TouchableOpacity key={index} style={{ marginTop:8, borderWidth:0.5, borderColor:'#afaeae', borderRadius: 10, color:'#545454', padding:5, paddingLeft:10, justifyContent:'space-between', flexDirection:'row'}}>
                  <Text style={{fontFamily:'HowdyLemon', flex:1, color:'#545454', padding:5,}}>{item.data} ({item.label})</Text>
                  <Text style={{fontFamily:'HowdyLemon', color:'#545454', padding:5,}}>{item.value} Pcs</Text>
                </TouchableOpacity>
              ))}
            </View>
          </View>

          {/* GRAFIK CABANG */}
          <TouchableOpacity style={{ marginTop:30, borderWidth:0.5, borderColor:'#afaeae', borderRadius: 10, color:'#545454', padding:6, justifyContent:'center',}}>
            <Text style={{fontFamily:'HowdyLemon', color:'#545454', padding:5,}}>Total dan Rata-Rata Penjualan 4 Bulan Terakhir</Text>
          </TouchableOpacity>
          <View style={{ display:'flex', flex:1, marginTop:8, borderWidth:0.5, borderColor:'#afaeae', padding:10, borderRadius:10, justifyContent:'center', alignItems:'center'}}>
            <View style={{ position: "relative", width: '100%', justifyContent:'center', alignItems:'center'}}>
            <Svg height={chartHeightPen + 50} width={chartWidthPen}>
              {/* Batang untuk total sales */}
              {dataPen.map((item, index) => {
                const barHeightPen = (item.totalSales / maxValuePen) * chartHeight; // Skala tinggi batang
                return (
                  <Rect
                    key={`bar-${index}`}
                    x={index * xGap + barWidthPen / 2}
                    y={chartHeightPen - barHeightPen}
                    width={barWidthPen}
                    height={barHeightPen}
                    fill="#5041cd" // Warna batang
                    rx={3} // Sudut melengkung
                    ry={3}
                  />
                );
              })}

              {/* Garis untuk rata-rata sales */}
              {dataPen.map((item, index) => {
                if (index === dataPen.length - 1) return null; // Hindari data terakhir
                const x1 = index * xGap + xGap / 2;
                const y1 =
                  chartHeightPen - (dataPen[index].avgSales / maxValuePen) * chartHeightPen;
                const x2 = (index + 1) * xGap + xGap / 2;
                const y2 =
                  chartHeightPen - (dataPen[index + 1].avgSales / maxValuePen) * chartHeightPen;

                return (
                  <Line
                    key={`line-${index}`}
                    x1={x1}
                    y1={y1}
                    x2={x2}
                    y2={y2}
                    stroke="#e76e55" // Warna garis
                    strokeWidth={2}
                  />
                );
              })}

              {/* Titik untuk rata-rata sales */}
              {dataPen.map((item, index) => {
                const cx = index * xGap + xGap / 2;
                const cy =
                  chartHeightPen - (item.avgSales / maxValuePen) * chartHeightPen;

                return (
                  <Circle key={`circle-${index}`} cx={cx} cy={cy} r={5} fill="#63c380" />
                );
              })}
            </Svg>

            {/* Label Bulan */}
            <View style={{ flexDirection: "row", justifyContent: "space-between", marginTop: 10, width: chartWidth }}>
              {dataPen.map((item, index) => (
                <Text key={`label-${index}`} style={{ fontFamily:'HowdyLemon', fontSize: 12, textAlign: "center", flex: 1 }}>
                  {item.month}
                </Text>
              ))}
            </View>
            {dataPen.map((item, index) => (
                <TouchableOpacity key={index} style={{ marginTop:8, borderWidth:0.5, borderColor:'#afaeae', borderRadius: 10, color:'#545454', padding:5, paddingLeft:10, justifyContent:'space-between', flexDirection:'row'}}>
                  <Text style={{fontFamily:'HowdyLemon', flex:1, color:'#545454', padding:5,}}>{item.month}</Text>
                  <Text style={{fontFamily:'HowdyLemon', color:'#545454', padding:5,}}>Total : {item.totalSales}</Text>
                  <Text style={{fontFamily:'HowdyLemon', color:'#545454', padding:5,}}>AVG : {item.avgSales}</Text>
                </TouchableOpacity>
              ))}
            </View>
          </View>
      </ScrollView>
    </FrameDashboard>
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
