import React, { useState, useEffect } from 'react';
import { View, FlatList, StyleSheet, Image } from 'react-native';
import CustomText from '../components/CustomText';
import IconTrophy from '../assets/icons/IconTrophy'
import ColorSchema from '../assets/ColorSchema';

const PointScreen = () => {
    const [points, setPoints] = useState([]);

    useEffect(() => {
        // Simulating fetching points data from an API or database
        const fetchData = async () => {
            // Simulated data for demonstration purposes
            let data = [
                { id: 1, user: 'John Doe', points: 150 },
                { id: 4, user: 'Emily Brownnnnnnnnnnnn', points: 220 },
                { id: 2, user: 'Majk Majkovičkič', points: 200 },
                { id: 3, user: 'Mike Johnsonnnnn', points: 180 },
                { id: 5, user: 'Chris Davis', points: 190 },
            ];

            // Sort data by points from higher to lower
            data.sort((a, b) => b.points - a.points);

            if(data[0].user.length > 13){
                data[0].user = data[0].user.substring(0, 10) + "..."
            }

            for(let i = 1; i< data.length; i++){
                if(data[i].user.length > 15){
                    data[i].user = data[i].user.substring(0, 12) + "..."
                }
            }

            setPoints(data);
        };

        fetchData();
    }, []);

    const scoreItem = ({ item, index }) => (
        <View style={[styles.scoreItem, index === 0 && styles.firstScoreItem]}>
            
            { index === 0  ? (
                <IconTrophy width="50" height="50" stroke="black" fill="#ffcf40"/>
            ) : index === 1 ? (
                <IconTrophy width="30" height="30" stroke="black" fill="#c0c0c0"/>
            ) : index === 2 ? (
                <IconTrophy width="30" height="30" stroke="black" fill="#db8937"/>
            ) : (
                <CustomText style={styles.index}>{ index + 1 }</CustomText>
            )}
            
            <View style={[styles.userContainer, index === 0 && styles.firstUserContainer]}>
                <Image source={require("../assets/temp_logo.png")} style={[styles.avatar, index === 0 && styles.firstAvatar]}/>
                <CustomText style={[styles.username, index === 0 && styles.firstUsername]}>{ item.user }</CustomText>
            </View>
            <CustomText style={[styles.score, index === 0 && styles.firstScore]}>{ item.points }</CustomText>
        </View>
    )

    return (
        <View style={styles.container}>
            <FlatList
                data={points}
                renderItem={scoreItem}
                keyExtractor={(item) => item.id.toString()}
            />
        </View>
    );
};

const styles = StyleSheet.create({
    scoreItem: {
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        borderBottomWidth: 1,
        borderColor: "#ddd",
        borderRadius: 1,
        paddingVertical: 15,
        marginHorizontal: 20,
    },
    firstScoreItem: {
        backgroundColor: ColorSchema.accentColor,
        paddingVertical: 40,
        marginHorizontal: 0,
        paddingHorizontal: 20,
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 12,
        },
        shadowOpacity: 0.58,
        shadowRadius: 16.00,

        elevation: 24,
    },
    index: {
        backgroundColor: "#ddd",
        width: 30,
        height: 30,
        textAlign: "center",
        textAlignVertical: "center",
        borderRadius: 15,
        color: "#555",
        fontSize: 15,
    },
    userContainer: {
        flexDirection: "row",
        alignItems: "center",
        flex: 1,
        marginLeft: 50,
    },
    firstUserContainer: {
        marginLeft: 20,
    },
    avatar: {
        width: 50,
        height: 50,
        borderRadius: 25,
        marginRight: 15,
    },
    firstAvatar: {
        width: 70,
        height: 70,
        borderRadius: 35,
        marginRight: 15,
    },
    username: {
        fontSize: 18,
    },
    firstUsername: {
        fontSize: 22,
    },
    score: {
        fontSize: 20,
    },
    firstScore: {
        fontSize: 25,
        backgroundColor: "white",
        paddingHorizontal: 10,
        paddingVertical: 5,
        borderRadius: 10,
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 12,
        },
        shadowOpacity: 0.58,
        shadowRadius: 16.00,

        elevation: 24,
    },
});

export default PointScreen;
