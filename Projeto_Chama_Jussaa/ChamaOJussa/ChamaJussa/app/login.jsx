import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Alert,
  Platform,
  KeyboardAvoidingView,
  ScrollView,
  Image,
  ActivityIndicator,
} from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { useAuth } from '@/contexts/auth-context';
import { AppColors } from '@/constants/theme';

export default function LoginScreen() {
  const insets = useSafeAreaInsets();
  const { login } = useAuth();

  const [email, setEmail] = useState('');
  const [senha, setSenha] = useState('');
  const [senhaVisivel, setSenhaVisivel] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleLogin = async () => {
    if (!email.trim() || !senha.trim()) {
      if (Platform.OS === 'web') {
        window.alert('Preencha todos os campos!');
      } else {
        Alert.alert('Atenção', 'Preencha todos os campos!');
      }
      return;
    }

    setLoading(true);
    try {
      await login(email.trim(), senha.trim());
    } catch (err) {
      const msg = err?.message || 'E-mail ou senha inválidos';
      if (Platform.OS === 'web') {
        window.alert(msg);
      } else {
        Alert.alert('Erro ao entrar', msg);
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
    >
      <ScrollView
        contentContainerStyle={[
          styles.scrollContent,
          { paddingTop: insets.top + 10, paddingBottom: insets.bottom + 20 },
        ]}
        keyboardShouldPersistTaps="handled"
        showsVerticalScrollIndicator={false}
      >
        {/* HEADER / LOGO */}
        <View style={styles.header}>
          <Image
            source={require('@/assets/image/image.png')}
            style={styles.logo}
          />
        </View>

        {/* FORM BOX */}
        <View style={styles.formBox}>
          <Text style={styles.textJu}>Chama Jussa</Text>
          <Text style={styles.text}>Gerenciamento de Ordens de Serviço</Text>
          <View style={styles.dividerLine} />

          {/* CAMPO EMAIL */}
          <View style={styles.fieldGroup}>
            <Text style={styles.boxLabel}>E-mail</Text>
            <View style={styles.inputContainer}>
              <MaterialCommunityIcons
                name="email-outline"
                size={20}
                color={AppColors.iconPrimary}
                style={styles.inputIcon}
              />
              <TextInput
                style={styles.textInput}
                value={email}
                onChangeText={setEmail}
                placeholder="email@email.com"
                placeholderTextColor="#666666"
                keyboardType="email-address"
                autoCapitalize="none"
                autoCorrect={false}
              />
            </View>
          </View>

          {/* CAMPO SENHA */}
          <View style={styles.fieldGroup}>
            <Text style={styles.boxLabel}>Senha</Text>
            <View style={styles.inputContainer}>
              <MaterialCommunityIcons
                name="lock-outline"
                size={20}
                color={AppColors.iconPrimary}
                style={styles.inputIcon}
              />
              <TextInput
                style={styles.textInput}
                value={senha}
                onChangeText={setSenha}
                placeholder="Digite sua senha"
                placeholderTextColor="#666666"
                secureTextEntry={!senhaVisivel}
                autoCapitalize="none"
              />
              <TouchableOpacity
                onPress={() => setSenhaVisivel(!senhaVisivel)}
                style={styles.eyeButton}
                hitSlop={{ top: 10, bottom: 10, left: 10, right: 10 }}
              >
                <MaterialCommunityIcons
                  name={senhaVisivel ? 'eye-off-outline' : 'eye-outline'}
                  size={20}
                  color="#71717A"
                />
              </TouchableOpacity>
            </View>
          </View>

          {/* BOTÃO ACESSAR */}
          <TouchableOpacity
            style={[styles.button, loading && styles.buttonDisabled]}
            onPress={handleLogin}
            activeOpacity={0.85}
            disabled={loading}
          >
            {loading ? (
              <ActivityIndicator color="#FFFFFF" size="small" />
            ) : (
              <Text style={styles.jussaText}>Acessar o sistema</Text>
            )}
          </TouchableOpacity>

          {/* LINHA COM ÍCONE NO MEIO */}
          <View style={styles.dividerContainer}>
            <View style={styles.dividerSideLine} />
            <MaterialCommunityIcons
              name="account-check"
              size={18}
              color={AppColors.iconPrimary}
              style={styles.dividerIcon}
            />
            <View style={styles.dividerSideLine} />
          </View>

          {/* FOOTER */}
          <View style={styles.footerContainer}>
            <Text style={styles.footerText}>
              2026, Chama Jussa - Todos os direitos reservados
            </Text>
          </View>
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#000000',
  },
  scrollContent: {
    flexGrow: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 16,
  },

  // Header styles
  header: {
    width: '100%',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 3,
  },
  logo: {
    width: 150,
    height: 150,
    resizeMode: 'contain',
    alignSelf: 'center',
    marginTop: 10,
  },

  // Form box styles
  formBox: {
    width: '100%',
    maxWidth: 420,
    backgroundColor: '#121212',
    marginTop: 12,
    marginBottom: 20,
    borderRadius: 16,
    borderWidth: 1,
    borderColor: '#1E3A23',
    paddingVertical: 24,
    paddingHorizontal: 16,
    alignSelf: 'center',
    alignItems: 'center',
  },
  textJu: {
    fontSize: 24,
    textAlign: 'center',
    fontWeight: 'bold',
    color: '#FFFFFF',
    marginTop: 4,
  },
  text: {
    fontSize: 14,
    textAlign: 'center',
    paddingTop: 5,
    color: '#A1A1AA',
    marginBottom: 20,
  },
  dividerLine: {
    width: '100%',
    height: 1,
    backgroundColor: AppColors.primary,
    opacity: 0.4,
    alignSelf: 'center',
    marginBottom: 20,
  },
  fieldGroup: {
    width: '100%',
    marginBottom: 16,
  },
  boxLabel: {
    fontSize: 14,
    textAlign: 'left',
    fontWeight: '600',
    color: '#FFFFFF',
    marginBottom: 8,
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    width: '100%',
    height: 50,
    backgroundColor: '#1A1A1A',
    borderRadius: 10,
    borderWidth: 1,
    borderColor: '#27272A',
    paddingHorizontal: 14,
  },
  inputIcon: {
    marginRight: 10,
  },
  textInput: {
    flex: 1,
    height: '100%',
    color: '#FFFFFF',
    fontSize: 14,
    backgroundColor: 'transparent',
    padding: 0,
  },
  eyeButton: {
    padding: 4,
  },
  button: {
    width: '100%',
    height: 50,
    backgroundColor: AppColors.buttonPrimary,
    borderRadius: 10,
    alignSelf: 'center',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 10,
    shadowColor: AppColors.buttonPrimary,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 4,
  },
  buttonDisabled: {
    opacity: 0.7,
  },
  jussaText: {
    textAlign: 'center',
    fontSize: 16,
    fontWeight: 'bold',
    color: '#FFFFFF',
  },
  dividerContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    width: '100%',
    marginTop: 22,
    marginBottom: 8,
    alignSelf: 'center',
  },
  dividerSideLine: {
    flex: 1,
    height: 1,
    backgroundColor: AppColors.primary,
    opacity: 0.4,
  },
  dividerIcon: {
    marginHorizontal: 10,
  },
  footerContainer: {
    marginTop: 4,
  },
  footerText: {
    fontSize: 12,
    textAlign: 'center',
    marginTop: 10,
    color: '#A1A1AA',
  },
});
