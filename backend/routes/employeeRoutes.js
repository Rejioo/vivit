const express = require('express');
const { addEmployee, getAllEmployees } = require('../controllers/employeeController');
const router = express.Router();

router.post('/add', addEmployee);
router.get('/all', getAllEmployees);

// routes/employeeRoutes.js
// router.delete('/delete/:id', async (req, res) => {
//   try {
//     await db.query('DELETE FROM employee WHERE id = $1', [req.params.id])
//     res.json({ message: 'Employee deleted successfully' })
//   } catch (error) {
//     res.status(500).json({ error: 'Failed to delete employee' })
//   }
// })
//

module.exports = { addEmployee, getAllEmployees};

module.exports = router;
