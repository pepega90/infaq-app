import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import HomeScreen from "../screens/HomeScreen";
import MonthDetailsScreen from "../screens/MonthDetailsScreen";

const Stack = createStackNavigator();

export default function AppNavigator() {
  return (
    <NavigationContainer>
      <Stack.Navigator
        screenOptions={{
          headerStyle: {
            backgroundColor: "#6200ee",
          },
          headerTintColor: "#fff",
        }}
      >
        <Stack.Screen
          name="Home"
          component={HomeScreen}
          options={{ title: "Infaq App" }}
        />
        <Stack.Screen
          name="MonthDetails"
          component={MonthDetailsScreen}
          options={{ title: "Detail Bulan" }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
