// src/store/cryptoSlice.js
import { createSlice, createSelector } from '@reduxjs/toolkit';
import btcIcon from 'cryptocurrency-icons/svg/color/btc.svg';
import ethIcon from 'cryptocurrency-icons/svg/color/eth.svg';
import usdtIcon from 'cryptocurrency-icons/svg/color/usdt.svg';
import xrpIcon from 'cryptocurrency-icons/svg/color/xrp.svg';
import bnbIcon from 'cryptocurrency-icons/svg/color/bnb.svg';


const initialState = {
  assets: [
    {
      id: 1,
      name: 'Bitcoin',
      symbol: 'BTC',
      logo: btcIcon ,
      price: 93759.48,
      priceChange24h: -0.43,
      priceChange7d: -11.11,
      marketCap: 1861618902186,
      volume24h: 43874950947,
      circulatingSupply: 19.85,
      maxSupply: 21,
    },
    {
      id: 2,
      name: 'Ethereum',
      symbol: 'ETH',
      logo: ethIcon ,
      price: 1802.46,
      priceChange24h: -0.60,
      priceChange7d: -13.68,
      marketCap: 217581279327,
      volume24h: 23547469307,
      circulatingSupply: 120.71,
      maxSupply: null,
    },
    {
      id: 3,
      name: 'Tether',
      symbol: 'USDT',
      logo: usdtIcon ,
      price: 1.00,
      priceChange24h: -0.00,
      priceChange7d: -0.04,
      marketCap: 145320022085,
      volume24h: 92268882007,
      circulatingSupply: 145.27,
      maxSupply: null,
    },
    {
      id: 4,
      name: 'XRP',
      symbol: 'XRP',
      logo: xrpIcon ,
      price: 2.22,
      priceChange24h: -0.46,
      priceChange7d: -6.18,
      marketCap: 130073814966,
      volume24h: 5131481491,
      circulatingSupply: 58.39,
      maxSupply: 100,
    },
    {
      id: 5,
      name: 'BNB',
      symbol: 'BNB',
      logo: bnbIcon ,
      price: 606.65,
      priceChange24h: -0.09,
      priceChange7d: -3.73,
      marketCap: 85471956947,
      volume24h: 1874281784,
      circulatingSupply: 140.89,
      maxSupply: 168,
    },
  ]
};

export const cryptoSlice = createSlice({
  name: 'crypto',
  initialState,
  reducers: {
    updateAssetPrice: (state, action) => {
      const { id, price, priceChange24h } = action.payload;
      const asset = state.assets.find(a => a.id === id);
      if (asset) {
        asset.price = price;
        asset.priceChange24h = priceChange24h;
        // Randomly adjust other metrics
        asset.priceChange7d = parseFloat((asset.priceChange7d + (Math.random() * 0.4 - 0.2)).toFixed(2));
        asset.volume24h = parseFloat((asset.volume24h * (1 + Math.random() * 0.1 - 0.05)).toFixed(2));
      }
    }
  }
});

export const { updateAssetPrice } = cryptoSlice.actions;

export const selectAllAssets = (state) => state.crypto.assets;

export const selectAssetById = createSelector(
  [selectAllAssets, (state, assetId) => assetId],
  (assets, assetId) => assets.find(asset => asset.id === assetId)
);

export default cryptoSlice.reducer;