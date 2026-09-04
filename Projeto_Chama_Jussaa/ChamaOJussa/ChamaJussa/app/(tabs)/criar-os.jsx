import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
  Alert,
  Platform,
  KeyboardAvoidingView,
  Modal,
} from 'react-native';
import { useRouter } from 'expo-router';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import * as ImagePicker from 'expo-image-picker';
import { Image } from 'expo-image';
import { AppColors } from '@/constants/theme';
import { useOS } from '@/contexts/os-context';
import { useAuth } from '@/contexts/auth-context';

export default function CriarOSScreen() {
  const router = useRouter();
  const insets = useSafeAreaInsets();
  const { criarOS } = useOS();
  const { user } = useAuth();

  const [titulo, setTitulo] = useState('');
  const [maquina, setMaquina] = useState('');
  const [local, setLocal] = useState('');
  const [descricao, setDescricao] = useState('');
  const [imagemUri, setImagemUri] = useState(null);
  const [permissionModal, setPermissionModal] = useState({
    visible: false,
    tipo: null, // 'camera' | 'galeria'
  });

  const handleCriar = async () => {
    if (!titulo.trim()) {
      if (Platform.OS === 'web') window.alert('Preencha o título da solicitação.');
      else Alert.alert('Erro', 'Preencha o título da solicitação.');
      return;
    }
    if (!local.trim()) {
      if (Platform.OS === 'web') window.alert('Preencha o local / setor.');
      else Alert.alert('Erro', 'Preencha o local / setor.');
      return;
    }
    if (!descricao.trim()) {
      if (Platform.OS === 'web') window.alert('Preencha a descrição do problema.');
      else Alert.alert('Erro', 'Preencha a descrição do problema.');
      return;
    }

    try {
      const nomeSolicitante = user?.nome || user?.email || 'Solicitante';
      await criarOS({
        titulo: titulo.trim(),
        maquina: maquina.trim(),
        local: local.trim(),
        descricao: descricao.trim(),
        imagem: imagemUri,
        solicitante: nomeSolicitante,
      });

      setTitulo('');
      setMaquina('');
      setLocal('');
      setDescricao('');
      setImagemUri(null);

      if (Platform.OS === 'web') {
        window.alert('Ordem de serviço criada com sucesso!');
      } else {
        Alert.alert('Sucesso', 'Ordem de serviço criada com sucesso!');
      }
      router.push('/');
    } catch (err) {
      console.log('Erro ao criar OS:', err);
      if (Platform.OS === 'web') window.alert('Erro ao salvar OS.');
      else Alert.alert('Erro', 'Erro ao salvar OS.');
    }
  };

  const handlePressTakePhoto = () => {
    setPermissionModal({ visible: true, tipo: 'camera' });
  };

  const handlePressPickGallery = () => {
    setPermissionModal({ visible: true, tipo: 'galeria' });
  };

  const handlePermissionResponse = async (granted) => {
    const tipo = permissionModal.tipo;
    setPermissionModal({ visible: false, tipo: null });

    if (!granted) return;

    if (tipo === 'camera') {
      await executeTakePhoto();
    } else if (tipo === 'galeria') {
      await executePickFromGallery();
    }
  };

  const executeTakePhoto = async () => {
    try {
      const permission = await ImagePicker.requestCameraPermissionsAsync();
      if (!permission.granted && Platform.OS !== 'web') {
        Alert.alert(
          'Permissão necessária',
          'É necessário conceder permissão de acesso à câmera nas configurações do dispositivo.'
        );
        return;
      }

      const result = await ImagePicker.launchCameraAsync({
        mediaTypes: ['images'],
        allowsEditing: true,
        aspect: [4, 3],
        quality: 0.8,
      });

      if (!result.canceled && result.assets && result.assets[0]?.uri) {
        setImagemUri(result.assets[0].uri);
      }
    } catch (e) {
      console.log('Erro ao abrir câmera:', e);
      if (Platform.OS === 'web') {
        window.alert('Não foi possível abrir a câmera.');
      } else {
        Alert.alert('Erro', 'Não foi possível abrir a câmera.');
      }
    }
  };

  const executePickFromGallery = async () => {
    try {
      const permission = await ImagePicker.requestMediaLibraryPermissionsAsync();
      if (!permission.granted && Platform.OS !== 'web') {
        Alert.alert(
          'Permissão necessária',
          'É necessário conceder permissão de acesso à galeria nas configurações do dispositivo.'
        );
        return;
      }

      const result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ['images'],
        allowsEditing: true,
        aspect: [4, 3],
        quality: 0.8,
      });

      if (!result.canceled && result.assets && result.assets[0]?.uri) {
        setImagemUri(result.assets[0].uri);
      }
    } catch (e) {
      console.log('Erro ao escolher imagem da galeria:', e);
      if (Platform.OS === 'web') {
        window.alert('Não foi possível carregar a imagem da galeria.');
      } else {
        Alert.alert('Erro', 'Não foi possível carregar a imagem da galeria.');
      }
    }
  };

  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
    >
      <ScrollView
        style={styles.scrollView}
        contentContainerStyle={[
          styles.scrollContent,
          { paddingTop: insets.top + 10 },
        ]}
        showsVerticalScrollIndicator={false}
        keyboardShouldPersistTaps="handled"
      >
        {/* Header */}
        <Text style={styles.headerSubtitle}>Criar OS</Text>
        <Text style={styles.headerTitle}>Criar ordem de serviço</Text>

        {/* Formulário */}
        <View style={styles.formContainer}>
          {/* Título do problema */}
          <View style={styles.fieldContainer}>
            <Text style={styles.label}>
              Título do problema <Text style={styles.required}>*</Text>
            </Text>
            <View style={styles.inputWrapper}>
              <MaterialCommunityIcons name="file-document-outline" size={20} color={AppColors.iconPrimary} style={styles.inputIcon} />
              <TextInput
                style={styles.input}
                placeholder="Ex: Vazamento da pia"
                placeholderTextColor={AppColors.textMuted}
                value={titulo}
                onChangeText={setTitulo}
              />
            </View>
          </View>

          {/* Máquina / Equipamento */}
          <View style={styles.fieldContainer}>
            <Text style={styles.label}>
              Máquina / Equipamento <Text style={styles.required}>*</Text>
            </Text>
            <View style={styles.inputWrapper}>
              <MaterialCommunityIcons name="cog" size={20} color={AppColors.iconPrimary} style={styles.inputIcon} />
              <TextInput
                style={styles.input}
                placeholder="Ex: Torno CNC #3"
                placeholderTextColor={AppColors.textMuted}
                value={maquina}
                onChangeText={setMaquina}
              />
            </View>
          </View>

          {/* Local / Setor */}
          <View style={styles.fieldContainer}>
            <Text style={styles.label}>
              Local / Setor <Text style={styles.required}>*</Text>
            </Text>
            <View style={styles.inputWrapper}>
              <MaterialCommunityIcons name="map-marker" size={20} color={AppColors.iconPrimary} style={styles.inputIcon} />
              <TextInput
                style={styles.input}
                placeholder="Ex: Galpão B, Setor 2"
                placeholderTextColor={AppColors.textMuted}
                value={local}
                onChangeText={setLocal}
              />
            </View>
          </View>

          {/* Descrição do problema */}
          <View style={styles.fieldContainer}>
            <Text style={styles.label}>
              Descrição do problema <Text style={styles.required}>*</Text>
            </Text>
            <View style={[styles.inputWrapper, styles.textAreaWrapper]}>
              <MaterialCommunityIcons name="pencil" size={20} color={AppColors.iconPrimary} style={[styles.inputIcon, { marginTop: 14 }]} />
              <TextInput
                style={[styles.input, styles.textArea]}
                placeholder="Descreva o problema em detalhes..."
                placeholderTextColor={AppColors.textMuted}
                value={descricao}
                onChangeText={setDescricao}
                multiline
                numberOfLines={4}
                textAlignVertical="top"
              />
            </View>
          </View>

          {/* Imagem / Foto do problema */}
          <View style={styles.fieldContainer}>
            <Text style={styles.label}>
              Imagem / Foto do problema
            </Text>

            {imagemUri ? (
              <View style={styles.imagePreviewContainer}>
                <Image source={{ uri: imagemUri }} style={styles.imagePreview} contentFit="cover" />
                <TouchableOpacity
                  style={styles.removeImageButton}
                  onPress={() => setImagemUri(null)}
                  activeOpacity={0.8}
                >
                  <MaterialCommunityIcons name="trash-can-outline" size={18} color="#FF4D4D" />
                  <Text style={styles.removeImageText}>Remover foto</Text>
                </TouchableOpacity>
              </View>
            ) : null}

            <View style={styles.photoActionsRow}>
              <TouchableOpacity
                style={[styles.photoActionButton, styles.photoActionButtonPrimary]}
                onPress={handlePressTakePhoto}
                activeOpacity={0.7}
              >
                <MaterialCommunityIcons name="camera" size={20} color={AppColors.white} />
                <Text style={styles.photoActionTextPrimary}>Tirar foto</Text>
              </TouchableOpacity>

              <TouchableOpacity
                style={[styles.photoActionButton, styles.photoActionButtonPrimary]}
                onPress={handlePressPickGallery}
                activeOpacity={0.7}
              >
                <MaterialCommunityIcons name="image-multiple-outline" size={20} color={AppColors.white} />
                <Text style={styles.photoActionTextPrimary}>Galeria</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>

        {/* Botão Submit */}
        <TouchableOpacity style={styles.submitButton} onPress={handleCriar} activeOpacity={0.8}>
          <Text style={styles.submitButtonText}>Abrir Ordem de Serviço</Text>
        </TouchableOpacity>

        <View style={{ height: 30 }} />
      </ScrollView>

      {/* Modal de Permissão de Câmera / Galeria */}
      <Modal
        visible={permissionModal.visible}
        transparent
        animationType="fade"
        onRequestClose={() => handlePermissionResponse(false)}
      >
        <View style={styles.permissionOverlay}>
          <View style={styles.permissionCard}>
            <View style={styles.permissionIconCircle}>
              <MaterialCommunityIcons
                name={permissionModal.tipo === 'camera' ? 'camera' : 'image-multiple'}
                size={34}
                color={AppColors.primary}
              />
            </View>

            <Text style={styles.permissionTitle}>
              {permissionModal.tipo === 'camera'
                ? 'Permissão de Câmera'
                : 'Permissão da Galeria'}
            </Text>

            <Text style={styles.permissionMessage}>
              {permissionModal.tipo === 'camera'
                ? 'O ChamaJussa precisa de permissão para acessar a câmera do seu dispositivo para fotografar o problema.'
                : 'O ChamaJussa precisa de permissão para acessar sua galeria de fotos para anexar a imagem do problema.'}
            </Text>

            <View style={styles.permissionButtonsRow}>
              <TouchableOpacity
                style={styles.permissionBtnCancel}
                onPress={() => handlePermissionResponse(false)}
                activeOpacity={0.7}
              >
                <Text style={styles.permissionBtnCancelText}>Não permitir</Text>
              </TouchableOpacity>

              <TouchableOpacity
                style={styles.permissionBtnConfirm}
                onPress={() => handlePermissionResponse(true)}
                activeOpacity={0.8}
              >
                <Text style={styles.permissionBtnConfirmText}>Permitir</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: AppColors.background,
  },
  scrollView: {
    flex: 1,
  },
  scrollContent: {
    paddingHorizontal: 20,
    paddingBottom: 20,
  },
  headerSubtitle: {
    fontSize: 14,
    color: AppColors.textSecondary,
    textAlign: 'center',
    marginBottom: 4,
  },
  headerTitle: {
    fontSize: 22,
    fontWeight: '700',
    color: AppColors.white,
    textAlign: 'center',
    marginBottom: 28,
  },
  formContainer: {
    gap: 18,
  },
  fieldContainer: {
    gap: 8,
  },
  label: {
    fontSize: 14,
    fontWeight: '600',
    color: AppColors.white,
  },
  required: {
    color: AppColors.primary,
  },
  inputWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: AppColors.inputBg,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: AppColors.border,
    paddingHorizontal: 14,
  },
  textAreaWrapper: {
    alignItems: 'flex-start',
  },
  inputIcon: {
    marginRight: 10,
  },
  input: {
    flex: 1,
    height: 50,
    fontSize: 15,
    color: AppColors.white,
  },
  textArea: {
    height: 100,
    paddingTop: 14,
  },
  photoActionsRow: {
    flexDirection: 'row',
    gap: 12,
  },
  photoActionButton: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 8,
    backgroundColor: AppColors.inputBg,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: AppColors.border,
    height: 48,
  },
  photoActionButtonPrimary: {
    backgroundColor: AppColors.buttonPrimary,
    borderColor: AppColors.buttonPrimary,
  },
  photoActionText: {
    fontSize: 14,
    fontWeight: '600',
    color: AppColors.white,
  },
  photoActionTextPrimary: {
    fontSize: 14,
    fontWeight: '600',
    color: AppColors.white,
  },
  imagePreviewContainer: {
    marginTop: 4,
    marginBottom: 10,
    borderRadius: 12,
    overflow: 'hidden',
    borderWidth: 1,
    borderColor: AppColors.border,
    backgroundColor: AppColors.card,
  },
  imagePreview: {
    width: '100%',
    height: 200,
  },
  removeImageButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 6,
    paddingVertical: 10,
    backgroundColor: '#1E1414',
    borderTopWidth: 1,
    borderTopColor: '#3A2020',
  },
  removeImageText: {
    color: '#FF6B6B',
    fontSize: 13,
    fontWeight: '600',
  },
  submitButton: {
    backgroundColor: AppColors.buttonPrimary,
    borderRadius: 12,
    height: 52,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 28,
    shadowColor: AppColors.buttonPrimary,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 6,
  },
  submitButtonText: {
    color: AppColors.white,
    fontSize: 16,
    fontWeight: '700',
  },
  permissionOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.75)',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 24,
  },
  permissionCard: {
    width: '100%',
    maxWidth: 360,
    backgroundColor: AppColors.card,
    borderRadius: 20,
    padding: 24,
    alignItems: 'center',
    borderWidth: 1,
    borderColor: AppColors.border,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.5,
    shadowRadius: 16,
    elevation: 10,
  },
  permissionIconCircle: {
    width: 64,
    height: 64,
    borderRadius: 32,
    backgroundColor: 'rgba(25, 200, 119, 0.12)',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 16,
  },
  permissionTitle: {
    fontSize: 18,
    fontWeight: '700',
    color: AppColors.white,
    marginBottom: 8,
    textAlign: 'center',
  },
  permissionMessage: {
    fontSize: 14,
    color: AppColors.textSecondary,
    textAlign: 'center',
    lineHeight: 20,
    marginBottom: 24,
  },
  permissionButtonsRow: {
    flexDirection: 'row',
    gap: 12,
    width: '100%',
  },
  permissionBtnCancel: {
    flex: 1,
    height: 46,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: AppColors.border,
    backgroundColor: AppColors.inputBg,
    justifyContent: 'center',
    alignItems: 'center',
  },
  permissionBtnCancelText: {
    fontSize: 14,
    fontWeight: '600',
    color: AppColors.textSecondary,
  },
  permissionBtnConfirm: {
    flex: 1,
    height: 46,
    borderRadius: 12,
    backgroundColor: AppColors.buttonPrimary,
    justifyContent: 'center',
    alignItems: 'center',
  },
  permissionBtnConfirmText: {
    fontSize: 14,
    fontWeight: '700',
    color: AppColors.white,
  },
});
