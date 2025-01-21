require('dotenv').config();
const express = require('express');
const bodyParser = require('body-parser');
const bcrypt = require('bcryptjs');
const mariadb = require('mariadb');
const cors = require('cors');

const app = express();
app.use(bodyParser.json());
app.use(cors());

// MariaDB connection pool
const pool = mariadb.createPool({
    host: process.env.DB_HOST, // e.g., 'localhost'
    user: process.env.DB_USER, // e.g., 'root'
    password: process.env.DB_PASS, // Database password
    database: process.env.DB_NAME, // e.g., 'login_db'
    connectionLimit: 5,
});

// Route to register a new user
app.post('/register', async (req, res) => {
    const { username, password, email } = req.body;

    // Check if all fields are provided
    if (!username || !password || !email) {
        return res.status(400).json({ message: 'All fields are required.' });
    }

    // Validate email format (simple regex)
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
        return res.status(400).json({ message: 'Invalid email format.' });
    }

    try {
        // Check if username or email already exists
        const conn = await pool.getConnection();
        const userCheckQuery = 'SELECT * FROM users WHERE username = ? OR email = ?';
        const existingUser = await conn.query(userCheckQuery, [username, email]);

        if (existingUser.length > 0) {
            conn.release();
            return res.status(400).json({ message: 'Username or email already exists.' });
        }

        // Hash the password before saving
        const hashedPassword = await bcrypt.hash(password, 10);

        // Insert the new user into the database
        const insertQuery = `INSERT INTO users (username, password, email) VALUES (?, ?, ?)`;
        await conn.query(insertQuery, [username, hashedPassword, email]);

        conn.release();
        res.status(201).json({ message: 'User registered successfully.' });
    } catch (err) {
        console.error('Error during registration:', err);
        res.status(500).json({ message: 'Error registering user.' });
    }
});

// Route to log in a user
app.post('/login', async (req, res) => {
    const { email, password } = req.body;

    // Validate input fields
    if (!email || !password) {
        return res.status(400).json({ message: 'All fields are required.' });
    }

    try {
        const conn = await pool.getConnection();
        const query = `SELECT * FROM users WHERE email = ?`; // Assuming email is unique
        const rows = await conn.query(query, [email]);
        conn.release();

        if (rows.length === 0) {
            return res.status(401).json({ message: 'Invalid email or password.' });
        }

        const user = rows[0];
        const isPasswordValid = await bcrypt.compare(password, user.password);

        if (!isPasswordValid) {
            return res.status(401).json({ message: 'Invalid email or password.' });
        }

        res.status(200).json({
            message: 'Login successful.',
            user: { id: user.id, username: user.username, email: user.email },
        });
    } catch (err) {
        console.error('Error during login:', err);
        res.status(500).json({ message: 'Error logging in user.' });
    }
});

// Start the server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
