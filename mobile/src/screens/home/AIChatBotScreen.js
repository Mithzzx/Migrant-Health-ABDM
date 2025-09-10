import React, { useState } from 'react';
import { StyleSheet, View, ScrollView, KeyboardAvoidingView, Platform } from 'react-native';
import { Text, TextInput, Button, Card, Icon } from 'react-native-paper';
import { useI18n } from '../../i18n/i18n';

export default function AIChatBotScreen() {
  const { t } = useI18n();
  const [message, setMessage] = useState('');
  const [messages, setMessages] = useState([
    {
      id: 1,
      text: t('aiWelcomeMessage'),
      isBot: true,
      timestamp: new Date().toLocaleTimeString(),
    }
  ]);

  const sendMessage = () => {
    if (message.trim()) {
      const userMessage = {
        id: Date.now(),
        text: message,
        isBot: false,
        timestamp: new Date().toLocaleTimeString(),
      };

      setMessages(prev => [...prev, userMessage]);
      setMessage('');

      // Simulate bot response
      setTimeout(() => {
        const botResponse = {
          id: Date.now() + 1,
          text: t('aiThinkingResponse'),
          isBot: true,
          timestamp: new Date().toLocaleTimeString(),
        };
        setMessages(prev => [...prev, botResponse]);
      }, 1000);
    }
  };

  const QuickActionCard = ({ icon, title, onPress }) => (
    <Card style={styles.quickActionCard} onPress={onPress}>
      <Card.Content style={styles.quickActionContent}>
        <Icon source={icon} size={24} color="#43A047" />
        <Text style={styles.quickActionTitle}>{title}</Text>
      </Card.Content>
    </Card>
  );

  const MessageBubble = ({ message }) => (
    <View style={[
      styles.messageBubble,
      message.isBot ? styles.botMessage : styles.userMessage
    ]}>
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
      <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.quickActions}>
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

      {/* Messages */}
      <ScrollView style={styles.messagesContainer} contentContainerStyle={styles.messagesContent}>
        {messages.map((msg) => (
          <MessageBubble key={msg.id} message={msg} />
        ))}
      </ScrollView>

      {/* Input */}
      <View style={styles.inputContainer}>
        <TextInput
          style={styles.textInput}
          value={message}
          onChangeText={setMessage}
          placeholder={t('aiTypeMessage')}
          multiline
          maxLength={500}
          mode="outlined"
          outlineColor="#E2E8F0"
          activeOutlineColor="#43A047"
        />
        <Button
          mode="contained"
          onPress={sendMessage}
          style={styles.sendButton}
          disabled={!message.trim()}
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
  quickActions: {
    paddingHorizontal: 16,
    paddingVertical: 12,
    maxHeight: 100,
  },
  quickActionCard: {
    marginRight: 12,
    backgroundColor: '#FFFFFF',
    elevation: 1,
    borderRadius: 12,
    minWidth: 120,
  },
  quickActionContent: {
    alignItems: 'center',
    paddingVertical: 12,
    paddingHorizontal: 8,
  },
  quickActionTitle: {
    fontSize: 12,
    fontWeight: '500',
    color: '#0A2540',
    marginTop: 6,
    textAlign: 'center',
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
  sendButton: {
    backgroundColor: '#43A047',
    borderRadius: 25,
    width: 50,
    height: 50,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
