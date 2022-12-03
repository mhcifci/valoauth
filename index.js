const express = require('express');
const app = express();
var cors = require('cors');
const corsOptions = require('./config/corsOptions');
const PORT = process.env.PORT || 3000;
app.use(cors(corsOptions));    

// For access to JWT and Authorization
const UserRoute  = require("./routes/User");
const MarketRoute  = require("./routes/Market");
const ValorantRoute  = require("./routes/Valorant");
const WalletRoute  = require("./routes/Wallet");
const UsernameRoute = require("./routes/Username");
const InventoryRoute = require("./routes/Inventory");


app.use(express.json())
app.use('/user', UserRoute);
app.use('/market', MarketRoute);
app.use('/valorant', ValorantRoute);
app.use('/wallet', WalletRoute);
app.use('/username', UsernameRoute);
app.use('/inventory', InventoryRoute);

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));