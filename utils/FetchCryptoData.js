// jobs/fetchCryptoData.js
const axios = require('axios');
const cron = require('node-cron');
const Crypto = require('../model/Crypto');

const fetchCryptoData = async () => {
    console.log('fetchCryptoData function called');
    try {
        const coins = ['bitcoin', 'matic-network', 'ethereum'];
        const options = {
            method: 'GET',
            headers: {
                accept: 'application/json',
                'x-cg-demo-api-key': 'CG-vRbCYEXtYe2hH7eg4LbeTdDb'
            }
        };

        const promises = coins.map(coin => 
            axios.get(`https://api.coingecko.com/api/v3/coins/${coin}`, options)
        );
        const responses = await Promise.all(promises);

        responses.forEach(async (response) => {
            const { id, market_data } = response.data;
            const data = {
                coin: id,
                price: market_data.current_price.usd,
                marketCap: market_data.market_cap.usd,
                change24h: market_data.price_change_percentage_24h,
            };

            console.log('Data to be saved:', data);

            const crypto = new Crypto(data);
            await crypto.save();
            console.log(`Data for ${id} saved successfully`);
        });

        console.log('Crypto data fetched and stored successfully');
    } catch (error) {
        console.error('Error fetching crypto data:', error);
    }
};

cron.schedule('0 */2 * * *', () => {
    console.log('Scheduled job started');
    fetchCryptoData();
});

module.exports = fetchCryptoData;