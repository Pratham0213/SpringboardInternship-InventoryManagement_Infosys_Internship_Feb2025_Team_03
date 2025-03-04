const Supplier = require('../models/supplier.schema');
const { randomBytes } = require('crypto');
const addSupplier = async (req, res) => {
    const { name, product, category, contact, email, type, supplierImage } = req.body;

    try {
        const supplier = await Supplier.findOne({ email });
        if (supplier) return res.status(400).json({ message: "User already exists" });
        const { supplierId } = await Supplier.create({ name, product, category, contact, email, type, supplierImage: supplierImage || "", supplierId: randomBytes(4).toString('hex') });
        return res.status(201).json({ message: "Supplier added!", supplierId: supplierId });
    } catch (err) {
        return res.status(500).json({ message: "Internal server error" });
    }
};

const getSuppliers = async (req, res) => {
    try {
        const suppliers = await Supplier.find({});
        return res.status(200).json(suppliers);
    } catch (err) {
        return res.status(500).json({ message: "Internal server error" });
    }
};


module.exports = {
    addSupplier,
    getSuppliers,

};