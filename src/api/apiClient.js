import axios from 'axios';

export const axiosClient = axios.create({
  baseURL: `http://192.168.1.66:3000/api`,
  headers: {
    'Accept': 'application/json',
    'Content-Type': 'application/json'
  }
});