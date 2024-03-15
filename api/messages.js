import axios from 'axios';
import { axiosTokenConfig } from './axiosConfig';

//TODO
const URL = 'https://msgse.free.beeceptor.com'

// #/api/message/send
// Posiljanje sporocil osebam

export const sendMessage = async (user, messageToSend) => {
    return axios.post(URL, {toUser: user, message: messageToSend}, axiosTokenConfig)
}

// /api/message/with
// Prikaz vseh sporocil z to vsebo
export const getMessagesWith = async (user) => {
    try {
        const response = await axios.get(URL, axiosTokenConfig);
        console.log("Fetching messages with user "+user)
        return JSON.parse(response.data);
    } catch (error) {
        console.error("Error fetching messages", error);
        throw error;
    }
}

// #/api/message/delete
// Izbrisi sporocilo
