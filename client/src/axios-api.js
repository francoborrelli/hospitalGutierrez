import axios from 'axios';

const path = 'http://localhost:8080';

export default axios.create({
  baseURL: path
});
