
import axios from 'axios';

const api = axios.create({
  
  baseURL: 'http://10.15.21.28:3000/api',
  timeout: 5000,
});

export default api;
