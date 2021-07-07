import { StatusBar } from 'expo-status-bar';
import React, { useState } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import * as Font from 'expo-font';
import AppLoading from 'expo-app-loading';
import infaqReducer from './store/infaq-reducers';
import orangReducer from './store/orang-reducers';

// Initialized Db
import { init } from './helpers/db';

// Redux
import { createStore, combineReducers, applyMiddleware } from 'redux';
import { Provider } from 'react-redux';
import ReduxThunk from 'redux-thunk';

// Navigator
import InfaqNavigator from './navigation/InfaqNavigator';

init()
  .then(() => {
    console.log('Initialize database');
  })
  .catch(err => {
    console.log('Initialize database failed');
    console.log(err);
  });

const rootReducer = combineReducers({
  infaq: infaqReducer,
  orang: orangReducer,
});

const store = createStore(rootReducer, applyMiddleware(ReduxThunk));

const fetchFonts = () => {
  return Font.loadAsync({
    'open-sans': require('./assets/fonts/OpenSans-Regular.ttf'),
    'open-sans-bold': require('./assets/fonts/OpenSans-Bold.ttf'),
  });
};

export default function App() {
  const [fontLoaded, setFontLoaded] = useState(false);

  if (!fontLoaded) {
    return (
      <AppLoading
        startAsync={fetchFonts}
        onFinish={() => setFontLoaded(true)}
        onError={err => console.log(err)}
      />
    );
  }

  return (
    <Provider store={store}>
      <InfaqNavigator />
    </Provider>
  );
}
