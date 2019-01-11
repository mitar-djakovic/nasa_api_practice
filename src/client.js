import axios from "axios";

const axiosInstance = axios.create({
  baseURL: 'https://api.nasa.gov/neo/rest/v1/'
});

axiosInstance.defaults.params = {
    api_key: 'x0HeIJzRCLm3lj0zrfXt2LltusKVCO7aoHmRkVq2'
};

export default axiosInstance;