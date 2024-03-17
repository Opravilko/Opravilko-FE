import AsyncStorage from "@react-native-async-storage/async-storage";

export const getToken = async () => {
    try {
      const token = await AsyncStorage.getItem('token');
      return token;
    } catch (e) {
      console.log("Failed to get token from storage: " + e)
    }
  };

export const getUsername = async () => {
  try {
    const username = await AsyncStorage.getItem('username');
    if(username !== null){
      return username
    } else {
      return null;
    }
  } catch (e) {
    console.log("Failed to get username from storage: " + e)
  }
}