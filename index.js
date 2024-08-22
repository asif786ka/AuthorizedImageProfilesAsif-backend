const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const fs = require('fs-extra'); // For file operations
const path = require('path');

const app = express();
app.use(bodyParser.json({ limit: '1mb' })); // Limit request body to 1MB
app.use(cors()); // Enable CORS for cross-origin requests

// Path to the JSON file that stores user data
const dataFilePath = path.join(__dirname, 'data.json');

// Ensure the data file exists
fs.ensureFileSync(dataFilePath);

// Function to read data from the JSON file
const readData = async () => {
  try {
    const data = await fs.readJson(dataFilePath);
    return data.users || [];
  } catch (err) {
    return [];
  }
};

// Function to write data to the JSON file
const writeData = async (users) => {
  await fs.writeJson(dataFilePath, { users });
};

// Endpoint to handle user registration
app.post('/register', async (req, res) => {
  const { email, password } = req.body;
  const users = await readData();
  
  // Check if the user already exists
  const existingUser = users.find((u) => u.email === email);
  if (existingUser) {
    return res.status(409).json({ error: 'User already exists' });
  }
  
  // Create a new user
  const newUser = {
    userid: `user-${Math.random().toString(36).substr(2, 9)}`,
    email,
    password,
    avatar_url: '',
    token: null,
  };
  users.push(newUser);
  await writeData(users);
  
  res.status(201).json({ message: 'User registered successfully', userid: newUser.userid });
});

// Endpoint to handle user login and session creation
app.post('/sessions/new', async (req, res) => {
  const { email, password } = req.body;
  const users = await readData();
  const user = users.find((u) => u.email === email && u.password === password);
  if (user) {
    const token = `token-${Math.random().toString(36).substr(2)}`;
    user.token = token;
    await writeData(users);
    res.json({ userid: user.userid, token });
  } else {
    res.status(401).json({ error: 'Invalid email or password' });
  }
});

// Endpoint to fetch user profile data (requires a valid session token)
app.get('/users/:userid', async (req, res) => {
  const { userid } = req.params;
  const token = req.headers.authorization?.split(' ')[1];
  const users = await readData();
  const user = users.find((u) => u.userid === userid && u.token === token);
  if (user) {
    res.json({ email: user.email, avatar_url: user.avatar_url });
  } else {
    res.status(401).json({ error: 'Unauthorized' });
  }
});

// Endpoint to update the user's avatar (requires a valid session token)
app.post('/users/:userid/avatar', async (req, res) => {
  const { userid } = req.params;
  const { avatar } = req.body;
  const token = req.headers.authorization?.split(' ')[1];
  const users = await readData();
  const user = users.find((u) => u.userid === userid && u.token === token);
  if (user) {
    user.avatar_url = avatar;
    await writeData(users);
    res.json({ avatar_url: user.avatar_url });
  } else {
    res.status(401).json({ error: 'Unauthorized' });
  }
});

// Endpoint to handle user logout (removes session token)
app.delete('/sessions/logout', async (req, res) => {
  const { userid } = req.body;
  const users = await readData();
  const user = users.find((u) => u.userid === userid);
  if (user) {
    user.token = null;
    await writeData(users);
    res.status(200).json({ message: 'Logged out successfully' });
  } else {
    res.status(404).json({ error: 'User not found' });
  }
});

// Start the server on the specified port
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));

