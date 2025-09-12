import React, { useState } from 'react';
import { StatusBar } from 'expo-status-bar';
import { Platform, View as RNView, ScrollView, Alert, ActivityIndicator } from 'react-native';
import { SafeAreaProvider, SafeAreaView, useSafeAreaInsets } from 'react-native-safe-area-context';
import { NavigationContainer, DefaultTheme as NavDefaultTheme } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Provider as PaperProvider, MD3LightTheme as PaperLightTheme, Text, IconButton, Menu, Icon as PaperIcon } from 'react-native-paper';
import LoginScreen from './src/screens/LoginScreen';
import OTPScreen from './src/screens/OTPScreen';
import LanguageSelectScreen from './src/screens/LanguageSelectScreen';
import DashboardScreen from './src/screens/home/DashboardScreen';
import MedicinesScreen from './src/screens/home/MedicinesScreen';
import AIChatBotScreen from './src/screens/home/AIChatBotScreen';
import MoreScreen from './src/screens/home/MoreScreen';
import RecordsScreen from './src/screens/home/RecordsScreen';
import RecordDetailScreen from './src/screens/records/RecordDetailScreen';
import QRScreen from './src/screens/QRScreen';
// New feature placeholder screens
import AbhaLinkScreen from './src/screens/auth/AbhaLinkScreen';
import QRLoginScreen from './src/screens/auth/QRLoginScreen';
import ProfileScreen from './src/screens/profile/ProfileScreen';
import EditProfileScreen from './src/screens/profile/EditProfileScreen';
import VaccinationRecordsScreen from './src/screens/profile/VaccinationRecordsScreen';
import MedicalHistoryScreen from './src/screens/profile/MedicalHistoryScreen';
import VoiceAssistantScreen from './src/screens/assist/VoiceAssistantScreen';
import RemindersScreen from './src/screens/reminders/RemindersScreen';
import AddReminderScreen from './src/screens/reminders/AddReminderScreen';
import HealthTipsScreen from './src/screens/health/HealthTipsScreen';
import DevStartScreen from './src/screens/dev/DevStartScreen';
import AppointmentBookingScreen from './src/screens/appointments/AppointmentBookingScreen';
import AppointmentsListScreen from './src/screens/appointments/AppointmentsListScreen';
import DoctorSelectionScreen from './src/screens/appointments/DoctorSelectionScreen';
import EmergencyDetailsScreen from './src/screens/emergency/EmergencyDetailsScreen';
import { AppI18nProvider, useI18n } from './src/i18n/i18n';

const Stack = createNativeStackNavigator();
const DashboardStack = createNativeStackNavigator();
const MedicinesStack = createNativeStackNavigator();
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
        <AppContent />
      </AppI18nProvider>
    </SafeAreaProvider>
  );
}

