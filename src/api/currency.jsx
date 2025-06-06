import axios from 'axios';

const BASE_URL = 'https://api.freecurrencyapi.com/v1/';
const API_KEY = 'fca_live_tdFwsgi9uqnyAGC1tyV5T9gfRA6JvdA4HWN9B5th';

const currencyAPI = axios.create({ 
    baseURL: BASE_URL,
    headers: {'apikey': API_KEY} 
});

const getLatestRates = async (baseCurrency = 'USD', targetCurrencies = 'EUR,GBP') => {
  try {
    const response = await currencyAPI.get(`/latest?base_currency=${baseCurrency}&currencies=${targetCurrencies}`);
    return response.data;
  } catch (error) {
    console.error("Error fetching currency rates:", error.message);
    throw error;
  }
};


export default {
  getLatestRates,
};