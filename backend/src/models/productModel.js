const db = require('../config/db');

const ProductModel = {
    getAll: (callback) => {
        const sql = "SELECT * FROM products";
        db.all(sql, [], callback);
    }
};

module.exports = ProductModel;
