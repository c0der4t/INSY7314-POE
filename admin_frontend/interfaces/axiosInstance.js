// call in axios to handle our api requests we want to make
import axios from 'axios';

const axiosInstance = axios.create({
    //this is the base URL, meaning that it must go before any API call we make with axios
    baseURL: 'https://stoinksapi.devpanda.work/v1',
    // we also tell it that we want to ask the server to respond with JSON, rather than cleartext
    headers: {
        'Content-Type': 'application/json'
    },
})

console.log("Axios instance created with baseURL:", axiosInstance.defaults.baseURL);
export default axiosInstance