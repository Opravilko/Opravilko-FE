// screens/LogInEditProfileScreen.js
import React, { useState } from 'react';
import { View, Text, TextInput, StyleSheet, Image, Button } from 'react-native';

const LogInEditProfileScreen = () => {
  const [name, setName] = useState('');
  const [surname, setSurname] = useState('');
  const [nickname, setNickname] = useState('');
  const [avatarUrl, setAvatarUrl] = useState('');

  const handleSaveProfile = () => {
    // Handle saving profile data to your backend or storage
    console.log('Name:', name);
    console.log('Surname:', surname);
    console.log('Nickname:', nickname);
    console.log('Avatar URL:', avatarUrl);
  };

  return (
    <View style={styles.container}>
      <View style={styles.avatarContainer}>
        <Image source={{ uri: avatarUrl }} style={styles.avatar} />
        <Button title="Change Avatar" onPress={() => console.log('Change Avatar button pressed')} />
      </View>
      <TextInput
        placeholder="Name"
        value={name}
        onChangeText={setName}
        style={styles.input}
      />
      <TextInput
        placeholder="Surname"
        value={surname}
        onChangeText={setSurname}
        style={styles.input}
      />
      <TextInput
        placeholder="Nickname"
        value={nickname}
        onChangeText={setNickname}
        style={styles.input}
      />
      <Button title="Save Profile" onPress={handleSaveProfile} />
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
