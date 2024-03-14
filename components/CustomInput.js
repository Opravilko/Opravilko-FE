import { StyleSheet, TextInput, View } from "react-native"

const CustomInput = ({value, setValue, placeholder, secureTextEntry, children}) => {
    return(
        <View style={styles.container}>
            <View style={styles.icon} >{children}</View>
            <TextInput value={value} onChangeText={setValue} placeholder={placeholder} secureTextEntry={secureTextEntry} style={styles.input} maxLength={25} />
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        borderBottomWidth: 1,
        width: "75%",
        margin: 10,
        marginTop: 30,
        flexDirection: "row",
        alignItems: "center",
        //borderColor: "black",
        //borderWidth: 1
    },
    icon: {
        marginLeft: 10,
    },
    input: {
        //borderColor: "red",
        //borderWidth: 1,
        fontSize: 18,
        padding: 10,
        paddingBottom: 2,
        width: "100%",
        paddingTop: 0,
    },

})

export default CustomInput