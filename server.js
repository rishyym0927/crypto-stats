
const express = require('express');
const dotenv = require('dotenv');
const connectDB = require('./config/db');
const cryptoRoutes = require('./routes/cryptoRoutes');
const fetchCryptoData = require('./utils/FetchCryptoData');
const cors = require('cors');
const helmet = require('helmet');
dotenv.config();

const app = express();
const port = process.env.PORT || 3000;


connectDB();
app.use(express.json());
app.use(cors());
app.use(helmet());
app.use('/api', cryptoRoutes);
app.listen(port, () => {
    console.log(`Server running on port ${port}`);
    fetchCryptoData();
});