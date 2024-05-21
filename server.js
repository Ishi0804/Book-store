
const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const path = require('path');
const Book = require('./models/book');
const app = express();
const PORT = 3000;

// Connect to MongoDB
mongoose.connect('mongodb://localhost:27017/bookstore', {
    useNewUrlParser: true,
    useUnifiedTopology: true
});

// Middleware
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, 'public')));
app.set('view engine', 'ejs');

// Routes
app.get('/', async (req, res) => {
    const books = await Book.find();
    res.render('index', { books });
});

app.get('/add-Book', (req, res) => {
    res.render('add-Book');
});

app.post('/add-Book', async (req, res) => {
    const { title, author, publisher, coverImage } = req.body;
    const newBook = new Book({ title, author, publisher, coverImage });
    await newBook.save();
    res.redirect('/');
});

app.get('/edit-Book/:id', async (req, res) => {
    const book = await Book.findById(req.params.id);
    res.render('edit-Book', { book });
});

app.post('/edit-Book/:id', async (req, res) => {
    const { title, author, publisher, coverImage } = req.body;
    await Book.findByIdAndUpdate(req.params.id, { title, author, publisher, coverImage });
    res.redirect('/');
});

app.post('/delete-book/:id', async (req, res) => {
    await Book.findByIdAndDelete(req.params.id);
    res.redirect('/');
});

app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});

