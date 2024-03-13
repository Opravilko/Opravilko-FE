// components/Navbar.js
import React from 'react';
import { View, TouchableOpacity, Text, Image, StyleSheet } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { SvgXml } from 'react-native-svg';
import IconSettings from '../assets/icons/IconSettings';
import IconMessages from '../assets/icons/IconMessages';
import IconTasks from '../assets/icons/IconTasks';
import IconPoints from '../assets/icons/IconPoints';
import IconProfile from '../assets/icons/IconProfile';

// icon dimensions
const iconWidth = 32;
const iconHeight = 32;

const Navbar = () => {
  const navigation = useNavigation();

  return (
    <View style={{ flexDirection: 'row', justifyContent: 'space-around', paddingVertical: 10 }}>
        <TouchableOpacity onPress={() => navigation.navigate('Settings')}>
        <SvgXml
            width={iconWidth}
            height={iconHeight}
            xml={IconSettings}
            color={"#ff0000"}
        />
        </TouchableOpacity>
        <TouchableOpacity onPress={() => navigation.navigate('Messages')}>
        <SvgXml
            width={iconWidth}
            height={iconHeight}
            xml={IconMessages}
        />
        </TouchableOpacity>
        <TouchableOpacity onPress={() => navigation.navigate('Home')}>
        <SvgXml
            width={iconWidth}
            height={iconHeight}
            xml={IconTasks}
        />
        </TouchableOpacity>
        <TouchableOpacity onPress={() => navigation.navigate('Points')}>
        <SvgXml
            width={iconWidth}
            height={iconHeight}
            xml={IconPoints}
        />
        </TouchableOpacity>
        <TouchableOpacity onPress={() => navigation.navigate('Profile')}>
        <SvgXml
            width={iconWidth}
            height={iconHeight}
            xml={IconProfile}
        />
        </TouchableOpacity>
    </View>
  );
};

export default Navbar;
