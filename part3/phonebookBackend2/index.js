require('dotenv').config();

const Person = require('./models/person');
const express = require('express');
const app = express();
const morgan = require('morgan');
const cors = require('cors');
var uniqueValidator = require('mongoose-unique-validator');

app.use(express.static('build'));
app.use(cors());
app.use(express.json());
app.use(morgan('tiny'));
Person.schema.plugin(uniqueValidator);

app.get('/api/persons', (request, response, next) => {
    persons = []
    Person.find({})
        .then(result => {
            result.forEach(person => {
                persons.push(person)
            })
            response.json(persons);
        })
        .catch(error => next(error))
});

app.get('/api/persons/:id', (request, response, next) => {
    Person.findById(request.params.id)
        .then(person => {
            response.json(person);
        })
        .catch(error => next(error))
});

app.delete('/api/persons/:id', (request, response, next) => {
    Person.findByIdAndRemove(request.params.id)
        .then(result => {
            response.status(204).end()
        })
        .catch(error => next(error))
});

app.post('/api/persons', (request, response, next) => {
    const body = request.body;

    const newPerson = new Person({
        name: body.name,
        number: body.number,
        date: new Date()
    });

    newPerson.save()
        .then(savedPerson => {
            response.json(savedPerson);
        })
        .catch(error => {
            next(error)
        })
});

app.put('/api/persons/:id', (request, response, next) => {
    const body = request.body

    const person = {
        name: body.name,
        number: body.number
    }

    Person.findByIdAndUpdate(request.params.id, person, { new: true })
        .then(updatedPerson => {
            response.json(updatedPerson)
        })
        .catch(error => next(error))
})

const errorHandler = (error, request, response, next) => {
    console.error(error.message)
    if (error.name === 'CastError') {
        return response.status(400).send({ error: 'malformatted id' })
    } else if (error.name === 'ValidationError') {
        return response.status(400).json({ error: error.message })
    }

    next(error)
}
app.use(errorHandler);

const PORT = process.env.PORT
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`)
});