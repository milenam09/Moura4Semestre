import { useLocalSearchParams, useRouter } from "expo-router";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";

export default function DetalheProdutos () {
    const {id} = useLocalSearchParams()
    const router = useRouter()

    return(
        <View>
            <Text>Produtos {id}</Text>
            <TouchableOpacity onPress={() => {
                router.back()
            }}>
                <Text style={meuCSS.link}>Voltar</Text>
            </TouchableOpacity>
        </View>
    )
}

const meuCSS = StyleSheet.create({
    link: {
        color: "blue",
        fontSize: 16,
        marginVertical: 15
    }
})