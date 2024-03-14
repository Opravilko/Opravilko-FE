// screens/HomeScreen.js
import React, { useState } from 'react';
import { View, Text, Button, TextInput, Alert, ScrollView } from 'react-native';
import { Calendar, LocaleConfig } from 'react-native-calendars';
import accentColor from '../assets/colorSchema';
import CustomButton from '../components/CustomButton'
import IconTrash from '../assets/icons/IconTrash';
import IconThumbsup from '../assets/icons/IconThumbsup';


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

    const handleDateSelect = (date) => {
        const formattedDate = `${date.day}. ${date.month}. ${date.year}`;

        setSelectedDate(date.dateString);
        setSelectedDateDisplay(formattedDate);
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
    };

    const handleDeleteActivity = (date, index) => {
        const newActivities = { ...activities };
        newActivities[date].splice(index, 1);
        if (newActivities[date].length === 0) {
            delete newActivities[date];
        }
        setActivities(newActivities);
    };

    // returns a number (0-6) representing the day of the week
    const getDayOfWeek = (dateString) => {
        const daysOfWeek = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
        const date = new Date(dateString);
        const dayIndex = date.getDay();
        
        return daysOfWeek[dayIndex];
    };

    return (
        <View style={{ flex: 1, padding: 20, marginTop: 10 }}>
            <Calendar
                onDayPress={handleDateSelect}
                markedDates={{ [selectedDate]: { selected: true, marked: true, selectedColor: accentColor } }}
            />
            <Text style={{ marginTop: 20 }}>Selected Date: {selectedDateDisplay}</Text>
            <TextInput
                placeholder="Take out the trash"
                value={activity}
                onChangeText={setActivity}
                style={{ borderWidth: 1, borderColor: 'gray', padding: 10, marginTop: 10 }}
            />
            <CustomButton title="Add Activity" onPress={handleAddActivity}/>
            {activities[selectedDate] && (
                <ScrollView style={{ marginTop: 20 }}>
                <Text style={{ fontSize: 18, fontWeight: 'bold' }}>Activities for {getDayOfWeek(selectedDate)}:</Text>
                {activities[selectedDate].map((item, index) => (
                    <View key={index} style={{ flexDirection: 'row', alignItems: 'center', marginTop: 10 }}>
                        <Text>{item}</Text>
                        <CustomButton
                            title="complete"
                            //onPress={() => handleDeleteActivity(selectedDate, index)}
                            style={{ marginRight: 5, marginLeft: 5 }}
                        >
                            <IconThumbsup width="25" height="25" stroke="white"/>
                        </CustomButton>
                        <CustomButton
                            title="Delete"
                            onPress={() => handleDeleteActivity(selectedDate, index)}
                        >
                            <IconTrash width="25" height="25" stroke="white"/>
                        </CustomButton>
                    </View>
                ))}
                </ScrollView>
            )}
        </View>
    );
};

export default HomeScreen;
