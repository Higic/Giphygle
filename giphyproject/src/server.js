const express = require('express');
const bodyParser = require('body-parser');
const mysql = require('mysql');
const cors = require('cors');
const app = express();
const port = 5000

// Connect to the MySQL database
const connection = mysql.createConnection({
    host: '',
    user: '',
    password: '',
    database: ''
});

// enable CORS for all routes
app.use(cors());

// Middleware to parse request body as JSON
app.use(bodyParser.json());

// Endpoint to handle user registration
app.post('/users', (req, res) => {
    const { uid, email } = req.body;

    const query = 'INSERT IGNORE INTO users (uid, email) VALUES (?, ?)';
    const values = [uid, email];

    connection.query(query, values, (error, results) => {
        if (error) throw error;
        res.send(results);
    });
});

// Endpoint GET to retrieve URL's from database with currently logged in users' UID
app.get('/users/:uid/favs', (req, res) => {
    const { uid } = req.params;
    const query = 'SELECT favs FROM user_favs WHERE user_uid = ?';
    connection.query(query, [uid], (error, results) => {
        if (error) {
            console.error(error);
            return res.status(500).json({ error: 'Internal server error' });
        }
        if (results.length === 0) {
            return res.status(404).json({ error: 'Favorites not found' });
        }
        console.log(results);
        const favsArray = results.map(result => result.favs);
        return res.status(200).json({ favs: favsArray });

        /*const { favs } = results[0];
        return res.status(200).json({ favorites: favs });*/
    });
});

// POST favs to database
app.post('/users/:uid/favs', (req, res) => {
    const { uid } = req.params;
    const { favs } = req.body;

    // Validate the request body
    if (!favs) {
        return res.status(400).json({ error: 'Missing required parameter: favs' });
    }

    // Insert the new favorite item into the user_favs table
    const query = 'INSERT INTO user_favs (user_uid, favs) VALUES (?, ?)';
    connection.query(query, [uid, favs], (error, results) => {
        if (error) {
            console.error(error);
            return res.status(500).json({ error: 'Internal server error' });
        }
        const newId = results.insertId;
        return res.status(201).json({ id: newId, user_uid: uid, favs: favs });
    });
});

// DELETE favs from database
app.delete('/users/:uid/favs', (req, res) => {
    const { uid } = req.params;
    const { favs } = req.body;

    // Validate the request body
    if (!favs) {
        return res.status(400).json({ error: 'Missing required parameter: favs' });
    }

    // Insert the new favorite item into the user_favs table
    const query = 'DELETE FROM user_favs WHERE user_uid = ? AND favs = ?';
    connection.query(query, [uid, favs], (error, results) => {
        if (error) {
            console.error(error);
            return res.status(500).json({ error: 'Internal server error' });
        }
        const numRowsAffected = results.affectedRows; 
        if (numRowsAffected === 0) {
            return res.status(404).json({ error: 'Favorite item not found' });
        }
        return res.status(200).json({ message: 'Favorite item deleted succesfully' });
    });
});


// Define a GET endpoint to retrieve all users
app.get('/users', (req, res) => {
    const query = 'SELECT * FROM users';
    connection.query(query, (error, results) => {
        if (error) throw error;
        res.send(results);
    });
});

app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
})
