import { TouchableOpacity } from "react-native"
import { StyleSheet } from "react-native"
import { Text, View } from "react-native"
import accentColor from "../assets/colorSchema"

const CustomButton = ({onPress, title, style, children}) => {
    return(
        <TouchableOpacity onPress={onPress} style={[styles.button, style]}>
            {children ? (
                <View>{children}</View>
            ) : (
                <Text style={styles.text}>{title}</Text>
            )}
        </TouchableOpacity>
    )
}

const styles = StyleSheet.create({
    text: {
        color: "black",
        alignSelf: "center",
        color: "white",
        fontSize: 16,
        fontWeight: "bold",
        paddingVertical: 0,
        paddingHorizontal: 10,
    },
    button: {
        backgroundColor: accentColor,
        paddingVertical: 10,
        paddingHorizontal: 10,
        borderRadius: 7,
        marginTop: 10,
    },
})

export default CustomButton