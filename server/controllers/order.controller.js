const Category = require("../models/categories.schema");
const Order = require("../models/orders.schema");
const Product = require("../models/products.schema");
const Supplier = require("../models/supplier.schema");
const { getSupplierBySupplierId } = require("./supplier.controller");


const placeOrder = async (req, res) => {
    try {
        const { name, supplierId, category, quantity, unit, orderValue, expectedDelivery } = req.body;

        await Order.create({
            name,
            supplierId,
            category,
            quantity,
            unit,
            orderValue,
            expectedDelivery
        });

        let product = await Product.findOne({ name });

        if (!product) {
            const sp = ((parseFloat(orderValue) / parseFloat(quantity)) * 110) / 100;
            const cp = parseFloat(orderValue) / parseFloat(quantity);

            await Product.create({
                name,
                category,
                cost: cp,
                sellingPrice: sp,
                unit,
                qtyRemaining: quantity
            });
        } else {
            product.qtyRemaining += quantity;
            await product.save();
        }

        const supplier = await Supplier.findOne({ supplierId });

        if (supplier) {
            supplier.onTheWay = quantity;
            supplier.product = name;
            await supplier.save();
        } else {
            return res.status(400).json({ message: "Supplier not found" });
        }

        return res.status(201).json({ message: "Order placed successfully" });
    } catch (error) {
        console.error(error);
        return res.status(400).json({ message: "Something went wrong, Please try again" });
    }
};

const getOrders = async (req, res) => {
    try {
        const orders = await Order.find({});
        return res.status(200).json(orders);
    } catch (error) {
        return res.status(500).json({ message: "Internal server error" });

    }
};

module.exports = {
    placeOrder,
    getOrders
};