const express = require('express');
const app = express();

// For access to JWT and Authorization
const UserRoute  = require("./routes/User");
const MarketRoute  = require("./routes/Market");

const PORT = 3000;
app.listen(PORT, () => {});

app.use(express.json())
app.use('/user', UserRoute);
app.use('/market', MarketRoute);

