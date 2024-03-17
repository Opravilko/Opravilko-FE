import axios from 'axios';

const URL = 'http://opravilko.germanywestcentral.azurecontainer.io:3000/api';

export const getUserTasks = async (req) => {
    return axios.get(`${URL}/task/my`, req);
}

export const updateUser = async (user) => {
    return axios.put(`${URL}/user/update`, user);
}