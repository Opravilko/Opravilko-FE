import axios from 'axios';
import { axiosTokenConfig, getToken } from './storageHelper';

const URL = 'http://opravilko.germanywestcentral.azurecontainer.io:3000/api';

export const addTask = async (req) => {
    return axios.post(`${URL}/task/create`, req)
}

// TODO change to getMyTasks, ko endpoint '/task/my' nebo crashal ;-;
export const getAllTasks = async ( token ) => {
    return axios.post(`${URL}/task/list`, { token: token })
}

export const deleteTask = async ( req ) => {
    return axios.post(`${URL}/task/delete`, req)
} 