const express = require('express');
const mysql = require('mysql2');
const cors = require('cors');
const bodyParser = require('body-parser');

const app = express();
const port = 5000;

// Middleware setup
app.use(cors());
app.use(bodyParser.json());

// Database connection
const db = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '', // Your MySQL password here
    database: 'connection', // Update to your database name
});

db.connect((err) => {
    if (err) {
        console.error('Database connection error:', err);
        return; // Exit the application if database connection fails
    }
    console.log('Connected to the MySQL database.');
});

// Endpoint for user registration
app.post('/register', (req, res) => {
    const { firstName, middleName, lastName, email, password } = req.body;

    const sql = 'INSERT INTO user (firstName, middleName, lastName, email, password) VALUES (?, ?, ?, ?, ?)';
    db.query(sql, [firstName, middleName, lastName, email, password], (error, results) => {
        if (error) {
            console.error('Error inserting data: ', error);
            return res.status(500).send('Error creating account');
        }
        res.status(201).send('Account created successfully');
    });
});

// Endpoint for user login
app.post('/login', (req, res) => {
    const { email, password } = req.body;
    const sql = 'SELECT * FROM user WHERE email = ?';

    db.query(sql, [email], (error, results) => {
        if (error) {
            console.error('Error querying database: ', error);
            return res.status(500).send('Internal Server Error');
        }

        if (results.length > 0) {
            const user = results[0];

            // Directly compare the provided password to the stored plain-text password
            if (user.password === password) {
                const token = 'your-jwt-token'; // Replace with actual token generation logic if needed
                return res.json({ token });
            } else {
                return res.status(401).send('Invalid email or password');
            }
        } else {
            return res.status(401).send('Invalid email or password');
        }
    });
});

// Endpoint to reset the password
app.post('/reset-password', (req, res) => {
    const { email, newPassword } = req.body;

    // Update the password directly without OTP verification
    const sqlUpdate = 'UPDATE user SET password = ? WHERE email = ?';
    db.query(sqlUpdate, [newPassword, email], (error, updateResults) => {
        if (error) {
            console.error('Error updating password:', error);
            return res.status(500).send('Error updating password');
        }
        if (updateResults.affectedRows > 0) {
            res.status(200).send('Password updated successfully');
        } else {
            res.status(400).send('Invalid email'); // Handle case where email is not found
        }
    });
});

// Start the server
app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});
