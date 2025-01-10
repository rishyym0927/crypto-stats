<div align="center">

# 🚀 Crypto Stats Application

[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)
[![Node.js](https://img.shields.io/badge/Node.js-v12+-green.svg)](https://nodejs.org)
[![MongoDB](https://img.shields.io/badge/MongoDB-4.4+-blue.svg)](https://www.mongodb.com)
[![Express.js](https://img.shields.io/badge/Express.js-4.x-lightgrey.svg)](https://expressjs.com)

Real-time cryptocurrency statistics and analysis platform
</div>

---

## ✨ Features

- 🔄 **Auto-Fetch**: Real-time crypto data updates every 2 hours
- 📊 **Advanced Analytics**: Standard deviation calculations for price trends
- 🎯 **Multiple Coins**: Support for Bitcoin, Matic, and Ethereum
- 🔒 **Secure**: Built-in security with Helmet middleware
- 📱 **API Ready**: RESTful endpoints for seamless integration

## 🛠️ Tech Stack

<div align="center">

| Technology | Purpose |
|------------|---------|
| Node.js | Runtime Environment |
| Express.js | Web Framework |
| MongoDB | Database |
| Mongoose | ODM |
| Axios | HTTP Client |
| Node-Cron | Task Scheduler |
| Helmet | Security |
| CORS | Cross-Origin Support |

</div>

## 📁 Project Structure

```
crypto-stats/
├── 📂 config/
├── 📂 controllers/
├── 📂 middlewares/
├── 📂 models/
├── 📂 routes/
├── 📂 utils/
├── 📄 .env
├── 📄 package.json
└── 📄 server.js
```

## 🚀 Quick Start

1. **Clone & Install**
```bash
git clone https://github.com/yourusername/crypto-stats.git
cd crypto-stats
npm install
```

2. **Configure Environment**
```env
MONGODB_URI=your_mongodb_connection_string
PORT=3000
```

3. **Launch**
```bash
npm start
```

## 🎮 Controllers

Our application uses two streamlined controllers for handling cryptocurrency data:

```javascript
const cryptoController = {
    // Get latest stats for a specific cryptocurrency
    getCryptoStats: async (req, res) => {
        const { coin } = req.query;
        const stats = await Crypto.findOne({ coin }).sort({ timestamp: -1 });
        res.send({
            price: stats.price,
            marketCap: stats.marketCap,
            '24hChange': stats.change24h,
        });
    },

    // Calculate price standard deviation
    getCryptoDeviation: async (req, res) => {
        const { coin } = req.query;
        const data = await Crypto.find({ coin }).sort({ timestamp: -1 }).limit(100);
        res.send({ deviation: calculateStandardDeviation(data.map(d => d.price)) });
    }
};
```

## 🔌 API Endpoints

### Get Crypto Stats
```http
GET /api/stats?coin=bitcoin
```

#### Response
```json
{
    "price": 40000,
    "marketCap": 800000000,
    "24hChange": 3.4
}
```

### Get Price Deviation
```http
GET /api/deviation?coin=bitcoin
```

#### Response
```json
{
    "deviation": 4082.48
}
```

## ⏰ Background Jobs

Our system automatically fetches cryptocurrency data every 2 hours using a scheduled job:

```javascript
cron.schedule('0 */2 * * *', fetchCryptoData);
```

## 🔧 Environment Variables

| Variable | Description |
|----------|-------------|
| `MONGODB_URI` | MongoDB connection string |
| `PORT` | Server port (default: 3000) |

## 🤝 Contributing

We love contributions! Here's how you can help:

1. 🍴 Fork the repository
2. 🌿 Create your feature branch
3. 💾 Commit your changes
4. 📤 Push to the branch
5. 🎉 Open a Pull Request

## 📝 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

---

<div align="center">
  
### Made with ❤️ by the Crypto Stats Team

[⭐ Star us on GitHub](https://github.com/yourusername/crypto-stats)
</div>