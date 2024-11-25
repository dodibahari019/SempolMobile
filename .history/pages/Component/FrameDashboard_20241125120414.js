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


  // Dapatkan style dan format selisih berdasarkan nili
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
    <ScrollView contentContainerStyle={{ flexGrow: 1 }} style={{ backgroundColor:'#d9d9d9', marginTop:20}}>
            <StatusBar barStyle='dark-content' backgroundColor='#d9d9d9'/>
            <View style={{ backgroundColor:'#d9d9d9',}}>
                <View style={styles.Header}>
                    <View>
                        <Image 
                          source={require('../files/sempolAyam.png')}
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
                      <TouchableOpacity onPress={() => fungsiTombol('Beranda')} style={{ backgroundColor: activeButton === 'Beranda' ? '#545454' : '#e8e7e7', height:50, width:50, borderRadius:30,paddingHorizontal:10, marginHorizontal:10, justifyContent:'center', alignItems:'center', borderWidth:2, borderColor:'#d9d9d9' }}>
                        <Text style={{ color:'#000000', fontWeight:'bold' }}>
                          <Ionicons name="home-outline" size={25} color= {activeButton === 'Beranda' ? '#e8e7e7' : '#000000'} />
                        </Text>
                      </TouchableOpacity>
                    </View>
                    <View style={{ display:'flex', flexDirection:'column', justifyContent:'space-between', alignItems:'center' }}>
                      <TouchableOpacity onPress={fungsiTombol.bind(this, 'NewData')} style={{ backgroundColor: activeButton === 'NewData' ? '#545454' : '#e8e7e7', height:50, width:50, borderRadius:30,paddingHorizontal:10, marginHorizontal:10, justifyContent:'center', alignItems:'center', borderWidth:2, borderColor:'#d9d9d9' }}>
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
                      <TouchableOpacity onPress={() => fungsiTombol('Setting')} style={{ backgroundColor: activeButton === 'Setting' ? '#545454' : '#e8e7e7', height:50, width:50, borderRadius:30,paddingHorizontal:10, marginHorizontal:10, justifyContent:'center', alignItems:'center', borderWidth:2, borderColor:'#d9d9d9' }}>
                        <Text style={{ color:'#000000', fontWeight:'bold' }}>
                          <Ionicons name="settings-outline" size={25} color= {activeButton === 'Setting' ? '#e8e7e7' : '#000000'} />
                        </Text>
                      </TouchableOpacity>
                    </View>
                </View>
                {isVisible == 'Beranda' && (
                  <View>
                    <Text style={{ fontFamily:'HowdyLemon', margin:10, fontSize:20, color:'#000000' }}>Rekap Keuanganmu</Text>
                    <Text style={{ fontWeight:'500', fontFamily:'HowdyLemon', marginHorizontal:10, fontSize:10 }}>Periode 1 Sep 2024 - 27 Sep 2024</Text>
                  </View>
                )}
                {isVisible == 'Beranda' && (
                  <ScrollView style={{ borderWidth:0.5, display:'flex', flex:1, borderColor:'#afaeae', margin:10, padding:20, borderRadius:10, }}>
                      <TouchableOpacity>
                          <TextInput style={{ fontFamily:'HowdyLemon', borderWidth:0.5, borderColor:'#afaeae', borderRadius: 10, color:'#545454', padding:10}} value="Semua Pemasukan & Pengeluaran" editable={false} />
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
                      <View style={{ display:'flex', flex:1, height:height * 0.35, borderWidth:0.5, borderColor:'#afaeae', margin:10, padding:20, borderRadius:10, }}>
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
                  </ScrollView>
                )}
                {isVisible == 'NewData' && (
                  <View>
                    <View style={{ borderWidth:0.5, display:'flex', flex:1, borderColor:'#afaeae', margin:10, paddingHorizontal:20, borderRadius:10, }}>
                        <View>
                            <TouchableOpacity>
                                <TextInput style={{ justifyContent:'center', fontFamily:'HowdyLemon', fontSize:16, fontWeight:'600', alignItems:'center', textAlign:'center', borderColor:'#afaeae', borderRadius: 10, color:'#545454', padding:10, marginTop:5}} value="Create Data Baru" editable={false} />
                            </TouchableOpacity>
                        </View>
                        <TouchableOpacity onPress={() => setShow(true)} style={{ marginTop:8, borderWidth:0.5, borderColor:'#afaeae', borderRadius: 10, color:'#545454', padding:8, paddingLeft:10, justifyContent:'space-between', textAlign:'center', alignItems:'center', flexDirection:'row'}}>
                          <Text style={{fontFamily:'HowdyLemon', flex:1, color:'#545454', padding:3,}}>Tanggal</Text>
                          <Text style={{fontFamily:'HowdyLemon', color:'#545454', padding:3,}}>{formattedDate}</Text>
                        </TouchableOpacity>

                        {show && (
                          <DateTimePicker
                            value={date}
                            mode="date"
                            display="default"
                            onChange={onChange}
                          />
                        )}
                        <View style={[{ marginVertical:10,  }, { borderWidth:0.5, borderColor:'#afaeae', elevation:10, fontWeight:'bold', backgroundColor:'#e8e7e7', borderRadius: 10, color:'#545454', padding:10, marginBottom:30}]}>
                            <View>
                                <TextInput style={{ justifyContent:'center', fontFamily:'HowdyLemon', fontSize:16, fontWeight:'600', alignItems:'center', textAlign:'center', borderColor:'#afaeae', borderWidth:0.5, borderRadius: 10, color:'#545454', padding:10, marginBottom:20}} value="Stock Awal" editable={false} />
                            </View>
                            <View style={{ display:'flex', flex:1, flexDirection:'row', justifyContent:'space-between', alignItems:'center' }}>
                              <Text style={{ flex:1, fontWeight:'500', fontSize:12, marginRight:5, fontFamily:'HowdyLemon', }}>Ori (O)</Text>
                              <Text style={{ fontWeight:'500', fontSize:12, marginRight:5, fontFamily:'HowdyLemon', }}> : </Text>
                              <TextInput value={stockAwalO.toLocaleString()}
                                keyboardType='numeric'
                                onChangeText={text => setStockAwalO(text)}
                                style={{ fontSize:15, fontWeight:'bold', width:150, margin:5, borderWidth:1, paddingVertical:5, paddingHorizontal:10, borderColor:'#afaeae', borderRadius: 10, color:'#545454', textAlign:'right'}}
                              />
                            </View>
                            <View style={{ display:'flex', flex:1, flexDirection:'row', justifyContent:'space-between', alignItems:'center' }}>
                              <Text style={{ fontWeight:'500', flex:1, fontSize:12, marginRight:5, fontFamily:'HowdyLemon', }}>Jamur (J)</Text>
                              <Text style={{ fontWeight:'500', fontSize:12, marginRight:5, fontFamily:'HowdyLemon', }}> : </Text>
                              <TextInput value={stockAwalJ.toLocaleString()} keyboardType='numeric' onChangeText={text => setStockAwalJ(text)} style={{ fontSize:15, fontWeight:'bold', width:150, margin:5, borderWidth:1, paddingVertical:5, paddingHorizontal:10, borderColor:'#afaeae', borderRadius: 10, color:'#545454', textAlign:'right'}} />
                            </View>
                            <View style={{ display:'flex', flex:1, flexDirection:'row', justifyContent:'space-between', alignItems:'center' }}>
                              <Text style={{ fontWeight:'500', flex:1, fontSize:12, marginRight:5, fontFamily:'HowdyLemon', }}>Hot Spicy (H)</Text>
                              <Text style={{ fontWeight:'500', fontSize:12, marginRight:5, fontFamily:'HowdyLemon', }}> : </Text>
                              <TextInput value={stockAwalH.toLocaleString()} keyboardType='numeric' onChangeText={text => setStockAwalH(text)} style={{ fontSize:15, fontWeight:'bold', width:150, margin:5, borderWidth:1, paddingVertical:5, paddingHorizontal:10, borderColor:'#afaeae', borderRadius: 10, color:'#545454', textAlign:'right'}} />
                            </View>
                            <View style={{ display:'flex', flex:1, flexDirection:'row', justifyContent:'space-between', alignItems:'center' }}>
                              <Text style={{ fontWeight:'500', flex:1, fontSize:12, marginRight:5, fontFamily:'HowdyLemon', }}>Merah Putih (MP)</Text>
                              <Text style={{ fontWeight:'500', fontSize:12, marginRight:5, fontFamily:'HowdyLemon', }}> : </Text>
                              <TextInput value={stockAwalMP.toLocaleString()} keyboardType='numeric' onChangeText={text => setStockAwalMP(text)} style={{ fontSize:15, fontWeight:'bold', width:150, margin:5, borderWidth:1, paddingVertical:5, paddingHorizontal:10, borderColor:'#afaeae', borderRadius: 10, color:'#545454', textAlign:'right'}} />
                            </View>
                            <View style={{ display:'flex', flex:1, flexDirection:'row', justifyContent:'space-between', alignItems:'center' }}>
                              <Text style={{ fontWeight:'500', flex:1, fontSize:12, marginRight:5, fontFamily:'HowdyLemon', }}>Kulit (K)</Text>
                              <Text style={{ fontWeight:'500', fontSize:12, marginRight:5, fontFamily:'HowdyLemon', }}> : </Text>
                              <TextInput value={stockAwalK.toLocaleString()} keyboardType='numeric' onChangeText={text => setStockAwalK(text)} style={{ fontSize:15, fontWeight:'bold', width:150, margin:5, borderWidth:1, paddingVertical:5, paddingHorizontal:10, borderColor:'#afaeae', borderRadius: 10, color:'#545454', textAlign:'right'}} />
                            </View>
                        </View>
                        {/* STOCK AKHIR */}
                        <View style={[{ marginVertical:10,  }, { borderWidth:0.5, borderColor:'#afaeae', elevation:10, fontWeight:'bold', backgroundColor:'#e8e7e7', borderRadius: 10, color:'#545454', padding:10, marginBottom:30}]}>
                          <View>
                            <TextInput style={{ justifyContent:'center', fontFamily:'HowdyLemon', fontSize:16, fontWeight:'600', alignItems:'center', textAlign:'center', borderColor:'#afaeae', borderWidth:0.5, borderRadius: 10, color:'#545454', padding:10, marginBottom:20}} value="Stock Akhir" editable={false} />
                          </View>
                          <View style={{ display:'flex', flex:1, flexDirection:'row', justifyContent:'space-between', alignItems:'center' }}>
                            <Text style={{ fontWeight:'500', flex:1, fontSize:12, marginRight:5, fontFamily:'HowdyLemon', }}>Ori (O)</Text>
                            <Text style={{ fontWeight:'500', fontSize:12, marginRight:5, fontFamily:'HowdyLemon', }}> : </Text>
                            <TextInput value={stockAkhirO.toLocaleString()} keyboardType='numeric' onChangeText={text => setStockAkhirO(text)} style={{ fontSize:15, fontWeight:'bold', width:150, margin:5, borderWidth:1, paddingVertical:5, paddingHorizontal:10, borderColor:'#afaeae', borderRadius: 10, color:'#545454', textAlign:'right'}} />
                          </View>
                          <View style={{ display:'flex', flex:1, flexDirection:'row', justifyContent:'space-between', alignItems:'center' }}>
                            <Text style={{ fontWeight:'500', flex:1, fontSize:12, marginRight:5, fontFamily:'HowdyLemon', }}>Jamur (J)</Text>
                            <Text style={{ fontWeight:'500', fontSize:12, marginRight:5, fontFamily:'HowdyLemon', }}> : </Text>
                            <TextInput value={stockAkhirJ.toLocaleString()} keyboardType='numeric' onChangeText={text => setStockAkhirJ(text)} style={{ fontSize:15, fontWeight:'bold', width:150, margin:5, borderWidth:1, paddingVertical:5, paddingHorizontal:10, borderColor:'#afaeae', borderRadius: 10, color:'#545454', textAlign:'right'}} />
                          </View>
                          <View style={{ display:'flex', flex:1, flexDirection:'row', justifyContent:'space-between', alignItems:'center' }}>
                            <Text style={{ fontWeight:'500', flex:1, fontSize:12, marginRight:5, fontFamily:'HowdyLemon', }}>Hot Spicy (H)</Text>
                            <Text style={{ fontWeight:'500', fontSize:12, marginRight:5, fontFamily:'HowdyLemon', }}> : </Text>
                            <TextInput value={stockAkhirH.toLocaleString()} keyboardType='numeric' onChangeText={text => setStockAkhirH(text)} style={{ fontSize:15, fontWeight:'bold', width:150, margin:5, borderWidth:1, paddingVertical:5, paddingHorizontal:10, borderColor:'#afaeae', borderRadius: 10, color:'#545454', textAlign:'right'}} />
                          </View>
                          <View style={{ display:'flex', flex:1, flexDirection:'row', justifyContent:'space-between', alignItems:'center' }}>
                            <Text style={{ fontWeight:'500', flex:1, fontSize:12, marginRight:5, fontFamily:'HowdyLemon', }}>Merah Putih (MP)</Text>
                            <Text style={{ fontWeight:'500', fontSize:12, marginRight:5, fontFamily:'HowdyLemon', }}> : </Text>
                            <TextInput value={stockAkhirMP.toLocaleString()} keyboardType='numeric' onChangeText={text => setStockAkhirMP(text)} style={{ fontSize:15, fontWeight:'bold', width:150, margin:5, borderWidth:1, paddingVertical:5, paddingHorizontal:10, borderColor:'#afaeae', borderRadius: 10, color:'#545454', textAlign:'right'}} />
                          </View>
                          <View style={{ display:'flex', flex:1, flexDirection:'row', justifyContent:'space-between', alignItems:'center' }}>
                            <Text style={{ fontWeight:'500', flex:1, fontSize:12, marginRight:5, fontFamily:'HowdyLemon', }}>Kulit (K)</Text>
                            <Text style={{ fontWeight:'500', fontSize:12, marginRight:5, fontFamily:'HowdyLemon', }}> : </Text>
                            <TextInput value={stockAkhirK.toLocaleString()} keyboardType='numeric' onChangeText={text => setStockAkhirK(text)} style={{ fontSize:15, fontWeight:'bold', width:150, margin:5, borderWidth:1, paddingVertical:5, paddingHorizontal:10, borderColor:'#afaeae', borderRadius: 10, color:'#545454', textAlign:'right'}} />
                          </View>
                        </View>
                        {/* STOCK KELEBIHAN */}
                        <View style={[{ marginVertical:10,  }, { borderWidth:0.5, borderColor:'#afaeae', elevation:10, fontWeight:'bold', backgroundColor:'#e8e7e7', borderRadius: 10, color:'#545454', padding:10, marginBottom:30}]}>
                          <View>
                            <TextInput style={{ justifyContent:'center', fontFamily:'HowdyLemon', fontSize:16, fontWeight:'600', alignItems:'center', textAlign:'center', borderColor:'#afaeae', borderWidth:0.5, borderRadius: 10, color:'#545454', padding:10, marginBottom:20}} value="Stock Kelebihan" editable={false} />
                          </View>
                          <View style={{ display:'flex', flex:1, flexDirection:'row', justifyContent:'space-between', alignItems:'center' }}>
                            <Text style={{ fontWeight:'500', flex:1, fontSize:12, marginRight:5, fontFamily:'HowdyLemon', }}>Ori (O)</Text>
                            <Text style={{ fontWeight:'500', fontSize:12, marginRight:5, fontFamily:'HowdyLemon', }}> : </Text>
                            <TextInput value={stockKelebihanO.toLocaleString()} keyboardType='numeric' onChangeText={text => setStockKelebihanO(text)} style={{ fontSize:15, fontWeight:'bold', width:150, margin:5, borderWidth:1, paddingVertical:5, paddingHorizontal:10, borderColor:'#afaeae', borderRadius: 10, color:'#545454', textAlign:'right'}} />
                          </View>
                          <View style={{ display:'flex', flex:1, flexDirection:'row', justifyContent:'space-between', alignItems:'center' }}>
                            <Text style={{ fontWeight:'500', flex:1, fontSize:12, marginRight:5, fontFamily:'HowdyLemon', }}>Jamur (J)</Text>
                            <Text style={{ fontWeight:'500', fontSize:12, marginRight:5, fontFamily:'HowdyLemon', }}> : </Text>
                            <TextInput value={stockKelebihanJ.toLocaleString()} keyboardType='numeric' onChangeText={text => setStockKelebihanJ(text)} style={{ fontSize:15, fontWeight:'bold', width:150, margin:5, borderWidth:1, paddingVertical:5, paddingHorizontal:10, borderColor:'#afaeae', borderRadius: 10, color:'#545454', textAlign:'right'}} />
                          </View>
                          <View style={{ display:'flex', flex:1, flexDirection:'row', justifyContent:'space-between', alignItems:'center' }}>
                            <Text style={{ fontWeight:'500', flex:1, fontSize:12, marginRight:5, fontFamily:'HowdyLemon', }}>Hot Spicy (H)</Text>
                            <Text style={{ fontWeight:'500', fontSize:12, marginRight:5, fontFamily:'HowdyLemon', }}> : </Text>
                            <TextInput value={stockKelebihanH.toLocaleString()} keyboardType='numeric' onChangeText={text => setStockKelebihanH(text)} style={{ fontSize:15, fontWeight:'bold', width:150, margin:5, borderWidth:1, paddingVertical:5, paddingHorizontal:10, borderColor:'#afaeae', borderRadius: 10, color:'#545454', textAlign:'right'}} />
                          </View>
                          <View style={{ display:'flex', flex:1, flexDirection:'row', justifyContent:'space-between', alignItems:'center' }}>
                            <Text style={{ fontWeight:'500', flex:1, fontSize:12, marginRight:5, fontFamily:'HowdyLemon', }}>Merah Putih (MP)</Text>
                            <Text style={{ fontWeight:'500', fontSize:12, marginRight:5, fontFamily:'HowdyLemon', }}> : </Text>
                            <TextInput value={stockKelebihanMP.toLocaleString()} keyboardType='numeric' onChangeText={text => setStockKelebihanMP(text)} style={{ fontSize:15, fontWeight:'bold', width:150, margin:5, borderWidth:1, paddingVertical:5, paddingHorizontal:10, borderColor:'#afaeae', borderRadius: 10, color:'#545454', textAlign:'right'}} />
                          </View>
                          <View style={{ display:'flex', flex:1, flexDirection:'row', justifyContent:'space-between', alignItems:'center' }}>
                            <Text style={{ fontWeight:'500', flex:1, fontSize:12, marginRight:5, fontFamily:'HowdyLemon', }}>Kulit (K)</Text>
                            <Text style={{ fontWeight:'500', fontSize:12, marginRight:5, fontFamily:'HowdyLemon', }}> : </Text>
                            <TextInput value={stockKelebihanK.toLocaleString()} keyboardType='numeric' onChangeText={text => setStockKelebihanK(text)} style={{ fontSize:15, fontWeight:'bold', width:150, margin:5, borderWidth:1, paddingVertical:5, paddingHorizontal:10, borderColor:'#afaeae', borderRadius: 10, color:'#545454', textAlign:'right'}} />
                          </View>
                        </View>
                        {/* STOCK KEKURANGAN */}
                        <View style={[{ marginVertical:10,  }, { borderWidth:0.5, borderColor:'#afaeae', elevation:10, fontWeight:'bold', backgroundColor:'#e8e7e7', borderRadius: 10, color:'#545454', padding:10, marginBottom:30}]}>
                          <View>
                                <TextInput style={{ justifyContent:'center', fontFamily:'HowdyLemon', fontSize:16, fontWeight:'600', alignItems:'center', textAlign:'center', borderColor:'#afaeae', borderWidth:0.5, borderRadius: 10, color:'#545454', padding:10, marginBottom:20}} value="Stock Kekurangan" editable={false} />
                          </View>
                          <View style={{ display:'flex', flex:1, flexDirection:'row', justifyContent:'space-between', alignItems:'center' }}>
                            <Text style={{ fontWeight:'500', flex:1, fontSize:12, marginRight:5, fontFamily:'HowdyLemon', }}>Ori (O)</Text>
                            <Text style={{ fontWeight:'500', fontSize:12, marginRight:5, fontFamily:'HowdyLemon', }}> : </Text>
                            <TextInput value={stockKekuranganO.toLocaleString()} keyboardType='numeric' onChangeText={text => setStockKekuranganO(text)} style={{ fontSize:15, fontWeight:'bold', width:150, margin:5, borderWidth:1, paddingVertical:5, paddingHorizontal:10, borderColor:'#afaeae', borderRadius: 10, color:'#545454', textAlign:'right'}} />
                          </View>
                          <View style={{ display:'flex', flex:1, flexDirection:'row', justifyContent:'space-between', alignItems:'center' }}>
                            <Text style={{ fontWeight:'500', flex:1, fontSize:12, marginRight:5, fontFamily:'HowdyLemon', }}>Jamur (J)</Text>
                            <Text style={{ fontWeight:'500', fontSize:12, marginRight:5, fontFamily:'HowdyLemon', }}> : </Text>
                            <TextInput value={stockKekuranganJ.toLocaleString()} keyboardType='numeric' onChangeText={text => setStockKekuranganJ(text)} style={{ fontSize:15, fontWeight:'bold', width:150, margin:5, borderWidth:1, paddingVertical:5, paddingHorizontal:10, borderColor:'#afaeae', borderRadius: 10, color:'#545454', textAlign:'right'}} />
                          </View>
                          <View style={{ display:'flex', flex:1, flexDirection:'row', justifyContent:'space-between', alignItems:'center' }}>
                            <Text style={{ fontWeight:'500', flex:1, fontSize:12, marginRight:5, fontFamily:'HowdyLemon', }}>Hot Spicy (H)</Text>
                            <Text style={{ fontWeight:'500', fontSize:12, marginRight:5, fontFamily:'HowdyLemon', }}> : </Text>
                            <TextInput value={stockKekuranganH.toLocaleString()} keyboardType='numeric' onChangeText={text => setStockKekuranganH(text)} style={{ fontSize:15, fontWeight:'bold', width:150, margin:5, borderWidth:1, paddingVertical:5, paddingHorizontal:10, borderColor:'#afaeae', borderRadius: 10, color:'#545454', textAlign:'right'}} />
                          </View>
                          <View style={{ display:'flex', flex:1, flexDirection:'row', justifyContent:'space-between', alignItems:'center' }}>
                            <Text style={{ fontWeight:'500', flex:1, fontSize:12, marginRight:5, fontFamily:'HowdyLemon', }}>Merah Putih (MP)</Text>
                            <Text style={{ fontWeight:'500', fontSize:12, marginRight:5, fontFamily:'HowdyLemon', }}> : </Text>
                            <TextInput value={stockKekuranganMP.toLocaleString()} keyboardType='numeric' onChangeText={text => setStockKekuranganMP(text)} style={{ fontSize:15, fontWeight:'bold', width:150, margin:5, borderWidth:1, paddingVertical:5, paddingHorizontal:10, borderColor:'#afaeae', borderRadius: 10, color:'#545454', textAlign:'right'}} />
                          </View>
                          <View style={{ display:'flex', flex:1, flexDirection:'row', justifyContent:'space-between', alignItems:'center' }}>
                            <Text style={{ fontWeight:'500', flex:1, fontSize:12, marginRight:5, fontFamily:'HowdyLemon', }}>Kulit (K)</Text>
                            <Text style={{ fontWeight:'500', fontSize:12, marginRight:5, fontFamily:'HowdyLemon', }}> : </Text>
                            <TextInput value={stockKekuranganK.toLocaleString()} keyboardType='numeric' onChangeText={text => setStockKekuranganK(text)} style={{ fontSize:15, fontWeight:'bold', width:150, margin:5, borderWidth:1, paddingVertical:5, paddingHorizontal:10, borderColor:'#afaeae', borderRadius: 10, color:'#545454', textAlign:'right'}} />
                          </View>
                        </View>
                        {/* BS */}
                        <View style={[{ marginVertical:10,  }, { borderWidth:0.5, borderColor:'#afaeae', elevation:10, fontWeight:'bold', backgroundColor:'#e8e7e7', borderRadius: 10, color:'#545454', padding:10, marginBottom:30}]}>
                            <View>
                                <TextInput style={{ justifyContent:'center', fontFamily:'HowdyLemon', fontSize:16, fontWeight:'600', alignItems:'center', textAlign:'center', borderColor:'#afaeae', borderWidth:0.5, borderRadius: 10, color:'#545454', padding:10, marginBottom:20}} value="Produk Gagal (BS)" editable={false} />
                            </View>
                            <View style={{ display:'flex', flex:1, flexDirection:'row', justifyContent:'space-between', alignItems:'center' }}>
                              <Text style={{ fontWeight:'500', flex:1, fontSize:12, marginRight:5, fontFamily:'HowdyLemon', }}>Ori (O)</Text>
                              <Text style={{ fontWeight:'500', fontSize:12, marginRight:5, fontFamily:'HowdyLemon', }}> : </Text>
                              <TextInput value={qtyBSO.toLocaleString()} keyboardType='numeric' onChangeText={text => setQtyBSO(text)} style={{ fontSize:15, fontWeight:'bold', width:150, margin:5, borderWidth:1, paddingVertical:5, paddingHorizontal:10, borderColor:'#afaeae', borderRadius: 10, color:'#545454', textAlign:'right'}} />
                            </View>
                            <View style={{ display:'flex', flex:1, flexDirection:'row', justifyContent:'space-between', alignItems:'center' }}>
                              <Text style={{ fontWeight:'500', flex:1, fontSize:12, marginRight:5, fontFamily:'HowdyLemon', }}>Jamur (J)</Text>
                              <Text style={{ fontWeight:'500', fontSize:12, marginRight:5, fontFamily:'HowdyLemon', }}> : </Text>
                              <TextInput value={qtyBSJ.toLocaleString()} keyboardType='numeric' onChangeText={text => setQtyBSJ(text)} style={{ fontSize:15, fontWeight:'bold', width:150, margin:5, borderWidth:1, paddingVertical:5, paddingHorizontal:10, borderColor:'#afaeae', borderRadius: 10, color:'#545454', textAlign:'right'}} />
                            </View>
                            <View style={{ display:'flex', flex:1, flexDirection:'row', justifyContent:'space-between', alignItems:'center' }}>
                              <Text style={{ fontWeight:'500', flex:1, fontSize:12, marginRight:5, fontFamily:'HowdyLemon', }}>Hot Spicy (H)</Text>
                              <Text style={{ fontWeight:'500', fontSize:12, marginRight:5, fontFamily:'HowdyLemon', }}> : </Text>
                              <TextInput value={qtyBSH.toLocaleString()} keyboardType='numeric' onChangeText={text => setQtyBSH(text)} style={{ fontSize:15, fontWeight:'bold', width:150, margin:5, borderWidth:1, paddingVertical:5, paddingHorizontal:10, borderColor:'#afaeae', borderRadius: 10, color:'#545454', textAlign:'right'}} />
                            </View>
                            <View style={{ display:'flex', flex:1, flexDirection:'row', justifyContent:'space-between', alignItems:'center' }}>
                              <Text style={{ fontWeight:'500', flex:1, fontSize:12, marginRight:5, fontFamily:'HowdyLemon', }}>Merah Putih (MP)</Text>
                              <Text style={{ fontWeight:'500', fontSize:12, marginRight:5, fontFamily:'HowdyLemon', }}> : </Text>
                              <TextInput value={qtyBSMP.toLocaleString()} keyboardType='numeric' onChangeText={text => setQtyBSMP(text)} style={{ fontSize:15, fontWeight:'bold', width:150, margin:5, borderWidth:1, paddingVertical:5, paddingHorizontal:10, borderColor:'#afaeae', borderRadius: 10, color:'#545454', textAlign:'right'}} />
                            </View>
                            <View style={{ display:'flex', flex:1, flexDirection:'row', justifyContent:'space-between', alignItems:'center' }}>
                              <Text style={{ fontWeight:'500', flex:1, fontSize:12, marginRight:5, fontFamily:'HowdyLemon', }}>Kulit (K)</Text>
                              <Text style={{ fontWeight:'500', fontSize:12, marginRight:5, fontFamily:'HowdyLemon', }}> : </Text>
                              <TextInput value={qtyBSK.toLocaleString()} keyboardType='numeric' onChangeText={text => setQtyBSK(text)} style={{ fontSize:15, fontWeight:'bold', width:150, margin:5, borderWidth:1, paddingVertical:5, paddingHorizontal:10, borderColor:'#afaeae', borderRadius: 10, color:'#545454', textAlign:'right'}} />
                            </View>
                        </View>
                        {/* BONUS PELANGGAN */}
                        <View>
                          <View style={[{ marginVertical:10,  }, { borderWidth:0.5, borderColor:'#afaeae', elevation:10, fontWeight:'bold', backgroundColor:'#e8e7e7', borderRadius: 10, color:'#545454', padding:10}]}>
                            <View>
                                <TextInput style={{ justifyContent:'center', fontFamily:'HowdyLemon', fontSize:16, fontWeight:'600', alignItems:'center', textAlign:'center', borderColor:'#afaeae', borderWidth:0.5, borderRadius: 10, color:'#545454', padding:10, marginBottom:20}} value="Bonus Pelanggan" editable={false} />
                            </View>
                            <View style={{ display:'flex', flex:1, flexDirection:'row', justifyContent:'space-between', alignItems:'center' }}>
                              <Text style={{ fontWeight:'500', flex:1, fontSize:12, marginRight:5, fontFamily:'HowdyLemon', }}>Ori (O)</Text>
                              <Text style={{ fontWeight:'500', fontSize:12, marginRight:5, fontFamily:'HowdyLemon', }}> : </Text>
                              <TextInput value={qtyBonusO.toLocaleString()} keyboardType='numeric' onChangeText={text => setQtyBonusO(text)} style={{ fontSize:15, fontWeight:'bold', width:150, margin:5, borderWidth:1, paddingVertical:5, paddingHorizontal:10, borderColor:'#afaeae', borderRadius: 10, color:'#545454', textAlign:'right'}} />
                            </View>
                            <View style={{ display:'flex', flex:1, flexDirection:'row', justifyContent:'space-between', alignItems:'center' }}>
                              <Text style={{ fontWeight:'500', flex:1, fontSize:12, marginRight:5, fontFamily:'HowdyLemon', }}>Jamur (J)</Text>
                              <Text style={{ fontWeight:'500', fontSize:12, marginRight:5, fontFamily:'HowdyLemon', }}> : </Text>
                              <TextInput value={qtyBonusJ.toLocaleString()} keyboardType='numeric' onChangeText={text => setQtyBonusJ(text)} style={{ fontSize:15, fontWeight:'bold', width:150, margin:5, borderWidth:1, paddingVertical:5, paddingHorizontal:10, borderColor:'#afaeae', borderRadius: 10, color:'#545454', textAlign:'right'}} />
                            </View>
                            <View style={{ display:'flex', flex:1, flexDirection:'row', justifyContent:'space-between', alignItems:'center' }}>
                              <Text style={{ fontWeight:'500', flex:1, fontSize:12, marginRight:5, fontFamily:'HowdyLemon', }}>Hot Spicy (H)</Text>
                              <Text style={{ fontWeight:'500', fontSize:12, marginRight:5, fontFamily:'HowdyLemon', }}> : </Text>
                              <TextInput value={qtyBonusH.toLocaleString()} keyboardType='numeric' onChangeText={text => setQtyBonusH(text)} style={{ fontSize:15, fontWeight:'bold', width:150, margin:5, borderWidth:1, paddingVertical:5, paddingHorizontal:10, borderColor:'#afaeae', borderRadius: 10, color:'#545454', textAlign:'right'}} />
                            </View>
                            <View style={{ display:'flex', flex:1, flexDirection:'row', justifyContent:'space-between', alignItems:'center' }}>
                              <Text style={{ fontWeight:'500', flex:1, fontSize:12, marginRight:5, fontFamily:'HowdyLemon', }}>Merah Putih (MP)</Text>
                              <Text style={{ fontWeight:'500', fontSize:12, marginRight:5, fontFamily:'HowdyLemon', }}> : </Text>
                              <TextInput value={qtyBonusMP.toLocaleString()} keyboardType='numeric' onChangeText={text => setQtyBonusMP(text)} style={{ fontSize:15, fontWeight:'bold', width:150, margin:5, borderWidth:1, paddingVertical:5, paddingHorizontal:10, borderColor:'#afaeae', borderRadius: 10, color:'#545454', textAlign:'right'}} />
                            </View>
                            <View style={{ display:'flex', flex:1, flexDirection:'row', justifyContent:'space-between', alignItems:'center' }}>
                              <Text style={{ fontWeight:'500', flex:1, fontSize:12, marginRight:5, fontFamily:'HowdyLemon', }}>Kulit (K)</Text>
                              <Text style={{ fontWeight:'500', fontSize:12, marginRight:5, fontFamily:'HowdyLemon', }}> : </Text>
                              <TextInput value={qtyBonusK.toLocaleString()} keyboardType='numeric' onChangeText={text => setQtyBonusK(text)} style={{ fontSize:15, fontWeight:'bold', width:150, margin:5, borderWidth:1, paddingVertical:5, paddingHorizontal:10, borderColor:'#afaeae', borderRadius: 10, color:'#545454', textAlign:'right'}} />
                            </View>
                          </View>
                        </View>
                        {/* OPERASIONAL */}
                        <View style={[{ marginVertical:10, }, { borderWidth:0.5, borderColor:'#afaeae', elevation:10, fontWeight:'bold', backgroundColor:'#e8e7e7', borderRadius: 10, color:'#545454', padding:10}]}>
                          <View>
                              <TextInput style={{ justifyContent:'center', fontFamily:'HowdyLemon', fontSize:16, fontWeight:'600', alignItems:'center', textAlign:'center', borderColor:'#afaeae', borderWidth:0.5, borderRadius: 10, color:'#545454', padding:10, marginBottom:20}} value="Operasional" editable={false} />
                          </View>
                          <View style={{ display:'flex', flex:1, flexDirection:'row', justifyContent:'space-between', alignItems:'center' }}>
                            <Text style={{ fontWeight:'500', flex:1, fontSize:12, marginRight:5, fontFamily:'HowdyLemon', }}>Bagi Hasil</Text>
                            <Text style={{ fontWeight:'500', fontSize:12, marginRight:5, fontFamily:'HowdyLemon', }}> : </Text>
                            <TextInput value={bagiHasil.toLocaleString()} keyboardType='numeric' onChangeText={text => setBagiHasil(text)} style={{ fontSize:15, fontWeight:'bold', width:140, margin:5, borderWidth:1, paddingVertical:5, paddingHorizontal:10, borderColor:'#afaeae', borderRadius: 10, color:'#545454', textAlign:'right'}} />
                          </View>
                          <View style={{ display:'flex', flex:1, flexDirection:'row', justifyContent:'space-between', alignItems:'center' }}>
                            <Text style={{ fontWeight:'500', flex:1, fontSize:12, marginRight:5, fontFamily:'HowdyLemon', }}>Makan</Text>
                            <Text style={{ fontWeight:'500', fontSize:12, marginRight:5, fontFamily:'HowdyLemon', }}> : </Text>
                            <TextInput value={makan.toLocaleString()} keyboardType='numeric' onChangeText={text => setMakan(text)} style={{ fontSize:15, fontWeight:'bold', width:140, margin:5, borderWidth:1, paddingVertical:5, paddingHorizontal:10, borderColor:'#afaeae', borderRadius: 10, color:'#545454', textAlign:'right'}} />
                          </View>
                          <View style={{ display:'flex', flex:1, flexDirection:'row', justifyContent:'space-between', alignItems:'center' }}>
                            <Text style={{ fontWeight:'500', flex:1, fontSize:12, marginRight:5, fontFamily:'HowdyLemon', }}>Bensin</Text>
                            <Text style={{ fontWeight:'500', fontSize:12, marginRight:5, fontFamily:'HowdyLemon', }}> : </Text>
                            <TextInput value={bensin.toLocaleString()} keyboardType='numeric' onChangeText={text => setBensin(text)} style={{ fontSize:15, fontWeight:'bold', width:140, margin:5, borderWidth:1, paddingVertical:5, paddingHorizontal:10, borderColor:'#afaeae', borderRadius: 10, color:'#545454', textAlign:'right'}} />
                          </View>
                          <View style={{ display:'flex', flex:1, flexDirection:'row', justifyContent:'space-between', alignItems:'center' }}>
                            <Text style={{ fontWeight:'500', flex:1, fontSize:12, marginRight:5, fontFamily:'HowdyLemon', }}>Jum'at Berkah</Text>
                            <Text style={{ fontWeight:'500', fontSize:12, marginRight:5, fontFamily:'HowdyLemon', }}> : </Text>
                            <TextInput value={jumatBerkah.toLocaleString()} keyboardType='numeric' onChangeText={text => setJumatBerkah(text)} style={{ fontSize:15, fontWeight:'bold', width:140, margin:5, borderWidth:1, paddingVertical:5, paddingHorizontal:10, borderColor:'#afaeae', borderRadius: 10, color:'#545454', textAlign:'right'}} />
                          </View>
                          <View style={{ display:'flex', flex:1, flexDirection:'row', justifyContent:'space-between', alignItems:'center' }}>
                            <Text style={{ fontWeight:'500', flex:1, fontSize:12, marginRight:5, fontFamily:'HowdyLemon', }}>Tissue</Text>
                            <Text style={{ fontWeight:'500', fontSize:12, marginRight:5, fontFamily:'HowdyLemon', }}> : </Text>
                            <TextInput value={tissue.toLocaleString()} keyboardType='numeric' onChangeText={text => setTissue(text)} style={{ fontSize:15, fontWeight:'bold', width:140, margin:5, borderWidth:1, paddingVertical:5, paddingHorizontal:10, borderColor:'#afaeae', borderRadius: 10, color:'#545454', textAlign:'right'}} />
                          </View>
                          <View style={{ display:'flex', flex:1, flexDirection:'row', justifyContent:'space-between', alignItems:'center' }}>
                            <Text style={{ fontWeight:'500', flex:1, fontSize:12, marginRight:5, fontFamily:'HowdyLemon', }}>Gas</Text>
                            <Text style={{ fontWeight:'500', fontSize:12, marginRight:5, fontFamily:'HowdyLemon', }}> : </Text>
                            <TextInput value={gas.toLocaleString()} keyboardType='numeric' onChangeText={text => setGas(text)} style={{ fontSize:15, fontWeight:'bold', width:140, margin:5, borderWidth:1, paddingVertical:5, paddingHorizontal:10, borderColor:'#afaeae', borderRadius: 10, color:'#545454', textAlign:'right'}} />
                          </View>
                          <View style={{ display:'flex', flex:1, flexDirection:'row', justifyContent:'space-between', alignItems:'center' }}>
                            <Text style={{ fontWeight:'500', flex:1, fontSize:12, marginRight:5, fontFamily:'HowdyLemon', }}>Kresek 10</Text>
                            <Text style={{ fontWeight:'500', fontSize:12, marginRight:5, fontFamily:'HowdyLemon', }}> : </Text>
                            <TextInput value={kresek10.toLocaleString()} keyboardType='numeric' onChangeText={text => setKresek10(text)} style={{ fontSize:15, fontWeight:'bold', width:140, margin:5, borderWidth:1, paddingVertical:5, paddingHorizontal:10, borderColor:'#afaeae', borderRadius: 10, color:'#545454', textAlign:'right'}} />
                          </View>
                          <View style={{ display:'flex', flex:1, flexDirection:'row', justifyContent:'space-between', alignItems:'center' }}>
                            <Text style={{ fontWeight:'500', flex:1, fontSize:12, marginRight:5, fontFamily:'HowdyLemon', }}>Kresek 15</Text>
                            <Text style={{ fontWeight:'500', fontSize:12, marginRight:5, fontFamily:'HowdyLemon', }}> : </Text>
                            <TextInput value={kresek15.toLocaleString()} keyboardType='numeric' onChangeText={text => setKresek15(text)} style={{ fontSize:15, fontWeight:'bold', width:140, margin:5, borderWidth:1, paddingVertical:5, paddingHorizontal:10, borderColor:'#afaeae', borderRadius: 10, color:'#545454', textAlign:'right'}} />
                          </View>
                           <View style={{ display:'flex', flex:1, flexDirection:'row', justifyContent:'space-between', alignItems:'center' }}>
                            <Text style={{ fontWeight:'500', flex:1, fontSize:12, marginRight:5, fontFamily:'HowdyLemon', }}>Minyak Gporeng 1 lt</Text>
                            <Text style={{ fontWeight:'500', fontSize:12, marginRight:5, fontFamily:'HowdyLemon', }}> : </Text>
                            <TextInput value={minyakGoreng.toLocaleString()} keyboardType='numeric' onChangeText={text => setMinyakGoreng(text)} style={{ fontSize:15, fontWeight:'bold', width:140, margin:5, borderWidth:1, paddingVertical:5, paddingHorizontal:10, borderColor:'#afaeae', borderRadius: 10, color:'#545454', textAlign:'right'}} />
                          </View>
                           <View style={{ display:'flex', flex:1, flexDirection:'row', justifyContent:'space-between', alignItems:'center' }}>
                            <Text style={{ fontWeight:'500', flex:1, fontSize:12, marginRight:5, fontFamily:'HowdyLemon', }}>Telor 1 Kg</Text>
                            <Text style={{ fontWeight:'500', fontSize:12, marginRight:5, fontFamily:'HowdyLemon', }}> : </Text>
                            <TextInput value={telor1kg.toLocaleString()} keyboardType='numeric' onChangeText={text => setTelor1kg(text)} style={{ fontSize:15, fontWeight:'bold', width:140, margin:5, borderWidth:1, paddingVertical:5, paddingHorizontal:10, borderColor:'#afaeae', borderRadius: 10, color:'#545454', textAlign:'right'}} />
                          </View>
                           <View style={{ display:'flex', flex:1, flexDirection:'row', justifyContent:'space-between', alignItems:'center' }}>
                            <Text style={{ fontWeight:'500', flex:1, fontSize:12, marginRight:5, fontFamily:'HowdyLemon', }}>Plastik Sempol 12 x 25</Text>
                            <Text style={{ fontWeight:'500', fontSize:12, marginRight:5, fontFamily:'HowdyLemon', }}> : </Text>
                            <TextInput value={plastikSempol.toLocaleString()} keyboardType='numeric' onChangeText={text => setPlastikSempol(text)} style={{ fontSize:15, fontWeight:'bold', width:140, margin:5, borderWidth:1, paddingVertical:5, paddingHorizontal:10, borderColor:'#afaeae', borderRadius: 10, color:'#545454', textAlign:'right'}} />
                          </View>
                           <View style={{ display:'flex', flex:1, flexDirection:'row', justifyContent:'space-between', alignItems:'center' }}>
                            <Text style={{ fontWeight:'500', flex:1, fontSize:12, marginRight:5, fontFamily:'HowdyLemon', }}>Kasbon</Text>
                            <Text style={{ fontWeight:'500', fontSize:12, marginRight:5, fontFamily:'HowdyLemon', }}> : </Text>
                            <TextInput value={kasbon.toLocaleString()} keyboardType='numeric' onChangeText={text => setKasbon(text)} style={{ fontSize:15, fontWeight:'bold', width:140, margin:5, borderWidth:1, paddingVertical:5, paddingHorizontal:10, borderColor:'#afaeae', borderRadius: 10, color:'#545454', textAlign:'right'}} />
                          </View>
                           <View style={{ display:'flex', flex:1, flexDirection:'row', justifyContent:'space-between', alignItems:'center' }}>
                            <Text style={{ fontWeight:'500', flex:1, fontSize:12, marginRight:5, fontFamily:'HowdyLemon', }}>Roico</Text>
                            <Text style={{ fontWeight:'500', fontSize:12, marginRight:5, fontFamily:'HowdyLemon', }}> : </Text>
                            <TextInput value={roico.toLocaleString()} keyboardType='numeric' onChangeText={text => setRoico(text)} style={{ fontSize:15, fontWeight:'bold', width:140, margin:5, borderWidth:1, paddingVertical:5, paddingHorizontal:10, borderColor:'#afaeae', borderRadius: 10, color:'#545454', textAlign:'right'}} />
                          </View>
                           <View style={{ display:'flex', flex:1, flexDirection:'row', justifyContent:'space-between', alignItems:'center' }}>
                            <Text style={{ fontWeight:'500', flex:1, fontSize:12, marginRight:5, fontFamily:'HowdyLemon', }}>Spon</Text>
                            <Text style={{ fontWeight:'500', fontSize:12, marginRight:5, fontFamily:'HowdyLemon', }}> : </Text>
                            <TextInput value={spon.toLocaleString()} keyboardType='numeric' onChangeText={text => setSpon(text)} style={{ fontSize:15, fontWeight:'bold', width:140, margin:5, borderWidth:1, paddingVertical:5, paddingHorizontal:10, borderColor:'#afaeae', borderRadius: 10, color:'#545454', textAlign:'right'}} />
                          </View>
                           <View style={{ display:'flex', flex:1, flexDirection:'row', justifyContent:'space-between', alignItems:'center' }}>
                            <Text style={{ fontWeight:'500', flex:1, fontSize:12, marginRight:5, fontFamily:'HowdyLemon', }}>Sunlight</Text>
                            <Text style={{ fontWeight:'500', fontSize:12, marginRight:5, fontFamily:'HowdyLemon', }}> : </Text>
                            <TextInput value={sunlight.toLocaleString()} keyboardType='numeric' onChangeText={text => setSunlight(text)} style={{ fontSize:15, fontWeight:'bold', width:140, margin:5, borderWidth:1, paddingVertical:5, paddingHorizontal:10, borderColor:'#afaeae', borderRadius: 10, color:'#545454', textAlign:'right'}} />
                          </View>
                           <View style={{ display:'flex', flex:1, flexDirection:'row', justifyContent:'space-between', alignItems:'center' }}>
                            <Text style={{ fontWeight:'500', flex:1, fontSize:12, marginRight:5, fontFamily:'HowdyLemon', }}>Bonus Habis</Text>
                            <Text style={{ fontWeight:'500', fontSize:12, marginRight:5, fontFamily:'HowdyLemon', }}> : </Text>
                            <TextInput value={bonusHabis.toLocaleString()} keyboardType='numeric' onChangeText={text => setBonusHabis(text)} style={{ fontSize:15, fontWeight:'bold', width:140, margin:5, borderWidth:1, paddingVertical:5, paddingHorizontal:10, borderColor:'#afaeae', borderRadius: 10, color:'#545454', textAlign:'right'}} />
                          </View>
                           <View style={{ display:'flex', flex:1, flexDirection:'row', justifyContent:'space-between', alignItems:'center' }}>
                            <Text style={{ fontWeight:'500', flex:1, fontSize:12, marginRight:5, fontFamily:'HowdyLemon', }}>Kebersihan</Text>
                            <Text style={{ fontWeight:'500', fontSize:12, marginRight:5, fontFamily:'HowdyLemon', }}> : </Text>
                            <TextInput value={kebersihan.toLocaleString()} keyboardType='numeric' onChangeText={text => setKebersihan(text)} style={{ fontSize:15, fontWeight:'bold', width:140, margin:5, borderWidth:1, paddingVertical:5, paddingHorizontal:10, borderColor:'#afaeae', borderRadius: 10, color:'#545454', textAlign:'right'}} />
                          </View>
                           <View style={{ display:'flex', flex:1, flexDirection:'row', justifyContent:'space-between', alignItems:'center' }}>
                            <Text style={{ fontWeight:'500', flex:1, fontSize:12, marginRight:5, fontFamily:'HowdyLemon', }}>Kelabang</Text>
                            <Text style={{ fontWeight:'500', fontSize:12, marginRight:5, fontFamily:'HowdyLemon', }}> : </Text>
                            <TextInput value={kelabang.toLocaleString()} keyboardType='numeric' onChangeText={text => setKelabang(text)} style={{ fontSize:15, fontWeight:'bold', width:140, margin:5, borderWidth:1, paddingVertical:5, paddingHorizontal:10, borderColor:'#afaeae', borderRadius: 10, color:'#545454', textAlign:'right'}} />
                          </View>
                           <View style={{ display:'flex', flex:1, flexDirection:'row', justifyContent:'space-between', alignItems:'center' }}>
                            <Text style={{ fontWeight:'500', flex:1, fontSize:12, marginRight:5, fontFamily:'HowdyLemon', }}>Takjil</Text>
                            <Text style={{ fontWeight:'500', fontSize:12, marginRight:5, fontFamily:'HowdyLemon', }}> : </Text>
                            <TextInput value={takjil.toLocaleString()} keyboardType='numeric' onChangeText={text => setTakjil(text)} style={{ fontSize:15, fontWeight:'bold', width:140, margin:5, borderWidth:1, paddingVertical:5, paddingHorizontal:10, borderColor:'#afaeae', borderRadius: 10, color:'#545454', textAlign:'right'}} />
                          </View>
                        </View>
                        {/* GOOFOOD */}
                        <View>
                          <View style={[{ marginVertical:10,  }, { borderWidth:0.5, borderColor:'#afaeae', elevation:10, fontWeight:'bold', backgroundColor:'#e8e7e7', borderRadius: 10, color:'#545454', padding:10}]}>
                            <View>
                                <TextInput style={{ justifyContent:'center', fontFamily:'HowdyLemon', fontSize:16, fontWeight:'600', alignItems:'center', textAlign:'center', borderColor:'#afaeae', borderWidth:0.5, borderRadius: 10, color:'#545454', padding:10, marginBottom:20}} value="GoFood" editable={false} />
                            </View>
                            {/* <View style={{ display:'flex', flex:1, flexDirection:'row', justifyContent:'space-between', alignItems:'center' }}>
                              <Text style={{ fontWeight:'500', flex:1, fontSize:12, marginRight:5, fontFamily:'HowdyLemon', }}>Type Gofood : </Text>
                              <Text style={{ fontWeight:'500', fontSize:12, marginRight:5, fontFamily:'HowdyLemon', }}> : </Text>
                                
                              <TextInput value={"PENDAPATAN GOFOOD"} style={{ fontSize:12, fontWeight:'bold', width:150, margin:5, borderWidth:1, paddingVertical:5, paddingHorizontal:10, borderColor:'#afaeae', borderRadius: 10, color:'#545454', textAlign:'left'}} />
                            </View> */}
                            <View style={{ display:'flex', flex:1, flexDirection:'row', justifyContent:'space-between', alignItems:'center' }}>
                              <Text style={{ fontWeight:'500', flex:1, fontSize:12, marginRight:5, fontFamily:'HowdyLemon', }}>Rp Gofood</Text>
                              <Text style={{ fontWeight:'500', fontSize:12, marginRight:5, fontFamily:'HowdyLemon', }}> : </Text>
                              <TextInput value={rpGofood.toLocaleString()} keyboardType='numeric' onChangeText={text => setRpGofood(text)} style={{ fontSize:15, fontWeight:'bold', width:150, margin:5, borderWidth:1, paddingVertical:5, paddingHorizontal:10, borderColor:'#afaeae', borderRadius: 10, color:'#545454', textAlign:'right'}} />
                            </View>
                          </View>
                        </View>
                        {/* OPERASIONAL LAIN */}
                        <View>
                          <View style={[{ marginVertical:10,}, { borderWidth:0.5, borderColor:'#afaeae', elevation:10, fontWeight:'bold', backgroundColor:'#e8e7e7', borderRadius: 10, color:'#545454', padding:10}]}>
                            <View>
                                <TextInput style={{ justifyContent:'center', fontFamily:'HowdyLemon', fontSize:16, fontWeight:'600', alignItems:'center', textAlign:'center', borderColor:'#afaeae', borderWidth:0.5, borderRadius: 10, color:'#545454', padding:10, marginBottom:20}} value="Operasional Lain" editable={false} />
                            </View>
                            <View style={{ display:'flex', flex:1, flexDirection:'row', justifyContent:'space-between', alignItems:'center' }}>
                              <Text style={{ fontWeight:'500', flex:1, fontSize:12, marginRight:5, fontFamily:'HowdyLemon', }}>Free Cengek</Text>
                              <Text style={{ fontWeight:'500', fontSize:12, marginRight:5, fontFamily:'HowdyLemon', }}> : </Text>
                              <TextInput value={freeCengek.toLocaleString()} keyboardType='default' onChangeText={text => setFreeCengek(text)} style={{ fontSize:15, fontWeight:'bold', width:150, margin:5, borderWidth:1, paddingVertical:5, paddingHorizontal:10, borderColor:'#afaeae', borderRadius: 10, color:'#545454', textAlign:'right'}} />
                            </View>
                            <View style={{ display:'flex', flex:1, flexDirection:'row', justifyContent:'space-between', alignItems:'center' }}>
                              <Text style={{ fontWeight:'500', flex:1, fontSize:12, marginRight:5, fontFamily:'HowdyLemon', }}>Cengek</Text>
                              <Text style={{ fontWeight:'500', fontSize:12, marginRight:5, fontFamily:'HowdyLemon', }}> : </Text>
                              <TextInput value={cengek.toLocaleString()} keyboardType='default' onChangeText={text => setCengek(text)} style={{ fontSize:15, fontWeight:'bold', width:150, margin:5, borderWidth:1, paddingVertical:5, paddingHorizontal:10, borderColor:'#afaeae', borderRadius: 10, color:'#545454', textAlign:'right'}} />
                            </View>
                            <View style={{ display:'flex', flex:1, flexDirection:'row', justifyContent:'space-between', alignItems:'center' }}>
                              <Text style={{ fontWeight:'500', flex:1, fontSize:12, marginRight:5, fontFamily:'HowdyLemon', }}>Stock Awal Telor</Text>
                              <Text style={{ fontWeight:'500', fontSize:12, marginRight:5, fontFamily:'HowdyLemon', }}> : </Text>
                              <TextInput value={stokAwalTelor.toLocaleString()} keyboardType='default' onChangeText={text => setStokAwalTelor(text)} style={{ fontSize:15, fontWeight:'bold', width:150, margin:5, borderWidth:1, paddingVertical:5, paddingHorizontal:10, borderColor:'#afaeae', borderRadius: 10, color:'#545454', textAlign:'right'}} />
                            </View>
                            <View style={{ display:'flex', flex:1, flexDirection:'row', justifyContent:'space-between', alignItems:'center' }}>
                              <Text style={{ fontWeight:'500', flex:1, fontSize:12, marginRight:5, fontFamily:'HowdyLemon', }}>Stock Akhir Telor</Text>
                              <Text style={{ fontWeight:'500', fontSize:12, marginRight:5, fontFamily:'HowdyLemon', }}> : </Text>
                              <TextInput value={stokAkhirTelor.toLocaleString()} keyboardType='default' onChangeText={text => setStokAkhirTelor(text)} style={{ fontSize:15, fontWeight:'bold', width:150, margin:5, borderWidth:1, paddingVertical:5, paddingHorizontal:10, borderColor:'#afaeae', borderRadius: 10, color:'#545454', textAlign:'right'}} />
                            </View>
                            <View style={{ display:'flex', flex:1, flexDirection:'row', justifyContent:'space-between', alignItems:'center' }}>
                              <Text style={{ fontWeight:'500', flex:1, fontSize:12, marginRight:5, fontFamily:'HowdyLemon', }}>Stock Awal Saos</Text>
                              <Text style={{ fontWeight:'500', fontSize:12, marginRight:5, fontFamily:'HowdyLemon', }}> : </Text>
                              <TextInput value={stokAwalSaos.toLocaleString()} keyboardType='default' onChangeText={text => setStokAwalSaos(text)} style={{ fontSize:15, fontWeight:'bold', width:150, margin:5, borderWidth:1, paddingVertical:5, paddingHorizontal:10, borderColor:'#afaeae', borderRadius: 10, color:'#545454', textAlign:'right'}} />
                            </View>
                            <View style={{ display:'flex', flex:1, flexDirection:'row', justifyContent:'space-between', alignItems:'center' }}>
                              <Text style={{ fontWeight:'500', flex:1, fontSize:12, marginRight:5, fontFamily:'HowdyLemon', }}>Stock Akhir Saos</Text>
                              <Text style={{ fontWeight:'500', fontSize:12, marginRight:5, fontFamily:'HowdyLemon', }}> : </Text>
                              <TextInput value={stokAkhirSaos.toLocaleString()} keyboardType='default' onChangeText={text => setStokAkhirSaos(text)} style={{ fontSize:15, fontWeight:'bold', width:150, margin:5, borderWidth:1, paddingVertical:5, paddingHorizontal:10, borderColor:'#afaeae', borderRadius: 10, color:'#545454', textAlign:'right'}} />
                            </View>
                            <View style={{ display:'flex', flex:1, flexDirection:'row', justifyContent:'space-between', alignItems:'center' }}>
                              <Text style={{ fontWeight:'500', flex:1, fontSize:12, marginRight:5, fontFamily:'HowdyLemon', }}>BT Ayam Bawang</Text>
                              <Text style={{ fontWeight:'500', fontSize:12, marginRight:5, fontFamily:'HowdyLemon', }}> : </Text>
                              <TextInput value={btAyamBawang.toLocaleString()} keyboardType='default' onChangeText={text => setBtAyamBawang(text)} style={{ fontSize:15, fontWeight:'bold', width:150, margin:5, borderWidth:1, paddingVertical:5, paddingHorizontal:10, borderColor:'#afaeae', borderRadius: 10, color:'#545454', textAlign:'right'}} />
                            </View>
                            <View style={{ display:'flex', flex:1, flexDirection:'row', justifyContent:'space-between', alignItems:'center' }}>
                              <Text style={{ fontWeight:'500', flex:1, fontSize:12, marginRight:5, fontFamily:'HowdyLemon', }}>BT Balado</Text>
                              <Text style={{ fontWeight:'500', fontSize:12, marginRight:5, fontFamily:'HowdyLemon', }}> : </Text>
                              <TextInput value={btBalado.toLocaleString()} keyboardType='default' onChangeText={text => setBtBalado(text)} style={{ fontSize:15, fontWeight:'bold', width:150, margin:5, borderWidth:1, paddingVertical:5, paddingHorizontal:10, borderColor:'#afaeae', borderRadius: 10, color:'#545454', textAlign:'right'}} />
                            </View>
                            <View style={{ display:'flex', flex:1, flexDirection:'row', justifyContent:'space-between', alignItems:'center' }}>
                              <Text style={{ fontWeight:'500', flex:1, fontSize:12, marginRight:5, fontFamily:'HowdyLemon', }}>BT Keju</Text>
                              <Text style={{ fontWeight:'500', fontSize:12, marginRight:5, fontFamily:'HowdyLemon', }}> : </Text>
                              <TextInput value={btKeju.toLocaleString()} keyboardType='default' onChangeText={text => setBtKeju(text)} style={{ fontSize:15, fontWeight:'bold', width:150, margin:5, borderWidth:1, paddingVertical:5, paddingHorizontal:10, borderColor:'#afaeae', borderRadius: 10, color:'#545454', textAlign:'right'}} />
                            </View>
                            <View style={{ display:'flex', flex:1, flexDirection:'row', justifyContent:'space-between', alignItems:'center' }}>
                              <Text style={{ fontWeight:'500', flex:1, fontSize:12, marginRight:5, fontFamily:'HowdyLemon', }}>Cengek Abah</Text>
                              <Text style={{ fontWeight:'500', fontSize:12, marginRight:5, fontFamily:'HowdyLemon', }}> : </Text>
                              <TextInput value={cengekAbah.toLocaleString()} keyboardType='default' onChangeText={text => setCengekAbah(text)} style={{ fontSize:15, fontWeight:'bold', width:150, margin:5, borderWidth:1, paddingVertical:5, paddingHorizontal:10, borderColor:'#afaeae', borderRadius: 10, color:'#545454', textAlign:'right'}} />
                            </View>
                            <View style={{ display:'flex', flex:1, flexDirection:'row', justifyContent:'space-between', alignItems:'center' }}>
                              <Text style={{ fontWeight:'500', flex:1, fontSize:12, marginRight:5, fontFamily:'HowdyLemon', }}>Minyak Bawang</Text>
                              <Text style={{ fontWeight:'500', fontSize:12, marginRight:5, fontFamily:'HowdyLemon', }}> : </Text>
                              <TextInput value={minyakBawang.toLocaleString()} keyboardType='default' onChangeText={text => setMinyakBawang(text)} style={{ fontSize:15, fontWeight:'bold', width:150, margin:5, borderWidth:1, paddingVertical:5, paddingHorizontal:10, borderColor:'#afaeae', borderRadius: 10, color:'#545454', textAlign:'right'}} />
                            </View>
                            <View style={{ display:'flex', flex:1, flexDirection:'row', justifyContent:'space-between', alignItems:'center' }}>
                              <Text style={{ fontWeight:'500', flex:1, fontSize:12, marginRight:5, fontFamily:'HowdyLemon', }}>Plastik 15 x 30</Text>
                              <Text style={{ fontWeight:'500', fontSize:12, marginRight:5, fontFamily:'HowdyLemon', }}> : </Text>
                              <TextInput value={plastik1530.toLocaleString()} keyboardType='default' onChangeText={text => setPlastik1530(text)} style={{ fontSize:15, fontWeight:'bold', width:150, margin:5, borderWidth:1, paddingVertical:5, paddingHorizontal:10, borderColor:'#afaeae', borderRadius: 10, color:'#545454', textAlign:'right'}} />
                            </View>
                            <View style={{ display:'flex', flex:1, flexDirection:'row', justifyContent:'space-between', alignItems:'center' }}>
                              <Text style={{ fontWeight:'500', flex:1, fontSize:12, marginRight:5, fontFamily:'HowdyLemon', }}>Plastik 12 x 25</Text>
                              <Text style={{ fontWeight:'500', fontSize:12, marginRight:5, fontFamily:'HowdyLemon', }}> : </Text>
                              <TextInput value={plastik1225.toLocaleString()} keyboardType='default' onChangeText={text => setPlastik1225(text)} style={{ fontSize:15, fontWeight:'bold', width:150, margin:5, borderWidth:1, paddingVertical:5, paddingHorizontal:10, borderColor:'#afaeae', borderRadius: 10, color:'#545454', textAlign:'right'}} />
                            </View>
                            <View style={{ display:'flex', flex:1, flexDirection:'row', justifyContent:'space-between', alignItems:'center' }}>
                              <Text style={{ fontWeight:'500', flex:1, fontSize:12, marginRight:5, fontFamily:'HowdyLemon', }}>PLastik Saos</Text>
                              <Text style={{ fontWeight:'500', fontSize:12, marginRight:5, fontFamily:'HowdyLemon', }}> : </Text>
                              <TextInput value={plastikSaos.toLocaleString()} keyboardType='default' onChangeText={text => setPlastikSaos(text)} style={{ fontSize:15, fontWeight:'bold', width:150, margin:5, borderWidth:1, paddingVertical:5, paddingHorizontal:10, borderColor:'#afaeae', borderRadius: 10, color:'#545454', textAlign:'right'}} />
                            </View>
                          </View>
                        </View>

                        <TouchableOpacity onPress={toggleModal} style={{ backgroundColor:'#545454', borderWidth:0.75, borderColor:'#afaeae', borderRadius:20, paddingVertical:10, paddingHorizontal:8, display:'flex', flexDirection:'row', justifyContent:'space-between', alignItems:'center',marginVertical:20, }}>
                            <Ionicons name="eye-outline" size={20} color="#FFF" />
                            <Text style={{ color:'#FFF', fontWeight:'600',fontFamily:'HowdyLemon', marginHorizontal:10, fontSize:12, }}>Preview</Text>
                        </TouchableOpacity>
                        <Modal isVisible={isModalVisible} style={{ justifyContent: 'flex-end', margin: 0 }}>
                          <View style={{ backgroundColor: 'white', borderRadius: 10, padding: 10, height: height,}}>
                            <ScrollView style={{ padding:5, }}>
                              <View style={{ display:'flex', top:1, width:'100%', position:'fixed', flex:1 }}>
                                <TextInput style={{ justifyContent:'center', fontFamily:'HowdyLemon', fontSize:16, fontWeight:'600', alignItems:'center', textAlign:'center', borderColor:'#afaeae', borderWidth:0.5, borderRadius: 10, color:'#545454', padding:10, marginBottom:10}} value="PREVIEW LAPORAN" editable={false} />
                              </View>
                              <View style={{ marginTop:8, borderWidth:0.5, borderColor:'#afaeae', borderRadius: 10, color:'#545454', padding:8, paddingLeft:10, justifyContent:'space-between', flexDirection:'row'}}>
                                  <Text style={{fontFamily:'HowdyLemon', flex:1, color:'#545454', padding:3,}}>Tanggal</Text>
                                  <Text style={{fontFamily:'HowdyLemon', color:'#545454', padding:3,}}>{formattedDate}</Text>
                              </View>
                              <View style={[{ marginVertical:10,  }, { borderWidth:0.5, borderColor:'#afaeae', fontWeight:'bold', backgroundColor:'#FFFF', borderRadius: 10, color:'#545454', padding:10, marginBottom:30}]}>
                                <View style={[{ marginBottom:20,  }, { borderWidth:0.5, borderColor:'#afaeae', fontWeight:'bold', backgroundColor:'#FFFF', borderRadius: 10, color:'#545454', padding:10, marginBottom:10}]}>
                                  <View>
                                    <TextInput style={{ justifyContent:'center', fontFamily:'HowdyLemon', fontSize:16, fontWeight:'600', alignItems:'center', textAlign:'center', borderColor:'#afaeae', borderWidth:0.5, borderRadius: 10, color:'#545454', padding:6, marginBottom:20}} value="Stock Awal" editable={false} />
                                  </View>
                                  <View style={{ display:'flex', flex:1, flexDirection:'row', justifyContent:'space-between', alignItems:'center' }}>
                                    <Text style={{ fontWeight:'500', flex:1, textAlign:'left', fontSize:12, marginRight:5, fontFamily:'HowdyLemon', }}>Ori (O)</Text>
                                    <Text style={{ fontWeight:'500', flex:1, textAlign:'center', fontSize:12, marginRight:5, fontFamily:'HowdyLemon', }}> : </Text>
                                    <Text style={{ fontWeight:'500', flex:1, textAlign:'right', fontSize:12, marginRight:5, fontFamily:'HowdyLemon', }}>{formatRupiahAndRibuan(stockAwalO ? stockAwalO : 0)}</Text>
                                  </View>
                                  <View style={{ display:'flex', flex:1, flexDirection:'row', marginTop:10, justifyContent:'space-between', alignItems:'center' }}>
                                    <Text style={{ fontWeight:'500', flex:1, textAlign:'left', fontSize:12, marginRight:5, fontFamily:'HowdyLemon', }}>Jamur (J)</Text>
                                    <Text style={{ fontWeight:'500', flex:1, textAlign:'center', fontSize:12, marginRight:5, fontFamily:'HowdyLemon', }}> : </Text>
                                    <Text style={{ fontWeight:'500', flex:1, textAlign:'right', fontSize:12, marginRight:5, fontFamily:'HowdyLemon', }}>{formatRupiahAndRibuan(stockAwalJ ? stockAwalJ : 0)}</Text>
                                  </View>
                                  <View style={{ display:'flex', flex:1, flexDirection:'row', marginTop:10, justifyContent:'space-between', alignItems:'center' }}>
                                    <Text style={{ fontWeight:'500', flex:1, textAlign:'left', fontSize:12, marginRight:5, fontFamily:'HowdyLemon', }}>Hot Spicy (H)</Text>
                                    <Text style={{ fontWeight:'500', flex:1, textAlign:'center', fontSize:12, marginRight:5, fontFamily:'HowdyLemon', }}> : </Text>
                                    <Text style={{ fontWeight:'500', flex:1, textAlign:'right', fontSize:12, marginRight:5, fontFamily:'HowdyLemon', }}>{formatRupiahAndRibuan(stockAwalH ? stockAwalH : 0)}</Text>
                                  </View>
                                  <View style={{ display:'flex', flex:1, flexDirection:'row', marginTop:10, justifyContent:'space-between', alignItems:'center' }}>
                                    <Text style={{ fontWeight:'500', flex:1, textAlign:'left', fontSize:12, marginRight:5, fontFamily:'HowdyLemon', }}>Merah Putih (MP)</Text>
                                    <Text style={{ fontWeight:'500', flex:1, textAlign:'center', fontSize:12, marginRight:5, fontFamily:'HowdyLemon', }}> : </Text>
                                    <Text style={{ fontWeight:'500', flex:1, textAlign:'right', fontSize:12, marginRight:5, fontFamily:'HowdyLemon', }}>{formatRupiahAndRibuan(stockAwalMP ? stockAwalMP : 0)}</Text>
                                  </View>
                                  <View style={{ display:'flex', flex:1, flexDirection:'row', marginTop:10, justifyContent:'space-between', alignItems:'center' }}>
                                    <Text style={{ fontWeight:'500', flex:1, textAlign:'left', fontSize:12, marginRight:5, fontFamily:'HowdyLemon', }}>Kulit (K)</Text>
                                    <Text style={{ fontWeight:'500', flex:1, textAlign:'center', fontSize:12, marginRight:5, fontFamily:'HowdyLemon', }}> : </Text>
                                    <Text style={{ fontWeight:'500', flex:1, textAlign:'right', fontSize:12, marginRight:5, fontFamily:'HowdyLemon', }}>{formatRupiahAndRibuan(stockAwalK ? stockAwalK : 0)}</Text>
                                  </View>
                                </View>
                                <View style={[{ marginVertical:10, }, { borderWidth:0.5, borderColor:'#afaeae', fontWeight:'bold', backgroundColor:'#FFFF', borderRadius: 10, color:'#545454', padding:10, marginBottom:10}]}>
                                  <View>
                                      <TextInput style={{ justifyContent:'center', fontFamily:'HowdyLemon', fontSize:16, fontWeight:'600', alignItems:'center', textAlign:'center', borderColor:'#afaeae', borderWidth:0.5, borderRadius: 10, color:'#545454', padding:6, marginBottom:20, }} value="Stock Akhir" editable={false} />
                                  </View>
                                  <View style={{ display:'flex', flex:1, flexDirection:'row', justifyContent:'space-between', alignItems:'center' }}>
                                    <Text style={{ fontWeight:'500', flex:1, textAlign:'left', fontSize:12, marginRight:5, fontFamily:'HowdyLemon', }}>Ori (O)</Text>
                                    <Text style={{ fontWeight:'500', flex:1, textAlign:'center', fontSize:12, marginRight:5, fontFamily:'HowdyLemon', }}> : </Text>
                                    <Text style={{ fontWeight:'500', flex:1, textAlign:'right', fontSize:12, marginRight:5, fontFamily:'HowdyLemon', }}>{formatRupiahAndRibuan(stockAkhirO ? stockAkhirO : 0)}</Text>
                                  </View>
                                  <View style={{ display:'flex', flex:1, flexDirection:'row', marginTop:10, justifyContent:'space-between', alignItems:'center' }}>
                                    <Text style={{ fontWeight:'500', flex:1, textAlign:'left', fontSize:12, marginRight:5, fontFamily:'HowdyLemon', }}>Jamur (J)</Text>
                                    <Text style={{ fontWeight:'500', flex:1, textAlign:'center', fontSize:12, marginRight:5, fontFamily:'HowdyLemon', }}> : </Text>
                                    <Text style={{ fontWeight:'500', flex:1, textAlign:'right', fontSize:12, marginRight:5, fontFamily:'HowdyLemon', }}>{formatRupiahAndRibuan(stockAkhirJ ? stockAkhirJ : 0)}</Text>
                                  </View>
                                  <View style={{ display:'flex', flex:1, flexDirection:'row', marginTop:10, justifyContent:'space-between', alignItems:'center' }}>
                                    <Text style={{ fontWeight:'500', flex:1, textAlign:'left', fontSize:12, marginRight:5, fontFamily:'HowdyLemon', }}>Hot Spicy (H)</Text>
                                    <Text style={{ fontWeight:'500', flex:1, textAlign:'center', fontSize:12, marginRight:5, fontFamily:'HowdyLemon', }}> : </Text>
                                    <Text style={{ fontWeight:'500', flex:1, textAlign:'right', fontSize:12, marginRight:5, fontFamily:'HowdyLemon', }}>{formatRupiahAndRibuan(stockAkhirH ? stockAkhirH : 0)}</Text>
                                  </View>
                                  <View style={{ display:'flex', flex:1, flexDirection:'row', marginTop:10, justifyContent:'space-between', alignItems:'center' }}>
                                    <Text style={{ fontWeight:'500', flex:1, textAlign:'left', fontSize:12, marginRight:5, fontFamily:'HowdyLemon', }}>Merah Putih (MP)</Text>
                                    <Text style={{ fontWeight:'500', flex:1, textAlign:'center', fontSize:12, marginRight:5, fontFamily:'HowdyLemon', }}> : </Text>
                                    <Text style={{ fontWeight:'500', flex:1, textAlign:'right', fontSize:12, marginRight:5, fontFamily:'HowdyLemon', }}>{formatRupiahAndRibuan(stockAkhirMP ? stockAkhirMP : 0)}</Text>
                                  </View>
                                  <View style={{ display:'flex', flex:1, flexDirection:'row', marginTop:10, justifyContent:'space-between', alignItems:'center' }}>
                                    <Text style={{ fontWeight:'500', flex:1, textAlign:'left', fontSize:12, marginRight:5, fontFamily:'HowdyLemon', }}>Kulit (K)</Text>
                                    <Text style={{ fontWeight:'500', flex:1, textAlign:'center', fontSize:12, marginRight:5, fontFamily:'HowdyLemon', }}> : </Text>
                                    <Text style={{ fontWeight:'500', flex:1, textAlign:'right', fontSize:12, marginRight:5, fontFamily:'HowdyLemon', }}>{formatRupiahAndRibuan(stockAkhirK ? stockAkhirK : 0)}</Text>
                                  </View>
                                </View>

                                <View style={[{ marginVertical:10,  }, { borderWidth:0.5, borderColor:'#afaeae', fontWeight:'bold', backgroundColor:'#FFFF', borderRadius: 10, color:'#545454', padding:10, marginBottom:10}]}>
                                  <View>
                                      <TextInput style={{ justifyContent:'center', fontFamily:'HowdyLemon', fontSize:16, fontWeight:'600', alignItems:'center', textAlign:'center', borderColor:'#afaeae', borderWidth:0.5, borderRadius: 10, color:'#545454', padding:6, marginBottom:20,}} value="Stock Kelebihan" editable={false} />
                                  </View>
                                  <View style={{ display:'flex', flex:1, flexDirection:'row', justifyContent:'space-between', alignItems:'center' }}>
                                    <Text style={{ fontWeight:'500', flex:1, textAlign:'left', fontSize:12, marginRight:5, fontFamily:'HowdyLemon', }}>Ori (O)</Text>
                                    <Text style={{ fontWeight:'500', flex:1, textAlign:'center', fontSize:12, marginRight:5, fontFamily:'HowdyLemon', }}> : </Text>
                                    <Text style={{ fontWeight:'500', flex:1, textAlign:'right', fontSize:12, marginRight:5, fontFamily:'HowdyLemon', }}>{formatRupiahAndRibuan(stockKelebihanO ? stockKelebihanO : 0)}</Text>
                                  </View>
                                  <View style={{ display:'flex', flex:1, flexDirection:'row', marginTop:10, justifyContent:'space-between', alignItems:'center' }}>
                                    <Text style={{ fontWeight:'500', flex:1, textAlign:'left', fontSize:12, marginRight:5, fontFamily:'HowdyLemon', }}>Jamur (J)</Text>
                                    <Text style={{ fontWeight:'500', flex:1, textAlign:'center', fontSize:12, marginRight:5, fontFamily:'HowdyLemon', }}> : </Text>
                                    <Text style={{ fontWeight:'500', flex:1, textAlign:'right', fontSize:12, marginRight:5, fontFamily:'HowdyLemon', }}>{formatRupiahAndRibuan(stockKelebihanJ ? stockKelebihanJ : 0)}</Text>
                                  </View>
                                  <View style={{ display:'flex', flex:1, flexDirection:'row', marginTop:10, justifyContent:'space-between', alignItems:'center' }}>
                                    <Text style={{ fontWeight:'500', flex:1, textAlign:'left', fontSize:12, marginRight:5, fontFamily:'HowdyLemon', }}>Hot Spicy (H)</Text>
                                    <Text style={{ fontWeight:'500', flex:1, textAlign:'center', fontSize:12, marginRight:5, fontFamily:'HowdyLemon', }}> : </Text>
                                    <Text style={{ fontWeight:'500', flex:1, textAlign:'right', fontSize:12, marginRight:5, fontFamily:'HowdyLemon', }}>{formatRupiahAndRibuan(stockKelebihanH ? stockKelebihanH : 0)}</Text>
                                  </View>
                                  <View style={{ display:'flex', flex:1, flexDirection:'row', marginTop:10, justifyContent:'space-between', alignItems:'center' }}>
                                    <Text style={{ fontWeight:'500', flex:1, textAlign:'left', fontSize:12, marginRight:5, fontFamily:'HowdyLemon', }}>Merah Putih (MP)</Text>
                                    <Text style={{ fontWeight:'500', flex:1, textAlign:'center', fontSize:12, marginRight:5, fontFamily:'HowdyLemon', }}> : </Text>
                                    <Text style={{ fontWeight:'500', flex:1, textAlign:'right', fontSize:12, marginRight:5, fontFamily:'HowdyLemon', }}>{formatRupiahAndRibuan(stockKelebihanMP ? stockKelebihanMP : 0)}</Text>
                                  </View>
                                  <View style={{ display:'flex', flex:1, flexDirection:'row', marginTop:10, justifyContent:'space-between', alignItems:'center' }}>
                                    <Text style={{ fontWeight:'500', flex:1, textAlign:'left', fontSize:12, marginRight:5, fontFamily:'HowdyLemon', }}>Kulit (K)</Text>
                                    <Text style={{ fontWeight:'500', flex:1, textAlign:'center', fontSize:12, marginRight:5, fontFamily:'HowdyLemon', }}> : </Text>
                                    <Text style={{ fontWeight:'500', flex:1, textAlign:'right', fontSize:12, marginRight:5, fontFamily:'HowdyLemon', }}>{formatRupiahAndRibuan(stockKelebihanK ? stockKelebihanK : 0)}</Text>
                                  </View>
                                </View>

                                <View style={[{ marginVertical:10,  }, { borderWidth:0.5, borderColor:'#afaeae', fontWeight:'bold', backgroundColor:'#FFFF', borderRadius: 10, color:'#545454', padding:10, marginBottom:10}]}>
                                  <View>
                                      <TextInput style={{ justifyContent:'center', fontFamily:'HowdyLemon', fontSize:16, fontWeight:'600', alignItems:'center', textAlign:'center', borderColor:'#afaeae', borderWidth:0.5, borderRadius: 10, color:'#545454', padding:6, marginBottom:20,}} value="Stock Kekurangan" editable={false} />
                                  </View>
                                  <View style={{ display:'flex', flex:1, flexDirection:'row', justifyContent:'space-between', alignItems:'center' }}>
                                    <Text style={{ fontWeight:'500', flex:1, textAlign:'left', fontSize:12, marginRight:5, fontFamily:'HowdyLemon', }}>Ori (O)</Text>
                                    <Text style={{ fontWeight:'500', flex:1, textAlign:'center', fontSize:12, marginRight:5, fontFamily:'HowdyLemon', }}> : </Text>
                                    <Text style={{ fontWeight:'500', flex:1, textAlign:'right', fontSize:12, marginRight:5, fontFamily:'HowdyLemon', }}>{formatRupiahAndRibuan(stockKekuranganO ? stockKekuranganO : 0)}</Text>
                                  </View>
                                  <View style={{ display:'flex', flex:1, flexDirection:'row', marginTop:10, justifyContent:'space-between', alignItems:'center' }}>
                                    <Text style={{ fontWeight:'500', flex:1, textAlign:'left', fontSize:12, marginRight:5, fontFamily:'HowdyLemon', }}>Jamur (J)</Text>
                                    <Text style={{ fontWeight:'500', flex:1, textAlign:'center', fontSize:12, marginRight:5, fontFamily:'HowdyLemon', }}> : </Text>
                                    <Text style={{ fontWeight:'500', flex:1, textAlign:'right', fontSize:12, marginRight:5, fontFamily:'HowdyLemon', }}>{formatRupiahAndRibuan(stockKekuranganJ ? stockKekuranganJ : 0)}</Text>
                                  </View>
                                  <View style={{ display:'flex', flex:1, flexDirection:'row', marginTop:10, justifyContent:'space-between', alignItems:'center' }}>
                                    <Text style={{ fontWeight:'500', flex:1, textAlign:'left', fontSize:12, marginRight:5, fontFamily:'HowdyLemon', }}>Hot Spicy (H)</Text>
                                    <Text style={{ fontWeight:'500', flex:1, textAlign:'center', fontSize:12, marginRight:5, fontFamily:'HowdyLemon', }}> : </Text>
                                    <Text style={{ fontWeight:'500', flex:1, textAlign:'right', fontSize:12, marginRight:5, fontFamily:'HowdyLemon', }}>{formatRupiahAndRibuan(stockKekuranganH ? stockKekuranganH : 0)}</Text>
                                  </View>
                                  <View style={{ display:'flex', flex:1, flexDirection:'row', marginTop:10, justifyContent:'space-between', alignItems:'center' }}>
                                    <Text style={{ fontWeight:'500', flex:1, textAlign:'left', fontSize:12, marginRight:5, fontFamily:'HowdyLemon', }}>Merah Putih (MP)</Text>
                                    <Text style={{ fontWeight:'500', flex:1, textAlign:'center', fontSize:12, marginRight:5, fontFamily:'HowdyLemon', }}> : </Text>
                                    <Text style={{ fontWeight:'500', flex:1, textAlign:'right', fontSize:12, marginRight:5, fontFamily:'HowdyLemon', }}>{formatRupiahAndRibuan(stockKekuranganMP ? stockKekuranganMP : 0)}</Text>
                                  </View>
                                  <View style={{ display:'flex', flex:1, flexDirection:'row', marginTop:10, justifyContent:'space-between', alignItems:'center' }}>
                                    <Text style={{ fontWeight:'500', flex:1, textAlign:'left', fontSize:12, marginRight:5, fontFamily:'HowdyLemon', }}>Kulit (K)</Text>
                                    <Text style={{ fontWeight:'500', flex:1, textAlign:'center', fontSize:12, marginRight:5, fontFamily:'HowdyLemon', }}> : </Text>
                                    <Text style={{ fontWeight:'500', flex:1, textAlign:'right', fontSize:12, marginRight:5, fontFamily:'HowdyLemon', }}>{formatRupiahAndRibuan(stockKekuranganK ? stockKekuranganK : 0)}</Text>
                                  </View>
                                </View>

                                <View style={[{ marginVertical:10,  }, { borderWidth:0.5, borderColor:'#afaeae', fontWeight:'bold', backgroundColor:'#FFFF', borderRadius: 10, color:'#545454', padding:10, marginBottom:10}]}>
                                  <View>
                                      <TextInput style={{ justifyContent:'center', fontFamily:'HowdyLemon', fontSize:16, fontWeight:'600', alignItems:'center', textAlign:'center', borderColor:'#afaeae', borderWidth:0.5, borderRadius: 10, color:'#545454', padding:6, marginBottom:20,}} value="Produk Gagal (BS)" editable={false} />
                                  </View>
                                  <View style={{ display:'flex', flex:1, flexDirection:'row', justifyContent:'space-between', alignItems:'center' }}>
                                    <Text style={{ fontWeight:'500', flex:1, textAlign:'left', fontSize:12, marginRight:5, fontFamily:'HowdyLemon', }}>Ori (O)</Text>
                                    <Text style={{ fontWeight:'500', flex:1, textAlign:'center', fontSize:12, marginRight:5, fontFamily:'HowdyLemon', }}> : </Text>
                                    <Text style={{ fontWeight:'500', flex:1, textAlign:'right', fontSize:12, marginRight:5, fontFamily:'HowdyLemon', }}>{formatRupiahAndRibuan(qtyBSO ? qtyBSO : 0)}</Text>
                                  </View>
                                  <View style={{ display:'flex', flex:1, flexDirection:'row', marginTop:10, justifyContent:'space-between', alignItems:'center' }}>
                                    <Text style={{ fontWeight:'500', flex:1, textAlign:'left', fontSize:12, marginRight:5, fontFamily:'HowdyLemon', }}>Jamur (J)</Text>
                                    <Text style={{ fontWeight:'500', flex:1, textAlign:'center', fontSize:12, marginRight:5, fontFamily:'HowdyLemon', }}> : </Text>
                                    <Text style={{ fontWeight:'500', flex:1, textAlign:'right', fontSize:12, marginRight:5, fontFamily:'HowdyLemon', }}>{formatRupiahAndRibuan(qtyBSJ ? qtyBSJ : 0)}</Text>
                                  </View>
                                  <View style={{ display:'flex', flex:1, flexDirection:'row', marginTop:10, justifyContent:'space-between', alignItems:'center' }}>
                                    <Text style={{ fontWeight:'500', flex:1, textAlign:'left', fontSize:12, marginRight:5, fontFamily:'HowdyLemon', }}>Hot Spicy (H)</Text>
                                    <Text style={{ fontWeight:'500', flex:1, textAlign:'center', fontSize:12, marginRight:5, fontFamily:'HowdyLemon', }}> : </Text>
                                    <Text style={{ fontWeight:'500', flex:1, textAlign:'right', fontSize:12, marginRight:5, fontFamily:'HowdyLemon', }}>{formatRupiahAndRibuan(qtyBSH ? qtyBSH : 0)}</Text>
                                  </View>
                                  <View style={{ display:'flex', flex:1, flexDirection:'row', marginTop:10, justifyContent:'space-between', alignItems:'center' }}>
                                    <Text style={{ fontWeight:'500', flex:1, textAlign:'left', fontSize:12, marginRight:5, fontFamily:'HowdyLemon', }}>Merah Putih (MP)</Text>
                                    <Text style={{ fontWeight:'500', flex:1, textAlign:'center', fontSize:12, marginRight:5, fontFamily:'HowdyLemon', }}> : </Text>
                                    <Text style={{ fontWeight:'500', flex:1, textAlign:'right', fontSize:12, marginRight:5, fontFamily:'HowdyLemon', }}>{formatRupiahAndRibuan(qtyBSMP ? qtyBSMP : 0)}</Text>
                                  </View>
                                  <View style={{ display:'flex', flex:1, flexDirection:'row', marginTop:10, justifyContent:'space-between', alignItems:'center' }}>
                                    <Text style={{ fontWeight:'500', flex:1, textAlign:'left', fontSize:12, marginRight:5, fontFamily:'HowdyLemon', }}>Kulit (K)</Text>
                                    <Text style={{ fontWeight:'500', flex:1, textAlign:'center', fontSize:12, marginRight:5, fontFamily:'HowdyLemon', }}> : </Text>
                                    <Text style={{ fontWeight:'500', flex:1, textAlign:'right', fontSize:12, marginRight:5, fontFamily:'HowdyLemon', }}>{formatRupiahAndRibuan(qtyBSK ? qtyBSK : 0)}</Text>
                                  </View>
                                </View>

                                <View style={[{ marginVertical:10,  }, { borderWidth:0.5, borderColor:'#afaeae', fontWeight:'bold', backgroundColor:'#FFFF', borderRadius: 10, color:'#545454', padding:10, marginBottom:10}]}>
                                  <View>
                                      <TextInput style={{ justifyContent:'center', fontFamily:'HowdyLemon', fontSize:16, fontWeight:'600', alignItems:'center', textAlign:'center', borderColor:'#afaeae', borderWidth:0.5, borderRadius: 10, color:'#545454', padding:6, marginBottom:20,}} value="Bonus Pelanggan" editable={false} />
                                  </View>
                                  <View style={{ display:'flex', flex:1, flexDirection:'row', justifyContent:'space-between', alignItems:'center' }}>
                                    <Text style={{ fontWeight:'500', flex:1, textAlign:'left', fontSize:12, marginRight:5, fontFamily:'HowdyLemon', }}>Ori (O)</Text>
                                    <Text style={{ fontWeight:'500', flex:1, textAlign:'center', fontSize:12, marginRight:5, fontFamily:'HowdyLemon', }}> : </Text>
                                    <Text style={{ fontWeight:'500', flex:1, textAlign:'right', fontSize:12, marginRight:5, fontFamily:'HowdyLemon', }}>{formatRupiahAndRibuan(qtyBonusO ? qtyBonusO : 0)}</Text>
                                  </View>
                                  <View style={{ display:'flex', flex:1, flexDirection:'row', marginTop:10, justifyContent:'space-between', alignItems:'center' }}>
                                    <Text style={{ fontWeight:'500', flex:1, textAlign:'left', fontSize:12, marginRight:5, fontFamily:'HowdyLemon', }}>Jamur (J)</Text>
                                    <Text style={{ fontWeight:'500', flex:1, textAlign:'center', fontSize:12, marginRight:5, fontFamily:'HowdyLemon', }}> : </Text>
                                    <Text style={{ fontWeight:'500', flex:1, textAlign:'right', fontSize:12, marginRight:5, fontFamily:'HowdyLemon', }}>{formatRupiahAndRibuan(qtyBonusJ ? qtyBonusJ : 0)}</Text>
                                  </View>
                                  <View style={{ display:'flex', flex:1, flexDirection:'row', marginTop:10, justifyContent:'space-between', alignItems:'center' }}>
                                    <Text style={{ fontWeight:'500', flex:1, textAlign:'left', fontSize:12, marginRight:5, fontFamily:'HowdyLemon', }}>Hot Spicy (H)</Text>
                                    <Text style={{ fontWeight:'500', flex:1, textAlign:'center', fontSize:12, marginRight:5, fontFamily:'HowdyLemon', }}> : </Text>
                                    <Text style={{ fontWeight:'500', flex:1, textAlign:'right', fontSize:12, marginRight:5, fontFamily:'HowdyLemon', }}>{formatRupiahAndRibuan(qtyBonusH ? qtyBonusH : 0)}</Text>
                                  </View>
                                  <View style={{ display:'flex', flex:1, flexDirection:'row', marginTop:10, justifyContent:'space-between', alignItems:'center' }}>
                                    <Text style={{ fontWeight:'500', flex:1, textAlign:'left', fontSize:12, marginRight:5, fontFamily:'HowdyLemon', }}>Merah Putih (MP)</Text>
                                    <Text style={{ fontWeight:'500', flex:1, textAlign:'center', fontSize:12, marginRight:5, fontFamily:'HowdyLemon', }}> : </Text>
                                    <Text style={{ fontWeight:'500', flex:1, textAlign:'right', fontSize:12, marginRight:5, fontFamily:'HowdyLemon', }}>{formatRupiahAndRibuan(qtyBonusMP ? qtyBonusMP : 0)}</Text>
                                  </View>
                                  <View style={{ display:'flex', flex:1, flexDirection:'row', marginTop:10, justifyContent:'space-between', alignItems:'center' }}>
                                    <Text style={{ fontWeight:'500', flex:1, textAlign:'left', fontSize:12, marginRight:5, fontFamily:'HowdyLemon', }}>Kulit (K)</Text>
                                    <Text style={{ fontWeight:'500', flex:1, textAlign:'center', fontSize:12, marginRight:5, fontFamily:'HowdyLemon', }}> : </Text>
                                    <Text style={{ fontWeight:'500', flex:1, textAlign:'right', fontSize:12, marginRight:5, fontFamily:'HowdyLemon', }}>{formatRupiahAndRibuan(qtyBonusK ? qtyBonusK : 0)}</Text>
                                  </View>
                                </View>

                                <View style={[{ marginVertical:10,  }, { borderWidth:0.5, borderColor:'#afaeae', fontWeight:'bold', backgroundColor:'#FFFF', borderRadius: 10, color:'#545454', padding:10, marginBottom:10}]}>
                                  <View>
                                      <TextInput style={{ justifyContent:'center', fontFamily:'HowdyLemon', fontSize:16, fontWeight:'600', alignItems:'center', textAlign:'center', borderColor:'#afaeae', borderWidth:0.5, borderRadius: 10, color:'#545454', padding:6, marginBottom:20,}} value="Operasional" editable={false} />
                                  </View>
                                  <View style={{ display:'flex', flex:1, flexDirection:'row', justifyContent:'space-between', alignItems:'center' }}>
                                    <Text style={{ fontWeight:'500', flex:1, textAlign:'left', fontSize:12, marginRight:5, fontFamily:'HowdyLemon', }}>Bagi Hasil</Text>
                                    <Text style={{ fontWeight:'500', flex:1, textAlign:'center', fontSize:12, marginRight:5, fontFamily:'HowdyLemon', }}> : </Text>
                                    <Text style={{ fontWeight:'500',flex:1, textAlign:'right', fontSize:12, marginRight:5, fontFamily:'HowdyLemon', }}>{formatRupiahAndRibuan(bagiHasil ? bagiHasil : 0)}</Text>
                                  </View>
                                  <View style={{ display:'flex', flex:1, flexDirection:'row', marginTop:10, justifyContent:'space-between', alignItems:'center' }}>
                                    <Text style={{ fontWeight:'500', flex:1, textAlign:'left', fontSize:12, marginRight:5, fontFamily:'HowdyLemon', }}>Makan</Text>
                                    <Text style={{ fontWeight:'500', flex:1, textAlign:'center', fontSize:12, marginRight:5, fontFamily:'HowdyLemon', }}> : </Text>
                                    <Text style={{ fontWeight:'500',flex:1, textAlign:'right', fontSize:12, marginRight:5, fontFamily:'HowdyLemon', }}>{formatRupiahAndRibuan(makan ? makan : 0)}</Text>
                                  </View>
                                  <View style={{ display:'flex', flex:1, flexDirection:'row', marginTop:10, justifyContent:'space-between', alignItems:'center' }}>
                                    <Text style={{ fontWeight:'500', flex:1, textAlign:'left', fontSize:12, marginRight:5, fontFamily:'HowdyLemon', }}>Bensin</Text>
                                    <Text style={{ fontWeight:'500', flex:1, textAlign:'center', fontSize:12, marginRight:5, fontFamily:'HowdyLemon', }}> : </Text>
                                    <Text style={{ fontWeight:'500',flex:1, textAlign:'right', fontSize:12, marginRight:5, fontFamily:'HowdyLemon', }}>{formatRupiahAndRibuan(bensin ? bensin : 0)}</Text>
                                  </View>
                                  <View style={{ display:'flex', flex:1, flexDirection:'row', marginTop:10, justifyContent:'space-between', alignItems:'center' }}>
                                    <Text style={{ fontWeight:'500', flex:1, textAlign:'left', fontSize:12, marginRight:5, fontFamily:'HowdyLemon', }}>Jum'at Berkah</Text>
                                    <Text style={{ fontWeight:'500', flex:1, textAlign:'center', fontSize:12, marginRight:5, fontFamily:'HowdyLemon', }}> : </Text>
                                    <Text style={{ fontWeight:'500',flex:1, textAlign:'right', fontSize:12, marginRight:5, fontFamily:'HowdyLemon', }}>{formatRupiahAndRibuan(jumatBerkah ? jumatBerkah : 0)}</Text>
                                  </View>
                                  <View style={{ display:'flex', flex:1, flexDirection:'row', marginTop:10, justifyContent:'space-between', alignItems:'center' }}>
                                    <Text style={{ fontWeight:'500', flex:1, textAlign:'left', fontSize:12, marginRight:5, fontFamily:'HowdyLemon', }}>Tissue</Text>
                                    <Text style={{ fontWeight:'500', flex:1, textAlign:'center', fontSize:12, marginRight:5, fontFamily:'HowdyLemon', }}> : </Text>
                                    <Text style={{ fontWeight:'500', flex:1, textAlign:'right', fontSize:12, marginRight:5, fontFamily:'HowdyLemon', }}>{formatRupiahAndRibuan(tissue ? tissue : 0)}</Text>
                                  </View>
                                  <View style={{ display:'flex', flex:1, flexDirection:'row', marginTop:10, justifyContent:'space-between', alignItems:'center' }}>
                                    <Text style={{ fontWeight:'500', flex:1, textAlign:'left', fontSize:12, marginRight:5, fontFamily:'HowdyLemon', }}>Gas</Text>
                                    <Text style={{ fontWeight:'500', flex:1, textAlign:'center', fontSize:12, marginRight:5, fontFamily:'HowdyLemon', }}> : </Text>
                                    <Text style={{ fontWeight:'500', flex:1, textAlign:'right', fontSize:12, marginRight:5, fontFamily:'HowdyLemon', }}>{formatRupiahAndRibuan(gas ? gas : 0)}</Text>
                                  </View>
                                  <View style={{ display:'flex', flex:1, flexDirection:'row', marginTop:10, justifyContent:'space-between', alignItems:'center' }}>
                                    <Text style={{ fontWeight:'500', flex:1, textAlign:'left', fontSize:12, marginRight:5, fontFamily:'HowdyLemon', }}>Kresek 10</Text>
                                    <Text style={{ fontWeight:'500', flex:1, textAlign:'center', fontSize:12, marginRight:5, fontFamily:'HowdyLemon', }}> : </Text>
                                    <Text style={{ fontWeight:'500', flex:1, textAlign:'right', fontSize:12, marginRight:5, fontFamily:'HowdyLemon', }}>{formatRupiahAndRibuan(kresek10 ? kresek10 : 0)}</Text>
                                  </View>
                                  <View style={{ display:'flex', flex:1, flexDirection:'row', marginTop:10, justifyContent:'space-between', alignItems:'center' }}>
                                    <Text style={{ fontWeight:'500', flex:1, textAlign:'left', fontSize:12, marginRight:5, fontFamily:'HowdyLemon', }}>Kresek 15</Text>
                                    <Text style={{ fontWeight:'500', flex:1, textAlign:'center', fontSize:12, marginRight:5, fontFamily:'HowdyLemon', }}> : </Text>
                                    <Text style={{ fontWeight:'500', flex:1, textAlign:'right', fontSize:12, marginRight:5, fontFamily:'HowdyLemon', }}>{formatRupiahAndRibuan(kresek15 ? kresek15 : 0)}</Text>
                                  </View>
                                  <View style={{ display:'flex', flex:1, flexDirection:'row', marginTop:10, justifyContent:'space-between', alignItems:'center' }}>
                                    <Text style={{ fontWeight:'500', flex:1, textAlign:'left', fontSize:12, marginRight:5, fontFamily:'HowdyLemon', }}>Minyak Goreng 1L</Text>
                                    <Text style={{ fontWeight:'500', flex:1, textAlign:'center', fontSize:12, marginRight:5, fontFamily:'HowdyLemon', }}> : </Text>
                                    <Text style={{ fontWeight:'500', flex:1, textAlign:'right', fontSize:12, marginRight:5, fontFamily:'HowdyLemon', }}>{formatRupiahAndRibuan(minyakGoreng ? minyakGoreng : 0)}</Text>
                                  </View>
                                  <View style={{ display:'flex', flex:1, flexDirection:'row', marginTop:10, justifyContent:'space-between', alignItems:'center' }}>
                                    <Text style={{ fontWeight:'500', flex:1, textAlign:'left', fontSize:12, marginRight:5, fontFamily:'HowdyLemon', }}>Telor 1Kg</Text>
                                    <Text style={{ fontWeight:'500', flex:1, textAlign:'center', fontSize:12, marginRight:5, fontFamily:'HowdyLemon', }}> : </Text>
                                    <Text style={{ fontWeight:'500', flex:1, textAlign:'right', fontSize:12, marginRight:5, fontFamily:'HowdyLemon', }}>{formatRupiahAndRibuan(telor1kg ? telor1kg : 0)}</Text>
                                  </View>
                                  <View style={{ display:'flex', flex:1, flexDirection:'row', marginTop:10, justifyContent:'space-between', alignItems:'center' }}>
                                    <Text style={{ fontWeight:'500', flex:1, textAlign:'left', fontSize:12, marginRight:5, fontFamily:'HowdyLemon', }}>Plastik Sempol 12 x 25</Text>
                                    <Text style={{ fontWeight:'500', flex:1, textAlign:'center', fontSize:12, marginRight:5, fontFamily:'HowdyLemon', }}> : </Text>
                                    <Text style={{ fontWeight:'500', flex:1, textAlign:'right', fontSize:12, marginRight:5, fontFamily:'HowdyLemon', }}>{formatRupiahAndRibuan(plastikSempol ? plastikSempol : 0)}</Text>
                                  </View>
                                  <View style={{ display:'flex', flex:1, flexDirection:'row', marginTop:10, justifyContent:'space-between', alignItems:'center' }}>
                                    <Text style={{ fontWeight:'500', flex:1, textAlign:'left', fontSize:12, marginRight:5, fontFamily:'HowdyLemon', }}>Kasbon</Text>
                                    <Text style={{ fontWeight:'500', flex:1, textAlign:'center', fontSize:12, marginRight:5, fontFamily:'HowdyLemon', }}> : </Text>
                                    <Text style={{ fontWeight:'500', flex:1, textAlign:'right', fontSize:12, marginRight:5, fontFamily:'HowdyLemon', }}>{formatRupiahAndRibuan(kasbon ? kasbon : 0)}</Text>
                                  </View>
                                  <View style={{ display:'flex', flex:1, flexDirection:'row', marginTop:10, justifyContent:'space-between', alignItems:'center' }}>
                                    <Text style={{ fontWeight:'500', flex:1, textAlign:'left', fontSize:12, marginRight:5, fontFamily:'HowdyLemon', }}>Roico</Text>
                                    <Text style={{ fontWeight:'500', flex:1, textAlign:'center', fontSize:12, marginRight:5, fontFamily:'HowdyLemon', }}> : </Text>
                                    <Text style={{ fontWeight:'500', flex:1, textAlign:'right', fontSize:12, marginRight:5, fontFamily:'HowdyLemon', }}>{formatRupiahAndRibuan(roico ? roico : 0)}</Text>
                                  </View>
                                  <View style={{ display:'flex', flex:1, flexDirection:'row', marginTop:10, justifyContent:'space-between', alignItems:'center' }}>
                                    <Text style={{ fontWeight:'500', flex:1, textAlign:'left', fontSize:12, marginRight:5, fontFamily:'HowdyLemon', }}>Spon</Text>
                                    <Text style={{ fontWeight:'500', flex:1, textAlign:'center', fontSize:12, marginRight:5, fontFamily:'HowdyLemon', }}> : </Text>
                                    <Text style={{ fontWeight:'500', flex:1, textAlign:'right', fontSize:12, marginRight:5, fontFamily:'HowdyLemon', }}>{formatRupiahAndRibuan(spon ? spon : 0)}</Text>
                                  </View>
                                  <View style={{ display:'flex', flex:1, flexDirection:'row', marginTop:10, justifyContent:'space-between', alignItems:'center' }}>
                                    <Text style={{ fontWeight:'500', flex:1, textAlign:'left', fontSize:12, marginRight:5, fontFamily:'HowdyLemon', }}>Sunlight</Text>
                                    <Text style={{ fontWeight:'500', flex:1, textAlign:'center', fontSize:12, marginRight:5, fontFamily:'HowdyLemon', }}> : </Text>
                                    <Text style={{ fontWeight:'500', flex:1, textAlign:'right', fontSize:12, marginRight:5, fontFamily:'HowdyLemon', }}>{formatRupiahAndRibuan(sunlight ? sunlight : 0)}</Text>
                                  </View>
                                  <View style={{ display:'flex', flex:1, flexDirection:'row', marginTop:10, justifyContent:'space-between', alignItems:'center' }}>
                                    <Text style={{ fontWeight:'500', flex:1, textAlign:'left', fontSize:12, marginRight:5, fontFamily:'HowdyLemon', }}>Bonus Habis</Text>
                                    <Text style={{ fontWeight:'500', flex:1, textAlign:'center', fontSize:12, marginRight:5, fontFamily:'HowdyLemon', }}> : </Text>
                                    <Text style={{ fontWeight:'500', flex:1, textAlign:'right', fontSize:12, marginRight:5, fontFamily:'HowdyLemon', }}>{formatRupiahAndRibuan(bonusHabis ? bonusHabis : 0)}</Text>
                                  </View>
                                  <View style={{ display:'flex', flex:1, flexDirection:'row', marginTop:10, justifyContent:'space-between', alignItems:'center' }}>
                                    <Text style={{ fontWeight:'500', flex:1, textAlign:'left', fontSize:12, marginRight:5, fontFamily:'HowdyLemon', }}>Kebersihan</Text>
                                    <Text style={{ fontWeight:'500', flex:1, textAlign:'center', fontSize:12, marginRight:5, fontFamily:'HowdyLemon', }}> : </Text>
                                    <Text style={{ fontWeight:'500', flex:1, textAlign:'right', fontSize:12, marginRight:5, fontFamily:'HowdyLemon', }}>{formatRupiahAndRibuan(kebersihan ? kebersihan : 0)}</Text>
                                  </View>
                                  <View style={{ display:'flex', flex:1, flexDirection:'row', marginTop:10, justifyContent:'space-between', alignItems:'center' }}>
                                    <Text style={{ fontWeight:'500', flex:1, textAlign:'left', fontSize:12, marginRight:5, fontFamily:'HowdyLemon', }}>Kelabang</Text>
                                    <Text style={{ fontWeight:'500', flex:1, textAlign:'center', fontSize:12, marginRight:5, fontFamily:'HowdyLemon', }}> : </Text>
                                    <Text style={{ fontWeight:'500', flex:1, textAlign:'right', fontSize:12, marginRight:5, fontFamily:'HowdyLemon', }}>{formatRupiahAndRibuan(kelabang ? kelabang : 0)}</Text>
                                  </View>
                                  <View style={{ display:'flex', flex:1, flexDirection:'row', marginTop:10, justifyContent:'space-between', alignItems:'center' }}>
                                    <Text style={{ fontWeight:'500', flex:1, textAlign:'left', fontSize:12, marginRight:5, fontFamily:'HowdyLemon', }}>Takjil</Text>
                                    <Text style={{ fontWeight:'500', flex:1, textAlign:'center', fontSize:12, marginRight:5, fontFamily:'HowdyLemon', }}> : </Text>
                                    <Text style={{ fontWeight:'500', flex:1, textAlign:'right', fontSize:12, marginRight:5, fontFamily:'HowdyLemon', }}>{formatRupiahAndRibuan(takjil ? takjil : 0)}</Text>
                                  </View>
                                </View>

                                <View style={[{ marginVertical:10,  }, { borderWidth:0.5, borderColor:'#afaeae', fontWeight:'bold', backgroundColor:'#FFFF', borderRadius: 10, color:'#545454', padding:10, marginBottom:10}]}>
                                  <View>
                                      <TextInput style={{ justifyContent:'center', fontFamily:'HowdyLemon', fontSize:16, fontWeight:'600', alignItems:'center', textAlign:'center', borderColor:'#afaeae', borderWidth:0.5, borderRadius: 10, color:'#545454', padding:6, marginBottom:20,}} value="Gofood" editable={false} />
                                  </View>
                                  <View style={{ display:'flex', flex:1, flexDirection:'row', justifyContent:'space-between', alignItems:'center' }}>
                                    <Text style={{ fontWeight:'500', flex:1, textAlign:'left', fontSize:12, marginRight:5, fontFamily:'HowdyLemon', }}>Rp Gofood</Text>
                                    <Text style={{ fontWeight:'500', flex:1, textAlign:'center', fontSize:12, marginRight:5, fontFamily:'HowdyLemon', }}> : </Text>
                                    <Text style={{ fontWeight:'500', flex:1, textAlign:'right', fontSize:12, marginRight:5, fontFamily:'HowdyLemon', }}>{formatRupiahAndRibuan(rpGofood ? rpGofood : 0)}</Text>
                                  </View>
                                </View>

                                <View style={[{ marginVertical:10,  }, { borderWidth:0.5, borderColor:'#afaeae', fontWeight:'bold', backgroundColor:'#FFFF', borderRadius: 10, color:'#545454', padding:10, marginBottom:10}]}>
                                  <View>
                                      <TextInput style={{ justifyContent:'center', fontFamily:'HowdyLemon', fontSize:16, fontWeight:'600', alignItems:'center', textAlign:'center', borderColor:'#afaeae', borderWidth:0.5, borderRadius: 10, color:'#545454', padding:6, marginBottom:20,}} value="Operasional Lain" editable={false} />
                                  </View>
                                  <View style={{ display:'flex', flex:1, flexDirection:'row', justifyContent:'space-between', alignItems:'center' }}>
                                    <Text style={{ fontWeight:'500', flex:1, textAlign:'left', fontSize:12, marginRight:5, fontFamily:'HowdyLemon', }}>Free Cengek</Text>
                                    <Text style={{ fontWeight:'500', flex:1, textAlign:'center', fontSize:12, marginRight:5, fontFamily:'HowdyLemon', }}> : </Text>
                                    <Text style={{ fontWeight:'500', flex:1, textAlign:'right', fontSize:12, marginRight:5, fontFamily:'HowdyLemon', }}>{freeCengek ? freeCengek : ''}</Text>
                                  </View>
                                  <View style={{ display:'flex', flex:1, flexDirection:'row', marginTop:10, justifyContent:'space-between', alignItems:'center' }}>
                                    <Text style={{ fontWeight:'500', flex:1, textAlign:'left', fontSize:12, marginRight:5, fontFamily:'HowdyLemon', }}>Cengek</Text>
                                    <Text style={{ fontWeight:'500', flex:1, textAlign:'center', fontSize:12, marginRight:5, fontFamily:'HowdyLemon', }}> : </Text>
                                    <Text style={{ fontWeight:'500', flex:1, textAlign:'right', fontSize:12, marginRight:5, fontFamily:'HowdyLemon', }}>{cengek ? cengek : ''}</Text>
                                  </View>
                                  <View style={{ display:'flex', flex:1, flexDirection:'row', marginTop:10, justifyContent:'space-between', alignItems:'center' }}>
                                    <Text style={{ fontWeight:'500', flex:1, textAlign:'left', fontSize:12, marginRight:5, fontFamily:'HowdyLemon', }}>Stock Awal Telor</Text>
                                    <Text style={{ fontWeight:'500', flex:1, textAlign:'center', fontSize:12, marginRight:5, fontFamily:'HowdyLemon', }}> : </Text>
                                    <Text style={{ fontWeight:'500', flex:1, textAlign:'right', fontSize:12, marginRight:5, fontFamily:'HowdyLemon', }}>{stokAwalTelor ? stokAwalTelor : ''}</Text>
                                  </View>
                                  <View style={{ display:'flex', flex:1, flexDirection:'row', marginTop:10, justifyContent:'space-between', alignItems:'center' }}>
                                    <Text style={{ fontWeight:'500', flex:1, textAlign:'left', fontSize:12, marginRight:5, fontFamily:'HowdyLemon', }}>Stock Akhir Telor</Text>
                                    <Text style={{ fontWeight:'500', flex:1, textAlign:'center', fontSize:12, marginRight:5, fontFamily:'HowdyLemon', }}> : </Text>
                                    <Text style={{ fontWeight:'500', flex:1, textAlign:'right', fontSize:12, marginRight:5, fontFamily:'HowdyLemon', }}>{stokAkhirTelor ? stokAkhirTelor : ''}</Text>
                                  </View>
                                  <View style={{ display:'flex', flex:1, flexDirection:'row', marginTop:10, justifyContent:'space-between', alignItems:'center' }}>
                                    <Text style={{ fontWeight:'500', flex:1, textAlign:'left', fontSize:12, marginRight:5, fontFamily:'HowdyLemon', }}>Stock Awal Saos</Text>
                                    <Text style={{ fontWeight:'500', flex:1, textAlign:'center', fontSize:12, marginRight:5, fontFamily:'HowdyLemon', }}> : </Text>
                                    <Text style={{ fontWeight:'500', flex:1, textAlign:'right', fontSize:12, marginRight:5, fontFamily:'HowdyLemon', }}>{stokAwalSaos ? stokAwalSaos : ''}</Text>
                                  </View>
                                  <View style={{ display:'flex', flex:1, flexDirection:'row', marginTop:10, justifyContent:'space-between', alignItems:'center' }}>
                                    <Text style={{ fontWeight:'500', flex:1, textAlign:'left', fontSize:12, marginRight:5, fontFamily:'HowdyLemon', }}>Stock Akhir Saos</Text>
                                    <Text style={{ fontWeight:'500', flex:1, textAlign:'center', fontSize:12, marginRight:5, fontFamily:'HowdyLemon', }}> : </Text>
                                    <Text style={{ fontWeight:'500', flex:1, textAlign:'right', fontSize:12, marginRight:5, fontFamily:'HowdyLemon', }}>{stokAkhirSaos ? stokAkhirSaos : ''}</Text>
                                  </View>
                                  <View style={{ display:'flex', flex:1, flexDirection:'row', marginTop:10, justifyContent:'space-between', alignItems:'center' }}>
                                    <Text style={{ fontWeight:'500', flex:1, textAlign:'left', fontSize:12, marginRight:5, fontFamily:'HowdyLemon', }}>BT Ayam Bawang</Text>
                                    <Text style={{ fontWeight:'500', flex:1, textAlign:'center', fontSize:12, marginRight:5, fontFamily:'HowdyLemon', }}> : </Text>
                                    <Text style={{ fontWeight:'500', flex:1, textAlign:'right', fontSize:12, marginRight:5, fontFamily:'HowdyLemon', }}>{btAyamBawang ? btAyamBawang : ''}</Text>
                                  </View>
                                  <View style={{ display:'flex', flex:1, flexDirection:'row', marginTop:10, justifyContent:'space-between', alignItems:'center' }}>
                                    <Text style={{ fontWeight:'500', flex:1, textAlign:'left', fontSize:12, marginRight:5, fontFamily:'HowdyLemon', }}>BT Balado</Text>
                                    <Text style={{ fontWeight:'500', flex:1, textAlign:'center', fontSize:12, marginRight:5, fontFamily:'HowdyLemon', }}> : </Text>
                                    <Text style={{ fontWeight:'500', flex:1, textAlign:'right', fontSize:12, marginRight:5, fontFamily:'HowdyLemon', }}>{btBalado ? btBalado : ''}</Text>
                                  </View>
                                  <View style={{ display:'flex', flex:1, flexDirection:'row', marginTop:10, justifyContent:'space-between', alignItems:'center' }}>
                                    <Text style={{ fontWeight:'500', flex:1, textAlign:'left', fontSize:12, marginRight:5, fontFamily:'HowdyLemon', }}>BT Keju</Text>
                                    <Text style={{ fontWeight:'500', flex:1, textAlign:'center', fontSize:12, marginRight:5, fontFamily:'HowdyLemon', }}> : </Text>
                                    <Text style={{ fontWeight:'500', flex:1, textAlign:'right', fontSize:12, marginRight:5, fontFamily:'HowdyLemon', }}>{btBalado ? btBalado : ''}</Text>
                                  </View>
                                  <View style={{ display:'flex', flex:1, flexDirection:'row', marginTop:10, justifyContent:'space-between', alignItems:'center' }}>
                                    <Text style={{ fontWeight:'500', flex:1, textAlign:'left', fontSize:12, marginRight:5, fontFamily:'HowdyLemon', }}>Cengek Abah</Text>
                                    <Text style={{ fontWeight:'500', flex:1, textAlign:'center', fontSize:12, marginRight:5, fontFamily:'HowdyLemon', }}> : </Text>
                                    <Text style={{ fontWeight:'500', flex:1, textAlign:'right', fontSize:12, marginRight:5, fontFamily:'HowdyLemon', }}>{cengekAbah ? cengekAbah : ''}</Text>
                                  </View>
                                  <View style={{ display:'flex', flex:1, flexDirection:'row', marginTop:10, justifyContent:'space-between', alignItems:'center' }}>
                                    <Text style={{ fontWeight:'500', flex:1, textAlign:'left', fontSize:12, marginRight:5, fontFamily:'HowdyLemon', }}>Minyak Bawang</Text>
                                    <Text style={{ fontWeight:'500', flex:1, textAlign:'center', fontSize:12, marginRight:5, fontFamily:'HowdyLemon', }}> : </Text>
                                    <Text style={{ fontWeight:'500', flex:1, textAlign:'right', fontSize:12, marginRight:5, fontFamily:'HowdyLemon', }}>{minyakBawang ? minyakBawang : ''}</Text>
                                  </View>
                                  <View style={{ display:'flex', flex:1, flexDirection:'row', marginTop:10, justifyContent:'space-between', alignItems:'center' }}>
                                    <Text style={{ fontWeight:'500', flex:1, textAlign:'left', fontSize:12, marginRight:5, fontFamily:'HowdyLemon', }}>Plastik 15 x 30</Text>
                                    <Text style={{ fontWeight:'500', flex:1, textAlign:'center', fontSize:12, marginRight:5, fontFamily:'HowdyLemon', }}> : </Text>
                                    <Text style={{ fontWeight:'500', flex:1, textAlign:'right', fontSize:12, marginRight:5, fontFamily:'HowdyLemon', }}>{plastik1530 ? plastik1530 : ''}</Text>
                                  </View>
                                  <View style={{ display:'flex', flex:1, flexDirection:'row', marginTop:10, justifyContent:'space-between', alignItems:'center' }}>
                                    <Text style={{ fontWeight:'500', flex:1, textAlign:'left', fontSize:12, marginRight:5, fontFamily:'HowdyLemon', }}>Plastik 12 x 25</Text>
                                    <Text style={{ fontWeight:'500', flex:1, textAlign:'center', fontSize:12, marginRight:5, fontFamily:'HowdyLemon', }}> : </Text>
                                    <Text style={{ fontWeight:'500', flex:1, textAlign:'right', fontSize:12, marginRight:5, fontFamily:'HowdyLemon', }}>{plastik1225 ? plastik1225 : ''}</Text>
                                  </View>
                                  <View style={{ display:'flex', flex:1, flexDirection:'row', marginTop:10, justifyContent:'space-between', alignItems:'center' }}>
                                    <Text style={{ fontWeight:'500', flex:1, textAlign:'left', fontSize:12, marginRight:5, fontFamily:'HowdyLemon', }}>Plastik Saos</Text>
                                    <Text style={{ fontWeight:'500', flex:1, textAlign:'center', fontSize:12, marginRight:5, fontFamily:'HowdyLemon', }}> : </Text>
                                    <Text style={{ fontWeight:'500', flex:1, textAlign:'right', fontSize:12, marginRight:5, fontFamily:'HowdyLemon', }}>{plastikSaos ? plastikSaos : ''}</Text>
                                  </View>
                                </View>
                              </View>
                            </ScrollView>
                            <View style={{ flexDirection:'row', justifyContent:'space-between', bottom:0, width:'100%', }}>
                              <TouchableOpacity onPress={handleSubmit} style={{ backgroundColor:'#545454', marginRight:5, flex:1, borderWidth:0.75, borderColor:'#afaeae', borderRadius:20, paddingVertical:10, paddingHorizontal:8, flexDirection:'row', justifyContent:'space-between', alignItems:'center',marginVertical:10, }}>
                                  <Ionicons name="add-circle-outline" size={20} color="#FFF" />
                                  <Text style={{ color:'#FFF', fontWeight:'600',fontFamily:'HowdyLemon', marginHorizontal:10, fontSize:12, }}>Simpan</Text>
                              </TouchableOpacity>
                              <TouchableOpacity onPress={toggleModal} style={{ backgroundColor:'#FFF', marginLeft:5, flex:1, borderWidth:0.75, borderColor:'#545454', borderRadius:20, paddingVertical:10, paddingHorizontal:8, flexDirection:'row', justifyContent:'space-between', alignItems:'center',marginVertical:10, }}>
                                <Ionicons name="close-circle-outline" size={20} color="#545454" />
                                <Text style={{ color:'#545454', fontWeight:'600',fontFamily:'HowdyLemon', marginHorizontal:10, fontSize:12, }}>Cancel</Text>
                              </TouchableOpacity>
                            </View>
                          </View>
                        </Modal>
                    </View>
                  </View>
                )}
                {isVisible == 'Laporan' && (
                  <View style={{ borderWidth:0.5, display:'flex', flex:1, borderColor:'#afaeae', margin:10, paddingHorizontal:20, borderRadius:10, }}>
                        <View>
                            <TouchableOpacity>
                                <TextInput style={{ justifyContent:'center', fontFamily:'HowdyLemon', fontSize:16, fontWeight:'600', alignItems:'center', textAlign:'center', borderColor:'#afaeae', borderRadius: 10, color:'#545454', padding:10, marginTop:5}} value="Laporan" editable={false} />
                            </TouchableOpacity>
                            <View>
                              <View style={{ flexDirection: 'column', justifyContent: 'space-between', marginBottom: 20 }}>
                                {/* <TouchableOpacity onPress={showStartDatepicker}> 
                                  <View style={{ flexDirection: 'row', alignItems: 'center', borderWidth: 0.5, borderColor: '#afaeae', borderRadius: 10, padding: 10, marginBottom:5 }}>
                                    <Icon name="calendar" size={24} color="#000" />
                                    <Text style={{ marginLeft: 5 }}>Dari: {startDate.toLocaleDateString()}</Text>
                                  </View>
                                </TouchableOpacity> */}

                                <TouchableOpacity onPress={() => setShowStart(true)} style={{ marginTop:8, borderWidth:0.5, borderColor:'#afaeae', borderRadius: 10, color:'#545454', padding:8, paddingLeft:10, justifyContent:'space-between', textAlign:'center', alignItems:'center', flexDirection:'row'}}>
                                  <Text style={{fontFamily:'HowdyLemon', flex:1, color:'#545454', padding:3,}}>Tanggal Awal</Text>
                                  <Text style={{fontFamily:'HowdyLemon', color:'#545454', padding:3,}}>{formattedDateStart}</Text>
                                </TouchableOpacity>
                                {showStart && (
                                  <DateTimePicker
                                    value={startDate}
                                    mode="date"
                                    display="default"
                                    onChange={onChangeDateStart}
                                  />
                                )}

                                <TouchableOpacity onPress={() => setShowEnd(true)} style={{ marginTop:8, borderWidth:0.5, borderColor:'#afaeae', borderRadius: 10, color:'#545454', padding:8, paddingLeft:10, justifyContent:'space-between', textAlign:'center', alignItems:'center', flexDirection:'row'}}>
                                  <Text style={{fontFamily:'HowdyLemon', flex:1, color:'#545454', padding:3,}}>Tanggal Akhir</Text>
                                  <Text style={{fontFamily:'HowdyLemon', color:'#545454', padding:3,}}>{formattedDateEnd}</Text>
                                </TouchableOpacity>
                                {showEnd && (
                                  <DateTimePicker
                                    value={endDate}
                                    mode="date"
                                    display="default"
                                    onChange={onChangeDateEnd}
                                  />
                                )}

                                <TouchableOpacity style={{ backgroundColor:'#545454', borderWidth:0.75, borderColor:'#afaeae', borderRadius:20, paddingVertical:10, paddingHorizontal:8, display:'flex', flexDirection:'row', justifyContent:'space-between', alignItems:'center',marginVertical:10, }}>
                                    <Ionicons name="eye-outline" size={20} color="#FFF" />
                                    <Text style={{ color:'#FFF', fontWeight:'600',fontFamily:'HowdyLemon', marginHorizontal:10, fontSize:12, }}>View</Text>
                                </TouchableOpacity>

                                {/* <TouchableOpacity onPress={showEndDatepicker}> 
                                  <View style={{ flexDirection: 'row', alignItems: 'center', borderWidth: 0.5, borderColor: '#afaeae', borderRadius: 10, padding: 10, marginTop:5 }}>
                                    <Icon name="calendar" size={24} color="#000" />
                                    <Text style={{ marginLeft: 5 }}>Sampai: {endDate.toLocaleDateString()}</Text>
                                  </View>
                                </TouchableOpacity> */}
                              </View>

                              {showStartDatePicker && (<DateTimePicker value={startDate} mode="date" display="default" onChange={onChangeStartDate} />)}
                              {showEndDatePicker && (<DateTimePicker value={endDate} mode="date" display="default" onChange={onChangeEndDate} />)}

                              <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginTop: 10 }}>
                                <TouchableOpacity onPress={handleExport} style={{ alignItems: 'center', borderWidth: 0.5, borderColor: '#afaeae', borderRadius: 10, padding: 10, flex: 1, marginRight: 5 }}>
                                  <Icon name="file-pdf-o" size={20} color="#000" />
                                </TouchableOpacity>
                                
                                <TouchableOpacity onPress={handleExport} style={{ alignItems: 'center', borderWidth: 0.5, borderColor: '#afaeae', borderRadius: 10, padding: 10, flex: 1, marginLeft: 5 }}>
                                  <Icon name="file-excel-o" size={20} color="#000" />
                                </TouchableOpacity>
                              </View> 
                            </View>
                          </View>
                        <View style={[{ marginVertical:10,  }, { borderWidth:0.5, borderColor:'#afaeae', elevation:10, fontWeight:'bold', backgroundColor:'#e8e7e7', borderRadius: 10, color:'#545454', padding:10}]}>
                            <View>
                                <TextInput style={{ justifyContent:'center', fontFamily:'HowdyLemon', fontSize:16, fontWeight:'600', alignItems:'center', textAlign:'center', borderColor:'#afaeae', borderWidth:0.5, borderRadius: 10, color:'#545454', padding:10, marginBottom:20}} value="Stock Awal" editable={false} />
                            </View>
                            <View style={{ display: 'flex', flexDirection: 'row', alignItems: 'center' }}>
                              <Text style={{ fontWeight: '500', fontSize: 15, fontFamily: 'HowdyLemon', marginBottom: 10, flex: 1 }}>Ori (O)</Text>
                              <Text style={{ fontWeight: '500', fontSize: 15, fontFamily: 'HowdyLemon', marginBottom: 11, textAlign: 'center' }}>:</Text>
                              <Text style={{ fontWeight: '500', fontSize: 15, fontFamily: 'HowdyLemon', marginBottom: 11, flex: 1, textAlign: 'right' }}>1.000</Text>
                            </View>

                            <View style={{ display: 'flex', flexDirection: 'row', alignItems: 'center' }}>
                              <Text style={{ fontWeight: '500', fontSize: 15, fontFamily: 'HowdyLemon', marginBottom: 10, flex: 1 }}>Jamur (J)</Text>
                              <Text style={{ fontWeight: '500', fontSize: 15, fontFamily: 'HowdyLemon', marginBottom: 11, textAlign: 'center' }}>:</Text>
                              <Text style={{ fontWeight: '500', fontSize: 15, fontFamily: 'HowdyLemon', marginBottom: 11, flex: 1, textAlign: 'right' }}>10.000.000</Text>
                            </View>

                            <View style={{ display: 'flex', flexDirection: 'row', alignItems: 'center' }}>
                              <Text style={{ fontWeight: '500', fontSize: 15, fontFamily: 'HowdyLemon', marginBottom: 10, flex: 1 }}>Hot Spicy (H)</Text>
                              <Text style={{ fontWeight: '500', fontSize: 15, fontFamily: 'HowdyLemon', marginBottom: 11, textAlign: 'center' }}>:</Text>
                              <Text style={{ fontWeight: '500', fontSize: 15, fontFamily: 'HowdyLemon', marginBottom: 11, flex: 1, textAlign: 'right' }}>100.000.000</Text>
                            </View>

                            <View style={{ display: 'flex', flexDirection: 'row', alignItems: 'center' }}>
                              <Text style={{ fontWeight: '500', fontSize: 15, fontFamily: 'HowdyLemon', marginBottom: 10, flex: 1 }}>Merah Putih</Text>
                              <Text style={{ fontWeight: '500', fontSize: 15, fontFamily: 'HowdyLemon', marginBottom: 11, textAlign: 'center' }}>:</Text>
                              <Text style={{ fontWeight: '500', fontSize: 15, fontFamily: 'HowdyLemon', marginBottom: 11, flex: 1, textAlign: 'right' }}>10.000</Text>
                            </View>

                            <View style={{ display: 'flex', flexDirection: 'row', alignItems: 'center' }}>
                              <Text style={{ fontWeight: '500', fontSize: 15, fontFamily: 'HowdyLemon', marginBottom: 10, flex: 1 }}>Kulit</Text>
                              <Text style={{ fontWeight: '500', fontSize: 15, fontFamily: 'HowdyLemon', marginBottom: 11, textAlign: 'center' }}>:</Text>
                              <Text style={{ fontWeight: '500', fontSize: 15, fontFamily: 'HowdyLemon', marginBottom: 11, flex: 1, textAlign: 'right' }}>10.000</Text>
                            </View>
                            <View>
                                <TextInput style={{ justifyContent:'center', fontFamily:'HowdyLemon', fontSize:16, fontWeight:'600', alignItems:'center', textAlign:'center', borderColor:'#afaeae', borderWidth:0.5, borderRadius: 10, color:'#545454', padding:10, marginBottom:30,marginTop:20,}} value="Kelebihan - Kekurangan Stock" editable={false} />
                            </View>
                          <View style={{ display:'flex', flex:1, flexDirection:'row', justifyContent:'space-between', alignItems:'center' }}>
                          <Text style={{ fontWeight: '500', fontSize: 15, fontFamily: 'HowdyLemon', marginBottom: 10, flex: 1 }}>Ori (O)</Text>
                              <Text style={{ fontWeight: '500', fontSize: 15, fontFamily: 'HowdyLemon', marginBottom: 11, textAlign: 'center' }}>:</Text>
                              <Text style={{ fontWeight: '500', fontSize: 15, fontFamily: 'HowdyLemon', marginBottom: 11, flex: 1, textAlign: 'right' }}>1.000</Text>
                            </View>

                            <View style={{ display: 'flex', flexDirection: 'row', alignItems: 'center' }}>
                              <Text style={{ fontWeight: '500', fontSize: 15, fontFamily: 'HowdyLemon', marginBottom: 10, flex: 1 }}>Jamur (J)</Text>
                              <Text style={{ fontWeight: '500', fontSize: 15, fontFamily: 'HowdyLemon', marginBottom: 11, textAlign: 'center' }}>:</Text>
                              <Text style={{ fontWeight: '500', fontSize: 15, fontFamily: 'HowdyLemon', marginBottom: 11, flex: 1, textAlign: 'right' }}>10.000</Text>
                            </View>

                            <View style={{ display: 'flex', flexDirection: 'row', alignItems: 'center' }}>
                              <Text style={{ fontWeight: '500', fontSize: 15, fontFamily: 'HowdyLemon', marginBottom: 10, flex: 1 }}>Hot Spicy (H)</Text>
                              <Text style={{ fontWeight: '500', fontSize: 15, fontFamily: 'HowdyLemon', marginBottom: 11, textAlign: 'center' }}>:</Text>
                              <Text style={{ fontWeight: '500', fontSize: 15, fontFamily: 'HowdyLemon', marginBottom: 11, flex: 1, textAlign: 'right' }}>10.000</Text>
                            </View>

                            <View style={{ display: 'flex', flexDirection: 'row', alignItems: 'center' }}>
                              <Text style={{ fontWeight: '500', fontSize: 15, fontFamily: 'HowdyLemon', marginBottom: 10, flex: 1 }}>Merah Putih</Text>
                              <Text style={{ fontWeight: '500', fontSize: 15, fontFamily: 'HowdyLemon', marginBottom: 11, textAlign: 'center' }}>:</Text>
                              <Text style={{ fontWeight: '500', fontSize: 15, fontFamily: 'HowdyLemon', marginBottom: 11, flex: 1, textAlign: 'right' }}>10.000</Text>
                            </View>

                            <View style={{ display: 'flex', flexDirection: 'row', alignItems: 'center' }}>
                              <Text style={{ fontWeight: '500', fontSize: 15, fontFamily: 'HowdyLemon', marginBottom: 10, flex: 1 }}>Kulit</Text>
                              <Text style={{ fontWeight: '500', fontSize: 15, fontFamily: 'HowdyLemon', marginBottom: 11, textAlign: 'center' }}>:</Text>
                              <Text style={{ fontWeight: '500', fontSize: 15, fontFamily: 'HowdyLemon', marginBottom: 11, flex: 1, textAlign: 'right' }}>10.000</Text>
                            </View>
                            <View>
                                <TextInput style={{ justifyContent:'center', fontFamily:'HowdyLemon', fontSize:16, fontWeight:'600', alignItems:'center', textAlign:'center', borderColor:'#afaeae', borderWidth:0.5, borderRadius: 10, color:'#545454', padding:10, marginBottom:30,marginTop:20,}} value="Product Gagal (BS)" editable={false} />
                            </View>
                          <View style={{ display:'flex', flex:1, flexDirection:'row', justifyContent:'space-between', alignItems:'center' }}>
                          <Text style={{ fontWeight: '500', fontSize: 15, fontFamily: 'HowdyLemon', marginBottom: 10, flex: 1 }}>Ori (O)</Text>
                              <Text style={{ fontWeight: '500', fontSize: 15, fontFamily: 'HowdyLemon', marginBottom: 11, textAlign: 'center' }}>:</Text>
                              <Text style={{ fontWeight: '500', fontSize: 15, fontFamily: 'HowdyLemon', marginBottom: 11, flex: 1, textAlign: 'right' }}>1.000</Text>
                            </View>

                            <View style={{ display: 'flex', flexDirection: 'row', alignItems: 'center' }}>
                              <Text style={{ fontWeight: '500', fontSize: 15, fontFamily: 'HowdyLemon', marginBottom: 10, flex: 1 }}>Jamur (J)</Text>
                              <Text style={{ fontWeight: '500', fontSize: 15, fontFamily: 'HowdyLemon', marginBottom: 11, textAlign: 'center' }}>:</Text>
                              <Text style={{ fontWeight: '500', fontSize: 15, fontFamily: 'HowdyLemon', marginBottom: 11, flex: 1, textAlign: 'right' }}>10.000</Text>
                            </View>

                            <View style={{ display: 'flex', flexDirection: 'row', alignItems: 'center' }}>
                              <Text style={{ fontWeight: '500', fontSize: 15, fontFamily: 'HowdyLemon', marginBottom: 10, flex: 1 }}>Hot Spicy (H)</Text>
                              <Text style={{ fontWeight: '500', fontSize: 15, fontFamily: 'HowdyLemon', marginBottom: 11, textAlign: 'center' }}>:</Text>
                              <Text style={{ fontWeight: '500', fontSize: 15, fontFamily: 'HowdyLemon', marginBottom: 11, flex: 1, textAlign: 'right' }}>10.000</Text>
                            </View>

                            <View style={{ display: 'flex', flexDirection: 'row', alignItems: 'center' }}>
                              <Text style={{ fontWeight: '500', fontSize: 15, fontFamily: 'HowdyLemon', marginBottom: 10, flex: 1 }}>Merah Putih</Text>
                              <Text style={{ fontWeight: '500', fontSize: 15, fontFamily: 'HowdyLemon', marginBottom: 11, textAlign: 'center' }}>:</Text>
                              <Text style={{ fontWeight: '500', fontSize: 15, fontFamily: 'HowdyLemon', marginBottom: 11, flex: 1, textAlign: 'right' }}>10.000</Text>
                            </View>

                            <View style={{ display: 'flex', flexDirection: 'row', alignItems: 'center' }}>
                              <Text style={{ fontWeight: '500', fontSize: 15, fontFamily: 'HowdyLemon', marginBottom: 10, flex: 1 }}>Kulit</Text>
                              <Text style={{ fontWeight: '500', fontSize: 15, fontFamily: 'HowdyLemon', marginBottom: 11, textAlign: 'center' }}>:</Text>
                              <Text style={{ fontWeight: '500', fontSize: 15, fontFamily: 'HowdyLemon', marginBottom: 11, flex: 1, textAlign: 'right' }}>10.000</Text>
                            </View>
                            <View>
                                <TextInput style={{ justifyContent:'center', fontFamily:'HowdyLemon', fontSize:16, fontWeight:'600', alignItems:'center', textAlign:'center', borderColor:'#afaeae', borderWidth:0.5, borderRadius: 10, color:'#545454', padding:10, marginBottom:20}} value="Bonus Pelangan" editable={false} />
                            </View>
                          <View style={{ display:'flex', flex:1, flexDirection:'row', justifyContent:'space-between', alignItems:'center' }}>
                          <Text style={{ fontWeight: '500', fontSize: 15, fontFamily: 'HowdyLemon', marginBottom: 10, flex: 1 }}>Ori (O)</Text>
                              <Text style={{ fontWeight: '500', fontSize: 15, fontFamily: 'HowdyLemon', marginBottom: 11, textAlign: 'center' }}>:</Text>
                              <Text style={{ fontWeight: '500', fontSize: 15, fontFamily: 'HowdyLemon', marginBottom: 11, flex: 1, textAlign: 'right' }}>1.000</Text>
                            </View>

                            <View style={{ display: 'flex', flexDirection: 'row', alignItems: 'center' }}>
                              <Text style={{ fontWeight: '500', fontSize: 15, fontFamily: 'HowdyLemon', marginBottom: 10, flex: 1 }}>Jamur (J)</Text>
                              <Text style={{ fontWeight: '500', fontSize: 15, fontFamily: 'HowdyLemon', marginBottom: 11, textAlign: 'center' }}>:</Text>
                              <Text style={{ fontWeight: '500', fontSize: 15, fontFamily: 'HowdyLemon', marginBottom: 11, flex: 1, textAlign: 'right' }}>10.000</Text>
                            </View>

                            <View style={{ display: 'flex', flexDirection: 'row', alignItems: 'center' }}>
                              <Text style={{ fontWeight: '500', fontSize: 15, fontFamily: 'HowdyLemon', marginBottom: 10, flex: 1 }}>Hot Spicy (H)</Text>
                              <Text style={{ fontWeight: '500', fontSize: 15, fontFamily: 'HowdyLemon', marginBottom: 11, textAlign: 'center' }}>:</Text>
                              <Text style={{ fontWeight: '500', fontSize: 15, fontFamily: 'HowdyLemon', marginBottom: 11, flex: 1, textAlign: 'right' }}>10.000</Text>
                            </View>

                            <View style={{ display: 'flex', flexDirection: 'row', alignItems: 'center' }}>
                              <Text style={{ fontWeight: '500', fontSize: 15, fontFamily: 'HowdyLemon', marginBottom: 10, flex: 1 }}>Merah Putih</Text>
                              <Text style={{ fontWeight: '500', fontSize: 15, fontFamily: 'HowdyLemon', marginBottom: 11, textAlign: 'center' }}>:</Text>
                              <Text style={{ fontWeight: '500', fontSize: 15, fontFamily: 'HowdyLemon', marginBottom: 11, flex: 1, textAlign: 'right' }}>10.000</Text>
                            </View>

                            <View style={{ display: 'flex', flexDirection: 'row', alignItems: 'center' }}>
                              <Text style={{ fontWeight: '500', fontSize: 15, fontFamily: 'HowdyLemon', marginBottom: 10, flex: 1 }}>Kulit</Text>
                              <Text style={{ fontWeight: '500', fontSize: 15, fontFamily: 'HowdyLemon', marginBottom: 11, textAlign: 'center' }}>:</Text>
                              <Text style={{ fontWeight: '500', fontSize: 15, fontFamily: 'HowdyLemon', marginBottom: 11, flex: 1, textAlign: 'right' }}>10.000</Text>
                            </View>
                            <View>
                                <TextInput style={{ justifyContent:'center', fontFamily:'HowdyLemon', fontSize:16, fontWeight:'600', alignItems:'center', textAlign:'center', borderColor:'#afaeae', borderWidth:0.5, borderRadius: 10, color:'#545454', padding:10, marginBottom:20}} value="Oprasional" editable={false} />
                            </View>
                            <View style={{ display:'flex', flex:1, flexDirection:'row', justifyContent:'space-between', alignItems:'center' }}>
                              <Text style={{ fontWeight: '500', fontSize: 15, fontFamily: 'HowdyLemon', marginBottom: 10, flex: 1 }}>Bagi Hasil</Text>
                              <Text style={{ fontWeight: '500', fontSize: 15, fontFamily: 'HowdyLemon', marginBottom: 11, textAlign: 'center' }}>:</Text>
                              <Text style={{ fontWeight: '500', fontSize: 15, fontFamily: 'HowdyLemon', marginBottom: 11, flex: 1, textAlign: 'right' }}>1.000</Text>
                            </View>
                          <View style={{ display:'flex', flex:1, flexDirection:'row', justifyContent:'space-between', alignItems:'center' }}>
                              <Text style={{ fontWeight: '500', fontSize: 15, fontFamily: 'HowdyLemon', marginBottom: 10, flex: 1 }}>Makan</Text>
                              <Text style={{ fontWeight: '500', fontSize: 15, fontFamily: 'HowdyLemon', marginBottom: 11, textAlign: 'center' }}>:</Text>
                              <Text style={{ fontWeight: '500', fontSize: 15, fontFamily: 'HowdyLemon', marginBottom: 11, flex: 1, textAlign: 'right' }}>1.000</Text>
                            </View>
                            <View style={{ display:'flex', flex:1, flexDirection:'row', justifyContent:'space-between', alignItems:'center' }}>
                              <Text style={{ fontWeight: '500', fontSize: 15, fontFamily: 'HowdyLemon', marginBottom: 10, flex: 1 }}>Bensin</Text>
                              <Text style={{ fontWeight: '500', fontSize: 15, fontFamily: 'HowdyLemon', marginBottom: 11, textAlign: 'center' }}>:</Text>
                              <Text style={{ fontWeight: '500', fontSize: 15, fontFamily: 'HowdyLemon', marginBottom: 11, flex: 1, textAlign: 'right' }}>1.000</Text>
                            </View>
                            <View style={{ display:'flex', flex:1, flexDirection:'row', justifyContent:'space-between', alignItems:'center' }}>
                              <Text style={{ fontWeight: '500', fontSize: 15, fontFamily: 'HowdyLemon', marginBottom: 10, flex: 1 }}>Jumat Berkah </Text>
                              <Text style={{ fontWeight: '500', fontSize: 15, fontFamily: 'HowdyLemon', marginBottom: 11, textAlign: 'center' }}>:</Text>
                              <Text style={{ fontWeight: '500', fontSize: 15, fontFamily: 'HowdyLemon', marginBottom: 11, flex: 1, textAlign: 'right' }}>1.000</Text>
                            </View>
                            <View style={{ display:'flex', flex:1, flexDirection:'row', justifyContent:'space-between', alignItems:'center' }}>
                              <Text style={{ fontWeight: '500', fontSize: 15, fontFamily: 'HowdyLemon', marginBottom: 10, flex: 1 }}>Tissue</Text>
                              <Text style={{ fontWeight: '500', fontSize: 15, fontFamily: 'HowdyLemon', marginBottom: 11, textAlign: 'center' }}>:</Text>
                              <Text style={{ fontWeight: '500', fontSize: 15, fontFamily: 'HowdyLemon', marginBottom: 11, flex: 1, textAlign: 'right' }}>1.000</Text>
                            </View>
                            <View style={{ display:'flex', flex:1, flexDirection:'row', justifyContent:'space-between', alignItems:'center' }}>
                              <Text style={{ fontWeight: '500', fontSize: 15, fontFamily: 'HowdyLemon', marginBottom: 10, flex: 1 }}>Gas</Text>
                              <Text style={{ fontWeight: '500', fontSize: 15, fontFamily: 'HowdyLemon', marginBottom: 11, textAlign: 'center' }}>:</Text>
                              <Text style={{ fontWeight: '500', fontSize: 15, fontFamily: 'HowdyLemon', marginBottom: 11, flex: 1, textAlign: 'right' }}>1.000</Text>
                            </View>
                            <View style={{ display:'flex', flex:1, flexDirection:'row', justifyContent:'space-between', alignItems:'center' }}>
                              <Text style={{ fontWeight: '500', fontSize: 15, fontFamily: 'HowdyLemon', marginBottom: 10, flex: 1 }}>Kresek 10</Text>
                              <Text style={{ fontWeight: '500', fontSize: 15, fontFamily: 'HowdyLemon', marginBottom: 11, textAlign: 'center' }}>:</Text>
                              <Text style={{ fontWeight: '500', fontSize: 15, fontFamily: 'HowdyLemon', marginBottom: 11, flex: 1, textAlign: 'right' }}>1.000</Text>
                            </View>
                            <View style={{ display:'flex', flex:1, flexDirection:'row', justifyContent:'space-between', alignItems:'center' }}>
                              <Text style={{ fontWeight: '500', fontSize: 15, fontFamily: 'HowdyLemon', marginBottom: 10, flex: 1 }}>Kresek 15</Text>
                              <Text style={{ fontWeight: '500', fontSize: 15, fontFamily: 'HowdyLemon', marginBottom: 11, textAlign: 'center' }}>:</Text>
                              <Text style={{ fontWeight: '500', fontSize: 15, fontFamily: 'HowdyLemon', marginBottom: 11, flex: 1, textAlign: 'right' }}>1.000</Text>
                            </View>
                            <View style={{ display:'flex', flex:1, flexDirection:'row', justifyContent:'space-between', alignItems:'center' }}>
                              <Text style={{ fontWeight: '500', fontSize: 15, fontFamily: 'HowdyLemon', marginBottom: 10, flex: 1 }}>Minyak Goreng 1L</Text>
                              <Text style={{ fontWeight: '500', fontSize: 15, fontFamily: 'HowdyLemon', marginBottom: 11, textAlign: 'center' }}>:</Text>
                              <Text style={{ fontWeight: '500', fontSize: 15, fontFamily: 'HowdyLemon', marginBottom: 11, flex: 1, textAlign: 'right' }}>1.000</Text>
                            </View>
                            <View style={{ display:'flex', flex:1, flexDirection:'row', justifyContent:'space-between', alignItems:'center' }}>
                              <Text style={{ fontWeight: '500', fontSize: 15, fontFamily: 'HowdyLemon', marginBottom: 10, flex: 1 }}>Telor 1 kg</Text>
                              <Text style={{ fontWeight: '500', fontSize: 15, fontFamily: 'HowdyLemon', marginBottom: 11, textAlign: 'center' }}>:</Text>
                              <Text style={{ fontWeight: '500', fontSize: 15, fontFamily: 'HowdyLemon', marginBottom: 11, flex: 1, textAlign: 'right' }}>1.000</Text>
                            </View>
                            <View style={{ display:'flex', flex:1, flexDirection:'row', justifyContent:'space-between', alignItems:'center' }}>
                              <Text style={{ fontWeight: '500', fontSize: 15, fontFamily: 'HowdyLemon', marginBottom: 10, flex: 1 }}>Plastik Sempol 12 x 25</Text>
                              <Text style={{ fontWeight: '500', fontSize: 15, fontFamily: 'HowdyLemon', marginBottom: 11, textAlign: 'center' }}>:</Text>
                              <Text style={{ fontWeight: '500', fontSize: 15, fontFamily: 'HowdyLemon', marginBottom: 11, flex: 1, textAlign: 'right' }}>1.000</Text>
                            </View>
                            <View style={{ display:'flex', flex:1, flexDirection:'row', justifyContent:'space-between', alignItems:'center' }}>
                              <Text style={{ fontWeight: '500', fontSize: 15, fontFamily: 'HowdyLemon', marginBottom: 10, flex: 1 }}>Kasbon</Text>
                              <Text style={{ fontWeight: '500', fontSize: 15, fontFamily: 'HowdyLemon', marginBottom: 11, textAlign: 'center' }}>:</Text>
                              <Text style={{ fontWeight: '500', fontSize: 15, fontFamily: 'HowdyLemon', marginBottom: 11, flex: 1, textAlign: 'right' }}>1.000</Text>
                            </View>
                            <View style={{ display:'flex', flex:1, flexDirection:'row', justifyContent:'space-between', alignItems:'center' }}>
                              <Text style={{ fontWeight: '500', fontSize: 15, fontFamily: 'HowdyLemon', marginBottom: 10, flex: 1 }}>Royco</Text>
                              <Text style={{ fontWeight: '500', fontSize: 15, fontFamily: 'HowdyLemon', marginBottom: 11, textAlign: 'center' }}>:</Text>
                              <Text style={{ fontWeight: '500', fontSize: 15, fontFamily: 'HowdyLemon', marginBottom: 11, flex: 1, textAlign: 'right' }}>1.000</Text>
                            </View>
                            <View style={{ display:'flex', flex:1, flexDirection:'row', justifyContent:'space-between', alignItems:'center' }}>
                              <Text style={{ fontWeight: '500', fontSize: 15, fontFamily: 'HowdyLemon', marginBottom: 10, flex: 1 }}>Spon</Text>
                              <Text style={{ fontWeight: '500', fontSize: 15, fontFamily: 'HowdyLemon', marginBottom: 11, textAlign: 'center' }}>:</Text>
                              <Text style={{ fontWeight: '500', fontSize: 15, fontFamily: 'HowdyLemon', marginBottom: 11, flex: 1, textAlign: 'right' }}>1.000</Text>
                            </View>
                            <View style={{ display:'flex', flex:1, flexDirection:'row', justifyContent:'space-between', alignItems:'center' }}>
                              <Text style={{ fontWeight: '500', fontSize: 15, fontFamily: 'HowdyLemon', marginBottom: 10, flex: 1 }}>Sunlight</Text>
                              <Text style={{ fontWeight: '500', fontSize: 15, fontFamily: 'HowdyLemon', marginBottom: 11, textAlign: 'center' }}>:</Text>
                              <Text style={{ fontWeight: '500', fontSize: 15, fontFamily: 'HowdyLemon', marginBottom: 11, flex: 1, textAlign: 'right' }}>1.000</Text>
                            </View>
                            <View style={{ display:'flex', flex:1, flexDirection:'row', justifyContent:'space-between', alignItems:'center' }}>
                              <Text style={{ fontWeight: '500', fontSize: 15, fontFamily: 'HowdyLemon', marginBottom: 10, flex: 1 }}>Bonus Habis</Text>
                              <Text style={{ fontWeight: '500', fontSize: 15, fontFamily: 'HowdyLemon', marginBottom: 11, textAlign: 'center' }}>:</Text>
                              <Text style={{ fontWeight: '500', fontSize: 15, fontFamily: 'HowdyLemon', marginBottom: 11, flex: 1, textAlign: 'right' }}>1.000</Text>
                            </View>
                            <View style={{ display:'flex', flex:1, flexDirection:'row', justifyContent:'space-between', alignItems:'center' }}>
                              <Text style={{ fontWeight: '500', fontSize: 15, fontFamily: 'HowdyLemon', marginBottom: 10, flex: 1 }}>Kebersihan</Text>
                              <Text style={{ fontWeight: '500', fontSize: 15, fontFamily: 'HowdyLemon', marginBottom: 11, textAlign: 'center' }}>:</Text>
                              <Text style={{ fontWeight: '500', fontSize: 15, fontFamily: 'HowdyLemon', marginBottom: 11, flex: 1, textAlign: 'right' }}>1.000</Text>
                            </View>
                            <View style={{ display:'flex', flex:1, flexDirection:'row', justifyContent:'space-between', alignItems:'center' }}>
                              <Text style={{ fontWeight: '500', fontSize: 15, fontFamily: 'HowdyLemon', marginBottom: 10, flex: 1 }}>Kelabang</Text>
                              <Text style={{ fontWeight: '500', fontSize: 15, fontFamily: 'HowdyLemon', marginBottom: 11, textAlign: 'center' }}>:</Text>
                              <Text style={{ fontWeight: '500', fontSize: 15, fontFamily: 'HowdyLemon', marginBottom: 11, flex: 1, textAlign: 'right' }}>1.000</Text>
                            </View>
                            <View style={{ display:'flex', flex:1, flexDirection:'row', justifyContent:'space-between', alignItems:'center' }}>
                              <Text style={{ fontWeight: '500', fontSize: 15, fontFamily: 'HowdyLemon', marginBottom: 10, flex: 1 }}>Takjil</Text>
                              <Text style={{ fontWeight: '500', fontSize: 15, fontFamily: 'HowdyLemon', marginBottom: 11, textAlign: 'center' }}>:</Text>
                              <Text style={{ fontWeight: '500', fontSize: 15, fontFamily: 'HowdyLemon', marginBottom: 11, flex: 1, textAlign: 'right' }}>1.000</Text>
                            </View>
                          <View>
                                <TextInput style={{ justifyContent:'center', fontFamily:'HowdyLemon', fontSize:16, fontWeight:'600', alignItems:'center', textAlign:'center', borderColor:'#afaeae', borderWidth:0.5, borderRadius: 10, color:'#545454', padding:10, marginBottom:20}} value="GoFood" editable={false} />
                            </View>
                          <View style={{ display:'flex', flex:1, flexDirection:'row', justifyContent:'space-between', alignItems:'center' }}>
                          <Text style={{ fontWeight: '500', fontSize: 15, fontFamily: 'HowdyLemon', marginBottom: 10, flex: 1 }}>Ori (O)</Text>
                              <Text style={{ fontWeight: '500', fontSize: 15, fontFamily: 'HowdyLemon', marginBottom: 11, textAlign: 'center' }}>:</Text>
                              <Text style={{ fontWeight: '500', fontSize: 15, fontFamily: 'HowdyLemon', marginBottom: 11, flex: 1, textAlign: 'right' }}>1.000</Text>
                            </View>

                            <View style={{ display: 'flex', flexDirection: 'row', alignItems: 'center' }}>
                              <Text style={{ fontWeight: '500', fontSize: 15, fontFamily: 'HowdyLemon', marginBottom: 10, flex: 1 }}>Jamur (J)</Text>
                              <Text style={{ fontWeight: '500', fontSize: 15, fontFamily: 'HowdyLemon', marginBottom: 11, textAlign: 'center' }}>:</Text>
                              <Text style={{ fontWeight: '500', fontSize: 15, fontFamily: 'HowdyLemon', marginBottom: 11, flex: 1, textAlign: 'right' }}>10.000</Text>
                            </View>

                            <View style={{ display: 'flex', flexDirection: 'row', alignItems: 'center' }}>
                              <Text style={{ fontWeight: '500', fontSize: 15, fontFamily: 'HowdyLemon', marginBottom: 10, flex: 1 }}>Hot Spicy (H)</Text>
                              <Text style={{ fontWeight: '500', fontSize: 15, fontFamily: 'HowdyLemon', marginBottom: 11, textAlign: 'center' }}>:</Text>
                              <Text style={{ fontWeight: '500', fontSize: 15, fontFamily: 'HowdyLemon', marginBottom: 11, flex: 1, textAlign: 'right' }}>10.000</Text>
                            </View>

                            <View style={{ display: 'flex', flexDirection: 'row', alignItems: 'center' }}>
                              <Text style={{ fontWeight: '500', fontSize: 15, fontFamily: 'HowdyLemon', marginBottom: 10, flex: 1 }}>Merah Putih</Text>
                              <Text style={{ fontWeight: '500', fontSize: 15, fontFamily: 'HowdyLemon', marginBottom: 11, textAlign: 'center' }}>:</Text>
                              <Text style={{ fontWeight: '500', fontSize: 15, fontFamily: 'HowdyLemon', marginBottom: 11, flex: 1, textAlign: 'right' }}>10.000</Text>
                            </View>

                            <View style={{ display: 'flex', flexDirection: 'row', alignItems: 'center' }}>
                              <Text style={{ fontWeight: '500', fontSize: 15, fontFamily: 'HowdyLemon', marginBottom: 10, flex: 1 }}>Kulit</Text>
                              <Text style={{ fontWeight: '500', fontSize: 15, fontFamily: 'HowdyLemon', marginBottom: 11, textAlign: 'center' }}>:</Text>
                              <Text style={{ fontWeight: '500', fontSize: 15, fontFamily: 'HowdyLemon', marginBottom: 11, flex: 1, textAlign: 'right' }}>10.000</Text>
                            </View>
                          <View>
                                <TextInput style={{ justifyContent:'center', fontFamily:'HowdyLemon', fontSize:16, fontWeight:'600', alignItems:'center', textAlign:'center', borderColor:'#afaeae', borderWidth:0.5, borderRadius: 10, color:'#545454', padding:10, marginBottom:20}} value="Oprasional Lain" editable={false} />
                            </View>
                          <View style={{ display:'flex', flex:1, flexDirection:'row', justifyContent:'space-between', alignItems:'center' }}>
                          <Text style={{ fontWeight: '500', fontSize: 15, fontFamily: 'HowdyLemon', marginBottom: 10, flex: 1 }}>Ori (O)</Text>
                              <Text style={{ fontWeight: '500', fontSize: 15, fontFamily: 'HowdyLemon', marginBottom: 11, textAlign: 'center' }}>:</Text>
                              <Text style={{ fontWeight: '500', fontSize: 15, fontFamily: 'HowdyLemon', marginBottom: 11, flex: 1, textAlign: 'right' }}>1.000</Text>
                            </View>

                            <View style={{ display: 'flex', flexDirection: 'row', alignItems: 'center' }}>
                              <Text style={{ fontWeight: '500', fontSize: 15, fontFamily: 'HowdyLemon', marginBottom: 10, flex: 1 }}>Jamur (J)</Text>
                              <Text style={{ fontWeight: '500', fontSize: 15, fontFamily: 'HowdyLemon', marginBottom: 11, textAlign: 'center' }}>:</Text>
                              <Text style={{ fontWeight: '500', fontSize: 15, fontFamily: 'HowdyLemon', marginBottom: 11, flex: 1, textAlign: 'right' }}>10.000</Text>
                            </View>

                            <View style={{ display: 'flex', flexDirection: 'row', alignItems: 'center' }}>
                              <Text style={{ fontWeight: '500', fontSize: 15, fontFamily: 'HowdyLemon', marginBottom: 10, flex: 1 }}>Hot Spicy (H)</Text>
                              <Text style={{ fontWeight: '500', fontSize: 15, fontFamily: 'HowdyLemon', marginBottom: 11, textAlign: 'center' }}>:</Text>
                              <Text style={{ fontWeight: '500', fontSize: 15, fontFamily: 'HowdyLemon', marginBottom: 11, flex: 1, textAlign: 'right' }}>10.000</Text>
                            </View>

                            <View style={{ display: 'flex', flexDirection: 'row', alignItems: 'center' }}>
                              <Text style={{ fontWeight: '500', fontSize: 15, fontFamily: 'HowdyLemon', marginBottom: 10, flex: 1 }}>Merah Putih</Text>
                              <Text style={{ fontWeight: '500', fontSize: 15, fontFamily: 'HowdyLemon', marginBottom: 11, textAlign: 'center' }}>:</Text>
                              <Text style={{ fontWeight: '500', fontSize: 15, fontFamily: 'HowdyLemon', marginBottom: 11, flex: 1, textAlign: 'right' }}>10.000</Text>
                            </View>

                            <View style={{ display: 'flex', flexDirection: 'row', alignItems: 'center' }}>
                              <Text style={{ fontWeight: '500', fontSize: 15, fontFamily: 'HowdyLemon', marginBottom: 10, flex: 1 }}>Kulit</Text>
                              <Text style={{ fontWeight: '500', fontSize: 15, fontFamily: 'HowdyLemon', marginBottom: 11, textAlign: 'center' }}>:</Text>
                              <Text style={{ fontWeight: '500', fontSize: 15, fontFamily: 'HowdyLemon', marginBottom: 11, flex: 1, textAlign: 'right' }}>10.000</Text>
                            </View>
                          <View>
                                <TextInput style={{ justifyContent:'center', fontFamily:'HowdyLemon', fontSize:16, fontWeight:'600', alignItems:'center', textAlign:'center', borderColor:'#afaeae', borderWidth:0.5, borderRadius: 10, color:'#545454', padding:10, marginBottom:20}} value="Penjualan" editable={false} />
                            </View>
                          <View style={{ display:'flex', flex:1, flexDirection:'row', justifyContent:'space-between', alignItems:'center' }}>
                              <Text style={{ fontWeight: '500', fontSize: 15, fontFamily: 'HowdyLemon', marginBottom: 10, flex: 1 }}>Ori (O)</Text>
                              <Text style={{ fontWeight: '500', fontSize: 15, fontFamily: 'HowdyLemon', marginBottom: 11, textAlign: 'center' }}>:</Text>
                              <Text style={{ fontWeight: '500', fontSize: 15, fontFamily: 'HowdyLemon', marginBottom: 11, flex: 1, textAlign: 'right' }}>1.000</Text>
                            </View>

                            <View style={{ display: 'flex', flexDirection: 'row', alignItems: 'center' }}>
                              <Text style={{ fontWeight: '500', fontSize: 15, fontFamily: 'HowdyLemon', marginBottom: 10, flex: 1 }}>Jamur (J)</Text>
                              <Text style={{ fontWeight: '500', fontSize: 15, fontFamily: 'HowdyLemon', marginBottom: 11, textAlign: 'center' }}>:</Text>
                              <Text style={{ fontWeight: '500', fontSize: 15, fontFamily: 'HowdyLemon', marginBottom: 11, flex: 1, textAlign: 'right' }}>10.000</Text>
                            </View>

                            <View style={{ display: 'flex', flexDirection: 'row', alignItems: 'center' }}>
                              <Text style={{ fontWeight: '500', fontSize: 15, fontFamily: 'HowdyLemon', marginBottom: 10, flex: 1 }}>Hot Spicy (H)</Text>
                              <Text style={{ fontWeight: '500', fontSize: 15, fontFamily: 'HowdyLemon', marginBottom: 11, textAlign: 'center' }}>:</Text>
                              <Text style={{ fontWeight: '500', fontSize: 15, fontFamily: 'HowdyLemon', marginBottom: 11, flex: 1, textAlign: 'right' }}>10.000</Text>
                            </View>

                            <View style={{ display: 'flex', flexDirection: 'row', alignItems: 'center' }}>
                              <Text style={{ fontWeight: '500', fontSize: 15, fontFamily: 'HowdyLemon', marginBottom: 10, flex: 1 }}>Merah Putih</Text>
                              <Text style={{ fontWeight: '500', fontSize: 15, fontFamily: 'HowdyLemon', marginBottom: 11, textAlign: 'center' }}>:</Text>
                              <Text style={{ fontWeight: '500', fontSize: 15, fontFamily: 'HowdyLemon', marginBottom: 11, flex: 1, textAlign: 'right' }}>10.000</Text>
                            </View>

                            <View style={{ display: 'flex', flexDirection: 'row', alignItems: 'center' }}>
                              <Text style={{ fontWeight: '500', fontSize: 15, fontFamily: 'HowdyLemon', marginBottom: 10, flex: 1 }}>Kulit</Text>
                              <Text style={{ fontWeight: '500', fontSize: 15, fontFamily: 'HowdyLemon', marginBottom: 11, textAlign: 'center' }}>:</Text>
                              <Text style={{ fontWeight: '500', fontSize: 15, fontFamily: 'HowdyLemon', marginBottom: 11, flex: 1, textAlign: 'right' }}>10.000</Text>
                            </View>
                          <View>
                                <TextInput style={{ justifyContent:'center', fontFamily:'HowdyLemon', fontSize:16, fontWeight:'600', alignItems:'center', textAlign:'center', borderColor:'#afaeae', borderWidth:0.5, borderRadius: 10, color:'#545454', padding:10, marginBottom:20}} value="Stock Akhir" editable={false} />
                            </View>
                          <View style={{ display:'flex', flex:1, flexDirection:'row', justifyContent:'space-between', alignItems:'center' }}>
                          <Text style={{ fontWeight: '500', fontSize: 15, fontFamily: 'HowdyLemon', marginBottom: 10, flex: 1 }}>Ori (O)</Text>
                              <Text style={{ fontWeight: '500', fontSize: 15, fontFamily: 'HowdyLemon', marginBottom: 11, textAlign: 'center' }}>:</Text>
                              <Text style={{ fontWeight: '500', fontSize: 15, fontFamily: 'HowdyLemon', marginBottom: 11, flex: 1, textAlign: 'right' }}>1.000</Text>
                            </View>

                            <View style={{ display: 'flex', flexDirection: 'row', alignItems: 'center' }}>
                              <Text style={{ fontWeight: '500', fontSize: 15, fontFamily: 'HowdyLemon', marginBottom: 10, flex: 1 }}>Jamur (J)</Text>
                              <Text style={{ fontWeight: '500', fontSize: 15, fontFamily: 'HowdyLemon', marginBottom: 11, textAlign: 'center' }}>:</Text>
                              <Text style={{ fontWeight: '500', fontSize: 15, fontFamily: 'HowdyLemon', marginBottom: 11, flex: 1, textAlign: 'right' }}>10.000</Text>
                            </View>

                            <View style={{ display: 'flex', flexDirection: 'row', alignItems: 'center' }}>
                              <Text style={{ fontWeight: '500', fontSize: 15, fontFamily: 'HowdyLemon', marginBottom: 10, flex: 1 }}>Hot Spicy (H)</Text>
                              <Text style={{ fontWeight: '500', fontSize: 15, fontFamily: 'HowdyLemon', marginBottom: 11, textAlign: 'center' }}>:</Text>
                              <Text style={{ fontWeight: '500', fontSize: 15, fontFamily: 'HowdyLemon', marginBottom: 11, flex: 1, textAlign: 'right' }}>10.000</Text>
                            </View>

                            <View style={{ display: 'flex', flexDirection: 'row', alignItems: 'center' }}>
                              <Text style={{ fontWeight: '500', fontSize: 15, fontFamily: 'HowdyLemon', marginBottom: 10, flex: 1 }}>Merah Putih</Text>
                              <Text style={{ fontWeight: '500', fontSize: 15, fontFamily: 'HowdyLemon', marginBottom: 11, textAlign: 'center' }}>:</Text>
                              <Text style={{ fontWeight: '500', fontSize: 15, fontFamily: 'HowdyLemon', marginBottom: 11, flex: 1, textAlign: 'right' }}>10.000</Text>
                            </View>

                            <View style={{ display: 'flex', flexDirection: 'row', alignItems: 'center' }}>
                              <Text style={{ fontWeight: '500', fontSize: 15, fontFamily: 'HowdyLemon', marginBottom: 10, flex: 1 }}>Kulit</Text>
                              <Text style={{ fontWeight: '500', fontSize: 15, fontFamily: 'HowdyLemon', marginBottom: 11, textAlign: 'center' }}>:</Text>
                              <Text style={{ fontWeight: '500', fontSize: 15, fontFamily: 'HowdyLemon', marginBottom: 11, flex: 1, textAlign: 'right' }}>10.000</Text>
                            </View>
                          <View>
                                <TextInput style={{ justifyContent:'center', fontFamily:'HowdyLemon', fontSize:16, fontWeight:'600', alignItems:'center', textAlign:'center', borderColor:'#afaeae', borderWidth:0.5, borderRadius: 10, color:'#545454', padding:10, marginBottom:20}} value="Selisih Stock" editable={false} />
                            </View>
                          <View style={{ display:'flex', flex:1, flexDirection:'row', justifyContent:'space-between', alignItems:'center' }}>
                          <Text style={{ fontWeight: '500', fontSize: 15, fontFamily: 'HowdyLemon', marginBottom: 10, flex: 1 }}>Ori (O)</Text>
                              <Text style={{ fontWeight: '500', fontSize: 15, fontFamily: 'HowdyLemon', marginBottom: 11, textAlign: 'center' }}>:</Text>
                              <Text style={{ fontWeight: '500', fontSize: 15, fontFamily: 'HowdyLemon', marginBottom: 11, flex: 1, textAlign: 'right' }}>1.000</Text>
                            </View>

                            <View style={{ display: 'flex', flexDirection: 'row', alignItems: 'center' }}>
                              <Text style={{ fontWeight: '500', fontSize: 15, fontFamily: 'HowdyLemon', marginBottom: 10, flex: 1 }}>Jamur (J)</Text>
                              <Text style={{ fontWeight: '500', fontSize: 15, fontFamily: 'HowdyLemon', marginBottom: 11, textAlign: 'center' }}>:</Text>
                              <Text style={{ fontWeight: '500', fontSize: 15, fontFamily: 'HowdyLemon', marginBottom: 11, flex: 1, textAlign: 'right' }}>10.000</Text>
                            </View>

                            <View style={{ display: 'flex', flexDirection: 'row', alignItems: 'center' }}>
                              <Text style={{ fontWeight: '500', fontSize: 15, fontFamily: 'HowdyLemon', marginBottom: 10, flex: 1 }}>Hot Spicy (H)</Text>
                              <Text style={{ fontWeight: '500', fontSize: 15, fontFamily: 'HowdyLemon', marginBottom: 11, textAlign: 'center' }}>:</Text>
                              <Text style={{ fontWeight: '500', fontSize: 15, fontFamily: 'HowdyLemon', marginBottom: 11, flex: 1, textAlign: 'right' }}>10.000</Text>
                            </View>

                            <View style={{ display: 'flex', flexDirection: 'row', alignItems: 'center' }}>
                              <Text style={{ fontWeight: '500', fontSize: 15, fontFamily: 'HowdyLemon', marginBottom: 10, flex: 1 }}>Merah Putih</Text>
                              <Text style={{ fontWeight: '500', fontSize: 15, fontFamily: 'HowdyLemon', marginBottom: 11, textAlign: 'center' }}>:</Text>
                              <Text style={{ fontWeight: '500', fontSize: 15, fontFamily: 'HowdyLemon', marginBottom: 11, flex: 1, textAlign: 'right' }}>10.000</Text>
                            </View>

                            <View style={{ display: 'flex', flexDirection: 'row', alignItems: 'center' }}>
                              <Text style={{ fontWeight: '500', fontSize: 15, fontFamily: 'HowdyLemon', marginBottom: 10, flex: 1 }}>Kulit</Text>
                              <Text style={{ fontWeight: '500', fontSize: 15, fontFamily: 'HowdyLemon', marginBottom: 11, textAlign: 'center' }}>:</Text>
                              <Text style={{ fontWeight: '500', fontSize: 15, fontFamily: 'HowdyLemon', marginBottom: 11, flex: 1, textAlign: 'right' }}>10.000</Text>
                            </View>
                        </View>
                        {/* <TouchableOpacity style={{ backgroundColor:'#545454', borderWidth:0.75, borderColor:'#afaeae', borderRadius:20, paddingVertical:10, paddingHorizontal:8, display:'flex', flexDirection:'row', justifyContent:'space-between', alignItems:'center',marginVertical:20, }}>
                            <Ionicons name="add-circle-outline" size={20} color="#FFF" />
                            <Text style={{ color:'#FFF', fontWeight:'600',fontFamily:'HowdyLemon', marginHorizontal:10, fontSize:12, }}>Simpan</Text>
                        </TouchableOpacity> */}
                  </View>
                )}
                {isVisible == 'Setting' && (
                  <View style={{ borderWidth:0.5, display:'flex', flex:1, borderColor:'#afaeae', margin:10, paddingHorizontal:20, borderRadius:10, }}>
                    <View>
                        <TouchableOpacity styke={{justifyContent:'center', alignItems:'center', borderColor:'#afaeae', borderRadius: 10, }}>
                            <Text style={{fontFamily:'HowdyLemon', fontSize:16, fontWeight:'600', textAlign:'center', color:'#545454', padding:10, marginTop:10}}>Setting</Text>
                        </TouchableOpacity>
                    </View>
                    <TouchableOpacity onPress={() => navigation.navigate('Product')} style={{display:'flex', flex:1, borderColor:'#545454', borderWidth:1, marginTop:10, justifyContent:'center', alignItems:'center', borderRadius:10,}}>
                      <Ionicons name="cart-outline" size={40} color="#545454" />
                      <Text style={{ color:'#545454', fontWeight:'600',fontFamily:'HowdyLemon', marginHorizontal:10, fontSize:15, }}>Product</Text>
                    </TouchableOpacity>
                    <TouchableOpacity onPress={() => navigation.navigate('Users')} style={{display:'flex', flex:1, borderColor:'#545454', borderWidth:1, marginTop:10, marginBottom:30, justifyContent:'center', alignItems:'center', borderRadius:10,}}>
                      <Ionicons name="people-outline" size={40} color="#545454" />
                      <Text style={{ color:'#545454', fontWeight:'600',fontFamily:'HowdyLemon', marginHorizontal:10, fontSize:15, }}>User</Text>
                    </TouchableOpacity>
                  </View>
                )}
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
