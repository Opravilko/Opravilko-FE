import axios from 'axios';

//TODO
const URL = 'https://fefika.free.beeceptor.com';

export const login = async (user, setUser) => {
    return axios.post(URL,user);
}


