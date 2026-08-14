import { StatusBar } from 'expo-status-bar';
import { View } from 'react-native';
import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context';
import { styles } from "./Styles";
import { Header } from "./components/header/Header"
import { FormTask } from './components/formstask/FormTask';
import { TaskList } from './components/tasklist/TaskList';
import { Footer } from './components/footer/Footer';
import { TaskProvider } from './context/TaskContext';


export default function App() {
  return (
    
    <SafeAreaProvider>
      <SafeAreaView style={styles.safeContainer}>
        <TaskProvider>
          <View style={styles.container}>
          <Header/>
          <FormTask/>
          <TaskList/>
          <Footer/>
          <StatusBar style="auto" />
       </View>
        </TaskProvider>
      </SafeAreaView>
    </SafeAreaProvider>

  );
}

