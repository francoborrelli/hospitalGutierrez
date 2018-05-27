import axios from 'axios';

const path = 'http://localhost:8080';

const instance = axios.create({
  baseURL: path,
  headers: {}
});

const jwt = localStorage.getItem('token');
if (jwt) {
  instance.defaults.headers['Authorization'] = `Bearer ${jwt}`;
}

export default instance;
