import React from "react";
import { View, Text, TextInput, Image, TouchableOpacity } from "react-native";
import { FormJussaStyle } from "./FormJussaStyle";

import emailIcon from "../../../../assets/email.png.png";
import senhaIcon from "../../../../assets/senha.png.png";
import certinhoIcon from "../../../../assets/certinho.png.png";
import { Footer } from "../../footer/Footer";


export function FormJussa() {
  return (
    <View style={FormJussaStyle.FormBox}>
      <Text style={FormJussaStyle.textJu}>Chama Jussa</Text>
      <Text style={FormJussaStyle.text}>Gerenciamento de Ordens de Serviço</Text>
      <View style={FormJussaStyle.dividerLine} />

      {/* CAMPO EMAIL */}
      <View style={FormJussaStyle.fieldGroup}>
        <Text style={FormJussaStyle.Box}>E-mail</Text>
        <View style={FormJussaStyle.inputContainer}>
          <Image source={emailIcon} style={FormJussaStyle.icon} />
          <TextInput
            style={FormJussaStyle.textInput}
            placeholder="email@email.com"
            placeholderTextColor="#555555"
          />
        </View>
      </View>

      {/* CAMPO SENHA */}
      <View style={FormJussaStyle.fieldGroup}>
        <Text style={FormJussaStyle.Box}>Senha</Text>
        <View style={FormJussaStyle.inputContainer}>
          <Image source={senhaIcon} style={FormJussaStyle.icon} />
          <TextInput
            style={FormJussaStyle.textInput}
            placeholder="Digite sua senha"
            placeholderTextColor="#555555"
            secureTextEntry
          />
        </View>
      </View>

      <TouchableOpacity style={FormJussaStyle.Button}>
        <Text style={FormJussaStyle.jussaText}>Acessar o sistema</Text>
      </TouchableOpacity>
      {/* Linha com ícone no meio */}
      <View style={FormJussaStyle.dividerContainer}>
        <View style={FormJussaStyle.dividerSideLine} />
        <Image source={certinhoIcon} style={FormJussaStyle.dividerIcon} />
        <View style={FormJussaStyle.dividerSideLine} />
      </View>
      <Footer/>
    </View>

  );
}