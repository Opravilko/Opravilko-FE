// App.js
import React, { useEffect, useState } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import HomeScreen from './screens/HomeScreen'; 
import ProfileScreen from './screens/ProfileScreen';
import MessagesScreen from './screens/MessagesScreen';
import PointScreen from './screens/PointScreen';
import LogInEditProfileScreen from './screens/SettingsScreen';
import Navbar from './components/Navbar';
import LogInScreen from './screens/LogInScreen';
import { QueryClient, QueryClientProvider } from "react-query";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useFonts } from 'expo-font';
import ChatScreen from './screens/ChatScreen';
import RegisterScreen from './screens/RegisterScreen';

const Tab = createBottomTabNavigator();
const Stack = createNativeStackNavigator();
const queryClient = new QueryClient();

const App = () => {
    const [fontsLoaded] = useFonts({
        Rubik: require('./assets/fonts/Rubik-Regular.ttf'),
    });

    const [user, setUser] = useState('')

    const getToken = async () => {
        try {
          const token = await AsyncStorage.getItem('token');
          console.log("token: " + token)
        } catch (e) {
          console.log("Failed to get token from storage: " + e)
          // error reading value
        }
      };

    useEffect(() => {
        // TODO
        // get cookie from device and check if session is still active
        // if not, go to login
        //setUser("test")
        console.log("goto login")
    }, [user])

    return (
        <QueryClientProvider client={queryClient}>
        <NavigationContainer>
            {user === '' ? (
                <Stack.Navigator>
                    <Stack.Screen name="LogIn">
                        {(props) => <LogInScreen {...props} setUser={setUser} />}
                    </Stack.Screen>
                    <Stack.Screen name="Register">
                        {(props) => <RegisterScreen {...props} setUser={setUser} />}
                    </Stack.Screen>
                </Stack.Navigator>
            ) : (
                <Tab.Navigator tabBar={(props) => <Navbar {...props} />}>
                    <Tab.Screen name="Activities" component={HomeScreen}/>
                    <Tab.Screen name="Profile" component={ProfileScreen} options={{ headerShown: false }}/>
                    <Tab.Screen name="Messages" component={MessagesScreen} options={{ headerShown: false }}/>
                    <Tab.Screen name="Points" component={PointScreen} />
                    <Tab.Screen name="Settings">
                        {(props) => <LogInEditProfileScreen {...props} setUser={setUser} />}
                    </Tab.Screen>
                    <Tab.Screen name="Chat" component={ChatScreen} options={{ headerShown: false }}/>
                </Tab.Navigator>
            )}
            
        </NavigationContainer>
        </QueryClientProvider>
    );
};

export default App;
