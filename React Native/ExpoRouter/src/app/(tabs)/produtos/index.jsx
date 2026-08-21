import { Link, router } from "expo-router";
import { Text, View, StyleSheet, TouchableOpacity } from "react-native";


export default function Home() {
    return (

        <View style={styles.container}>
            <Text style={styles.title}>Bem vindo - Produtos</Text>

            <Link href="/produtos/12">Codigo 12 | tenis </Link>
            
            <View style={styles.botoesBotox}>
                <TouchableOpacity style={styles.button} onPress={() => {
                    router.push("/");
                }}>
                    <Text style={styles.buttonText}>Produtos</Text>
                </TouchableOpacity>

                    <Link href="/" style={styles.link}>Página de Home</Link>

                <TouchableOpacity style={styles.button} onPress={() => {
                    router.back();
                }}>
                    <Text style={styles.buttonText}>Voltar</Text>
                </TouchableOpacity>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    botoesBotox: {
        width: "100%",
        flexDirection: "row",
        justifyContent: "center",
        gap: 15
    },
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
