import React from 'react';
import { StatusBar } from 'expo-status-bar';
import { Platform } from 'react-native';
import { SafeAreaProvider, SafeAreaView, useSafeAreaInsets } from 'react-native-safe-area-context';
import { NavigationContainer, DefaultTheme as NavDefaultTheme } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Provider as PaperProvider, MD3LightTheme as PaperLightTheme } from 'react-native-paper';
import LoginScreen from './src/screens/LoginScreen';
import OTPScreen from './src/screens/OTPScreen';
import LanguageSelectScreen from './src/screens/LanguageSelectScreen';
import HomeScreen from './src/screens/HomeScreen';
import DashboardScreen from './src/screens/home/DashboardScreen';
import MedicinesScreen from './src/screens/home/MedicinesScreen';
import RecordsScreen from './src/screens/home/RecordsScreen';
import MoreScreen from './src/screens/home/MoreScreen';
// New feature placeholder screens
import AbhaLinkScreen from './src/screens/auth/AbhaLinkScreen';
import QRLoginScreen from './src/screens/auth/QRLoginScreen';
import ProfileScreen from './src/screens/profile/ProfileScreen';
import EditProfileScreen from './src/screens/profile/EditProfileScreen';
import VaccinationRecordsScreen from './src/screens/profile/VaccinationRecordsScreen';
import MedicalHistoryScreen from './src/screens/profile/MedicalHistoryScreen';
import RecordDetailScreen from './src/screens/records/RecordDetailScreen';
import ShareRecordScreen from './src/screens/records/ShareRecordScreen';
import VoiceAssistantScreen from './src/screens/assist/VoiceAssistantScreen';
import RemindersScreen from './src/screens/reminders/RemindersScreen';
import AddReminderScreen from './src/screens/reminders/AddReminderScreen';
import HealthTipsScreen from './src/screens/health/HealthTipsScreen';
import DevStartScreen from './src/screens/dev/DevStartScreen';
import { AppI18nProvider } from './src/i18n/i18n';

const Stack = createNativeStackNavigator();
// Toggle this to false to disable the temporary developer start screen
const ENABLE_DEV_START = true;
const Tab = createBottomTabNavigator();

const brandTheme = {
  ...PaperLightTheme,
  colors: {
    ...PaperLightTheme.colors,
    primary: '#0B6E4F', // health green
    secondary: '#0D47A1', // govt blue tone
    tertiary: '#FF8F00', // saffron/orange highlight
    background: '#F6FAFF',
    surface: '#FFFFFF',
  },
  roundness: 10,
};

const navTheme = {
  ...NavDefaultTheme,
  colors: {
    ...NavDefaultTheme.colors,
    primary: brandTheme.colors.primary,
    background: brandTheme.colors.background,
    card: brandTheme.colors.surface,
    text: '#0A2540',
    border: '#E3E8EF',
  },
};

