// src/components/CryptoTable.js
import React from 'react';
import { useSelector } from 'react-redux';
import { selectAllAssets } from '../store/cryptoSlice';

const CryptoTable = () => {
  const assets = useSelector(selectAllAssets);

  const formatNumber = (num) => {
    if (!num) return '$0';
    if (num >= 1000000000) {
      return `$${(num / 1000000000).toFixed(2)}B`;
    }
    if (num >= 1000000) {
      return `$${(num / 1000000).toFixed(2)}M`;
    }
    if (num >= 1000) {
      return `$${(num / 1000).toFixed(2)}K`;
    }
    return `$${num.toFixed(2)}`;
  };

  return (
    <div className="table-responsive">
      <table className="table table-striped table-hover">
        <thead className="thead-dark">
          <tr>
            <th>#</th>
            <th>Name</th>
            <th>Price</th>
            <th>24h %</th>
            <th>7d %</th>
            <th>Market Cap</th>
            <th>Volume (24h)</th>
            <th>Circulating Supply</th>
            <th>Last 7 Days</th>
          </tr>
        </thead>
        <tbody>
          {assets.map((asset) => (
            <tr key={asset.id}>
              <td>{asset.id}</td>
              <td>
                <div className="d-flex align-items-center">
                  <img 
                    src={asset.logo} 
                    alt={asset.name} 
                    width="24" 
                    height="24" 
                    className="me-2"
                  />
                  <span className="fw-bold">{asset.name}</span>
                  <span className="text-muted ms-2">{asset.symbol}</span>
                </div>
              </td>
              <td>${asset.price.toLocaleString()}</td>
              <td className={asset.priceChange24h >= 0 ? 'text-success' : 'text-danger'}>
                {asset.priceChange24h >= 0 ? '+' : ''}{asset.priceChange24h}%
              </td>
              <td className={asset.priceChange7d >= 0 ? 'text-success' : 'text-danger'}>
                {asset.priceChange7d >= 0 ? '+' : ''}{asset.priceChange7d}%
              </td>
              <td>{formatNumber(asset.marketCap)}</td>
              <td>{formatNumber(asset.volume24h)}</td>
              <td>
                {asset.circulatingSupply?.toLocaleString()} {asset.symbol}
                {asset.maxSupply && (
                  <div className="text-muted">Max: {asset.maxSupply.toLocaleString()} {asset.symbol}</div>
                )}
              </td>
              <td>
                <div className="sparkline">
                  <svg width="70" height="30">
                    <polyline 
                      points="5,25 15,15 25,20 35,10 45,15 55,5 65,15" 
                      fill="none" 
                      stroke={asset.priceChange7d >= 0 ? '#28a745' : '#dc3545'} 
                      strokeWidth="2"
                    />
                  </svg>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default CryptoTable;