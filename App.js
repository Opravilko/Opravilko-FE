import React, { useState } from 'react';
import { View, Text, Button, TextInput, Alert } from 'react-native';
import { Calendar, LocaleConfig } from 'react-native-calendars';

LocaleConfig.locales['en'] = {
  monthNames: ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'],
  monthNamesShort: ['Jan.', 'Feb.', 'Mar.', 'Apr.', 'May', 'Jun.', 'Jul.', 'Aug.', 'Sep.', 'Oct.', 'Nov.', 'Dec.'],
  dayNames: ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'],
  dayNamesShort: ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'],
};

LocaleConfig.defaultLocale = 'en';

const CalendarScreen = () => {
  const [selectedDate, setSelectedDate] = useState('');
  const [activity, setActivity] = useState('');
  const [activities, setActivities] = useState({});

  const handleDateSelect = (date) => {
    setSelectedDate(date.dateString);
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

  return (
    <View style={{ flex: 1, padding: 20, marginTop: 50 }}>
      <Calendar
        onDayPress={handleDateSelect}
        markedDates={{ [selectedDate]: { selected: true, marked: true, selectedColor: 'blue' } }}
      />
      <Text style={{ marginTop: 20 }}>Selected Date: {selectedDate}</Text>
      <TextInput
        placeholder="Enter activity"
        value={activity}
        onChangeText={setActivity}
        style={{ borderWidth: 1, borderColor: 'gray', padding: 10, marginTop: 10 }}
      />
      <Button title="Add Activity" onPress={handleAddActivity} />
      {activities[selectedDate] && (
        <View style={{ marginTop: 20 }}>
          <Text style={{ fontSize: 18, fontWeight: 'bold' }}>Activities for {selectedDate}:</Text>
          {activities[selectedDate].map((item, index) => (
            <View key={index} style={{ flexDirection: 'row', alignItems: 'center', marginTop: 10 }}>
              <Text>{item}</Text>
              <Button
                title="Delete"
                onPress={() => handleDeleteActivity(selectedDate, index)}
                style={{ marginLeft: 10 }}
              />
            </View>
          ))}
        </View>
      )}
    </View>
  );
};

export default CalendarScreen;
