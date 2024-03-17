// SETTINGS
import React, { useState } from 'react';
import { View, TextInput, StyleSheet, Image, Button, ToastAndroid } from 'react-native';
import CustomButton from '../components/CustomButton';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { updateUser } from '../api/user';
import { useMutation, useQueryClient } from 'react-query';

const LogInEditProfileScreen = ({ user, setUser }) => {
    const queryClient = useQueryClient();
    const userMutation = useMutation({ mutationFn: updateUser });
    const [email, setEmail] = useState(user.email);
    const [nickname, setNickname] = useState(user.name);
    const [role, setRole] = useState(user.role);

    const handleSaveProfile = async () => {
        // Handle saving profile data to your backend or storage
        if (email === '' || nickname === '' || role === '') {
            ToastAndroid.show('Please fill all fields', ToastAndroid.SHORT);
            return;
        };

        let requestData = {
            oldUsername: user.name, 
            email: email,
            name: nickname,
            role: role,
            token: user.token,
        };

        userMutation.mutateAsync(requestData, {
            onSuccess: (res) => {
                if (res.status == 200) {
                    let newUser = {
                        email: email,
                        name: nickname,
                        role: role,
                        _id: user._id,
                        pass: user.pass,
                        token: user.token,
                    };
                    setUser(newUser);

                    AsyncStorage.setItem('user', JSON.stringify(newUser));

                    ToastAndroid.show("Profile saved", ToastAndroid.SHORT);
                }
                else {
                    ToastAndroid.show("Failed to save profile", ToastAndroid.SHORT);
                }
            },
            onError: (err) => {
                ToastAndroid.show("Failed to save profile", ToastAndroid.SHORT);
                console.log("Error on saving profile: " + err);
            }
        });

    };

    const handleLogout = async () => {
        setUser('')
        await AsyncStorage.removeItem('user');
        await AsyncStorage.removeItem('token');
    }

    return (
        <View style={styles.container}>
            <View style={styles.avatarContainer}>
                <Image source={{ uri: `https://robohash.org/${user.name}` }} style={styles.avatar} />
            </View>
            <TextInput
                placeholder="Nickname"
                value={nickname}
                onChangeText={setNickname}
                style={styles.input}
            />
            <TextInput
                placeholder="Email"
                value={email}
                onChangeText={setEmail}
                style={styles.input}
            />
            <TextInput
                placeholder="Role"
                value={role}
                onChangeText={setRole}
                style={styles.input}
            />
            <Button title="Save Profile" onPress={handleSaveProfile} />
            <CustomButton title={"LOGOUT"} onPress={() => handleLogout()} />
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        padding: 20,
    },
    avatarContainer: {
        marginBottom: 20,
    },
    avatar: {
        width: 150,
        height: 150,
        borderRadius: 75,
        marginBottom: 10,
    },
    input: {
        borderWidth: 1,
        borderColor: 'gray',
        borderRadius: 5,
        padding: 10,
        marginBottom: 10,
        width: '100%',
    },
});

export default LogInEditProfileScreen;
