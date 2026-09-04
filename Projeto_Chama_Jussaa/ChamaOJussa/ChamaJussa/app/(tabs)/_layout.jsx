import { Tabs } from 'expo-router';
import React from 'react';
import { Platform, StyleSheet, View } from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { AppColors } from '@/constants/theme';

function TabIcon({ name, color, size, focused }) {
  const iconMap = {
    'clipboard-list': focused ? 'clipboard-text' : 'clipboard-text-outline',
    'plus-circle': focused ? 'plus-circle' : 'plus-circle-outline',
    'bell': focused ? 'bell' : 'bell-outline',
    'user': focused ? 'account' : 'account-outline',
  };

  if (name === 'plus-circle') {
    return (
      <View style={styles.plusIconContainer}>
        <View
          style={[
            styles.plusIconCircle,
            {
              backgroundColor: focused ? AppColors.primary : '#222222',
              borderColor: focused ? AppColors.primary : AppColors.border,
              borderWidth: 1,
            },
          ]}
        >
          <MaterialCommunityIcons
            name="plus"
            size={18}
            color={focused ? AppColors.background : AppColors.textMuted}
          />
        </View>
      </View>
    );
  }

  return (
    <MaterialCommunityIcons
      name={iconMap[name] || 'circle'}
      size={size - 2}
      color={color}
    />
  );
}

export default function TabLayout() {
  const insets = useSafeAreaInsets();
  const bottomInset = insets.bottom || 0;

  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: AppColors.tabActive,
        tabBarInactiveTintColor: AppColors.tabInactive,
        headerShown: false,
        tabBarStyle: {
          backgroundColor: AppColors.tabBarBg,
          borderTopColor: AppColors.border,
          borderTopWidth: 1,
          height: Platform.OS === 'ios' ? 88 : 74 + bottomInset,
          paddingTop: 8,
          paddingBottom: Platform.OS === 'ios' ? 28 : (bottomInset > 0 ? bottomInset + 4 : 10),
        },
        tabBarLabelStyle: {
          fontSize: 11,
          fontWeight: '500',
          marginTop: 2,
        },
        tabBarItemStyle: {
          justifyContent: 'center',
          alignItems: 'center',
        },
      }}
    >
      <Tabs.Screen
        name="index"
        options={{
          title: 'Minhas OS',
          tabBarIcon: ({ color, focused, size }) => (
            <TabIcon name="clipboard-list" color={color} size={size} focused={focused} />
          ),
        }}
      />
      <Tabs.Screen
        name="criar-os"
        options={{
          title: 'Criar OS',
          tabBarIcon: ({ color, focused, size }) => (
            <TabIcon name="plus-circle" color={color} size={size} focused={focused} />
          ),
        }}
      />
      <Tabs.Screen
        name="notificacoes"
        options={{
          title: 'Notificações',
          tabBarIcon: ({ color, focused, size }) => (
            <TabIcon name="bell" color={color} size={size} focused={focused} />
          ),
        }}
      />
      <Tabs.Screen
        name="perfil"
        options={{
          title: 'Perfil',
          tabBarIcon: ({ color, focused, size }) => (
            <TabIcon name="user" color={color} size={size} focused={focused} />
          ),
        }}
      />
    </Tabs>
  );
}

const styles = StyleSheet.create({
  plusIconContainer: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  plusIconCircle: {
    width: 28,
    height: 28,
    borderRadius: 14,
    alignItems: 'center',
    justifyContent: 'center',
  },
  plusIconText: {
    color: '#FFFFFF',
    fontSize: 20,
    fontWeight: 'bold',
    lineHeight: 22,
    marginTop: -1,
  },
});
