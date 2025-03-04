const Products = require('../models/products.schema');


const getProducts = async (req, res) => {
    try {
        const products = await Products.find({});
        return res.status(200).json(products);
    } catch (error) {
        return res.status(500).json({ message: "Internal server error" });
    }
};

module.exports = {
    getProducts
};