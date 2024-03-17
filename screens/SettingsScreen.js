// SETTINGS
import React, { useState } from 'react';
import { View, TextInput, StyleSheet, Image, Button } from 'react-native';
import CustomButton from '../components/CustomButton';
import AsyncStorage from '@react-native-async-storage/async-storage';

const LogInEditProfileScreen = ({ user, setUser }) => {
    const [email, setEmail] = useState(user.email);
    const [nickname, setNickname] = useState(user.name);
    const [password, setPassword] = useState(user.pass);
    const [role, setRole] = useState(user.role);

    const handleSaveProfile = () => {
        // Handle saving profile data to your backend or storage
        console.log('Name:', name);
        console.log('Surname:', surname);
        console.log('Nickname:', nickname);
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
                placeholder="Password"
                value={password}
                onChangeText={setPassword}
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
