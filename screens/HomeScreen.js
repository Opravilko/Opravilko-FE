// screens/HomeScreen.js
import React, { useState } from 'react';
import { View, Text, Button, TextInput, Alert, ScrollView, ToastAndroid, StyleSheet, Modal } from 'react-native';
import { Calendar, LocaleConfig } from 'react-native-calendars';
import CustomButton from '../components/CustomButton'
import IconTrash from '../assets/icons/IconTrash';
import IconThumbsup from '../assets/icons/IconThumbsup';
import ColorSchema from '../assets/ColorSchema';
import CustomText from '../components/CustomText';
import IconPlus from '../assets/icons/IconPlus';


LocaleConfig.locales['en'] = {
    monthNames: ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'],
    monthNamesShort: ['Jan.', 'Feb.', 'Mar.', 'Apr.', 'May', 'Jun.', 'Jul.', 'Aug.', 'Sep.', 'Oct.', 'Nov.', 'Dec.'],
    dayNames: ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'],
    dayNamesShort: ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'],
};

LocaleConfig.defaultLocale = 'en';

const HomeScreen = () => {
    const todayDate = () => {
        const today = new Date();
        const year = today.getFullYear();
        let month = today.getMonth() + 1;
        let day = today.getDate();
        month = month < 10 ? '0' + month : month;
        day = day < 10 ? '0' + day : day;
        
        return `${year}-${month}-${day}`;
    };

    const todayDateDisplay = () => {
        const today = new Date();
        const year = today.getFullYear();
        let month = today.getMonth() + 1;
        let day = today.getDate();

        return `${day}. ${month}. ${year}`;
    }

    const [selectedDate, setSelectedDate] = useState(todayDate());
    const [selectedDateDisplay, setSelectedDateDisplay] = useState(todayDateDisplay());
    const [activity, setActivity] = useState('');
    const [activities, setActivities] = useState({});
    const [markedDates, setMarkedDates] = useState({})
    const [modalVisible, setModalVisible] = useState(false)

    const handleDateSelect = (date) => {
        const formattedDate = `${date.day}. ${date.month}. ${date.year}`;

        setSelectedDate(date.dateString);
        setSelectedDateDisplay(formattedDate);
        console.log(date)
    };

    const handleAddActivity = () => {
        if (!selectedDate || !activity) {
           Alert.alert('Error', 'Please select a date and enter an activity.');
           return;
        }

        const newActivities = { ...activities };

        if (!newActivities[selectedDate]) {
            newActivities[selectedDate] = [];
        }

        newActivities[selectedDate].push(activity);
        setActivities(newActivities);
        setActivity('');

        // add dot on calendar
        const newMarkedDates = { ...markedDates, [selectedDate]: { marked: true, dotColor: ColorSchema.accentColor }}
        setMarkedDates(newMarkedDates);
        setModalVisible(false)
    };

    const handleDeleteActivity = (date, index) => {
        const newActivities = { ...activities };
        newActivities[date].splice(index, 1);
        if (newActivities[date].length === 0) {
            delete newActivities[date];

            const newMarkedDates = { ...markedDates }
            delete newMarkedDates[date]
            setMarkedDates(newMarkedDates)
        }
        setActivities(newActivities);

        ToastAndroid.show("Activity deleted", ToastAndroid.SHORT)
    };

    const handleCompleteActivity = (date, index) => {
        const newActivities = { ...activities };
        newActivities[date].splice(index, 1);
        if (newActivities[date].length === 0) {
            delete newActivities[date];
            
            const newMarkedDates = { ...markedDates }
            delete newMarkedDates[date]
            setMarkedDates(newMarkedDates)
        }
        setActivities(newActivities);

        // TODO add points (API)

        ToastAndroid.show("🎉 Activity completed 🎉", ToastAndroid.SHORT)
    };

    // returns a number (0-6) representing the day of the week
    const getDayOfWeek = (dateString) => {
        const daysOfWeek = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
        const date = new Date(dateString);
        const dayIndex = date.getDay();
        
        return daysOfWeek[dayIndex];
    };

    return (
        <ScrollView automaticallyAdjustKeyboardInsets={true}>
            <Modal visible={modalVisible} transparent={true} animationType="fade">
                <View style={styles.modalContainer}>
                    <View style={styles.modalWindow}>
                        <CustomText style={styles.modalTitle}>Add an Activity</CustomText>
                        
                        <TextInput
                            placeholder="Take out the trash"
                            value={activity}
                            onChangeText={setActivity}
                            maxLength={30}
                            style={ styles.input }
                        />

                        <View style={ styles.buttonsContainer }>
                            <CustomButton title="Confirm" onPress={handleAddActivity}
                            textStyle={{ fontSize: 18 }} />

                            <CustomButton title={"Cancel"} onPress={() => setModalVisible(false)}
                            textStyle={{ fontSize: 18 }} />
                        </View>
                    </View>
                </View>
            </Modal>
            <View style={{ flex: 1, padding: 20, marginTop: 10 }}>
                <Calendar
                    onDayPress={handleDateSelect}
                    markedDates={{
                        ...markedDates,
                        [selectedDate]: { selected: true, marked: true, selectedColor: ColorSchema.accentColor },
                    }}
                    style={ styles.calendar }
                />
                <View style={styles.newActivityContainer}>
                    <CustomText style={ styles.activitiesTitle }>
                        {activities[selectedDate] && selectedDate === todayDate() ? (
                            "Activities for today"
                        ) : activities[selectedDate] ? (
                            "Activities on " + getDayOfWeek(selectedDate)
                        ) : selectedDate === todayDate() ? (
                            "No activities for today"
                        ) : (
                            "No activities on " + getDayOfWeek(selectedDate)
                        )}
                    </CustomText>
                    <CustomButton style={styles.newButton} onPress={() => setModalVisible(true)}>
                        <IconPlus width="35" height="35" stroke="white" />
                    </CustomButton>
                </View>
                
                
                {activities[selectedDate] && (
                    <ScrollView style={{ marginTop: 20 }}>
                    {activities[selectedDate].map((item, index) => (
                        <View key={index} style={{ flexDirection: 'row', alignItems: 'center', marginTop: 10, justifyContent: 'space-between' }}>
                            <Text>{item}</Text>
                            <View style={{ flexDirection: 'row' }}>
                                <CustomButton
                                    title="complete"
                                    onPress={() => handleCompleteActivity(selectedDate, index)}
                                    style={{ marginRight: 5, marginLeft: 5, backgroundColor: ColorSchema.accentColor }}
                                >
                                    <IconThumbsup width="25" height="25" stroke="white"/>
                                </CustomButton>
                                <CustomButton
                                    title="Delete"
                                    onPress={() => handleDeleteActivity(selectedDate, index)}
                                    style={{ backgroundColor: ColorSchema.accentColor2 }}
                                >
                                    <IconTrash width="25" height="25" stroke="white"/>
                                </CustomButton>
                            </View>
                        </View>
                    ))}
                    </ScrollView>
                )}
            </View>
        </ScrollView>
        
    );
};

const styles = StyleSheet.create({
    calendar: {
        borderRadius: 5,
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 4,
        },
        shadowOpacity: 0.43,
        shadowRadius: 9.51,

        elevation: 7,
    },
    newActivityContainer: {
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        marginTop: 30,
    },
    activitiesTitle: {
        color: "#555",
        marginTop: 0,
    },
    newButton: {
        backgroundColor: ColorSchema.accentColor2,
        marginTop: 0,
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 5,
        },
        shadowOpacity: 0.43,
        shadowRadius: 9.51,

        elevation: 9,
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
    input: {
        borderWidth: 1,
        borderColor: 'gray',
        padding: 10,
        marginTop: 10,
        borderRadius: 7, 
        backgroundColor: "white",
        width: "80%",
    },
    buttonsContainer: {
        marginTop: 30,
        flexDirection: "row",
        justifyContent: "space-between",
        width: "80%",
    },
})

export default HomeScreen;
