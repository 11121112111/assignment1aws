const express = require('express');
const mysql = require('mysql2');
const bodyParser = require('body-parser');
const cors = require('cors');
app.use(cors());


const app = express();
const port = 3000;

app.use(bodyParser.urlencoded({ extended: true }));


const connection = mysql.createConnection({
    host: 'assignment1.czvktyad06kg.us-east-1.rds.amazonaws.com',  
    user: 'admin',  
    password: 'admin12345meow',  
    database: 'LibraryDB'
});

connection.connect((err) => {
    if (err) {
        console.error('Error connecting to the database:', err.stack);
        return;
    }
    console.log('Connected to the database.');
});


app.get('/', (req, res) => {
    res.send(`
        <h1>Add a New Book</h1>
        <form action="/addBook" method="post">
            <label for="title">Title:</label><br>
            <input type="text" id="title" name="title"><br>
            <label for="author">Author:</label><br>
            <input type="text" id="author" name="author"><br>
            <label for="isbn">ISBN:</label><br>
            <input type="text" id="isbn" name="isbn"><br>
            <label for="publishedYear">Published Year:</label><br>
            <input type="number" id="publishedYear" name="publishedYear"><br>
            <label for="genre">Genre:</label><br>
            <input type="text" id="genre" name="genre"><br>
            <label for="language">Language:</label><br>
            <input type="text" id="language" name="language"><br><br>
            <input type="submit" value="Submit">
        </form>
        <br>
        <a href="/viewBooks">View All Books</a>
    `);
});


app.post('/addBook', (req, res) => {
    const { title, author, isbn, publishedYear, genre, language } = req.body;

    const sql = `INSERT INTO Books (Title, Author, ISBN, PublishedYear, Genre, Language) VALUES (?, ?, ?, ?, ?, ?)`;
    const values = [title, author, isbn, publishedYear, genre, language];

    connection.query(sql, values, (err, results) => {
        if (err) {
            console.error('Error inserting data into the database:', err.stack);
            res.send('Error adding book.');
            return;
        }
        res.send('Book added successfully! <br><a href="/">Go back</a>');
    });
});


app.get('/viewBooks', (req, res) => {
    const sql = `
        SELECT Books.BookID, Books.Title, Books.Author, Books.ISBN, Books.PublishedYear, Books.Genre, Books.Language, LibraryCopies.Available, LibraryCopies.CopyID
        FROM Books
        LEFT JOIN LibraryCopies ON Books.BookID = LibraryCopies.BookID;
    `;

    connection.query(sql, (err, results) => {
        if (err) {
            console.error('Error retrieving data from the database:', err.stack);
            res.send('Error retrieving books.');
            return;
        }

        let html = '<h1>All Books</h1><table border="1"><tr><th>Title</th><th>Author</th><th>ISBN</th><th>Published Year</th><th>Genre</th><th>Language</th><th>Available</th><th>Action</th></tr>';
        results.forEach(row => {
            html += `
                <tr>
                    <td>${row.Title}</td>
                    <td>${row.Author}</td>
                    <td>${row.ISBN}</td>
                    <td>${row.PublishedYear}</td>
                    <td>${row.Genre}</td>
                    <td>${row.Language}</td>
                    <td>${row.Available ? 'Yes' : 'No'}</td>
                    <td>
                        ${row.Available ? `<form action="/markUnavailable" method="post" style="display:inline;">
                            <input type="hidden" name="copyID" value="${row.CopyID}">
                            <input type="submit" value="Mark Unavailable">
                        </form>` : ''}
                    </td>
                </tr>
            `;
        });
        html += '</table><br><a href="/">Add a New Book</a>';
        res.send(html);
    });
});


app.post('/markUnavailable', (req, res) => {
    const { copyID } = req.body;

    const sql = `UPDATE LibraryCopies SET Available = FALSE WHERE CopyID = ?`;

    connection.query(sql, [copyID], (err, results) => {
        if (err) {
            console.error('Error updating data in the database:', err.stack);
            res.send('Error marking book as unavailable.');
            return;
        }
        res.send('Book marked as unavailable successfully! <br><a href="/viewBooks">View All Books</a>');
    });
});


app.listen(port, () => {
    console.log(`LibraryApp running at http://localhost:${port}`);
});
