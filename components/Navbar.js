// components/Navbar.js
import React from 'react';
import { View, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { SvgXml } from 'react-native-svg';
import IconSettings from '../assets/icons/IconSettings';
import IconMessages from '../assets/icons/IconMessages';
import IconTasks from '../assets/icons/IconTasks';
import IconPoints from '../assets/icons/IconPoints';
import IconProfile from '../assets/icons/IconProfile';
import accentColor from '../assets/colorSchema';

// icon dimensions
const iconWidth = 32;
const iconHeight = 32;
// icon colors
const defaultColor = "#000000";
const activeColor = accentColor;

const Navbar = () => {
  const navigation = useNavigation();

  // get current screen/tab
  const currentScreen = navigation.getCurrentRoute()?.name || "Home"

  return (
    <View style={{ flexDirection: 'row', justifyContent: 'space-around', paddingVertical: 10 }}>
        <TouchableOpacity onPress={() => navigation.navigate('Settings')}>
            <IconSettings width={iconWidth} height={iconHeight} stroke={currentScreen == "Settings" ? activeColor : defaultColor}/>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => navigation.navigate('Messages')}>
            <IconMessages width={iconWidth} height={iconHeight} stroke={currentScreen == "Messages" ? activeColor : defaultColor}/>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => navigation.navigate('Home')}>
            <IconTasks width={iconWidth} height={iconHeight} stroke={currentScreen == "Home" ? activeColor : defaultColor}/>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => navigation.navigate('Points')}>
            <IconPoints width={iconWidth} height={iconHeight} stroke={currentScreen == "Points" ? activeColor : defaultColor}/>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => navigation.navigate('Profile')}>
            <IconProfile width={iconWidth} height={iconHeight} stroke={currentScreen == "Profile" ? activeColor : defaultColor}/>
        </TouchableOpacity>
    </View>
  );
};

export default Navbar;
