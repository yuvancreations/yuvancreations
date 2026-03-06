/**
 * MOCK SERVER - No MongoDB needed!
 * Uses a local JSON file as the database.
 * Run with: node mock-server.js
 */

const express = require('express');
const cors = require('cors');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const fs = require('fs');
const path = require('path');

const app = express();
app.use(cors());
app.use(express.json());

const DB_FILE = path.join(__dirname, 'mock-db.json');
const JWT_SECRET = 'mock_secret_key_for_testing';

// --- Helpers ---
const readDB = () => {
    if (!fs.existsSync(DB_FILE)) {
        fs.writeFileSync(DB_FILE, JSON.stringify({ users: [], messages: [] }, null, 2));
    }
    return JSON.parse(fs.readFileSync(DB_FILE, 'utf-8'));
};

const writeDB = (data) => {
    fs.writeFileSync(DB_FILE, JSON.stringify(data, null, 2));
};

const verifyToken = (req, res, next) => {
    const token = req.header('x-auth-token');
    if (!token) return res.status(401).json({ message: 'No token, authorization denied' });
    try {
        req.user = jwt.verify(token, JWT_SECRET);
        next();
    } catch {
        res.status(401).json({ message: 'Token is not valid' });
    }
};

const verifyAdmin = (req, res, next) => {
    verifyToken(req, res, () => {
        if (req.user.role !== 'admin') return res.status(403).json({ message: 'Admins only' });
        next();
    });
};

// --- Auth Routes ---

// POST /api/auth/signup
app.post('/api/auth/signup', async (req, res) => {
    try {
        const { name, email, password } = req.body;
        const db = readDB();

        if (db.users.find(u => u.email === email)) {
            return res.status(400).json({ message: 'User already exists' });
        }

        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        const isFirstUser = db.users.length === 0;
        const newUser = {
            _id: Date.now().toString(),
            name,
            email,
            password: hashedPassword,
            role: isFirstUser ? 'admin' : 'user',
            createdAt: new Date().toISOString()
        };

        db.users.push(newUser);
        writeDB(db);

        const token = jwt.sign({ id: newUser._id, role: newUser.role }, JWT_SECRET, { expiresIn: '7d' });

        res.status(201).json({
            token,
            user: { id: newUser._id, name: newUser.name, email: newUser.email, role: newUser.role }
        });
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Server error' });
    }
});

// POST /api/auth/login
app.post('/api/auth/login', async (req, res) => {
    try {
        const { email, password } = req.body;
        const db = readDB();

        const user = db.users.find(u => u.email === email);
        if (!user) return res.status(400).json({ message: 'Invalid credentials' });

        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) return res.status(400).json({ message: 'Invalid credentials' });

        const token = jwt.sign({ id: user._id, role: user.role }, JWT_SECRET, { expiresIn: '7d' });

        res.json({
            token,
            user: { id: user._id, name: user.name, email: user.email, role: user.role }
        });
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Server error' });
    }
});

// GET /api/auth/me
app.get('/api/auth/me', verifyToken, (req, res) => {
    const db = readDB();
    const user = db.users.find(u => u._id === req.user.id);
    if (!user) return res.status(404).json({ message: 'User not found' });
    const { password, ...safeUser } = user;
    res.json(safeUser);
});

// --- User Routes (Admin only) ---

// GET /api/users
app.get('/api/users', verifyAdmin, (req, res) => {
    const db = readDB();
    const safeUsers = db.users.map(({ password, ...u }) => u);
    res.json(safeUsers);
});

// DELETE /api/users/:id
app.delete('/api/users/:id', verifyAdmin, (req, res) => {
    const db = readDB();
    if (req.params.id === req.user.id) {
        return res.status(400).json({ message: 'Cannot delete your own admin account' });
    }
    db.users = db.users.filter(u => u._id !== req.params.id);
    writeDB(db);
    res.json({ message: 'User deleted' });
});

// --- Message Routes ---

// POST /api/messages
app.post('/api/messages', (req, res) => {
    try {
        const db = readDB();
        const msg = { _id: Date.now().toString(), ...req.body, createdAt: new Date().toISOString(), read: false };
        db.messages.push(msg);
        writeDB(db);
        res.status(201).json({ message: 'Message sent!' });
    } catch (err) {
        res.status(500).json({ message: 'Server error' });
    }
});

// GET /api/messages (Admin only)
app.get('/api/messages', verifyAdmin, (req, res) => {
    const db = readDB();
    res.json(db.messages.reverse());
});

// Base route
app.get('/', (req, res) => res.send('Yuvan Creations MOCK API is running...'));

const PORT = 5000;
app.listen(PORT, () => {
    console.log(`\n✅ Mock server running on http://localhost:${PORT}`);
    console.log('📁 Data stored in: mock-db.json');
    console.log('🔑 First signup will automatically become ADMIN\n');
});
