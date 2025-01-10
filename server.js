const express = require("express");
const dotenv = require("dotenv");
const connectDB = require("./config/db");
const cryptoRoutes = require("./routes/cryptoRoutes");
const fetchCryptoData = require("./utils/FetchCryptoData");
const cors = require("cors");
const helmet = require("helmet");
dotenv.config();

const app = express();
const port = process.env.PORT || 3000;

connectDB();
app.use(express.json());
app.use(cors());
app.use(
  helmet.contentSecurityPolicy({
    directives: {
      defaultSrc: ["'self'"],
      scriptSrc: [
        "'self'",
        "'unsafe-inline'",
        "'unsafe-eval'",
        "https://vercel.live",
      ],
      connectSrc: ["'self'", "https://vercel.live"],
    },
  })
);
app.use("/api", cryptoRoutes);
app.get("/", (req, res) => {
  res.send(
    "Welcome to the Crypto API and  stats: /api/stats?coin=bitcoin,deviation: /api/deviation?coin=bitcoin"
  );
});
app.listen(port, () => {
  console.log(`Server running on port ${port}`);
  fetchCryptoData();
});
