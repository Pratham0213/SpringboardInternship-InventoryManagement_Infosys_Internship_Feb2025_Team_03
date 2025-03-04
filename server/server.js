const express = require('express');
require('dotenv').config();
const cors = require('cors');
const connectDB = require('./utils/connectDB');
const helmet = require('helmet');
const xss = require('xss-clean');
const mongoSanitizer = require('express-mongo-sanitize');
const cron = require('node-cron');

const app = express();
app.use(cors({
    origin: process.env.CLIENT_URL,
    credentials: true
}));
connectDB(process.env.DB_CONN_STRING);

cron.schedule('43 14 * * *', async () => {

    try {

        const dateTime = new Date();
        const Todaydate = dateTime.toISOString().split('T');
        const todayDeliveryOrders = await Order.find({ expectedDelivery: Todaydate, status: 'Confirmed' });
        if (todayDeliveryOrders.length > 0) {
            todayDeliveryOrders.forEach(async (order) => {
                await Notification.create({ orderId: order._id });
            });
        }
        console.log(Todaydate);
        console.log(todayDeliveryOrders);
    } catch (error) {
        console.log(error);
    }
});


const userRoute = require('./routes/user.route');
const SupplierRoute = require('./routes/supplier.route');
const orderRoute = require('./routes/order.route');
const ProductsRoute = require('./routes/product.route');
const NotificationRoute = require('./routes/notifications.route');

const Order = require('./models/orders.schema');
const Notification = require('./models/notifications.schema');

app.use(express.static("./public"));
app.use(express.json());
app.use(mongoSanitizer());
app.use(xss());
app.use(helmet());

app.get('/', (req, res) => {
    return res.send('welcome');
});

app.use("/api/users", userRoute);
app.use("/api/supplier", SupplierRoute);
app.use("/api/order", orderRoute);
app.use("/api/product", ProductsRoute);
app.use("/api/notifications", NotificationRoute);

app.listen(process.env.PORT, () => console.log(`server started on port no. ${process.env.PORT}`));