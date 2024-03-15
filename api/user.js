import axios from 'axios';

export const getProfile = async () => {
    try {
        const response = await axios.get('https://jsonplaceholder.typicode.com/users?id=1');
        return response.data;
    } catch (error) {
        console.error("Error fetching profile", error);
        throw error;
    }
}