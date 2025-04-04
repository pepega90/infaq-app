import React from "react";
import MonthDetails from "../components/MonthDetails";

const MonthDetailsScreen = ({ route }) => {
  const { month } = route.params;

  return <MonthDetails month={month} />;
};

export default MonthDetailsScreen;
