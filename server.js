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
    'https://taskapp-frontend-five.vercel.app/login' // 👈 replace with your Vercel frontend URL
  ],
  credentials: true,
}));
app.use(express.json());

app.use('/api/auth', require('./src/routes/auth'));
app.use('/api/tasks', require('./src/routes/tasks'));

app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ message: 'Server error' });
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
