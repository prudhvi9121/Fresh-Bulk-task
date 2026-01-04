const ProductModel = require('../models/productModel');

const getAllProducts = (req, res) => {
    ProductModel.getAll((err, rows) => {
        if (err) {
            return res.status(500).json({ error: err.message });
        }
        res.json(rows);
    });
};

module.exports = {
    getAllProducts
};
