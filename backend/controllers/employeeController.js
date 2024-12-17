const connection = require('../config/db');

// Add Employee
exports.addEmployee = (req, res) => {
    const { name, employee_id, email, phone, department, date_of_joining, role } = req.body;

    // Ensure Employee ID and Email are unique
    const query = `INSERT INTO employees (name, employee_id, email, phone, department, date_of_joining, role) 
                   VALUES (?, ?, ?, ?, ?, ?, ?)`;

    connection.query(query, [name, employee_id, email, phone, department, date_of_joining, role], (err) => {
        if (err) {
            if (err.code === 'ER_DUP_ENTRY') {
                return res.status(400).json({ message: 'Employee ID or Email already exists.' });
            }
            return res.status(500).json({ message: 'Database error.', error: err });
        }
        res.status(201).json({ message: 'Employee added successfully!' });
    });
};

// Get All Employees
exports.getAllEmployees = (req, res) => {
    connection.query('SELECT * FROM employees', (err, results) => {
        if (err) {
            return res.status(500).json({ message: 'Database error.', error: err });
        }
        res.status(200).json(results);
    });
};
