const mongoose = require('mongoose');

if (process.argv.length < 3) {
    console.log('Please provide the password as an argument: node mongo.js <password>')
    process.exit(1)
}

const password = process.argv[2];
const url =
    `mongodb+srv://fullstack:${password}@cluster0.mvyvn.mongodb.net/person-app?retryWrites=true&w=majority`;

mongoose.connect(url, { useNewUrlParser: true, useUnifiedTopology: true, useFindAndModify: false, useCreateIndex: true })

const personSchema = new mongoose.Schema({
    name: String,
    number: String,
    date: Date,
})

const Person = mongoose.model('Person', personSchema)

if (process.argv.length === 3) {
    Person.find({}).then(result => {
        result.forEach(person => {
            console.log(person)
        })
        mongoose.connection.close()
    })
} else {
    const newName = process.argv[3];
    const newNumber = process.argv[4];
    const person = new Person({
        name: newName,
        number: newNumber,
        date: new Date(),
    })

    person.save().then(result => {
        console.log(result)
        mongoose.connection.close()
    })
}