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

const { height, width } = Dimensions.get('window');
// Mencegah splash screen hilang otomatis
SplashScreen.preventAutoHideAsync();

export default function App({ navigation, children }) {
  const [activeButton, setActiveButton] = useState('Beranda');
  return (
    <ScrollView contentContainerStyle={{ flexGrow: 1 }} style={{ backgroundColor:'#d9d9d9', marginTop:20}}>
            <StatusBar barStyle='dark-content' backgroundColor='#d9d9d9'/>
            <View style={{ backgroundColor:'#d9d9d9',}}>
                <View style={styles.Header}>
                    <View>
                        <Image 
                          source={require('../../files/sempolAyam.png')}
                          style={{ width: 135, height: 40 , elevation:20}}
                        />
                    </View>
                    <TouchableOpacity style={styles.iconHeader}>
                        <Ionicons name="log-out-outline" size={20} color="#8d0000" />
                        <Text style={styles.FirstText}>Keluar</Text>
                    </TouchableOpacity>
                </View>
                <View style={{ backgroundColor:'#d9d9d9', paddingHorizontal:10, paddingVertical:10 }}>
                    <View style={{ display:'flex', flexDirection:'row', justifyContent:'flex-start', alignItems:'center'}}>
                        <Ionicons name="person-circle-outline" size={40} color="#000000" />
                        <Text style={{ marginHorizontal:10, fontSize:20, fontFamily: 'HowdyLemon' }}>Hi, Andy Setiady!</Text>
                    </View>
                </View>
            </View>
            <ScrollView contentContainerStyle={{ flexGrow: 1 }} style={{ backgroundColor:'#e8e7e7', borderRadius:30, bottom:0, display:'flex', marginTop:3 }}>
                <View style={[{backgroundColor:'#e8e7e7', height:65, marginHorizontal:5, marginVertical:5, borderRadius:30, display:'flex', flexDirection:'row', justifyContent:'space-between', alignItems:'center',}, {marginTop:10, borderWidth:1, borderColor:'#d9d9d9'}]}>
                    <View style={{ display:'flex', flexDirection:'column', justifyContent:'space-between', alignItems:'center' }}>
                      <TouchableOpacity style={{ backgroundColor: activeButton === 'Beranda' ? '#545454' : '#e8e7e7', height:50, width:50, borderRadius:30,paddingHorizontal:10, marginHorizontal:10, justifyContent:'center', alignItems:'center', borderWidth:2, borderColor:'#d9d9d9' }}>
                        <Text style={{ color:'#000000', fontWeight:'bold' }}>
                          <Ionicons name="home-outline" size={25} color= {activeButton === 'Beranda' ? '#e8e7e7' : '#000000'} />
                        </Text>
                      </TouchableOpacity>
                    </View>
                    <View style={{ display:'flex', flexDirection:'column', justifyContent:'space-between', alignItems:'center' }}>
                      <TouchableOpacity style={{ backgroundColor: activeButton === 'NewData' ? '#545454' : '#e8e7e7', height:50, width:50, borderRadius:30,paddingHorizontal:10, marginHorizontal:10, justifyContent:'center', alignItems:'center', borderWidth:2, borderColor:'#d9d9d9' }}>
                        <Text style={{ color:'#000000', fontWeight:'bold' }}>
                          <Ionicons name="add-circle-outline" size={25} color= {activeButton === 'NewData' ? '#e8e7e7' : '#000000'} />
                        </Text>
                      </TouchableOpacity>
                    </View>
                     <View style={{ display:'flex', flexDirection:'column', justifyContent:'space-between', alignItems:'center' }}>
                      <TouchableOpacity onPress={fungsiTombol.bind(this, 'Laporan')} style={{ backgroundColor: activeButton === 'Laporan' ? '#545454' : '#e8e7e7', height:50, width:50, borderRadius:30,paddingHorizontal:10, marginHorizontal:10, justifyContent:'center', alignItems:'center', borderWidth:2, borderColor:'#d9d9d9' }}>
                        <Text style={{ color:'#000000', fontWeight:'bold' }}>
                          <Ionicons name="documents-outline" size={25} color= {activeButton === 'Laporan' ? '#e8e7e7' : '#000000'} />
                        </Text>
                      </TouchableOpacity>
                    </View>
                    <View style={{ display:'flex', flexDirection:'column', justifyContent:'space-between', alignItems:'center' }}>
                      <TouchableOpacity style={{ backgroundColor: activeButton === 'Setting' ? '#545454' : '#e8e7e7', height:50, width:50, borderRadius:30,paddingHorizontal:10, marginHorizontal:10, justifyContent:'center', alignItems:'center', borderWidth:2, borderColor:'#d9d9d9' }}>
                        <Text style={{ color:'#000000', fontWeight:'bold' }}>
                          <Ionicons name="settings-outline" size={25} color= {activeButton === 'Setting' ? '#e8e7e7' : '#000000'} />
                        </Text>
                      </TouchableOpacity>
                    </View>
                </View>
            </ScrollView>
        </ScrollView>
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
