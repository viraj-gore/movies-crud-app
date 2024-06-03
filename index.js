const express = require('express')
const app = express()
app.use(express.json())
const Movie = require('./models/movie.model.js');
const mongoose = require('mongoose');
const movie = require('./models/movie.model.js');

app.get('/api/movies', async (req, res) => {
    try {
        const movies = await Movie.find({});
        res.status(200).json(movies);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

app.get('/api/movie/:id', async (req, res) => {
    try {
        const {id} = req.params;
        const movie = await Movie.findById(id);
        if  (!movie) {
            return res.status(404).json({ message: 'Movie not found' });
        }
        res.status(200).json(movie);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

app.post('/api/movies', async (req, res) => {
    try {
        const movie = await Movie.create(req.body);
        res.status(200).json(movie);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// update a movie 
app.put('/api/movie/:id', async (req, res) => {
    try {
        const {id} = req.params;
        const product = await Movie.findByIdAndUpdate(id, req.body);
        if (!movie) {
            return res.status(404).json({ message: "Movie not found" });
        }
        const updatedMovie = await Movie.findById(id);
        res.status(200).json(updatedMovie);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
})

// delete a movie 

app.delete('/api/movie/:id', async (req, res) => {
    try {
        const {id} = req.params;
        const movie = await Movie.findByIdAndDelete(id);
        if (!movie) {
            return res.status(404).json({ message: "Movie not found" });
        }
        res.status(200).json()
    } catch (error) {
        res.status(500).json({ message: "Movie deleted successfully"});
    }
})

mongoose.connect("mongodb+srv://virajgore711:Viraj07@backenddb.ia25he7.mongodb.net/Movie-API?retryWrites=true&w=majority&appName=BackendDB").then(() => {
    console.log("Connected to database!");
    app.listen(2000, () => {
        console.log('Server is running on port 2000');
    });
})
    .catch(() => {
        console.log("Connection failed");
    });