import { View } from "react-native";
import { Header } from "./src/components/header/Header";
import { Footer } from "./src/components/footer/Footer";
import { FormJussa } from "./src/components/pages/formjussa/FormJussa";
import { SafeAreaProvider, SafeAreaView } from "react-native-safe-area-context";

export default function App() {
  return (
    <SafeAreaProvider style={{ flex: 1, backgroundColor: "black" }}>
      <SafeAreaView style={{ flex: 1, backgroundColor: "black" }}>
        <View style={{ flex: 1, backgroundColor: "black" }}>
          <Header />

          <FormJussa />

        </View>
      </SafeAreaView>
    </SafeAreaProvider>
  );

}