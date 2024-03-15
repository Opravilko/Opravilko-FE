import AsyncStorage from "@react-native-async-storage/async-storage";

const getToken = async () => {
    try {
      const token = await AsyncStorage.getItem('token');
      return token;
    } catch (e) {
      console.log("Failed to get token from storage: " + e)
    }
  };

export const axiosTokenConfig = {
    headers: {
        Authorization: "Bearer " + getToken()
    }
}