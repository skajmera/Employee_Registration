const express = require('express');
const morgan = require('morgan')
const app = express();
require('dotenv').config()
const user = require('./routes/user');
app.use(express.json())
app.use(morgan('dev'))
app.use('', user)

const port = process.env.db_port;

app.listen(port, () => {
    console.log(`listen ${port} is running`);
})