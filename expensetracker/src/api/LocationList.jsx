import axios from 'axios';
const BASE_URL = 'https://api.countrystatecity.in/v1/countries/%5Bciso%5D/cities';
const locationList = axios.create({baseURL:BASE_URL});

export default locationList;