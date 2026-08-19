import { StyleSheet } from "react-native";

export const FormJussaStyle = StyleSheet.create({
  FormBox: {
  width: "90%",
  // height: 350,  ← remova, deixe a altura automática
  backgroundColor: "#121212",
  marginTop: 20,
  marginBottom: 20,
  borderRadius: 16,
  borderWidth: 1,
  borderColor: "#1E3A23",
  paddingVertical: 20,
  paddingBottom: 24,
  alignSelf: "center",
  alignItems: "center",
},

  textJu: {
    fontSize: 24,
    textAlign: "center",
    fontWeight: "bold",
    color: "#FFFFFF",
    marginTop: 10,
  },

  text: {
    fontSize: 14,
    textAlign: "center",
    paddingTop: 5,
    color: "#A1A1AA",
    marginBottom: 25,
  },

  dividerLine: {
  width: "85%",
  height: 1,
  backgroundColor: "#22C55E",
  opacity: 0.4, // Suaviza o tom da linha
  alignSelf: "center",
  marginBottom: 20,
},

  fieldGroup: {
    width: "85%",
    marginBottom: 15,
  },

  Box: {
    fontSize: 14,
    textAlign: "left",
    fontWeight: "600",
    color: "#FFFFFF",
    marginBottom: 6,
  },

  // Esta caixa segura a imagem e o texto lado a lado
  inputContainer: {
    flexDirection: "row",
    alignItems: "center",
    width: "100%",
    height: 48,
    backgroundColor: "#1A1A1A",
    borderRadius: 8,
    borderWidth: 1,
    borderColor: "#27272A",
    paddingHorizontal: 12,
  },

  icon: {
    width: 20,
    height: 20,
    marginRight: 10,
    tintColor: "#22C55E",
    resizeMode: "contain",
  },

  // Importante: tiramos o backgroundColor e border daqui para ficar tudo limpo dentro da caixa
  textInput: {
    flex: 1,
    height: "100%",
    color: "#FFFFFF",
    fontSize: 14,
    backgroundColor: "transparent",
    padding: 0,
  },

  Button: {
    width: "85%",
    height: 48,
    backgroundColor: "#22C55E",
    borderRadius: 8,
    alignSelf: "center",
    justifyContent: "center",
    alignItems: "center",
    marginTop: 20,
  },

  dividerContainer: {
  flexDirection: "row",
  alignItems: "center",
  width: "85%",
  marginTop: 25,
  alignSelf: "center",
},

dividerSideLine: {
  flex: 1,
  height: 1,
  backgroundColor: "#22C55E",
  opacity: 0.4,
},

dividerIcon: {
  width: 16,
  height: 16,
  marginHorizontal: 10,
  tintColor: "#22C55E",
  resizeMode: "contain",
},

  jussaText: {
    textAlign: "center",
    fontSize: 16,
    fontWeight: "bold",
    color: "#FFFFFF",
  },
});