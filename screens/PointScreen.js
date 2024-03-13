import React, { useState, useEffect } from 'react';
import { View, Text, FlatList, StyleSheet } from 'react-native';

const PointScreen = () => {
  const [points, setPoints] = useState([]);

  useEffect(() => {
    // Simulating fetching points data from an API or database
    const fetchData = async () => {
      // Simulated data for demonstration purposes
      let data = [
        { id: 1, user: 'John Doe', points: 150 },
        { id: 4, user: 'Emily Brown', points: 220 },
        { id: 2, user: 'Jane Smith', points: 200 },
        { id: 3, user: 'Mike Johnson', points: 180 },
        { id: 5, user: 'Chris Davis', points: 190 },
      ];

      // Sort data by points from higher to lower
      data.sort((a, b) => b.points - a.points);

      setPoints(data);
    };

    fetchData();
  }, []);

  const renderPointItem = ({ item }) => (
    <View style={styles.pointItem}>
      <Text>{item.user}</Text>
      <Text>{item.points}</Text>
    </View>
  );

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Points Table</Text>
      <FlatList
        data={points}
        renderItem={renderPointItem}
        keyExtractor={(item) => item.id.toString()}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  pointItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
  },
});

export default PointScreen;
