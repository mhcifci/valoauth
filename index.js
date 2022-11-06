const express = require('express');
const app = express();


/* My routes */

// For access to JWT and Authorization
const Userroute  = require("./routes/Userroute");
// For fetching Valorant data and many more.
const fetch  = require("./routes/fetch");


const PORT = 3000;
app.listen(PORT, () => {});


app.use('/user', Userroute);
app.use('/fetch', fetch);
