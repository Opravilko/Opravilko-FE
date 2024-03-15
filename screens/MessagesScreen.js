// screens/MessagesScreen.js
import React, { useState, useEffect} from 'react';
import Chat from '../components/messages/Chat';
import Contacts from '../components/messages/Contacts';
import { View, StyleSheet, Button } from 'react-native';
import { useQuery, useQueryClient, useMutation} from 'react-query';
import { getMessagesWith, sendMessage } from '../api/messages';

const users = [
  { id: 1, name: 'John Doe'},
  { id: 2, name: 'Jane Smith'},
  { id: 3, name: 'Alice Johnson'},
  // Add more message data as needed
];

const MessagesScreen = () => {
  const queryClient = useQueryClient();
  const [messages, setMessages] = useState({});  
  const [selectedPerson, setSelectedPerson] = useState(null);
  
  const sendMessageMutation = useMutation({mutationFn: sendMessage});

  const handleSendMessage = () => {
    let message = "my message"
    sendMessageMutation.mutateAsync({ selectedPerson, message}, {
      onSuccess: (data) => {
        if(data.status == 201){
          console.log("Message sent successfully")
        }
      }
    })
  }

  const messagesWithQuery = useQuery('messages', () => getMessagesWith(selectedPerson), {
    onSuccess: (data) => {
      setMessages(data)
      console.log(messages)
    },
    refetchOnWindowFocus: false,
    enabled: false
  })


  useEffect(() => {
    if(selectedPerson != null){
      messagesWithQuery.refetch()
    }
  }, [selectedPerson])

  return (
    <View style={styles.container}>
      <Contacts styles={styles} onPersonSelect={setSelectedPerson} users={users} />
      <Chat styles={styles} messages={messages} />

      {/* <Button
        onPress={handleSendMessage}
        title="send msg"
        color="#841584"
      /> */}
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
