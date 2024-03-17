import { View, Text, StyleSheet, Image, ScrollView, ToastAndroid } from "react-native"
import CustomInput from "../components/CustomInput"
import IconProfile from "../assets/icons/IconProfile";
import IconLock from "../assets/icons/IconLock";
import IconEditUser from "../assets/icons/IconEditUser";
import IconMessages from "../assets/icons/IconMessages";
import CustomButton from "../components/CustomButton";
import { useState } from "react";
import { useMutation, useQueryClient } from 'react-query';
import { register, login } from "../api/auth";
import AsyncStorage from "@react-native-async-storage/async-storage";

export default function RegisterScreen ({navigation, setUser}) {
    const queryClient = useQueryClient();
    const registerMutation = useMutation({mutationFn: register})
    const loginMutation = useMutation({mutationFn: login})
    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')
    const [email, setEmail] = useState('')
    const [role, setRole] = useState('')


    const storeToken = async(token) => {
        try {
            await AsyncStorage.setItem('token', token);
        } catch (e) {
            console.log("Failed to store token: " + e)
        }
    }

    const storeUser = async(user) => {
        try {
            await AsyncStorage.setItem
            ('user', JSON.stringify(user));
        } catch (e) {
            console.log("Failed to store user: " + e)
        }
    }

    const handleLogin = () => {
        navigation.navigate("LogIn")
    }

    const handleRegister = () => {
        registerMutation.mutateAsync({ username, password, email, role }, {
            onSuccess: (res) => {
                if(res.status == 201){
                    console.log("Registered");
                    loginUserAfterRegister()
                } else {
                    ToastAndroid.show("Registration failed, please try again", ToastAndroid.SHORT)
                }
            },
            onError: (err) => {
                ToastAndroid.show("Registration failed, please try again", ToastAndroid.SHORT)
                console.log("Error on register: " + err);
            }
        })
    }

    const loginUserAfterRegister = () => {
        loginMutation.mutateAsync({ username, password }, {
            onSuccess: (res) => {
                if(res.status == 200){
                    storeToken(res.data.token)
                    let userWithToken = {...res.data.user, token: res.data.token}
                    storeUser(userWithToken)
                    setUser(userWithToken)
                }
                else {
                    ToastAndroid.show("Login failed, please try again", ToastAndroid.SHORT)
                }
            },
            onError: (err) => {
                ToastAndroid.show("Login failed, please try again", ToastAndroid.SHORT)
                console.log("Error on login: " + err);
            }
        })
    }

    return (
        <ScrollView automaticallyAdjustKeyboardInsets={true}>
            <View style={styles.container}>
                <Image source={ require("../assets/logo.png") } style={styles.logo} />
                <Text style={styles.title} >REGISTER</Text>
                
                <CustomInput placeholder={"Username"} value={username} setValue={setUsername}>
                    <IconProfile width="25" height="25" stroke="black" />
                </CustomInput>
                <CustomInput placeholder={"Email"} value={email} setValue={setEmail}>
                    <IconMessages width="25" height="25" stroke="black" />
                </CustomInput>
                <CustomInput secureTextEntry={true} placeholder={"Password"} value={password} setValue={setPassword}>
                    <IconLock width="25" height="25" stroke="black" />
                </CustomInput>
                <CustomInput placeholder={"Role"} value={role} setValue={setRole}>
                    <IconEditUser width="25" height="25" stroke="black" />
                </CustomInput>
                <CustomButton title={<>
                    <Text>Already have an account? </Text>
                    <Text style={{fontWeight: "bold", color: "#555" }}>Login</Text>
                </>} style={styles.register} textStyle={styles.registerText} onPress={handleLogin}/>
                <CustomButton title={"REGISTER"} style={styles.login} textStyle={styles.loginText} onPress={handleRegister}/>

            </View>
        </ScrollView>
    )
}

const styles = StyleSheet.create({
    container: {
      alignItems: "center",
      padding: 20,
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