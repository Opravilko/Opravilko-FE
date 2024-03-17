import axios from 'axios';
import { axiosTokenConfig, getToken } from './storageHelper';

const URL = 'http://opravilko.germanywestcentral.azurecontainer.io:3000/api';

export const getUserTasks = async (req) => {
    return axios.get(`${URL}/task/my`, req);
}

export const updateUser = async (user) => {
    return axios.put(`${URL}/user/update`, user);
}

export const getUserList = async () => {
    let token = await getToken()
    return axios.post(`${URL}/user/list`, {token: token})
}