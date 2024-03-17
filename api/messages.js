import axios from 'axios';
import { axiosTokenConfig, getToken } from './storageHelper';

//TODO
const URL = 'http://opravilko.germanywestcentral.azurecontainer.io:3000/api/message'

// #/api/message/send
// Posiljanje sporocil osebam

export const sendMessage = async (userMessage) => {
    let token = await getToken()
    return axios.post(URL+"/send", {toUser: userMessage.contactUsername, message: userMessage.message, token: token})
}

// /api/message/with
// Prikaz vseh sporocil z to osebo
export const getMessagesWith = async (user) => {
    let token = await getToken()
    return axios.post(URL+"/with", {user: user.contactUsername, token: token})
}

// #/api/message/delete
// Izbrisi sporocilo
