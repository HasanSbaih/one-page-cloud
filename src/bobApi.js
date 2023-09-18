import axios from 'axios';

const axiosInstance = axios.create({
  baseURL: 'https://one-page-cloud-app.azurewebsites.net',
});


export default axiosInstance;
