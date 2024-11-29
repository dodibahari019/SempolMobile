import React from 'react';
import { View, Text, Dimensions } from 'react-native';
import Svg, { Rect } from 'react-native-svg';

const { width } = Dimensions.get('window'); // Mendapatkan lebar layar untuk skalabilitas

const BarChart = () => {
  // Data produk terlaris
  const data = [
    { label: 'Produk A', value: 120, color: '#5041cd' },
    { label: 'Produk B', value: 80, color: '#63c380' },
    { label: 'Produk C', value: 100, color: '#e76e55' },
    { label: 'Produk D', value: 60, color: '#f5a623' },
  ];

  // Dimensi chart
  const chartWidth = width * 0.9; // Lebar chart (90% dari lebar layar)
  const chartHeight = 200; // Tinggi chart
  const barWidth = chartWidth / (data.length * 2); // Lebar tiap batang
  const maxValue = Math.max(...data.map((item) => item.value)); // Nilai maksimum untuk skala

  return (
    <View
      style={{
        flex: 1,
        padding: 16,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#fff',
      }}
    >
      <Text style={{ fontSize: 18, fontWeight: 'bold', marginBottom: 10 }}>
        Produk Terlaris
      </Text>
      <View
        style={{
          width: chartWidth,
          height: chartHeight + 50, // Tambahkan ruang untuk label di bawah
          borderWidth: 0.5,
          borderColor: '#afaeae',
          borderRadius: 10,
          paddingVertical: 10,
        }}
      >
        <Svg height={chartHeight} width={chartWidth}>
          {data.map((item, index) => {
            const barHeight = (item.value / maxValue) * chartHeight; // Skala tinggi batang

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
        {/* Label di bawah chart */}
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'space-between',
            marginTop: 10,
          }}
        >
          {data.map((item, index) => (
            <Text
              key={index}
              style={{
                fontSize: 12,
                color: '#333',
                textAlign: 'center',
                width: barWidth * 2, // Lebar label sesuai jarak antar batang
              }}
            >
              {item.label}
            </Text>
          ))}
        </View>
      </View>
    </View>
  );
};

export default BarChart;
