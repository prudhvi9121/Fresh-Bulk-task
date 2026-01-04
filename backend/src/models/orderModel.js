const db = require('../config/db');

const OrderModel = {
    create: (order, callback) => {
        const { buyer_name, address, product_id, product_name, quantity } = order;
        const sql = `INSERT INTO orders (buyer_name, address, product_id, product_name, quantity) VALUES (?, ?, ?, ?, ?)`;
        const params = [buyer_name, address, product_id, product_name, quantity];

        db.run(sql, params, function (err) {
            if (err) return callback(err);
            callback(null, {
                order_id: this.lastID,
                ...order,
                status: 'Pending'
            });
        });
    },

    findById: (id, callback) => {
        const sql = "SELECT * FROM orders WHERE id = ?";
        db.get(sql, [id], callback);
    },

    getAll: (callback) => {
        const sql = "SELECT * FROM orders ORDER BY order_date DESC";
        db.all(sql, [], callback);
    },

    updateStatus: (id, status, callback) => {
        const sql = "UPDATE orders SET status = ? WHERE id = ?";
        db.run(sql, [status, id], function (err) {
            if (err) return callback(err);
            // this.changes is the number of rows modified
            callback(null, this.changes);
        });
    }
};

module.exports = OrderModel;
