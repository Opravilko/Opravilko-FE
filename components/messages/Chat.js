import { View, Text, FlatList } from "react-native";

export default function Chat({ styles, messages }) {
    console.log(messages)
    return (
        <View style={styles.chatColumn}>
            <Text style={styles.header}>Chat</Text>
            {messages && messages.length > 0 ? (
                messages.map((item, i) => {
                    return (
                        <View style={styles.chatArea} key={i}>
                            <Text>{item.user}</Text>
                            <Text>{item.message}</Text>
                        </View>
                    )
                })

            ) : (
                <Text style={styles.noChatText}>Select a person to start chatting</Text>
            )}
        </View>
    )
}