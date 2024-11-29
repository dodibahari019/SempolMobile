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
import MainFrame from './Component/FrameDashboard';
import {VariableDash} from './Component/VariableDash';

const { height, width } = Dimensions.get('window');
const screenWidth = Dimensions.get("window").width;
// Mencegah splash screen hilang otomatis
SplashScreen.preventAutoHideAsync();

export default function App({ navigation }) {
  const { isVisible, activeButton, subMenu, activeSubmenuButton, isModalVisible,
    isModalVisibleChartOne, currentDate, date, show, showStart, showEnd, formattedDate,
    formattedDateStart, formattedDateEnd, dataDashboard, error, startDate, endDate,
    showStartDatePicker, showEndDatePicker
  } = useContext(VariableDash);

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
    <MainFrame>
       ....
    </MainFrame>
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
