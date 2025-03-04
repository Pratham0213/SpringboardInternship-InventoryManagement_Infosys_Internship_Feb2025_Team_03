const Notification = require("../models/notifications.schema");
const Order = require("../models/orders.schema");
const Product = require("../models/products.schema");
const Supplier = require("../models/supplier.schema");

const getNotifications = async (req, res) => {
    try {
        const notifications = await Notification.find({})
            .populate('orderId', 'name category quantity orderValue expectedDelivery supplierId');
        return res.status(200).json(notifications);
    } catch (error) {
        return res.status(500).json({ message: "Internal server error" });
    }
};

const delivered = async (req, res) => {
    try {
        const { _id, orderId: { _id: id, supplierId } } = req.body;
        await Order.findByIdAndUpdate(id, { status: 'Delivered' });
        await Supplier.updateOne({ supplierId }, { onTheWay: 0 });
        await Notification.findByIdAndDelete(_id);
        return res.status(200).json({ success: true });

    } catch (error) {
        return res.status(500).json({ message: "Internal server Error" });

    }
};

const delay = async (req, res) => {
    try {
        const { orderId: { _id: id } } = req.body;
        await Order.findByIdAndUpdate(id, { status: 'Delayed' });
        return res.status(200).json({ success: true });
    } catch (error) {
        return res.status(500).json({ message: "Internal server Error" });

    }
};

const returned = async (req, res) => {
    try {
        const { _id, orderId: { _id: id, name, category, quantity, supplierId } } = req.body;
        await Order.findByIdAndUpdate(id, { status: 'Returned' });



        const product = await Product.findOne({ name, category });
        product.qtyRemaining = product.qtyRemaining - quantity;
        product.save();



        const supplier = await Supplier.findOne({ supplierId });
        supplier.onTheWay = supplier.onTheWay - quantity;
        supplier.save();

        await Notification.findByIdAndDelete(_id);
        return res.status(200).json({ success: true });
    } catch (error) {
        return res.status(500).json({ message: "Internal server Error" });
    }
};

module.exports = {
    getNotifications,
    delivered,
    delay,
    returned
};