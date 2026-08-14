import { StyleSheet } from "react-native";


export const TaskItemStyle = StyleSheet.create({
    cardBox: {
        flexDirection: "row",
        alignItems: "center",
        gap: 15,
        width: "100%",
        height: 70,
        padding: 15,
        marginBottom: 15,
        borderRadius: 5,
        backgroundColor: "#30364f"
    }, 
    cardText : {
        flex: 1,
        color: "#ffff",
        fontSize: 16,
    },
    cardButton: {
        width: 30,
        height: 30,
        justifyContent: "center",
        alignItems: "center",

        borderWidth: 1,
        borderStyle: "solid",
        borderRadius: 5
    },
    CardButtonEditColor: {
        borderColor: "#2188d2"
    },
    CardButtonTrashColor: {
        borderColor: "#B75D63"
    }
})