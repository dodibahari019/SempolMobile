import React from "react";
import { View, Text, StyleSheet, Dimensions } from "react-native";
import { Svg, Circle } from "react-native-svg";

const { width } = Dimensions.get("window");

const DoughnutChart = () => {
  // Data untuk chart
  const data = [
    { percentage: 50, color: "#4caf50", label: "Cash" },
    { percentage: 30, color: "#2196f3", label: "GoFood" },
    { percentage: 20, color: "#ff9800", label: "QRIS" },
  ];

  // Perhitungan untuk dash array
  const radius = 50; // Radius lingkaran
  const circumference = 2 * Math.PI * radius;
  let cumulativePercentage = 0;

  return (
    <View style={styles.container}>
      <View style={styles.chartContainer}>
        <Svg height="200" width="200" viewBox="0 0 120 120">
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
        <View style={styles.centerLabel}>
          <Text style={styles.totalLabel}>Total</Text>
          <Text style={styles.totalValue}>Rp1.491.000</Text>
        </View>
      </View>

      {/* Legend */}
      <View style={styles.legend}>
        {data.map((item, index) => (
          <View key={index} style={styles.legendItem}>
            <View
              style={[styles.legendColor, { backgroundColor: item.color }]}
            />
            <Text style={styles.legendLabel}>{item.label}</Text>
          </View>
        ))}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#f4f4f4",
  },
  chartContainer: {
    position: "relative",
    width: 200,
    height: 200,
  },
  centerLabel: {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: [{ translateX: -50 }, { translateY: -50 }],
    alignItems: "center",
  },
  totalLabel: {
    fontSize: 16,
    color: "#333",
    fontWeight: "bold",
  },
  totalValue: {
    fontSize: 14,
    color: "#555",
  },
  legend: {
    marginTop: 20,
    flexDirection: "row",
    justifyContent: "center",
  },
  legendItem: {
    flexDirection: "row",
    alignItems: "center",
    marginHorizontal: 10,
  },
  legendColor: {
    width: 15,
    height: 15,
    borderRadius: 7.5,
  },
  legendLabel: {
    marginLeft: 5,
    fontSize: 14,
    color: "#333",
  },
});

export default DoughnutChart;
