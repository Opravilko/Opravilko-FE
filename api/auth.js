import axios from 'axios';

const URL = 'http://opravilko.germanywestcentral.azurecontainer.io:3000/api/auth';

export const login = async (user) => {
    return axios.post(`${URL}/login`, user);
}

export const register = async (user) => {
    return axios.post(`${URL}/register`, user);
}


