// App.js
import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import HomeScreen from './screens/HomeScreen'; 
import ProfileScreen from './screens/ProfileScreen';
import MessagesScreen from './screens/MessagesScreen';
import PointScreen from './screens/PointScreen';
import LogInEditProfileScreen from './screens/LogInEditProfileScreen';
import Navbar from './components/Navbar';

const Tab = createBottomTabNavigator();

const App = () => {
  return (
    <NavigationContainer>
      <Tab.Navigator tabBar={(props) => <Navbar {...props} />}>
        <Tab.Screen name="Home" component={HomeScreen}/>
        <Tab.Screen name="Profile" component={ProfileScreen} />
        <Tab.Screen name="Messages" component={MessagesScreen} />
        <Tab.Screen name="Points" component={PointScreen} />
        <Tab.Screen name="Settings" component={LogInEditProfileScreen} />
      </Tab.Navigator>
    </NavigationContainer>
  );
};

export default App;
