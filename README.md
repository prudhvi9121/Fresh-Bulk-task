# Bulk Vegetable/Fruit Ordering Platform

A simple web application to view vegetables/fruits, place bulk orders, and manage them.

## Tech Stack
- **Frontend**: React.js, Vite
- **Backend**: Node.js, Express
- **Database**: SQLite
- **Styling**: CSS
 **Hosted Backend**: [Render](https://fresh-bulk-task.onrender.com/)
- **Hosted Frontend**: [Vercel](https://fresh-bulk-task.vercel.app/)


## Features Implemented
- **Buyers**:
  - Browse available produce.
  - Place bulk orders (Name, Address, Quantity).
  - Track order status using Order ID.
- **Admin**:
  - View all orders.
  - Update order status (Pending -> Delivered).

## Steps to Run Locally

### Prerequisites
- Node.js installed.

### 1. Setup Backend
```bash
cd backend
npm install
node server.js
```
The backend server will start on `http://localhost:5000`.

### 2. Setup Frontend
Open a new terminal:
```bash
cd frontend
npm install
npm run dev
```
The frontend application will start (usually on `http://localhost:5173`).

### 3. Usage
- Visit the frontend URL.
- Browse products and click "Order Now".
- Fill the form and submit. Note the Order ID.
- Go to "Track Order" and enter the ID to see status.
- Go to "Admin" link to view and manage orders.
