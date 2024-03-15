import { View, Text, FlatList, TouchableOpacity } from "react-native"

export default function Contacts({ styles, handlePersonSelect, messagesData}) {
    return (
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
    )
}