import React, { useState, useEffect, useRef } from 'react';
import { StyleSheet, View, ScrollView, KeyboardAvoidingView, Platform, Pressable, Alert, Animated } from 'react-native';
import { Text, TextInput, Button, Card, Icon } from 'react-native-paper';
import { useI18n } from '../../i18n/i18n';
import { useNavigation } from '@react-navigation/native';

export default function AIChatBotScreen() {
  const { t } = useI18n();
  const navigation = useNavigation();
  const [message, setMessage] = useState('');
  const [isRecording, setIsRecording] = useState(false);
  const [isProcessing, setIsProcessing] = useState(false);
  const [recordingDuration, setRecordingDuration] = useState(0);
  
  // Animation refs
  const pulseAnim = useRef(new Animated.Value(1)).current;
  const waveAnim = useRef(new Animated.Value(0)).current;
  const recordingTimer = useRef(null);
  
  const [messages, setMessages] = useState([
    {
      id: 1,
      text: t('aiWelcomeMessage'),
      isBot: true,
      timestamp: new Date().toLocaleTimeString(),
    }
  ]);

  // Recording animation effect
  useEffect(() => {
    if (isRecording) {
      // Start recording timer
      recordingTimer.current = setInterval(() => {
        setRecordingDuration(prev => prev + 0.1);
      }, 100);

      // Pulse animation
      const pulseAnimation = Animated.loop(
        Animated.sequence([
          Animated.timing(pulseAnim, {
            toValue: 1.3,
            duration: 800,
            useNativeDriver: true,
          }),
          Animated.timing(pulseAnim, {
            toValue: 1,
            duration: 800,
            useNativeDriver: true,
          }),
        ])
      );

      // Wave animation
      const waveAnimation = Animated.loop(
        Animated.timing(waveAnim, {
          toValue: 1,
          duration: 1500,
          useNativeDriver: true,
        })
      );

      pulseAnimation.start();
      waveAnimation.start();

      return () => {
        pulseAnimation.stop();
        waveAnimation.stop();
        if (recordingTimer.current) {
          clearInterval(recordingTimer.current);
        }
      };
    } else {
      // Reset animations
      setRecordingDuration(0);
      pulseAnim.setValue(1);
      waveAnim.setValue(0);
      if (recordingTimer.current) {
        clearInterval(recordingTimer.current);
      }
    }
  }, [isRecording]);

  // Voice command patterns in English and Hindi
  const voiceCommands = {
    // Navigation commands
    openRecords: {
      en: ['open my records', 'show my records', 'view my records', 'my health records', 'open records'],
      hi: ['मेरे रिकॉर्ड खोलें', 'मेरे रिकॉर्ड दिखाएं', 'रिकॉर्ड खोलें', 'स्वास्थ्य रिकॉर्ड']
    },
    openPrescription: {
      en: ['open my prescription', 'show my prescription', 'last prescription', 'recent prescription', 'my medicine'],
      hi: ['मेरी दवा दिखाएं', 'पर्चा खोलें', 'दवाई दिखाएं', 'मेरा पर्चा']
    },
    bookAppointment: {
      en: ['book appointment', 'schedule appointment', 'find doctor', 'book doctor', 'see doctor'],
      hi: ['अपॉइंटमेंट बुक करें', 'डॉक्टर से मिलें', 'डॉक्टर खोजें', 'अपॉइंटमेंट लें']
    },
    openProfile: {
      en: ['open my profile', 'show profile', 'my account', 'profile settings'],
      hi: ['मेरी प्रोफाइल', 'प्रोफाइल खोलें', 'खाता दिखाएं']
    },
    openReminders: {
      en: ['show reminders', 'my reminders', 'medicine reminders', 'pill reminders'],
      hi: ['रिमाइंडर दिखाएं', 'दवा रिमाइंडर', 'याददाश्त']
    }
  };

  // Process voice command and execute action
  const processVoiceCommand = (recognizedText) => {
    const text = recognizedText.toLowerCase();
    
    // Check for record-related commands
    for (const pattern of voiceCommands.openRecords.en.concat(voiceCommands.openRecords.hi)) {
      if (text.includes(pattern.toLowerCase())) {
        setTimeout(() => {
          navigation.navigate('Records');
        }, 1500); // Delay to show feedback first
        return {
          action: 'navigate',
          response: '✅ Opening your health records...',
          success: true
        };
      }
    }
    
    // Check for prescription commands
    for (const pattern of voiceCommands.openPrescription.en.concat(voiceCommands.openPrescription.hi)) {
      if (text.includes(pattern.toLowerCase())) {
        setTimeout(() => {
          navigation.navigate('Records', { filterType: 'prescription' });
        }, 1500);
        return {
          action: 'navigate',
          response: '💊 Opening your prescriptions and medications...',
          success: true
        };
      }
    }
    
    // Check for appointment booking commands
    for (const pattern of voiceCommands.bookAppointment.en.concat(voiceCommands.bookAppointment.hi)) {
      if (text.includes(pattern.toLowerCase())) {
        setTimeout(() => {
          navigation.navigate('DoctorSelection');
        }, 1500);
        return {
          action: 'navigate',
          response: '📅 Opening appointment booking with doctors...',
          success: true
        };
      }
    }
    
    // Check for profile commands
    for (const pattern of voiceCommands.openProfile.en.concat(voiceCommands.openProfile.hi)) {
      if (text.includes(pattern.toLowerCase())) {
        setTimeout(() => {
          navigation.navigate('Profile');
        }, 1500);
        return {
          action: 'navigate',
          response: '👤 Opening your profile settings...',
          success: true
        };
      }
    }
    
    // Check for reminder commands
    for (const pattern of voiceCommands.openReminders.en.concat(voiceCommands.openReminders.hi)) {
      if (text.includes(pattern.toLowerCase())) {
        setTimeout(() => {
          navigation.navigate('Reminders');
        }, 1500);
        return {
          action: 'navigate',
          response: '⏰ Opening your medicine reminders...',
          success: true
        };
      }
    }
    
    // Default response if no command matched
    return {
      action: 'help',
      response: `🤔 I heard: "${recognizedText}"\n\nI can help you with:\n• "Open my records" / "मेरे रिकॉर्ड दिखाएं"\n• "Show my prescription" / "मेरी दवा दिखाएं"\n• "Book appointment" / "अपॉइंटमेंट बुक करें"\n• "Open my profile" / "मेरी प्रोफाइल"\n• "Show reminders" / "रिमाइंडर दिखाएं"`,
      success: false
    };
  };

  // Simulate voice recognition with predefined responses
  const simulateVoiceRecognition = () => {
    const sampleCommands = [
      "Open my last prescription",
      "Show my health records", 
      "Book an appointment",
      "मेरे रिकॉर्ड दिखाएं", // Hindi: Show my records
      "डॉक्टर से मिलें", // Hindi: Meet doctor
      "मेरी दवा दिखाएं" // Hindi: Show my medicine
    ];
    
    // Randomly select a command to simulate
    const randomCommand = sampleCommands[Math.floor(Math.random() * sampleCommands.length)];
    return randomCommand;
  };

  const sendMessage = () => {
    if (message.trim()) {
      const userMessage = {
        id: Date.now(),
        text: message,
        isBot: false,
        timestamp: new Date().toLocaleTimeString(),
      };

      setMessages(prev => [...prev, userMessage]);
      const currentMessage = message;
      setMessage('');

      // Check if the message is a voice command
      setTimeout(() => {
        const commandResult = processVoiceCommand(currentMessage);
        
        const botResponse = {
          id: Date.now() + 1,
          text: commandResult.response,
          isBot: true,
          isAction: commandResult.success,
          actionType: commandResult.action,
          timestamp: new Date().toLocaleTimeString(),
        };
        setMessages(prev => [...prev, botResponse]);
      }, 1000);
    }
  };

  const handleVoiceChat = () => {
    if (isRecording) {
      // Stop recording
      setIsRecording(false);
      setIsProcessing(true);
      
      // Simulate voice processing and recognition
      setTimeout(() => {
        const recognizedText = simulateVoiceRecognition();
        
        const voiceMessage = {
          id: Date.now(),
          text: recognizedText,
          isBot: false,
          isVoice: true,
          timestamp: new Date().toLocaleTimeString(),
        };
        setMessages(prev => [...prev, voiceMessage]);
        
        // Process the voice command and get response
        setTimeout(() => {
          const commandResult = processVoiceCommand(recognizedText);
          
          const botResponse = {
            id: Date.now() + 1,
            text: commandResult.response,
            isBot: true,
            isAction: commandResult.success,
            actionType: commandResult.action,
            timestamp: new Date().toLocaleTimeString(),
          };
          setMessages(prev => [...prev, botResponse]);
          setIsProcessing(false);
        }, 1000);
      }, 2000);
    } else {
      // Start recording
      setIsRecording(true);
      setRecordingDuration(0);
    }
  };

  const QuickActionCard = ({ icon, title, onPress }) => (
    <Pressable style={styles.quickActionCard} onPress={onPress}>
      <View style={styles.quickActionContent}>
        <Icon source={icon} size={24} color="#43A047" />
        <Text style={styles.quickActionTitle}>{title}</Text>
      </View>
    </Pressable>
  );

  const MessageBubble = ({ message }) => (
    <View style={[
      styles.messageBubble,
      message.isBot ? styles.botMessage : styles.userMessage,
      message.isAction && styles.actionMessage
    ]}>
      {message.isVoice && (
        <View style={styles.voiceIndicator}>
          <Icon source="microphone" size={12} color="#FFFFFF" />
          <Text style={styles.voiceLabel}>{t('voiceMessage')}</Text>
        </View>
      )}
      {message.isAction && (
        <View style={styles.actionIndicator}>
          <Icon source="lightning-bolt" size={12} color="#43A047" />
          <Text style={styles.actionLabel}>Action Executed</Text>
        </View>
      )}
      <Text style={[
        styles.messageText,
        message.isBot ? styles.botMessageText : styles.userMessageText
      ]}>
        {message.text}
      </Text>
      <Text style={[
        styles.messageTime,
        message.isBot ? styles.botMessageTime : styles.userMessageTime
      ]}>
        {message.timestamp}
      </Text>
    </View>
  );

  return (
    <KeyboardAvoidingView 
      style={styles.container}
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
    >
      {/* Header */}
      <View style={styles.header}>
        <View style={styles.headerContent}>
          <Icon source="robot" size={28} color="#43A047" />
          <View style={styles.headerText}>
            <Text style={styles.headerTitle}>{t('aiHealthAssistant')}</Text>
            <Text style={styles.headerSubtitle}>{t('aiOnlineStatus')}</Text>
          </View>
        </View>
      </View>

      {/* Quick Actions */}
      <View style={styles.quickActionsContainer}>
        <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={styles.quickActions}>
          <QuickActionCard
            icon="heart-pulse"
            title={t('aiCheckSymptoms')}
            onPress={() => setMessage(t('aiSymptomPrompt'))}
          />
          <QuickActionCard
            icon="pill"
            title={t('aiMedicineInfo')}
            onPress={() => setMessage(t('aiMedicinePrompt'))}
          />
          <QuickActionCard
            icon="hospital-building"
            title={t('aiFindDoctors')}
            onPress={() => setMessage(t('aiDoctorPrompt'))}
          />
          <QuickActionCard
            icon="help-circle"
            title={t('aiHealthTips')}
            onPress={() => setMessage(t('aiTipsPrompt'))}
          />
        </ScrollView>
      </View>

      {/* Messages */}
      <ScrollView style={styles.messagesContainer} contentContainerStyle={styles.messagesContent}>
        {messages.map((msg) => (
          <MessageBubble key={msg.id} message={msg} />
        ))}
      </ScrollView>

      {/* Input */}
      <View style={styles.inputContainer}>
        {isRecording && (
          <View style={styles.recordingOverlay}>
            <View style={styles.recordingInfo}>
              <View style={styles.recordingWaves}>
                {[...Array(5)].map((_, i) => (
                  <Animated.View
                    key={i}
                    style={[
                      styles.wave,
                      {
                        opacity: waveAnim,
                        transform: [{
                          scaleY: waveAnim.interpolate({
                            inputRange: [0, 1],
                            outputRange: [0.3, 1.5 + Math.random() * 0.8],
                          })
                        }]
                      }
                    ]}
                  />
                ))}
              </View>
              <Text style={styles.recordingText}>
                🎤 Recording... {recordingDuration.toFixed(1)}s
              </Text>
              <Text style={styles.recordingHint}>
                Say a command like "Open my records"
              </Text>
            </View>
          </View>
        )}
        
        {isProcessing && (
          <View style={styles.processingOverlay}>
            <Icon source="loading" size={24} color="#43A047" />
            <Text style={styles.processingText}>Processing voice command...</Text>
          </View>
        )}

        <TextInput
          style={[styles.textInput, (isRecording || isProcessing) && styles.textInputDisabled]}
          value={message}
          onChangeText={setMessage}
          placeholder="Try: 'open my records' or 'मेरे रिकॉर्ड दिखाएं'"
          multiline
          maxLength={500}
          mode="outlined"
          outlineColor="#E2E8F0"
          activeOutlineColor="#43A047"
          editable={!isRecording && !isProcessing}
        />
        
        <Animated.View style={{ transform: [{ scale: pulseAnim }] }}>
          <Pressable
            style={[
              styles.voiceButton, 
              isRecording && styles.voiceButtonRecording,
              isProcessing && styles.voiceButtonProcessing
            ]}
            onPress={handleVoiceChat}
            disabled={isProcessing}
          >
            <Icon 
              source={isProcessing ? "loading" : isRecording ? "stop" : "microphone"} 
              size={20} 
              color="#FFFFFF" 
            />
          </Pressable>
        </Animated.View>
        
        <Button
          mode="contained"
          onPress={sendMessage}
          style={[styles.sendButton, (isRecording || isProcessing) && styles.sendButtonDisabled]}
          disabled={!message.trim() || isRecording || isProcessing}
        >
          <Icon source="send" size={20} color="#FFFFFF" />
        </Button>
      </View>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F2F5F7',
  },
  header: {
    backgroundColor: '#FFFFFF',
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#E2E8F0',
  },
  headerContent: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  headerText: {
    marginLeft: 12,
    flex: 1,
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#0A2540',
  },
  headerSubtitle: {
    fontSize: 13,
    color: '#43A047',
    marginTop: 2,
  },
  quickActionsContainer: {
    backgroundColor: '#F1F5F9'
  },
  quickActions: {
    paddingHorizontal: 16,
    paddingVertical: 12,
  },
  quickActionCard: {
    marginRight: 12,
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    minWidth: 120,
    borderWidth: 1,
    borderColor: '#E2E8F0',
  },
  quickActionContent: {
    alignItems: 'center',
    paddingVertical: 16,
    paddingHorizontal: 12,
  },
  quickActionTitle: {
    fontSize: 12,
    fontWeight: '500',
    color: '#0A2540',
    marginTop: 8,
    textAlign: 'center',
    lineHeight: 16,
  },
  messagesContainer: {
    flex: 1,
    paddingHorizontal: 16,
  },
  messagesContent: {
    paddingVertical: 8,
  },
  messageBubble: {
    maxWidth: '80%',
    marginVertical: 4,
    padding: 12,
    borderRadius: 16,
    borderWidth: 1, borderColor: '#E2E8F0'
  },
  botMessage: {
    alignSelf: 'flex-start',
    backgroundColor: '#FFFFFF',
    borderBottomLeftRadius: 4,
  },
  userMessage: {
    alignSelf: 'flex-end',
    backgroundColor: '#43A047',
    borderBottomRightRadius: 4,
  },
  actionMessage: {
    backgroundColor: '#F0FDF4',
    borderColor: '#43A047',
    borderWidth: 2,
  },
  messageText: {
    fontSize: 14,
    lineHeight: 20,
  },
  botMessageText: {
    color: '#0A2540',
  },
  userMessageText: {
    color: '#FFFFFF',
  },
  messageTime: {
    fontSize: 11,
    marginTop: 4,
  },
  botMessageTime: {
    color: '#6B7280',
  },
  userMessageTime: {
    color: '#E8F5E8',
  },
  voiceIndicator: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 4,
  },
  voiceLabel: {
    fontSize: 10,
    color: '#E8F5E8',
    marginLeft: 4,
    fontWeight: '500',
  },
  actionIndicator: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 4,
  },
  actionLabel: {
    fontSize: 10,
    color: '#43A047',
    marginLeft: 4,
    fontWeight: '600',
  },
  inputContainer: {
    flexDirection: 'row',
    padding: 16,
    backgroundColor: '#FFFFFF',
    alignItems: 'flex-end',
    gap: 8,
  },
  textInput: {
    flex: 1,
    backgroundColor: '#FFFFFF',
    maxHeight: 100,
  },
  voiceButton: {
    backgroundColor: '#FF6B6B',
    borderRadius: 25,
    width: 50,
    height: 50,
    justifyContent: 'center',
    alignItems: 'center',
  },
  voiceButtonRecording: {
    backgroundColor: '#FF4757',
    shadowColor: '#FF4757',
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0.6,
    shadowRadius: 10,
    elevation: 8,
  },
  voiceButtonProcessing: {
    backgroundColor: '#43A047',
  },
  sendButton: {
    backgroundColor: '#43A047',
    borderRadius: 25,
    width: 50,
    height: 50,
    justifyContent: 'center',
    alignItems: 'center',
  },
  sendButtonDisabled: {
    backgroundColor: '#94A3B8',
  },
  textInputDisabled: {
    opacity: 0.5,
  },
  // Recording overlay styles
  recordingOverlay: {
    position: 'absolute',
    top: -120,
    left: 0,
    right: 0,
    backgroundColor: 'rgba(255, 255, 255, 0.95)',
    borderRadius: 16,
    padding: 16,
    margin: 8,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 8,
    elevation: 8,
    zIndex: 1000,
  },
  recordingInfo: {
    alignItems: 'center',
  },
  recordingWaves: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 12,
    height: 40,
  },
  wave: {
    width: 4,
    backgroundColor: '#FF4757',
    marginHorizontal: 2,
    borderRadius: 2,
    minHeight: 8,
  },
  recordingText: {
    fontSize: 16,
    fontWeight: '600',
    color: '#FF4757',
    marginBottom: 4,
  },
  recordingHint: {
    fontSize: 12,
    color: '#6B7280',
    textAlign: 'center',
  },
  processingOverlay: {
    position: 'absolute',
    top: -60,
    left: 0,
    right: 0,
    backgroundColor: 'rgba(67, 160, 71, 0.95)',
    borderRadius: 12,
    padding: 12,
    margin: 8,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    zIndex: 1000,
  },
  processingText: {
    fontSize: 14,
    fontWeight: '500',
    color: '#FFFFFF',
    marginLeft: 8,
  },
});
