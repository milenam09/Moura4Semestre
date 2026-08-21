import { Link, useRouter } from "expo-router";
import { Text, View, StyleSheet, TouchableOpacity } from "react-native";


export default function Home() {

    const router = useRouter()

    return (
        <View style={styles.container}>
            <Text style={styles.title}>Bem vindo - Home</Text>

                <TouchableOpacity style={styles.button} onPress={() =>{
                    router.push("/");
                }}>
                    <Text style={styles.buttonText}>Produtos</Text>
                </TouchableOpacity>

                <TouchableOpacity style={styles.button} onPress={() =>{
                    router.back();
                }}>
                    <Text style={styles.buttonText}>Voltar</Text>
                </TouchableOpacity>

            <Link href="/perfil" style={styles.link}>Página de Perfil</Link>
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
