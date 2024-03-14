import React, { useState } from 'react';
import { View, Text, TextInput, StyleSheet, Image, Button } from 'react-native';
import { getProfile } from '../api/profile';
import { useQuery, useQueryClient } from 'react-query';

const ProfileScreen = () => {
  const queryClient = useQueryClient();
  const query = useQuery({ queryKey: ['profile'], queryFn: getProfile })
  
  const [name, setName] = useState(query.data[0].name);
  const [nickname, setNickname] = useState(query.data[0].address.city);
  const [avatarUrl, setAvatarUrl] = useState('https://thumbs.dreamstime.com/b/naughty-kid-21022824.jpg');

  return (
    <View style={styles.container}>
        <View style={styles.avatarContainer}>
            <Image source={require("../assets/temp_logo.png")} style={styles.avatar} />
            <Button title="Change Avatar" onPress={() => console.log('Change Avatar button pressed')} />
        </View>
        <Text style={styles.label}>Name:</Text>
        <Text style={styles.value}>{name}</Text>
        <Text style={styles.label}>Surname:</Text>
        <Text style={styles.value}>{surname}</Text>
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
