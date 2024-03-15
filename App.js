// App.js
import React, { useEffect, useState } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import HomeScreen from './screens/HomeScreen'; 
import ProfileScreen from './screens/ProfileScreen';
import MessagesScreen from './screens/MessagesScreen';
import PointScreen from './screens/PointScreen';
import LogInEditProfileScreen from './screens/Settings';
import Navbar from './components/Navbar';
import LogInScreen from './screens/LogInScreen';
import { QueryClient, QueryClientProvider } from "react-query";
import { useFonts } from 'expo-font';

const Tab = createBottomTabNavigator();
const queryClient = new QueryClient();

const App = () => {
    const [fontsLoaded] = useFonts({
        Rubik: require('./assets/fonts/Rubik-Regular.ttf'),
    });

    const [user, setUser] = useState('')

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
                <LogInScreen setUser={setUser}/>
            ) : (
                <Tab.Navigator tabBar={(props) => <Navbar {...props} />}>
                    <Tab.Screen name="Home" component={HomeScreen}/>
                    <Tab.Screen name="Profile" component={ProfileScreen} />
                    <Tab.Screen name="Messages" component={MessagesScreen} />
                    <Tab.Screen name="Points" component={PointScreen} />
                    <Tab.Screen name="Settings">
                        {(props) => <LogInEditProfileScreen {...props} setUser={setUser} />}
                    </Tab.Screen>
                </Tab.Navigator>
            )}
            
        </NavigationContainer>
        </QueryClientProvider>
    );
};

export default App;
