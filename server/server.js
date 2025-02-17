const express = require('express');
require('dotenv').config();
const cors = require('cors');
const connectDB = require('./utils/connectDB');
const helmet = require('helmet');
const xss = require('xss-clean');
const mongoSanitizer = require('express-mongo-sanitize');

const app = express();
connectDB(process.env.DB_CONN_STRING);

app.use(cors());
app.use(express.json());
app.use(mongoSanitizer());
app.use(xss());
app.use(helmet());

app.get('/', (req, res) => {
    return res.send('welcome');
});

app.listen(process.env.PORT, () => console.log(`server started on port no. ${process.env.PORT}`));