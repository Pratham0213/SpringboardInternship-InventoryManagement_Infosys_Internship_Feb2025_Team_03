const express = require('express');
require('dotenv').config();
const cors = require('cors');
const connectDB = require('./utils/connectDB');
const helmet = require('helmet');
const xss = require('xss-clean');
const mongoSanitizer = require('express-mongo-sanitize');

const app = express();
app.use(cors({
    origin: process.env.CLIENT_URL,
    credentials: true
}));
connectDB(process.env.DB_CONN_STRING);

const userRoute = require('./routes/user.route');

app.use(express.static("./public"));
app.use(express.json());
app.use(mongoSanitizer());
app.use(xss());
app.use(helmet());

app.get('/', (req, res) => {
    return res.send('welcome');
});

app.use("/api/users", userRoute);

app.listen(process.env.PORT, () => console.log(`server started on port no. ${process.env.PORT}`));