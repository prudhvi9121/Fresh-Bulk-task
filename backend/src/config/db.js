const sqlite3 = require('sqlite3').verbose();
const path = require('path');

const dbPath = path.resolve(__dirname, '../../database.sqlite');

const db = new sqlite3.Database(dbPath, (err) => {
    if (err) {
        console.error('Error opening database ' + dbPath + ': ' + err.message);
    } else {
        console.log('Connected to the SQLite database.');
    }
});

const initDB = () => {
    db.serialize(() => {
        // Products Table
        db.run(`CREATE TABLE IF NOT EXISTS products (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            name TEXT NOT NULL,
            price REAL NOT NULL,
            unit TEXT NOT NULL,
            image_url TEXT
        )`, (err) => {
            if (err) console.error("Error creating products table:", err.message);
            else seedProducts();
        });

        // Orders Table
        db.run(`CREATE TABLE IF NOT EXISTS orders (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            buyer_name TEXT NOT NULL,
            address TEXT NOT NULL,
            product_id INTEGER NOT NULL,
            product_name TEXT NOT NULL,
            quantity INTEGER NOT NULL,
            status TEXT DEFAULT 'Pending',
            order_date DATETIME DEFAULT CURRENT_TIMESTAMP,
            FOREIGN KEY(product_id) REFERENCES products(id)
        )`, (err) => {
            if (err) console.error("Error creating orders table:", err.message);
        });
    });
};

const seedProducts = () => {
    db.get("SELECT count(*) as count FROM products", (err, row) => {
        if (!err && row.count === 0) {
            const stmt = db.prepare("INSERT INTO products (name, price, unit, image_url) VALUES (?, ?, ?, ?)");
            const products = [
                ['Potato', 30, 'kg', '/assets/potato.png'],
                ['Onion', 40, 'kg', '/assets/onion.png'],
                ['Tomato', 50, 'kg', '/assets/tomato.png'],
                ['Carrot', 60, 'kg', '/assets/carrot.png'],
                ['Apple', 120, 'kg', '/assets/apple.png'],
                ['Banana', 50, 'dozen', '/assets/banana.png']
            ];
            products.forEach(prod => stmt.run(prod));
            stmt.finalize();
            console.log('Seeded products table.');
        }
    });
};

initDB();

module.exports = db;
