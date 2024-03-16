// screens/MessagesScreen.js
import React, { useState, useEffect} from 'react';
import Chat from '../components/messages/Chat';
import Contacts from '../components/messages/Contacts';
import { View, StyleSheet, Button, FlatList, Image } from 'react-native';
import { useQuery, useQueryClient, useMutation} from 'react-query';
import { getMessagesWith, sendMessage } from '../api/messages';
import CustomButton from '../components/CustomButton';
import { useNavigation } from '@react-navigation/native';
import ColorSchema from '../assets/ColorSchema';
import CustomText from '../components/CustomText';

const users = [
    { id: 1, username: "john", name: 'John Doe', lastMessage: "How's it going?" },
    { id: 2, username: "jane", name: 'Jane Smith', lastMessage: "Did the mechanic say anything about that?"},
    { id: 3, username: "alice", name: 'Alice Johnson', lastMessage: "The reason I'm contacting you today is to ask about your car insurance" },
    // Add more message data as needed
];

const MessagesScreen = () => {
    const queryClient = useQueryClient();
    const [messages, setMessages] = useState({});  
    const [selectedPerson, setSelectedPerson] = useState(null);
    
    const sendMessageMutation = useMutation({mutationFn: sendMessage});
    const navigation = useNavigation();

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

    const openChat = (contact) => {
        navigation.navigate("Chat", { contact })
    }

    useEffect(() => {
        if(selectedPerson != null){
            messagesWithQuery.refetch()
        }
    }, [selectedPerson])

    /*return (
        <View style={styles.container}>
        <Contacts styles={styles} onPersonSelect={setSelectedPerson} users={users} />
        <Chat styles={styles} messages={messages} />

        { <Button
            onPress={handleSendMessage}
            title="send msg"
            color="#841584"
        /> }
        </View>
    )*/

    const contactItem = ({ item }) => (
        <CustomButton onPress={() => openChat(item.username)} style={styles.contactItem}>
            <View style={styles.contactItemInner}>
                <Image source={require("../assets/temp_logo.png")} style={styles.avatar}/>
                <View>
                    <CustomText style={styles.contactName}>{ item.name }</CustomText>
                    <CustomText style={styles.contactMessage}>
                        { item.lastMessage.length > 30 ? (
                            item.lastMessage.substring(0, 27) + "..."
                        ) : (
                            item.lastMessage
                        ) }
                    </CustomText>
                </View>
            </View>
        </CustomButton>
    )

    return (
        <View style={styles.container}>
            <View style={styles.background}>
                <CustomText style={styles.header}>Messages</CustomText>
            </View>
            { users && users.length > 0 ? (
                <FlatList 
                    data={users}
                    renderItem={contactItem}
                />
            ) : (
                <CustomText style={styles.noContacts}>No bitches? 🤨</CustomText>
            ) }
        </View>
    )

};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: 'column',
    },
    background: {
        backgroundColor: ColorSchema.accentColor,
        height: 180,
        width: "100%",
        paddingHorizontal: 30,
        paddingVertical: 40,
        borderBottomRightRadius: 30,
        borderBottomLeftRadius: 30,
        justifyContent: "flex-end",
    },
    header: {
        color: "white",
        fontSize: 35,
        fontWeight: "bold",
    },
    contactItem: {
        backgroundColor: "white",
        borderRadius: 0,
    },
    contactItemInner: {
        flexDirection: "row",
        paddingVertical: 10,
    },
    avatar: {
        width: 60,
        height: 60,
        borderRadius: 30,
        marginHorizontal: 20,
    },
    contactName: {
        fontSize: 20,
    },
    contactMessage: {
        color: "#999",
        fontSize: 16,
    },
    noContacts: {
        fontSize: 25,
        textAlign: "center",
        paddingVertical: 50,
    }
});

export default MessagesScreen;
