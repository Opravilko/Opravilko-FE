// screens/MessagesScreen.js
import React, { useState } from 'react';
import Chat from '../components/messages/Chat';
import Contacts from '../components/messages/Contacts';
import { View, StyleSheet } from 'react-native';

const messagesData = [
  { id: 1, name: 'John Doe', message: 'Hello there!' },
  { id: 2, name: 'Jane Smith', message: 'How are you?' },
  { id: 3, name: 'Alice Johnson', message: 'Good morning!' },
  // Add more message data as needed
];

const MessagesScreen = () => {
  const [selectedPerson, setSelectedPerson] = useState(null);

  return (
    <View style={styles.container}>
      <Contacts styles={styles} onPersonSelect={setSelectedPerson} messagesData={messagesData} />
      <Chat styles={styles} selectedPerson={selectedPerson} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    padding: 10,
  },
  contactsColumn: {
    flex: 1,
    marginRight: 10,
  },
  header: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  contactName: {
    fontSize: 16,
    marginBottom: 20,
  },
  chatColumn: {
    flex: 2,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 5,
    padding: 10,
  },
  chatArea: {
    flex: 1,
  },
  noChatText: {
    textAlign: 'center',
    fontSize: 16,
    marginTop: 20,
  },
});

export default MessagesScreen;
