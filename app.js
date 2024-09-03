
require('dotenv').config();

const express = require('express');
const mysql = require('mysql');
const bodyParser = require('body-parser');
const app = express();

app.use(bodyParser.json());

const connection = mysql.createConnection({
    host: 'assignment1.czvktyad06kg.us-east-1.rds.amazonaws.com',  
    user: 'admin',  
    password: 'admin12345meow',  
    database: 'LibraryDB'
});

connection.connect((err) => {
    if (err) {
        console.error('Database connection failed: ' + err.stack);
        return;
    }
    console.log('Connected to database.');
});


app.post('/addBook', (req, res) => {
    const { title, author, isbn, publishedYear, genre, language } = req.body;

    const query = 'INSERT INTO Books (Title, Author, ISBN, PublishedYear, Genre, Language) VALUES (?, ?, ?, ?, ?, ?)';
    
    connection.query(query, [title, author, isbn, publishedYear, genre, language], (err, results) => {
        if (err) {
            console.error('Error adding book: ', err);
            res.status(500).send('Error adding book');
        } else {
            res.status(200).send('Book added successfully!');
        }
    });
});


app.get('/viewBooks', (req, res) => {

    const query = 'SELECT Books.BookID, Books.Title, Books.Author, Books.ISBN, Books.PublishedYear, Books.Genre, Books.Language, LibraryCopies.Available FROM Books JOIN LibraryCopies ON Books.BookID = LibraryCopies.BookID';
    
    connection.query(query, (err, results) => {
        if (err) {
            console.error('Error retrieving books: ', err);
            res.status(500).send('Error retrieving books');
        } else {
            res.status(200).json(results);
        }
    });
});


app.put('/updateAvailability/:id', (req, res) => {
    const bookId = req.params.id;
    const { available } = req.body;


    const query = 'UPDATE LibraryCopies SET Available = ? WHERE BookID = ?';

    connection.query(query, [available, bookId], (err, results) => {
        if (err) {
            console.error('Error updating availability: ', err);
            res.status(500).send('Error updating availability');
        } else {
            res.status(200).send('Book availability updated successfully!');
        }
    });
});


app.get('/', (req, res) => {
    res.send('Welcome to the Library Management System API!');
});


app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).send('Something went wrong!');
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
