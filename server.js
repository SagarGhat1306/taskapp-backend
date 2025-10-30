const dotenv = require('dotenv');
const express = require('express');
const cors = require('cors');
const connectDB = require('./src/config/db');

dotenv.config();
const app = express();
connectDB();

app.use(cors({
  origin: [
    'http://localhost:5173',  // for local dev
    'https://taskapp-frontend-five.vercel.app' // your Vercel frontend URL
  ],
  credentials: true,
}));
app.use(express.json());

// ROUTES
app.use('/api/auth', require('./src/routes/auth'));
app.use('/api/tasks', require('./src/routes/tasks'));

// TEST ROOT ROUTE
app.get('/', (req, res) => {
  res.send('Task App Backend is running...');
});

// ERROR HANDLER
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ message: 'Server error' });
});

// START SERVER
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
