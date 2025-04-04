import React, { useEffect, useState } from "react";
import { ScrollView, Text, View } from "react-native";
import { ActivityIndicator } from "react-native-paper";
import { useIsFocused } from "@react-navigation/native";
import InfoComponent from "../components/InfoComponent";
import MonthList from "../components/MonthList";
import { initDB } from "../data/database/db";
import { getBulans, insertMonthDataInit } from "../data/database/operation";
import { globalStyles } from "../styles/globalStyles";
import Icon from "react-native-vector-icons/MaterialIcons";
import { GestureHandlerRootView } from "react-native-gesture-handler";

const HomeScreen = ({ navigation }) => {
  const [data, setData] = useState([]);
  const [dbReady, setDbReady] = useState(false);
  const isFocused = useIsFocused();
  const [refreshKey, setRefreshKey] = useState(0);
  const [initialLoadDone, setInitialLoadDone] = useState(false);

  const loadData = async () => {
    try {
      await initDB();
      await insertMonthDataInit();
      const bulans = await getBulans();
      setData(bulans);
      setDbReady(true);
      setRefreshKey((prev) => prev + 1);
    } catch (error) {
      console.error("Error loading data:", error);
    }
  };

  useEffect(() => {
    if (!initialLoadDone) {
      loadData();
      setInitialLoadDone(true);
    }
  }, []);

  useEffect(() => {
    if (isFocused && initialLoadDone) {
      loadData();
    }
  }, [isFocused]);

  if (!dbReady) {
    return (
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
        <ActivityIndicator size="large" />
      </View>
    );
  }

  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <ScrollView contentContainerStyle={globalStyles.container}>
        <InfoComponent refresh={refreshKey} />
        <MonthList
          data={data}
          onSelectMonth={(month) =>
            navigation.navigate("MonthDetails", { month })
          }
        />
        <View style={styles.footer}>
          <Text style={styles.footerText}>
            Made with <Icon name="favorite" size={14} color="#ff5252" /> by Aji
            Mustofa
          </Text>
        </View>
      </ScrollView>
    </GestureHandlerRootView>
  );
};

const styles = {
  footer: {
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: 10,
  },
  footerText: {
    color: "#666",
    fontSize: 12,
    textAlign: "center",
  },
};

export default HomeScreen;
