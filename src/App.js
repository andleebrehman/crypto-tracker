// src/App.js
import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { updateAssetPrice } from './store/cryptoSlice';
import CryptoTable from './components/CryptoTable';

function App() {
  const dispatch = useDispatch();

  useEffect(() => {
    const interval = setInterval(() => {
      // Update prices for all assets
      for (let i = 1; i <= 5; i++) {
        const priceChange = (Math.random() * 2 - 1).toFixed(2);
        const currentPrice = Math.random() > 0.5 
          ? (Math.random() * 100000).toFixed(2)
          : (Math.random() * 1000).toFixed(2);
        
        dispatch(updateAssetPrice({
          id: i,
          price: parseFloat(currentPrice),
          priceChange24h: parseFloat(priceChange)
        }));
      }
    }, 2000);

    return () => clearInterval(interval);
  }, [dispatch]);

  return (
    <div className="container mt-4">
      <h1 className="text-center mb-4">Real-Time Crypto Price Tracker</h1>
      <CryptoTable />
    </div>
  );
}

export default App;