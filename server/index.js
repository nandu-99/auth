const express = require('express');
const cors = require("cors");
const dotenv = require("dotenv");
const bcrypt = require('bcrypt');
const jwt = require('./jwt'); // Import jwt.js functions
const db = require('./db'); // Import db.js for DB operations
const app = express();
const port = 3003;

dotenv.config();

app.use(express.json());
app.use(cors());

const saltRounds = 10; // Bcrypt salt rounds

// Connect to the database and start the server
db.connectDB().then(() => {
  app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
  });
}).catch(console.error);

// Signup route
app.post('/signup', async (req, res) => {
  const { email, password } = req.body;

  try {
    const usersCollection = db.getCollection();

    // Check if user already exists
    const existingUser = await usersCollection.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ error: 'User already exists' });
    }

    // Hash the password and save the user
    const hashedPassword = await bcrypt.hash(password, saltRounds);
    const newUser = { email, password: hashedPassword };
    await usersCollection.insertOne(newUser);

    res.status(201).json({ message: 'User created successfully' });
  } catch (err) {
    res.status(500).json({ error: 'Failed to create user' });
  }
});

// Login route
app.post('/login', async (req, res) => {
  const { email, password } = req.body;

  try {
    const usersCollection = db.getCollection();

    // Check if user exists
    const user = await usersCollection.findOne({ email });
    if (!user) {
      return res.status(400).json({ error: 'Invalid email or password' });
    }

    // Compare password with hashed password
    const passwordMatch = await bcrypt.compare(password, user.password);
    if (!passwordMatch) {
      return res.status(400).json({ error: 'Invalid email or password' });
    }

    // Generate a JWT token and send it back
    const token = jwt.generateToken(user);
    res.status(200).json({ token });
  } catch (err) {
    res.status(500).json({ error: 'Login failed' });
  }
});

// Example of a protected route that requires a valid JWT token
app.get('/protected', (req, res) => {
  const token = req.headers.authorization?.split(' ')[1]; // Get token from Authorization header
  if (!token) {
    return res.status(401).json({ error: 'No token provided' });
  }
  try {
    const decoded = jwt.verifyToken(token); // Verify token
    res.status(200).json({ message: 'Protected data', user: decoded });
  } catch (err) {
    res.status(401).json({ error: 'Invalid token' });
  }
});
