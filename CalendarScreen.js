import React from 'react';
import { View } from 'react-native';
import { Calendar } from 'react-native-calendars';

const CalendarScreen = () => {
  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <Calendar />
    </View>
  );
};

export default CalendarScreen;
