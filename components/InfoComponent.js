import React, { useEffect, useState } from "react";
import { View, Text, StyleSheet, TouchableOpacity, Alert } from "react-native";
import { globalStyles } from "../styles/globalStyles";
import Icon from "react-native-vector-icons/MaterialIcons";
import { resetData, totalInfaq } from "../data/database/operation";

const InfoComponent = ({ refresh }) => {
  const [totalInfaqData, setTotalInfaq] = useState(0);

  const getTotalInfaq = async () => {
    try {
      const res = await totalInfaq();
      setTotalInfaq(res.total ?? 0);
    } catch (err) {
      console.error(`error get total infaq: `, err);
    }
  };

  useEffect(() => {
    getTotalInfaq();
  }, [refresh]);

  const handleResetData = () => {
    Alert.alert(
      "Reset Data Infaq Tahun",
      "Apakah anda yakin ingin me-reset data infaq?",
      [
        {
          text: "Tidak",
          style: "cancel",
        },
        {
          text: "Iya",
          style: "destructive",
          onPress: async () => {
            try {
              await resetData();
              await getTotalInfaq();
            } catch (err) {
              console.error("Error reset data", err);
            }
          },
        },
      ]
    );
  };

  return (
    <View style={globalStyles.container}>
      <View style={globalStyles.colorfulCard}>
        <View style={styles.headerContainer}>
          <Text style={globalStyles.colorfulHeader}>Total Infaq Tahun Ini</Text>
          <TouchableOpacity
            onPress={handleResetData}
            style={styles.resetButton}
          >
            <Icon name="refresh" size={24} color="#000" />
          </TouchableOpacity>
        </View>
        <Text style={globalStyles.totalText}>
          Rp {totalInfaqData.toLocaleString("id-ID")}
        </Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  headerContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  resetButton: {
    marginLeft: 10,
    color: "#f8f9fa",
  },
});

export default InfoComponent;
