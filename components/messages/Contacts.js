import { View, Text, FlatList, TouchableOpacity } from "react-native"

export default function Contacts({ styles, onPersonSelect, users}) {
    return (
        <View style={styles.contactsColumn}>
            <Text style={styles.header}>Contacts</Text>
            <FlatList
                data={users}
                keyExtractor={(item) => item.id.toString()}
                renderItem={({ item }) => (
                    <TouchableOpacity onPress={() => onPersonSelect(item.name)}>
                        <Text style={styles.contactName}>{item.name}</Text>
                    </TouchableOpacity>
                )}
            />
        </View>
    )
}