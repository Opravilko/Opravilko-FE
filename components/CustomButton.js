import { TouchableOpacity } from "react-native"
import { StyleSheet } from "react-native"
import { View } from "react-native"
import ColorSchema from "../assets/ColorSchema"
import CustomText from "./CustomText"

const CustomButton = ({onPress, title, style, textStyle, children}) => {
    return(
        <TouchableOpacity onPress={onPress} style={[styles.button, style]}>
            {children ? (
                <View>{children}</View>
            ) : (
                <CustomText style={[styles.text, textStyle]}>{title}</CustomText>
            )}
        </TouchableOpacity>
    )
}

const styles = StyleSheet.create({
    text: {
        alignSelf: "center",
        color: "white",
        fontSize: 16,
        fontWeight: "bold",
        paddingVertical: 0,
        paddingHorizontal: 10,
    },
    button: {
        backgroundColor: ColorSchema.accentColor,
        paddingVertical: 10,
        paddingHorizontal: 10,
        borderRadius: 7,
        marginTop: 10,
    },
})

export default CustomButton