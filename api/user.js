import axios from 'axios';
import { axiosTokenConfig, getToken } from './storageHelper';

const URL = "http://opravilko.germanywestcentral.azurecontainer.io:3000/api/user"

export const getProfile = async () => {
    try {
        const response = await axios.get('https://jsonplaceholder.typicode.com/users?id=1');
        return response.data;
    } catch (error) {
        console.error("Error fetching profile", error);
        throw error;
    }
}

export const getUserList = async () => {
    let token = await getToken()
    return axios.post(URL+"/list", {token: token})
}