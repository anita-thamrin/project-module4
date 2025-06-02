import axios from 'axios';

const BASE_URL = 'https://api.countrystatecity.in/v1/countries/JP/cities';
const API_KEY = 'c1gyVWphOTF5WkdLelMzNHlIdDFxVFU3ZmgwTExGM2REa21pTzhuOQ==';
const countriesAPI = axios.create({ 
    baseURL: BASE_URL,
    headers: {'X-CSCAPI-KEY': API_KEY} 
});

export default countriesAPI;