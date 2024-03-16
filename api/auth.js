import axios from 'axios';

//TODO
const URL = 'http://opravilko.germanywestcentral.azurecontainer.io:3000/api/auth';

export const login = async (user, setUser) => {
    return axios.post(`${URL}/login`, user);
}


