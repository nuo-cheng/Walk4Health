import React from 'react';
import { StyleSheet, Text, View } from 'react-native';

import CreateList from "../components/CreateList";

import Lists from "../components/Lists"

export default function Home({navigation}) {
    return (
      <View style={styles.container}>
        <CreateList navigation={navigation}/>
        
        <Lists navigation={navigation}/>
      </View>
    );
  }
  
  const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: '#fff',
      alignItems: 'center',
      justifyContent: 'center',
    },
  });