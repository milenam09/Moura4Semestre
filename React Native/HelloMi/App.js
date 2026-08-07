import { StatusBar } from 'expo-status-bar';
import { Platform, StyleSheet, Text, View } from 'react-native';
import Header from './components/header/header';
import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context';

export default function App() {
  return (
    <>
    <SafeAreaProvider>
      <SafeAreaView style={styles.safeArea}>
          <View style={styles.container}>

            <Header/>

            <Text style={styles.texto1}>Milena 1 </Text>

            <Text style={styles.texto2}>Guilherme 2 </Text>

            <StatusBar style="auto" />
      </View>

      </SafeAreaView>  
    </SafeAreaProvider>
    </>
    
    
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#ccc',
  },
  container : {
    flex : 1,
    borderColor: "red",
    borderWidth: 3,
    borderStyle: "dotted",
    backgroundColor: '#ccc'
  },
  texto1: {
    color: "red"
  },
  texto2: {
    color: "blue"
  }
})


// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     backgroundColor: '#fff',
//     borderWidth: 3,
//     borderStyle: 'solid',
//     borderColor: 'red' 
//   },
// });
