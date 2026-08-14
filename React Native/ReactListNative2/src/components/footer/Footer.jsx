import { Text, View } from "react-native";
import { FooterStyle } from "./FooterStyle";

export const Footer = () => {
  return (
    <View style={FooterStyle.footer}>
      <Text style={FooterStyle.text}>
      {new Date().getFullYear()} © React List - Todos os direitos reservados
      </Text>
    </View>
  );
};