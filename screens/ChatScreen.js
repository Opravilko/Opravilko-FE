import { useNavigation } from "@react-navigation/native";
import CustomText from "../components/CustomText";
import { FlatList, StyleSheet, TextInput, View } from "react-native";
import CustomButton from "../components/CustomButton";
import ColorSchema from "../assets/ColorSchema";
import IconBackArrow from "../assets/icons/IconBackArrow"
import CustomInput from "../components/CustomInput";
import IconSend from "../assets/icons/IconSend"
import { useState } from "react";

const users = [
    { id: 1, username: "john", name: 'John Doe', messages: [{username: "me", time: "16:35", message: "Hey, good to see you again"}, {username: "john", time: "16:37", message: "How's it going?"}] },
    { id: 2, username: "jane", name: 'Jane Smith', messages: [{username: "jane", time: "12:12", message: "So you know how my car makes that noise?"}, {username: "me", time: "12:15", message: "Yeah?"}, {username: "jane", time: "12:16", message: "Well I finally got it fixed"}, {username: "jane", time: "12:17", message: "Cost me an arm and a leg though :/"}, {username: "me", time: "13:10", message: "Good to hear"}, {username: "me", time: "13:12", message: "What caused it?"}, {username: "jane", time: "13:25", message: "I think the mechanic said it was the serpentine belt or something like that"}, {username: "me", time: "13:30", message: "That doesn't fail by itself, something had to cause it to fall off or tear"}, {username: "me", time: "13:31", message: "Did the mechanic say anything about that?"},]},
    { id: 3, username: "alice", name: 'Alice Johnson', messages: [{username: "alice", time: "9:15", message: "The reason I'm contacting you today is to ask about your car insurance"}] },
]

const ChatScreen = ({ route }) => {
    const [message, setMessage] = useState('');
    const navigation = useNavigation()
    const contactUsername = route.params.contact
    
    const contact = users.find(user => user.username === contactUsername)

    const handleBackButton = () => {
        navigation.navigate("Messages")
    }

    const handleSendMessage = () => {
        contact.messages.push({username: "me", time: "12:00", message: message})
        setMessage("")
    }

    const messageItem = ({ item }) => (
        <>
            { item.username === "me" ? (
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
                <CustomText style={styles.header}>{ contact.name }</CustomText>
            </View>
            <View style={styles.messagesContainer}>
                <FlatList 
                    data={contact.messages}
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