import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import Navigator from './routes/homeStack'
// import { 
//   Provider as PaperProvider, 
//   DefaultTheme as PaperDefaultTheme,
//   DarkTheme as PaperDarkTheme 
// } from 'react-native-paper';
import Lists from "./screens/Lists"

export default function App() {
  return (
    <Navigator/>

  );
}


