// screens/MessagesScreen.js
import React, { useState } from 'react';
import { View, Text, StyleSheet, FlatList, TouchableOpacity } from 'react-native';

const messagesData = [
  { id: 1, name: 'John Doe', message: 'Hello there!' },
  { id: 2, name: 'Jane Smith', message: 'How are you?' },
  { id: 3, name: 'Alice Johnson', message: 'Good morning!' },
  // Add more message data as needed
];

const MessagesScreen = () => {
  const [selectedPerson, setSelectedPerson] = useState(null);

  const handlePersonSelect = (person) => {
    setSelectedPerson(person);
  };

  return (
    <View style={styles.container}>
      <View style={styles.contactsColumn}>
        <Text style={styles.header}>Contacts</Text>
        <FlatList
          data={messagesData}
          keyExtractor={(item) => item.id.toString()}
          renderItem={({ item }) => (
            <TouchableOpacity onPress={() => handlePersonSelect(item)}>
              <Text style={styles.contactName}>{item.name}</Text>
            </TouchableOpacity>
          )}
        />
      </View>
      <View style={styles.chatColumn}>
        <Text style={styles.header}>Chat</Text>
        {selectedPerson ? (
          <View style={styles.chatArea}>
            <Text>{selectedPerson.name}</Text>
            <Text>{selectedPerson.message}</Text>
            {/* Add more chat messages and input field as needed */}
          </View>
        ) : (
          <Text style={styles.noChatText}>Select a person to start chatting</Text>
        )}
      </View>
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