export default function App() {
  return (
    <SafeAreaProvider>
      <AppI18nProvider>
        <PaperProvider theme={brandTheme}>
          <SafeAreaView style={{ flex: 1 }} edges={['top', 'bottom']}>
            <NavigationContainer theme={navTheme}>
              <StatusBar style={Platform.OS === 'ios' ? 'dark' : 'light'} />
              <Stack.Navigator initialRouteName={ENABLE_DEV_START ? 'DevStart' : 'Language'} screenOptions={{ headerShown: false }}>
                {ENABLE_DEV_START && <Stack.Screen name="DevStart" component={DevStartScreen} />}
                <Stack.Screen name="Language" component={LanguageSelectScreen} />
                <Stack.Screen name="Login" component={LoginScreen} />
                <Stack.Screen name="OTP" component={OTPScreen} />
                <Stack.Screen name="AbhaLink" component={AbhaLinkScreen} />
                <Stack.Screen name="QRLogin" component={QRLoginScreen} />
                <Stack.Screen name="Home" component={MainTabs} />
                {/* Deep feature routes */}
                <Stack.Screen name="Profile" component={ProfileScreen} />
                <Stack.Screen name="EditProfile" component={EditProfileScreen} />
                <Stack.Screen name="VaccinationRecords" component={VaccinationRecordsScreen} />
                <Stack.Screen name="MedicalHistory" component={MedicalHistoryScreen} />
                <Stack.Screen name="RecordDetail" component={RecordDetailScreen} />
                <Stack.Screen name="ShareRecord" component={ShareRecordScreen} />
                <Stack.Screen name="VoiceAssistant" component={VoiceAssistantScreen} />
                <Stack.Screen name="Reminders" component={RemindersScreen} />
                <Stack.Screen name="AddReminder" component={AddReminderScreen} />
                <Stack.Screen name="HealthTips" component={HealthTipsScreen} />
              </Stack.Navigator>
            </NavigationContainer>
          </SafeAreaView>
        </PaperProvider>
      </AppI18nProvider>
    </SafeAreaProvider>
  );
}

function MainTabs() {
  // Add safe-area aware padding for bottom tab (home indicator) and dynamic height
  const insets = useSafeAreaInsets();
  const baseTabBarHeight = 56; // base height excluding extra bottom inset
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        headerShown: false,
        tabBarShowLabel: true,
        tabBarActiveTintColor: brandTheme.colors.primary,
        tabBarInactiveTintColor: '#6B7280',
        tabBarStyle: {
          height: baseTabBarHeight + insets.bottom,
          paddingBottom: Math.max(insets.bottom, 8),
          paddingTop: 8,
        },
        tabBarIcon: ({ color, size, focused }) => null, // icons set per-screen below
      })}
    >
      <Tab.Screen
        name="Dashboard"
        component={DashboardScreen}
        options={{
          tabBarLabel: 'Dashboard',
          tabBarIcon: ({ color }) => <HomeScreenIcon name="home" color={color} />,
        }}
      />
      <Tab.Screen
        name="Medicines"
        component={MedicinesScreen}
        options={{
          tabBarLabel: 'Medicines',
          tabBarIcon: ({ color }) => <HomeScreenIcon name="pill" color={color} />,
        }}
      />
      <Tab.Screen
        name="QR"
        component={DashboardScreen}
        options={{
          tabBarLabel: '',
          tabBarIcon: ({ color }) => (
            <FloatingQRButton />
          ),
        }}
        listeners={{
          tabPress: (e) => {
            // TODO: navigate to scanner or QR share screen
          },
        }}
      />
      <Tab.Screen
        name="Records"
        component={RecordsScreen}
        options={{
          tabBarLabel: 'Records',
          tabBarIcon: ({ color }) => <HomeScreenIcon name="folder" color={color} />,
        }}
      />
      <Tab.Screen
        name="More"
        component={MoreScreen}
        options={{
          tabBarLabel: 'More',
          tabBarIcon: ({ color }) => <HomeScreenIcon name="dots-horizontal-circle-outline" color={color} />,
        }}
      />
    </Tab.Navigator>
  );
}

import { Icon as PaperIcon } from 'react-native-paper';
function HomeScreenIcon({ name, color }) {
  return <PaperIcon source={name} color={color} size={24} />;
}

import { View as RNView } from 'react-native';
function FloatingQRButton() {
  return (
    <RNView style={{
      width: 64,
      height: 64,
      borderRadius: 32,
      backgroundColor: brandTheme.colors.tertiary,
      alignItems: 'center',
      justifyContent: 'center',
      marginTop: -12,
      shadowColor: '#000', shadowOpacity: 0.2, shadowRadius: 6, shadowOffset: { width: 0, height: 3 },
      elevation: 6,
    }}>
      <PaperIcon source="qrcode-scan" color="#FFFFFF" size={30} />
    </RNView>
  );
}
