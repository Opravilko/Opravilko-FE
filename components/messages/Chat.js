import { View, Text } from "react-native";

export default function Chat({ styles, selectedPerson }) {
    return (
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
    )
}