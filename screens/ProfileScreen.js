import React, { useState } from 'react';
import { View, Text, TextInput, StyleSheet, Image, Button } from 'react-native';
import { getProfile } from '../api/user'
import { useQuery, useQueryClient } from 'react-query';

const ProfileScreen = () => {
  const queryClient = useQueryClient();
  const [name, setName] = useState('');
  const [nickname, setNickname] = useState('');
  const [avatarUrl, setAvatarUrl] = useState('https://thumbs.dreamstime.com/b/naughty-kid-21022824.jpg');
  
  const query = useQuery('profile', getProfile, {
    onSuccess: (data) => {
      setName(data[0].name)
      setNickname(data[0].address.city)
    }
  })

  return (
    <View style={styles.container}>
      <View style={styles.avatarContainer}>
        <Image source={{ uri: avatarUrl }} style={styles.avatar} />
        <Button title="Change Avatar" onPress={() => console.log('Change Avatar button pressed')} />
      </View>
      <Text style={styles.label}>Name:</Text>
      <Text style={styles.value}>{name}</Text>
      <Text style={styles.label}>Nickname:</Text>
      <Text style={styles.value}>{nickname}</Text>
      <Button title="Edit Profile" onPress={() => console.log('Edit Profile button pressed')} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
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
  label: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 5,
  },
  value: {
    fontSize: 16,
    marginBottom: 15,
  },
});

export default ProfileScreen;
