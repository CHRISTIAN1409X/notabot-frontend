import axios from 'axios';
import { baseUrl } from '../../hostConfig.js';

const api = axios.create({
  baseURL: `${baseUrl}`,
  withCredentials: true 
});

export const apiBaseUrl = baseUrl;
export default api;

