import axios from 'axios';

const instance = axios.create({
  baseURL: 'https://api-referencias.proyecto2017.linti.unlp.edu.ar/',
  headers: {}
});

export default instance;
