// import React, { useEffect, useState } from "react";
// import {
//   View,
//   ScrollView,
//   Alert,
//   StyleSheet,
//   StatusBar,
//   Text,
// } from "react-native";
// import { ActivityIndicator, Appbar, Button } from "react-native-paper";
// import InfoComponent from "./components/InfoComponent";
// import MonthList from "./components/MonthList";
// import MonthDetails from "./components/MonthDetails";
// import { globalStyles } from "./styles/globalStyles";
// import { SafeAreaProvider, SafeAreaView } from "react-native-safe-area-context";
// import { initDB } from "./data/database/db";
// import { getBulans, insertDummyData } from "./data/database/operation";
// import { GestureHandlerRootView } from "react-native-gesture-handler";
// import Icon from "react-native-vector-icons/MaterialIcons"; // or any other icon set you prefer

// const App = () => {
//   const [selectedMonth, setSelectedMonth] = useState(null);
//   const [data, setData] = useState([]);

//   const [dbReady, setDbReady] = useState(false);

//   // Initialize database when app starts
//   useEffect(() => {
//     const initializeApp = async () => {
//       try {
//         await initDB();
//         await insertDummyData();
//         setDbReady(true);
//         const bulans = await getBulans();
//         setData(bulans);
//       } catch (error) {
//         console.error("App initialization failed:", error);
//       }
//     };

//     initializeApp();
//   }, []);

//   if (!dbReady) {
//     return (
//       <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
//         <ActivityIndicator size="large" />
//       </View>
//     );
//   }

//   return (
//     <GestureHandlerRootView>
//       <SafeAreaProvider>
//         <SafeAreaView style={{ flex: 1, backgroundColor: "#6200ee" }}>
//           {/* Header with Background Color */}
//           <Appbar.Header style={{ backgroundColor: "#6200ee" }}>
//             {/* Show Back Button if a Month is Selected */}
//             {selectedMonth && (
//               <Appbar.BackAction
//                 color="#fff" // White color for the back button
//                 onPress={() => setSelectedMonth(null)} // Go back to the main menu
//               />
//             )}
//             <Appbar.Content
//               title={selectedMonth ? "Detail Bulan" : "Infaq App"} // Dynamic title
//               titleStyle={{ color: "#fff" }} // White text
//             />
//           </Appbar.Header>

//           {/* Main Content */}
//           <ScrollView contentContainerStyle={globalStyles.container}>
//             {selectedMonth ? (
//               <MonthDetails
//                 month={selectedMonth}
//                 onBack={() => setSelectedMonth(null)}
//               />
//             ) : (
//               <>
//                 <InfoComponent />
//                 <MonthList data={data} onSelectMonth={setSelectedMonth} />
//               </>
//             )}
//             <View style={styles.footer}>
//               <Text style={styles.footerText}>
//                 Made with <Icon name="favorite" size={14} color="#ff5252" /> by
//                 Aji Mustofa
//               </Text>
//             </View>
//           </ScrollView>
//         </SafeAreaView>
//       </SafeAreaProvider>
//     </GestureHandlerRootView>
//   );
// };

// const styles = StyleSheet.create({
//   footer: {
//     alignItems: "center",
//     justifyContent: "center",
//     paddingVertical: 10,
//   },
//   footerText: {
//     color: "#666",
//     fontSize: 12,
//     textAlign: "center",
//   },
// });

// export default App;
import React from "react";
import { StatusBar } from "react-native";
import { SafeAreaProvider } from "react-native-safe-area-context";
import AppNavigator from "./navigation";

const App = () => {
  return (
    <SafeAreaProvider>
      <StatusBar backgroundColor="#6200ee" barStyle="light-content" />
      <AppNavigator />
    </SafeAreaProvider>
  );
};

export default App;
