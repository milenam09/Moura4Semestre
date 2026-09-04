import React, { useState, useCallback } from 'react';
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  TouchableOpacity,
  RefreshControl,
} from 'react-native';
import { useFocusEffect } from 'expo-router';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { AppColors } from '@/constants/theme';
import { useOS } from '@/contexts/os-context';

function formatNotifDate(date) {
  const d = new Date(date);
  if (isNaN(d.getTime())) return '';
  const day = String(d.getDate()).padStart(2, '0');
  const month = String(d.getMonth() + 1).padStart(2, '0');
  const year = d.getFullYear();
  return `${day}/${month}/${year}`;
}

function formatNotifTime(date) {
  const d = new Date(date);
  if (isNaN(d.getTime())) return '';
  const hours = String(d.getHours()).padStart(2, '0');
  const minutes = String(d.getMinutes()).padStart(2, '0');
  return `${hours}:${minutes}`;
}

function NotificacaoCard({ item }) {
  const isConcluido = item.titulo?.toLowerCase().includes('finalizada') || item.titulo?.toLowerCase().includes('conclu');
  const isAndamento = item.titulo?.toLowerCase().includes('andamento');

  const iconName = isConcluido
    ? 'check-circle'
    : isAndamento
      ? 'wrench-clock'
      : 'bullhorn';

  const iconColor = isConcluido
    ? AppColors.statusConcluido
    : isAndamento
      ? AppColors.statusAndamento
      : AppColors.iconPrimary;

  return (
    <View style={styles.card}>
      <View style={styles.cardRow}>
        {/* Left: Icon */}
        <View style={styles.iconContainer}>
          <MaterialCommunityIcons name={iconName} size={30} color={iconColor} />
        </View>

        {/* Right: Content */}
        <View style={styles.contentContainer}>
          <Text style={styles.cardTitle}>{item.titulo}</Text>
          <Text style={styles.cardMessage}>{item.mensagem}</Text>

          {/* Bottom row: Date and Time */}
          <View style={styles.dateTimeRow}>
            <Text style={styles.dateText}>{formatNotifDate(item.data)}</Text>
            <Text style={styles.timeText}>{formatNotifTime(item.data)}</Text>
          </View>
        </View>
      </View>
    </View>
  );
}

export default function NotificacoesScreen() {
  const insets = useSafeAreaInsets();
  const { notificacoes, limparNotificacoes, carregarDados, isSyncing } = useOS();
  const [refreshing, setRefreshing] = useState(false);

  // Recarrega notificações sempre que abrir a aba
  useFocusEffect(
    useCallback(() => {
      carregarDados();
    }, [carregarDados])
  );

  const onRefresh = async () => {
    setRefreshing(true);
    await carregarDados();
    setRefreshing(false);
  };

  return (
    <View style={[styles.container, { paddingTop: insets.top }]}>
      {/* Header */}
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Notificações</Text>
        {notificacoes.length > 0 && (
          <TouchableOpacity onPress={limparNotificacoes} style={styles.clearButton}>
            <Text style={styles.clearButtonText}>Limpar</Text>
          </TouchableOpacity>
        )}
      </View>

      {/* Notifications List / Empty State */}
      {notificacoes.length === 0 ? (
        <View style={styles.emptyContainer}>
          <Text style={styles.emptyIcon}></Text>
          <Text style={styles.emptyTitle}>Sem notificações</Text>
          <Text style={styles.emptyText}>
            Quando uma ordem for criada, entrar em andamento ou for finalizada, você receberá avisos aqui!
          </Text>
        </View>
      ) : (
        <FlatList
          data={notificacoes}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => <NotificacaoCard item={item} />}
          contentContainerStyle={styles.listContent}
          showsVerticalScrollIndicator={false}
          ItemSeparatorComponent={() => <View style={{ height: 14 }} />}
          refreshControl={
            <RefreshControl
              refreshing={refreshing}
              onRefresh={onRefresh}
              tintColor={AppColors.primary}
              colors={[AppColors.primary]}
            />
          }
        />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: AppColors.background,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 20,
    paddingTop: 16,
    paddingBottom: 18,
    position: 'relative',
  },
  headerTitle: {
    fontSize: 22,
    fontWeight: '700',
    color: AppColors.white,
    textAlign: 'center',
  },
  clearButton: {
    position: 'absolute',
    right: 20,
    top: 18,
  },
  clearButtonText: {
    color: AppColors.textMuted,
    fontSize: 14,
    fontWeight: '600',
  },
  listContent: {
    paddingHorizontal: 16,
    paddingTop: 8,
    paddingBottom: 28,
  },
  card: {
    backgroundColor: '#121212',
    borderRadius: 16,
    borderWidth: 1,
    borderColor: 'rgba(27, 137, 67, 0.18)',
    padding: 16,
  },
  cardRow: {
    flexDirection: 'row',
    alignItems: 'flex-start',
  },
  iconContainer: {
    marginRight: 14,
    marginTop: 2,
    alignItems: 'center',
    justifyContent: 'center',
  },
  contentContainer: {
    flex: 1,
  },
  cardTitle: {
    fontSize: 16,
    fontWeight: '700',
    color: AppColors.white,
    marginBottom: 6,
  },
  cardMessage: {
    fontSize: 13,
    color: AppColors.textSecondary,
    lineHeight: 18,
    marginBottom: 12,
  },
  dateTimeRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: 2,
  },
  dateText: {
    fontSize: 13,
    fontWeight: '700',
    color: AppColors.primary,
  },
  timeText: {
    fontSize: 13,
    fontWeight: '700',
    color: AppColors.primary,
  },
  emptyContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 40,
  },
  emptyIcon: {
    fontSize: 60,
    marginBottom: 20,
    opacity: 0.5,
  },
  emptyTitle: {
    fontSize: 20,
    fontWeight: '700',
    color: AppColors.white,
    marginBottom: 8,
    textAlign: 'center',
  },
  emptyText: {
    fontSize: 14,
    color: AppColors.textSecondary,
    textAlign: 'center',
    lineHeight: 20,
  },
});

