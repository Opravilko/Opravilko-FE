import { View, Text, StyleSheet, Image, ScrollView, ToastAndroid } from "react-native"
import CustomInput from "../components/CustomInput"
import IconProfile from "../assets/icons/IconProfile";
import IconLock from "../assets/icons/IconLock"
import CustomButton from "../components/CustomButton";
import { useState } from "react";

const LogInScreen = ({setUser}) => {
    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')

    const handleLogin = () => {
        // dev mode - always proceed to app
        setUser("user")
    }

    const handleRegister = () => {
        //TODO go to register screen
    }

    return (
        <ScrollView automaticallyAdjustKeyboardInsets={true}>
            <View style={styles.container}>
                <Image source={ require("../assets/temp_logo.png") } style={styles.logo} />
                <Text style={styles.title} >SIGN IN</Text>
                
                <CustomInput placeholder={"Username"} value={username} setValue={setUsername}>
                    <IconProfile width="25" height="25" stroke="black" />
                </CustomInput>
                <CustomInput secureTextEntry={true} placeholder={"Password"} value={password} setValue={setPassword}>
                    <IconLock width="25" height="25" stroke="black" />
                </CustomInput>
                <CustomButton title={<>
                    <Text>Don't have an account? </Text>
                    <Text style={{fontWeight: "bold", color: "#555" }}>Register Here</Text>
                </>} style={styles.register} textStyle={styles.registerText} onPress={() => handleRegister()}/>
                <CustomButton title={"LOGIN"} style={styles.login} textStyle={styles.loginText} onPress={() => handleLogin()}/>
            </View>
        </ScrollView>
    )
}

const styles = StyleSheet.create({
    container: {
      alignItems: "center",
      padding: 20,
      paddingTop: 130,
    },
    logo: {
        width: 170,
        height: 170,
        borderRadius: 100,
    },
    title: {
        fontSize: 25,
        fontWeight: "bold",
        marginTop: 90,
    },
    register: {
        backgroundColor: "transparent",
        //borderColor: "red",
        //borderWidth: 1,
        marginTop: -10,
    },
    registerText: {
        color: "#777",
        fontWeight: "normal",
        fontSize: 13,
    },
    login: {
        width: 280,
        marginTop: 30,
        paddingVertical: 15,
    },
    loginText: {
        fontSize: 20,
    },
  });

export default LogInScreen