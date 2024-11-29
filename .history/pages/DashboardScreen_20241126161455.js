import React from 'react';
import { View, Text, Dimensions, ScrollView } from 'react-native';
import { PieChart } from 'react-native-chart-kit';

const App = () => {
  const height = Dimensions.get('window').height;

  // Data untuk pie chart
  const dataDiagramLingkaran = [
    {
      name: 'Cash',
      population: 40,
      color: '#4caf50',
      legendFontColor: '#7F7F7F',
      legendFontSize: 15,
    },
    {
      name: 'GoFood',
      population: 30,
      color: '#2196f3',
      legendFontColor: '#7F7F7F',
      legendFontSize: 15,
    },
    {
      name: 'QRIS',
      population: 30,
      color: '#ff9800',
      legendFontColor: '#7F7F7F',
      legendFontSize: 15,
    },
  ];

  return (
    <ScrollView contentContainerStyle={{ flex: 1, alignItems: 'center' }}>
      <View
        style={{
          display: 'flex',
          flex: 1,
          height: height * 0.35,
          marginTop: 8,
          borderWidth: 0.5,
          borderColor: '#afaeae',
          padding: 10,
          borderRadius: 10,
          justifyContent: 'center',
          alignItems: 'center',
        }}
      >
        <PieChart
          data={dataDiagramLingkaran}
          width={200}
          height={200}
          chartConfig={{
            backgroundColor: '#e26a00',
            backgroundGradientFrom: '#fb8c00',
            backgroundGradientTo: '#ff9800',
            decimalPlaces: 2,
            color: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`,
            style: {
              borderRadius: 16,
            },
          }}
          accessor="population"
          backgroundColor="transparent"
          paddingLeft="15"
          center={[10, 10]} // Untuk mengatur posisi hole (lubang) di tengah
          innerRadius="50%" // Membuat hole di tengah (doughnut)
        />

        {/* Label di bawah grafik */}
        <View style={{ marginTop: 10, flexDirection: 'row', justifyContent: 'center' }}>
          {dataDiagramLingkaran.map((item, index) => (
            <View key={index} style={{ marginHorizontal: 10, alignItems: 'center' }}>
              <Text style={{ fontSize: 12, color: item.color }}>{item.name}</Text>
            </View>
          ))}
        </View>
      </View>
    </ScrollView>
  );
};

export default App;
