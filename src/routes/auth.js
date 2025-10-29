const express = require('express');
const router = express.Router();
const { body } = require('express-validator');
const authController = require('../controllers/authController');
const auth = require('../middlewares/auth');

// @route POST /api/auth/register
router.post('/register', [
  body('name').notEmpty().withMessage('Name required'),
  body('email').isEmail().withMessage('Valid email required'),
  body('password').isLength({ min: 6 }).withMessage('Password must be 6+ chars')
], authController.register);

// @route POST /api/auth/login
router.post('/login', [
  body('email').isEmail(),
  body('password').exists()
], authController.login);

// @route GET /api/auth/me
router.get('/me', auth, authController.getProfile);

// @route PUT /api/auth/me
router.put('/me', auth, [
  body('name').optional().isString()
], authController.updateProfile);

module.exports = router;
