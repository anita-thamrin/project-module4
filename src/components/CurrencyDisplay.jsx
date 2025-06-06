import React, { useState, useEffect } from 'react';
import currencyAPI from '../api/currency';

function CurrencyDisplay({ selectedPlace }) {
  const [exchangeRates, setExchangeRates] = useState(null);
  const [error, setError] = useState(null);

  const getCurrencyCode = (place) => {
    const currencyMap = {
      Singapore: 'SGD',
      Japan: 'JPY',
      'United Kingdom': 'GBP',
      Germany: 'EUR',
      'United States': 'USD',
    };
    return currencyMap[place] || 'EUR'; 
  };

  useEffect(() => {
    async function fetchCurrencyRates() {
      if (!selectedPlace) {
        setExchangeRates(null); 
        return;
      }

      setError(null); 
      try {
        const targetCurrencyCode = getCurrencyCode(selectedPlace);
        const rates = await currencyAPI.getLatestRates('USD', targetCurrencyCode);

        if (rates && rates.data && rates.data[targetCurrencyCode]) {
          setExchangeRates(rates.data);
        } else {
          setError(`Currency data for ${targetCurrencyCode} not found.`);
          setExchangeRates(null); 
        }
      } catch (err) {
        console.error('Error fetching currency rates in CurrencyDisplay:', err);
        setError('Failed to fetch exchange rates. Please try again later.');
        setExchangeRates(null);
      }
    }

    fetchCurrencyRates();
  }, [selectedPlace]); 

  if (error) {
    return <div style={{ color: 'red', margin: '10px 0' }}>{error}</div>;
  }

  if (!exchangeRates || !selectedPlace) {
    return <div style={{ margin: '10px 0' }}>Loading currency rates...</div>;
  }

  const targetCurrencyCode = getCurrencyCode(selectedPlace);
  const rate = exchangeRates[targetCurrencyCode];

  if (!rate) {
    return <div style={{ margin: '10px 0' }}>No exchange rate available for {selectedPlace}.</div>;
  }

  return (
    <div style={{ margin: '20px 0', padding: '15px', border: '1px solid #ccc', borderRadius: '8px' }}>
      <h3>Current Exchange Rate:</h3>
      <p>
        **1 USD = {rate.toFixed(4)} {targetCurrencyCode}** (for {selectedPlace})
      </p>
      <p style={{ fontSize: '0.8em', color: '#555' }}>Rates are approximate and for informational purposes only.</p>
    </div>
  );
}

export default CurrencyDisplay;