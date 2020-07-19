import React from 'react';
import { StyleSheet, Text, View, TextInput} from 'react-native';

import Lists from "../components/Lists"

export default function Home({route,navigation}) {
    return (
      <View style={styles.container}>
        {/* <CreateList navigation={navigation}/> */}
        <Text>Posts</Text>
        <TextInput style={{ height: 40, borderColor: 'gray', borderWidth: 1 }}/>
        <Text>Search</Text>
        <Text>Filter        sort by distance</Text>
        <Lists route={route} navigation={navigation}/>
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