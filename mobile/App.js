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
import DashboardScreen from './src/screens/home/DashboardScreen';
import MedicinesScreen from './src/screens/home/MedicinesScreen';
import RecordsScreen from './src/screens/home/RecordsScreen_minimal';
import AIChatBotScreen from './src/screens/home/AIChatBotScreen';
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
const DashboardStack = createNativeStackNavigator();
const MedicinesStack = createNativeStackNavigator();
const RecordsStack = createNativeStackNavigator();
const AIChatBotStack = createNativeStackNavigator();
const MoreStack = createNativeStackNavigator();
// Toggle this to false to disable the temporary developer start screen
const ENABLE_DEV_START = true;
const Tab = createBottomTabNavigator();

const brandTheme = {
  ...PaperLightTheme,
  colors: {
    ...PaperLightTheme.colors,
    primary: '#43A047', // health green accent
    secondary: '#43A047',
    tertiary: '#43A047',
    background: '#F2F5F7', // lighter gray background
    surface: '#FFFFFF',
  },
  roundness: 12,
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
          {/** Use only top edge so bottom inset can be handled explicitly by tab bar without double spacing */}
          <SafeAreaView style={{ flex: 1, backgroundColor: '#FFFFFF' }} edges={['top']}>
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
                <Stack.Screen name="Records" component={RecordsStackScreen} />
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

import { useI18n } from './src/i18n/i18n';

function DashboardStackScreen() {
  const { t } = useI18n();
  return (
    <DashboardStack.Navigator
      screenOptions={{
  // Use native large title on iOS. Expanded state: right-aligned via style. Collapsed: centered via headerTitleAlign
  headerLargeTitle: Platform.OS === 'ios',
  headerTitleAlign: Platform.OS === 'ios' ? 'center' : 'left',
  headerLargeTitleStyle: { color: '#0A2540', fontWeight: '700', textAlign: 'right' },
  headerTitleStyle: { color: '#0A2540', fontWeight: '600', textAlign: 'center' },
        headerStyle: { backgroundColor: '#FFFFFF' },
        contentStyle: { backgroundColor: brandTheme.colors.background }
      }}
    >
      <DashboardStack.Screen name="DashboardMain" component={DashboardScreen} options={{ title: t('dashboard') }} />
    </DashboardStack.Navigator>
  );
}

function MedicinesStackScreen() {
  const { t } = useI18n();
  return (
    <MedicinesStack.Navigator
      screenOptions={{
  headerShown: false,
  contentStyle: { backgroundColor: brandTheme.colors.background }
      }}
    >
      <MedicinesStack.Screen name="MedicinesMain" component={MedicinesScreen} options={{ title: t('medicines') }} />
    </MedicinesStack.Navigator>
  );
}

function RecordsStackScreen() {
  const { t } = useI18n();
  return (
    <RecordsStack.Navigator
      screenOptions={{
        headerShown: true,
        headerStyle: { 
          backgroundColor: '#FFFFFF',
          height: 80, // Compact header
        },
        headerTitleStyle: { 
          color: '#0A2540', 
          fontWeight: '600', 
          fontSize: 18,
        },
        headerTitleAlign: 'center',
        contentStyle: { backgroundColor: '#F8FAFC' }
      }}
    >
      <RecordsStack.Screen 
        name="RecordsMain" 
        component={RecordsScreen} 
        options={{ title: t('healthRecords') || 'Health Records' }} 
      />
    </RecordsStack.Navigator>
  );
}

function AIChatBotStackScreen() {
  const { t } = useI18n();
  return (
    <AIChatBotStack.Navigator
      screenOptions={{
        headerShown: false,  // Hide the navigation header
        contentStyle: { backgroundColor: brandTheme.colors.background }
      }}
    >
      <AIChatBotStack.Screen name="AIChatBotMain" component={AIChatBotScreen} options={{ title: t('aiHealthAssistant') }} />
    </AIChatBotStack.Navigator>
  );
}

function MoreStackScreen() {
  const { t } = useI18n();
  return (
    <MoreStack.Navigator
      screenOptions={{
  headerLargeTitle: Platform.OS === 'ios',
  headerTitleAlign: Platform.OS === 'ios' ? 'center' : 'left',
  headerLargeTitleStyle: { color: '#0A2540', fontWeight: '700', textAlign: 'right' },
  headerTitleStyle: { color: '#0A2540', fontWeight: '600', textAlign: 'center' },
        headerStyle: { backgroundColor: '#FFFFFF' },
        contentStyle: { backgroundColor: brandTheme.colors.background }
      }}
    >
      <MoreStack.Screen name="MoreMain" component={MoreScreen} options={{ title: t('more') }} />
    </MoreStack.Navigator>
  );
}

function MainTabs() {
  // Add safe-area aware padding for bottom tab (home indicator) and dynamic height
  const insets = useSafeAreaInsets();
  const baseTabBarHeight = 56; // base height excluding extra bottom inset
  // header removed in favor of large title inside screens

  return (
    <Tab.Navigator
      screenOptions={({ route, navigation }) => ({
  headerShown: false,
        tabBarShowLabel: true,
        tabBarActiveTintColor: brandTheme.colors.primary,
        tabBarInactiveTintColor: '#6B7280',
        tabBarStyle: {
          height: baseTabBarHeight + insets.bottom,
          paddingBottom: Math.max(insets.bottom, 8),
          paddingTop: 8,
          backgroundColor: '#FFFFFF',
          borderTopColor: '#E2E8F0',
          borderTopWidth: 1,
        },
        tabBarIcon: ({ color, size, focused }) => null, // icons set per-screen below
      })}
    >
      <Tab.Screen
        name="Dashboard"
        component={DashboardStackScreen}
        options={{
          tabBarLabel: 'Dashboard',
          tabBarIcon: ({ color }) => <HomeScreenIcon name="home" color={color} />,
        }}
      />
      <Tab.Screen
        name="Medicines"
        component={MedicinesStackScreen}
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
        name="AIChatBot"
        component={AIChatBotStackScreen}
        options={{
          tabBarLabel: 'AI Chat',
          tabBarIcon: ({ color }) => <HomeScreenIcon name="robot" color={color} />,
        }}
      />
      <Tab.Screen
        name="More"
        component={MoreStackScreen}
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
      backgroundColor: brandTheme.colors.primary,
      alignItems: 'center',
      justifyContent: 'center',
      marginTop: -12,
      borderWidth: 1,
      borderColor: '#E2E8F0'
    }}>
      <PaperIcon source="qrcode-scan" color="#FFFFFF" size={30} />
    </RNView>
  );
}
