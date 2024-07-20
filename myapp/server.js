const express = require('express');
const bodyParser = require('body-parser');
const bcrypt = require('bcryptjs');
const path = require('path');
const app = express();
const PORT = 3001;

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// Servir les fichiers statiques à partir des dossiers "public", "css" et "images"
app.use(express.static(path.join(__dirname, 'public')));
app.use('/css', express.static(path.join(__dirname, 'css')));
app.use('/images', express.static(path.join(__dirname, 'images')));

let users = []; // Utilisation d'un tableau en mémoire pour les utilisateurs (pour l'exemple)

app.post('/register', (req, res) => {
    const { 'customer[first_name]': firstName, 'customer[last_name]': lastName, email, password } = req.body;

    // Hacher le mot de passe avant de le stocker
    bcrypt.hash(password, 10, (err, hashedPassword) => {
        if (err) {
            return res.status(500).send('Erreur lors du hachage du mot de passe');
        }

        // Créer un nouvel utilisateur
        const newUser = {
            firstName,
            lastName,
            email,
            password: hashedPassword
        };

        // Ajouter l'utilisateur à la base de données (ici, un tableau en mémoire)
        users.push(newUser);

        res.send('Compte créé avec succès');
    });
});

app.listen(PORT, () => {
    console.log(`Le serveur est en cours d'exécution sur le port ${PORT}`);
});