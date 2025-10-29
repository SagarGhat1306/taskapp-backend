const express = require('express');
const { body } = require('express-validator');
const router = express.Router();
const auth = require('../middlewares/auth');
const taskController = require('../controllers/taskController');

router.post('/', auth, [
  body('title').notEmpty().withMessage('Title required')
], taskController.createTask);

router.get('/', auth, taskController.getTasks);
router.get('/:id', auth, taskController.getTask);
router.put('/:id', auth, taskController.updateTask);
router.delete('/:id', auth, taskController.deleteTask);

module.exports = router;
