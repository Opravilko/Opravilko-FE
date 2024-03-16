import React, { useEffect, useState } from 'react';
import { View, StyleSheet, Image, Modal, TouchableOpacity, FlatList } from 'react-native';
import { getProfile } from '../api/user'
import { useQuery, useQueryClient } from 'react-query';
import ColorSchema from '../assets/ColorSchema';
import IconEditUser from '../assets/icons/IconEditUser'
import CustomButton from '../components/CustomButton';
import { useNavigation } from '@react-navigation/native';
import CustomText from '../components/CustomText';

const ProfileScreen = () => {
    const queryClient = useQueryClient();
    const [name, setName] = useState('');
    const [nickname, setNickname] = useState('');
    const [avatarUrl, setAvatarUrl] = useState('');
    const [modalVisible, setModalVisible] = useState(false)
    const [completedActivities, setCompletedActivities] = useState([])

    const navigation = useNavigation();

    useEffect(() => {
        const fetchData = async () => {
            // mock data
            let data = [
                { id: 1, title: "I've been through the desert", date: "2024-03-15" },
                { id: 2, title: "On a horse with no name", date: "2024-03-19" },
                { id: 3, title: "It felt good to be out of the rain", date: "2024-03-20" },
                { id: 4, title: "In the desert", date: "2024-03-20" },
                { id: 5, title: "you can remember your name", date: "2024-03-21" },
                { id: 6, title: "'Caouse there ain't no one", date: "2024-03-21" },
                { id: 7, title: "for to give you no pain", date: "2024-03-21" },
                { id: 8, title: "La, la, la, la, la, la", date: "2024-03-22" },
                { id: 9, title: "After two days in the desert sun", date: "2024-03-15" },
                { id: 10, title: "My skin began to turn red", date: "2024-03-19" },
                { id: 11, title: "After three days in the desert fun", date: "2024-03-20" },
                { id: 12, title: "I was looking at a river bed", date: "2024-03-20" },
                { id: 13, title: "And the story it told", date: "2024-03-21" },
                { id: 14, title: " of a river that flowed'", date: "2024-03-21" },
                { id: 15, title: "Made me sad to think it was dead", date: "2024-03-21" },
            ]

            setCompletedActivities(data)
        }
        
        fetchData()
    }, [])
  
    const query = useQuery('profile', getProfile, {
        onSuccess: (data) => {
            setName(data[0].name)
            setNickname(data[0].address.city)
        }
    })

    const handleEditProfile = () => {
        navigation.navigate("Settings")
    }

    const handleClickScore = () => {
        setModalVisible(true)
    }

    // TODO transform the date into EU format (and display day of week, if the date is less than 1 week away)
    const completedActivityItem = ({ item }) => (
        <View style={styles.completedActivityItem}>
            <CustomText style={styles.activityDate}>{ item.date }</CustomText>
            <CustomText style={styles.activityTitle}>{ item.title }</CustomText>
        </View>
    )

    return (
        <View style={styles.container}>
            <Modal visible={modalVisible} transparent={true} animationType="fade">
                <View style={styles.modalContainer}>
                    <View style={styles.modalWindow}>
                        <CustomText style={styles.modalTitle}>Completed Activities</CustomText>
                        <FlatList
                            data={completedActivities}
                            renderItem={completedActivityItem}
                            style={{ width:"80%" }}
                        />
                        <CustomButton title={"Close"} onPress={() => setModalVisible(false)}
                        textStyle={{ fontSize: 20 }} />
                    </View>
                </View>
            </Modal>
            <View style={styles.backgroud}>
                <CustomButton style={{backgroundColor: "transparent"}} onPress={handleEditProfile}>
                    <IconEditUser width="40" height="40" stroke="white" />
                </CustomButton>
            </View>
            <View style={styles.contentContainer}>
                <View style={styles.content}>
                    <View style={styles.avatarContainer}>
                        <Image source={require("../assets/temp_logo.png")} style={styles.avatar} />
                    </View>
                    <CustomText style={styles.nickname}>{nickname}</CustomText>
                    <CustomText style={styles.name}>{name}</CustomText>
                    <CustomButton style={[{ backgroundColor: "transparent" },  styles.pointsContainer]} onPress={handleClickScore}>
                        <CustomText style={styles.pointsTitle}>Activities Completed</CustomText>
                        <CustomText style={styles.pointsValue}>{completedActivities.length}</CustomText>
                    </CustomButton>
                </View>
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        alignItems: 'center',
        backgroundColor: "#eee",
        flex: 1
    },
    backgroud: {
        backgroundColor: ColorSchema.accentColor,
        height: 250,
        width: "100%",
        paddingTop: 50,
        paddingRight: 10,
        alignItems: "flex-end",
    },
    contentContainer: {
        alignItems: 'center',
        backgroundColor: "#eee",
        width: "100%",
        borderRadius: 30,
        top: -30,
        height: "100%",
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 7,
        },
        shadowOpacity: 0.43,
        shadowRadius: 9.51,

        elevation: 15,
    },
    content: {
        alignItems: 'center',
        top: -81,
    },
    avatarContainer: {
        width: 162,
        height: 162,
        borderWidth: 6,
        borderRadius: 81,
        borderColor: "white",
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 12,
        },
        shadowOpacity: 0.58,
        shadowRadius: 16.00,

        elevation: 24,
        marginBottom: 30,
    },
    avatar: {
        width: 150,
        height: 150,
        borderRadius: 75,
    },
    nickname: {
        fontSize: 30,
        fontWeight: "bold",
        marginBottom: 5,
    },
    name: {
        fontSize: 18,
        marginBottom: 100,
        color: "#888",
    },
    pointsContainer: {
        backgroundColor: ColorSchema.accentColor2,
        borderRadius: 10,
        paddingVertical: 20,
        paddingHorizontal: 40,
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 7,
        },
        shadowOpacity: 0.43,
        shadowRadius: 9.51,

        elevation: 15,
    },
    pointsTitle: {
        color: "#ddd",
    },
    pointsValue: {
        color: "white",
        fontWeight: "bold",
        fontSize: 35,
        textAlign: "center",
    },
    modalContainer: {
        width: "100%",
        height: "100%",
        backgroundColor: "rgba(0,0,0,.3)",
        justifyContent: "center",
        alignItems: "center",
    },
    modalWindow: {
        alignItems: "center",
        backgroundColor: "white",
        width: "80%",
        height: "70%",
        paddingVertical: 30,
        paddingHorizontal: 10,
        borderRadius: 10,
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 7,
        },
        shadowOpacity: 0.43,
        shadowRadius: 9.51,

        elevation: 15,
    },
    modalTitle: {
        fontWeight: "bold",
        borderBottomWidth: 1,
        borderColor: "#ddd",
        paddingBottom: 5,
        marginBottom: 20,
    },
    completedActivityItem: {
        flexDirection: "column",
    },
    activityDate: {
        color: "#aaa",
        fontSize: 13,
        marginBottom: -8,
    },
    activityTitle: {
        fontSize: 18,
        marginBottom: 20,
    },
});

export default ProfileScreen;
