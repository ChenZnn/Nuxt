import dotenv from 'dotenv';
import express from 'express';
import mysql from 'mysql2';
import cors from 'cors';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';

dotenv.config(); // Charger les variables d'environnement

const app = express();
app.use(express.json());
app.use(cors());

// Connexion à la base de données MySQL
const db = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'nuxt_projet_blog'
});

db.connect(err => {
    if (err) {
        console.error('Erreur de connexion à MySQL :', err.message);
        return;
    }
    console.log('Connecté à la base de données MySQL');
});

// Route d'inscription
app.post('/register', async (req, res) => {
    const { username, password } = req.body;
    const hashedPassword = await bcrypt.hash(password, 10);
    db.query('INSERT INTO users (username, password) VALUES (?, ?)', 
        [username, hashedPassword], 
        (err, result) => {
            if (err) return res.status(500).json({ error: err.message });
            res.status(201).json({ message: 'Utilisateur inscrit' });
        }
    );
});

// Route de connexion
app.post('/login', (req, res) => {
    const { username, password } = req.body;
    db.query('SELECT * FROM users WHERE username = ?', [username], async (err, results) => {
        if (err) return res.status(500).json({ error: err.message });
        if (results.length === 0) return res.status(401).json({ message: 'Utilisateur non trouvé' });

        const user = results[0];
        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) return res.status(401).json({ message: 'Mot de passe incorrect' });

        const token = jwt.sign({ id: user.id, username: user.username }, 'secret', { expiresIn: '1h' });
        
        // 🔹 Renvoyer aussi le nom d'utilisateur
        res.json({ token, username: user.username });
    });
});


// Lancer le serveur sur le port 3001
app.listen(3001, () => console.log('Serveur API sur http://localhost:3001'));
