// components/Navbar.js
import React from 'react';
import { View, TouchableOpacity, Text } from 'react-native';
import { useNavigation } from '@react-navigation/native';

const Navbar = () => {
  const navigation = useNavigation();

  return (
    <View style={{ flexDirection: 'row', justifyContent: 'space-around', paddingVertical: 25 }}>
      <TouchableOpacity onPress={() => navigation.navigate('Home')}>
        <Text>Home</Text>
      </TouchableOpacity>
      <TouchableOpacity onPress={() => navigation.navigate('Profile')}>
        <Text>Profile</Text>
      </TouchableOpacity>
      <TouchableOpacity onPress={() => navigation.navigate('Messages')}>
        <Text>Messages</Text>
      </TouchableOpacity>
      <TouchableOpacity onPress={() => navigation.navigate('Points')}>
        <Text>Points</Text>
      </TouchableOpacity>
      <TouchableOpacity onPress={() => navigation.navigate('LogIn/Edit Profile')}>
        <Text>LogIn/Edit Profile</Text>
      </TouchableOpacity>
    </View>
  );
};

export default Navbar;
