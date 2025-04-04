import React from "react";
import {
  View,
  Text,
  TouchableOpacity,
  ScrollView,
  Dimensions,
} from "react-native";
import { globalStyles } from "../styles/globalStyles";

const MonthList = ({ data, onSelectMonth }) => {
  const screenHeight = Dimensions.get("window").height;

  return (
    <View style={globalStyles.container}>
      <View style={globalStyles.card}>
        <Text style={globalStyles.sectionTitle}>Pilih Bulan</Text>
        <ScrollView style={{ maxHeight: screenHeight * 0.7 }}>
          {data.map((month, index) => (
            <TouchableOpacity
              key={index}
              style={globalStyles.listItem}
              onPress={() =>
                onSelectMonth({ bulan: month.nama_bulan, id: month.id })
              }
            >
              <Text style={globalStyles.listItemText}>{month.nama_bulan}</Text>
            </TouchableOpacity>
          ))}
        </ScrollView>
      </View>
    </View>
  );
};

export default MonthList;
