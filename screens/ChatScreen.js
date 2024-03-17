import { useIsFocused, useNavigation } from "@react-navigation/native";
import CustomText from "../components/CustomText";
import { BackHandler, FlatList, StyleSheet, TextInput, View } from "react-native";
import CustomButton from "../components/CustomButton";
import ColorSchema from "../assets/ColorSchema";
import IconBackArrow from "../assets/icons/IconBackArrow"
import CustomInput from "../components/CustomInput";
import IconSend from "../assets/icons/IconSend"
import { createRef, useEffect, useRef, useState } from "react";
import { useQuery, useQueryClient, useMutation} from 'react-query';
import { getMessagesWith, sendMessage } from "../api/messages";
import { getUsername } from "../api/storageHelper";

const users = [
    { id: 1, username: "john", name: 'John Doe', messages: [{username: "me", time: "16:35", message: "Hey, good to see you again"}, {username: "john", time: "16:37", message: "How's it going?"}] },
    { id: 2, username: "jane", name: 'Jane Smith', messages: [{username: "jane", time: "12:12", message: "So you know how my car makes that noise?"}, {username: "me", time: "12:15", message: "Yeah?"}, {username: "jane", time: "12:16", message: "Well I finally got it fixed"}, {username: "jane", time: "12:17", message: "Cost me an arm and a leg though :/"}, {username: "me", time: "13:10", message: "Good to hear"}, {username: "me", time: "13:12", message: "What caused it?"}, {username: "jane", time: "13:25", message: "I think the mechanic said it was the serpentine belt or something like that"}, {username: "me", time: "13:30", message: "That doesn't fail by itself, something had to cause it to fall off or tear"}, {username: "me", time: "13:31", message: "Did the mechanic say anything about that?"},]},
    { id: 3, username: "alice", name: 'Alice Johnson', messages: [{username: "alice", time: "9:15", message: "The reason I'm contacting you today is to ask about your car insurance"}] },
]

const ChatScreen = ({ route }) => {
    const queryClient = useQueryClient();
    const [message, setMessage] = useState('');
    const [messages, setMessages] = useState([])
    const navigation = useNavigation()
    const contactUsername = route.params.contact
    let flatlistRef = createRef()
    const [username, setUsername] = useState(null)
    
    // const contact = users.find(user => user.username === contactUsername)

    const sendMessageMutation = useMutation({mutationFn: sendMessage});
    const getMessagesWithMutation = useMutation({mutationFn: getMessagesWith});

    getUsername().then(username => {
        setUsername(username)
      });

    useEffect(() => {
        setMessages([])
        getMessagesWithMutation.mutateAsync({ contactUsername }, {
            onSuccess: (data) => {
                console.log("Got messages")
                setMessages(data.data.sort((a, b) => new Date(a.created_at) - new Date(b.created_at)))
            },
            onError: (err) => {
                console.log("Failed to get messages: "+err)
            }
        })
        const backAction = () => {
            navigation.navigate("Messages")

            return true
        }

        const backHandler = BackHandler.addEventListener(
            'hardwareBackPress',
            backAction,
        )

        return () => backHandler.remove()
    }, [message, useIsFocused()])

    const handleBackButton = () => {
        navigation.navigate("Messages")
        setMessages(null)
    }

    const handleSendMessage = () => {
        // contact.messages.push({username: "me", time: "12:00", message: message})
        sendMessageMutation.mutateAsync({ contactUsername, message }, {
            onSuccess: (data) => {
                if(data.status == 201){
                    console.log("Message sent successfully")
                } else {
                    console.log("Mission failed successfully: "+data.data)
                }
            },
            onError: (err) => {
                console.log("Failed to send message: " + err)
            }
        })

        setMessage("")
    }

    const messageItem = ({ item }) => (
        <>
            { item.user === username ? (
                <View style={[styles.message, styles.myMessage]}>
                    <CustomText style={[styles.messageContent, styles.myMessageContent]}>{ item.message }</CustomText>
                    <CustomText style={styles.messageTime}>{ item.time }</CustomText>
                </View>
            ) : (
                <View style={styles.message}>
                    <CustomText style={styles.messageContent}>{ item.message }</CustomText>
                    <CustomText style={styles.messageTime}>{ item.time }</CustomText>
                </View>
            )}
        </>
    )

    return (
        <View style={styles.container}>
            <View style={styles.background}>
                <CustomButton style={ styles.backContainer } onPress={handleBackButton}>
                    <IconBackArrow width={50} height={50} stroke={"white"}/>
                </CustomButton>
                <CustomText style={styles.header}>{ contactUsername }</CustomText>
            </View>
            <View style={styles.messagesContainer}>
                <FlatList
                    ref={ref => {this.flatListRef = ref}}
                    onContentSizeChange={() => this.flatListRef.scrollToEnd()}
                    data={messages}
                    renderItem={messageItem}
                />
            </View>
            <View style={styles.composeContainer}>
                <TextInput
                    style={styles.compose}
                    placeholder={"Type a message"}
                    value={message}
                    onChangeText={setMessage}
                    maxLength={100}
                />
                <CustomButton onPress={handleSendMessage} style={{ backgroundColor: "transparent", paddingHorizontal: 0, paddingVertical: 0, marginLeft: 30, marginTop: 0 }}>
                    <IconSend width={35} height={35} stroke={"#eee"} fill={ColorSchema.accentColor}/>
                </CustomButton>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: 'column',
    },
    background: {
        backgroundColor: ColorSchema.accentColor2,
        height: 150,
        width: "100%",
        paddingHorizontal: 30,
        paddingVertical: 40,
        borderBottomRightRadius: 30,
        borderBottomLeftRadius: 30,
        flexDirection: "row",
        justifyContent: "center",
        alignItems: "center",
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 7,
        },
        shadowOpacity: 0.43,
        shadowRadius: 9.51,

        elevation: 15,
    },
    header: {
        color: "white",
        fontSize: 30,
        fontWeight: "bold",
        paddingTop: 30,
    },
    backContainer: {
        backgroundColor: "transparent",
        paddingHorizontal: 0,
        paddingVertical: 0,
        position: "absolute",
        left: 0,
        marginLeft: 20,
        paddingTop: 30,
    },
    messagesContainer: {
        flex: 1,
    },
    message: {
        marginHorizontal: 20,
        marginVertical: 10,
        flexDirection: "row",
        alignItems: "center"
    },
    myMessage: {
        flexDirection: "row-reverse",
    },
    messageContent: {
        backgroundColor: "#ddd",
        borderRadius: 20,
        paddingHorizontal: 20,
        paddingVertical: 10,
        fontSize: 16,
        maxWidth: "70%",
    },
    myMessageContent: {
        backgroundColor: ColorSchema.accentColor,
        color: "white",
    },
    messageTime: {
        fontSize: 13,
        color: "#999",
        marginHorizontal: 10,
    },
    composeContainer: {
        flexDirection: "row",
        backgroundColor: "#eee",
        paddingVertical: 10,
        paddingHorizontal: 20,
        borderTopWidth: 1,
        borderColor: "#ddd",
        justifyContent: "center",
        alignItems: "center",
    },
    compose: {
        borderWidth: 1,
        borderColor: 'gray',
        padding: 10,
        borderRadius: 7, 
        backgroundColor: "#fff",
        width: "75%",
    },
})

export default ChatScreen