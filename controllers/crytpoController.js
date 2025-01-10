// controllers/cryptoController.js
const Crypto = require('../model/Crypto');
const { calculateStandardDeviation } = require('../utils/stats');

const getCryptoStats = async (req, res) => {
    const coin = req.query.coin;
    if (!coin) {
        return res.status(400).send({ error: 'Coin query parameter is required' });
    }

    const latestData = await Crypto.findOne({ coin }).sort({ timestamp: -1 });
    if (!latestData) {
        return res.status(404).send({ error: 'Data not found' });
    }

    res.send({
        price: latestData.price,
        marketCap: latestData.marketCap,
        '24hChange': latestData.change24h,
    });
};

const getCryptoDeviation = async (req, res) => {
    const coin = req.query.coin;
    if (!coin) {
        return res.status(400).send({ error: 'Coin query parameter is required' });
    }

    const data = await Crypto.find({ coin }).sort({ timestamp: -1 }).limit(100);
    const prices = data.map(record => record.price);

    if (prices.length === 0) {
        return res.status(404).send({ error: 'Not enough data' });
    }

    const deviation = calculateStandardDeviation(prices);
    res.send({ deviation });
};

module.exports = {
    getCryptoStats,
    getCryptoDeviation,
};