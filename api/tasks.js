import axios from 'axios';

const URL = 'http://opravilko.germanywestcentral.azurecontainer.io:3000/api';

export const addTask = async (data) => {
    return axios.post(`${URL}/task/create`, data);
} 