const express = require('express');
const app = express();

// For access to JWT and Authorization
const UserRoute  = require("./routes/UserRoute");

const PORT = 3000;
app.listen(PORT, () => {});

app.use('/user', UserRoute);
