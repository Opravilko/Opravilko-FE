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

    const [user, setUser] = useState({})

    // Just check if has already logged in before
    useEffect(() => {
        const checkUser = async () => {
            try {
                const user = await AsyncStorage.getItem('user');
                if (user !== null) {
                    setUser(user);
                }
            } catch (e) {
                console.log("Error on getting user: " + e);
            }
        }
        checkUser()
    }, [])

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
                        <Tab.Screen name="Activities">
                            {(props) => <HomeScreen {...props} user={user} />}
                        </Tab.Screen>
                        <Tab.Screen name="Profile" options={{ headerShown: false }}>
                            {(props) => <ProfileScreen {...props} user={user} />}
                        </Tab.Screen>
                        <Tab.Screen name="Messages" options={{ headerShown: false }} >
                            {(props) => <MessagesScreen {...props} user={user} />}
                        </Tab.Screen>
                        <Tab.Screen name="Points">
                            {(props) => <PointScreen {...props} user={user} />}
                        </Tab.Screen>
                        <Tab.Screen name="Settings">
                            {(props) => <LogInEditProfileScreen {...props} setUser={setUser} />}
                        </Tab.Screen>
                        <Tab.Screen name="Chat" options={{ headerShown: false }} >
                            {(props) => <ChatScreen {...props} user={user} />}
                        </Tab.Screen>
                    </Tab.Navigator>
                )}

            </NavigationContainer>
        </QueryClientProvider>
    );
};

export default App;
