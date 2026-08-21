import { Link } from "expo-router";
import { Text, View, StyleSheet } from "react-native";


export default function Perfil() {
    return (
        <View style={styles.container}>
            <Text style={styles.title}>Bem vindo - Perfil</Text>
            <Link href="/" style={styles.link}>Página Home</Link>
            <Link href="/produtos" style={styles.link}>Página Produtos</Link>
        </View>
    )    
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  link: {
    marginVertical: 15,
    color: "red",
  },

  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 10,
  },
  button: {
    backgroundColor: "#222",
    padding: 15,
    borderRadius: 8,
  },

  buttonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "bold",
  },
});
