import axios from 'axios';

const path = 'http://localhost:8080';

const instance = axios.create({
  baseURL: path
});

const jwt = localStorage.getItem('token');
if (jwt) {
  axios.defaults.headers.common['Authorization'] = `Bearer ${jwt}`;
}

export default instance;
