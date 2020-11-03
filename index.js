const express = require('express');
const app = express();
require('./db');
const PORT = process.env.PORT || 3000;
const Registerrouter = require('./router/register');
const Categoryrouter = require('./router/category');
const Expenserouter = require('./router/expense');
const cors = require('cors');

app.use(cors());

app.use(Registerrouter);
app.use(Categoryrouter);
app.use(Expenserouter);


app.listen(PORT, () => {
    console.log(`Server Started at ${PORT}`);
})