function AppContent() {
  // Now these components can access the i18n context
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
          component={QRScreen}
          options={{
            tabBarLabel: '',
            tabBarIcon: ({ focused }) => (
              <FloatingQRIcon focused={focused} />
            ),
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

  return (
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
            <Stack.Screen name="Profile" component={ProfileScreen} />
            <Stack.Screen name="EditProfile" component={EditProfileScreen} />
            <Stack.Screen name="VaccinationRecords" component={VaccinationRecordsScreen} />
            <Stack.Screen name="MedicalHistory" component={MedicalHistoryScreen} />
            <Stack.Screen 
              name="Records" 
              component={RecordsScreen} 
              options={({ navigation, route }) => {
                return {
                  headerShown: true,
                  title: 'Records', // This will be overridden by the screen's own title
                  headerStyle: { backgroundColor: '#FFFFFF' },
                  headerTitleStyle: { color: '#0A2540', fontWeight: '600' },
                  headerTintColor: '#43A047',
                  headerTitleAlign: 'center',
                  headerRight: () => (
                    <TranslationHeaderButton navigation={navigation} />
                  ),
                };
              }}
            />
            <Stack.Screen 
              name="RecordDetail" 
              component={RecordDetailScreen} 
              options={{
                headerShown: true,
                title: 'Record Details',
                headerStyle: { backgroundColor: '#FFFFFF' },
                headerTitleStyle: { color: '#0A2540', fontWeight: '600' },
                headerTintColor: '#43A047',
                headerTitleAlign: 'center'
              }}
            />
            <Stack.Screen name="VoiceAssistant" component={VoiceAssistantScreen} />
            <Stack.Screen name="Reminders" component={RemindersScreen} />
            <Stack.Screen name="AddReminder" component={AddReminderScreen} />
            <Stack.Screen name="HealthTips" component={HealthTipsScreen} />
            <Stack.Screen 
              name="DoctorSelection" 
              component={DoctorSelectionScreen} 
              options={{
                headerShown: false,
                contentStyle: { backgroundColor: brandTheme.colors.background }
              }}
            />
            <Stack.Screen 
              name="EmergencyDetails" 
              component={EmergencyDetailsScreen}
              options={{
                headerShown: false,
                contentStyle: { backgroundColor: '#ffffff' }
              }}
            />
            <Stack.Screen 
              name="AppointmentBooking" 
              component={AppointmentBookingScreen} 
              options={{
                headerShown: false,
                contentStyle: { backgroundColor: brandTheme.colors.background }
              }}
            />
            <Stack.Screen 
              name="AppointmentsList" 
              component={AppointmentsListScreen} 
              options={{
                headerShown: false,
                contentStyle: { backgroundColor: brandTheme.colors.background }
              }}
            />
          </Stack.Navigator>
        </NavigationContainer>
      </SafeAreaView>
    </PaperProvider>
  );
}

function HomeScreenIcon({ name, color }) {
  return <PaperIcon source={name} color={color} size={24} />;
}

function FloatingQRIcon({ focused }) {
  return (
    <RNView style={{
      width: 56,
      height: 56,
      borderRadius: 28,
      backgroundColor: focused ? '#43A047' : '#43A047',
      alignItems: 'center',
      justifyContent: 'center',
      marginTop: -8,
      borderWidth: 3,
      borderColor: '#FFFFFF',
      shadowColor: '#000',
      shadowOffset: { width: 0, height: 2 },
      shadowOpacity: 0.25,
      shadowRadius: 4,
      elevation: 5,
    }}>
      <PaperIcon source="qrcode-scan" color="#FFFFFF" size={28} />
    </RNView>
  );
}

function TranslationHeaderButton({ navigation }) {
  const { lang, setLang, t } = useI18n();
  const [showLanguageMenu, setShowLanguageMenu] = useState(false);
  const [isTranslating, setIsTranslating] = useState(false);

  // Supported Languages
  const supportedLanguages = [
    { code: 'en', name: 'English', nativeName: 'English', flag: '🇺🇸' },
    { code: 'hi', name: 'Hindi', nativeName: 'हिंदी', flag: '🇮🇳' },
    { code: 'ml', name: 'Malayalam', nativeName: 'മলയാളം', flag: '🇮🇳' },
    { code: 'ta', name: 'Tamil', nativeName: 'தমিழ்', flag: '🇮🇳' },
    { code: 'te', name: 'Telugu', nativeName: 'తెలుగు', flag: '🇮🇳' },
    { code: 'kn', name: 'Kannada', nativeName: 'ಕನ್ನಡ', flag: '🇮🇳' },
    { code: 'bn', name: 'Bengali', nativeName: 'বাংলা', flag: '🇮🇳' },
    { code: 'gu', name: 'Gujarati', nativeName: 'ગુજરાતી', flag: '🇮🇳' },
    { code: 'mr', name: 'Marathi', nativeName: 'मराठी', flag: '🇮🇳' },
    { code: 'pa', name: 'Punjabi', nativeName: 'ਪੰਜਾਬੀ', flag: '🇮🇳' },
  ];

  // Handle Language Selection
  const handleLanguageSelect = async (langCode) => {
    if (langCode === lang) return;
    
    setIsTranslating(true);
    setShowLanguageMenu(false);
    
    // Simulate translation delay
    setTimeout(() => {
      // Update the global language state
      setLang(langCode);
      setIsTranslating(false);
      
      const selectedLang = supportedLanguages.find(lang => lang.code === langCode);
      
      Alert.alert(
        t('languageChanged'),
        t('recordsInLanguage', { language: selectedLang.nativeName }),
        [{ text: t('ok') }]
      );
    }, 1500);
  };

  if (isTranslating) {
    return (
      <RNView style={{ flexDirection: 'row', alignItems: 'center', marginRight: 8 }}>
        <ActivityIndicator size="small" color="#43A047" />
        <Text style={{ fontSize: 12, color: '#43A047', marginLeft: 4, fontWeight: '500' }}>
          {t('linking')}
        </Text>
      </RNView>
    );
  }

  return (
    <Menu
      visible={showLanguageMenu}
      onDismiss={() => setShowLanguageMenu(false)}
      anchor={
        <IconButton
          icon="translate"
          size={24}
          iconColor="#43A047"
          style={{ margin: 0 }}
          onPress={() => setShowLanguageMenu(true)}
        />
      }
      contentStyle={{
        backgroundColor: '#FFFFFF',
        borderRadius: 12,
        maxHeight: 350,
        minWidth: 250,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.15,
        shadowRadius: 8,
        elevation: 8,
      }}
    >
      <ScrollView 
        style={{ maxHeight: 330 }}
        showsVerticalScrollIndicator={true}
        nestedScrollEnabled={true}
      >
        {supportedLanguages.map((language) => (
          <Menu.Item
            key={language.code}
            onPress={() => handleLanguageSelect(language.code)}
            title={
              <RNView style={{ flexDirection: 'row', alignItems: 'center', paddingVertical: 2 }}>
                <Text style={{ fontSize: 18, marginRight: 10 }}>{language.flag}</Text>
                <RNView style={{ flex: 1 }}>
                  <Text style={{
                    fontSize: 14,
                    fontWeight: '500',
                    color: lang === language.code ? '#43A047' : '#0A2540'
                  }}>
                    {language.name}
                  </Text>
                  <Text style={{ fontSize: 11, color: '#64748B', marginTop: 1 }}>
                    {language.nativeName}
                  </Text>
                </RNView>
                {lang === language.code && (
                  <PaperIcon source="check" size={14} color="#43A047" />
                )}
              </RNView>
            }
            style={{
              paddingVertical: 6,
              paddingHorizontal: 12,
              minHeight: 48,
              backgroundColor: lang === language.code ? '#F0FDF4' : 'transparent'
            }}
          />
        ))}
      </ScrollView>
    </Menu>
  );
}
