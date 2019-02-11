if (process.env.NODE_ENV !== 'production') {
    require('dotenv').config()
}
const express = require('express')
const app = express()
const bodyParser = require('body-parser')
const morgan = require('morgan')
const cors = require('cors')
const Person = require('./models/person')



app.use(express.static('build'))
app.use(cors())
app.use(bodyParser.json())

morgan.token('content', function getContent(req) {
    return JSON.stringify(req.body)
})

app.use(morgan(':method :url :status :res[content-length] - :response-time ms :content'))





let persons = [
    {
        "name": "Arto Hellas",
        "number": "040-123456",
        "id": 1
    },
    {
        "name": "Martti Tienari",
        "number": "040-123456",
        "id": 2
    },
    {
        "name": "Lea Kutvonen",
        "number": "040-123456",
        "id": 4
    },
    {
        "name": "Juha Tauriainen",
        "number": "050",
        "id": 5
    }
]



app.get('/', (req, res) => {
    res.send('Hello world!')

})


app.get('/api/persons', (req, res) => {
    Person.find({}).then(persons => {
        res.json(persons.map(person => person.toJSON()))
    })

})

app.get('/api/persons/:id', (req, res, next) => {
    Person.findById(req.params.id).then(person => {
        if (person) {
            res.json(person.toJSON())
        } else {
            res.status(404).end()
        }
    }).catch(error => next(error))

})

app.delete('/api/persons/:id', (req, res, next) => {
    Person.findByIdAndRemove(req.params.id)
        .then(res => {
            res.status(204).end()
        }).catch(error => next(error))
});

app.post('/api/persons', (req, res, next) => {

    const body = req.body
    console.log(req.get)


    if (body.name.length === 0) {
        return res.status(400).json({
            error: 'name missing'
        })
    }
    else if (body.number.length === 0) {
        return res.status(400).json({
            error: 'number missing'
        })
    }
    else if (persons.find(person => person.name === body.name)) {
        return res.status(400).json({
            error: 'already in the phonebook'
        })
    }
    const person = new Person({
        name: body.name,
        number: body.number,
        id: generateId()
    })

    person.save().then(savedPerson => {
        res.json(savedPerson.toJSON())
    })
        .catch(error => next(error))

    console.log(person)

})

app.put('/api/persons/:id', (req, res, next) => {
    const body = request.body

    const person = {
        name: body.name,
        number: body.number,
        id: generateId()
    }

    Person.findByIdAndUpdate(request.params.id, person, { new: true })
        .then(updatedPerson => {
            response.json(updatedPerson.toJSON())
        })
        .catch(error => next(error))
})

app.get('/api/info', (req, res) => {
    const date = new Date()
    res.send('Puhelinluettelossa on ' + persons.length + ' henkilön tiedot' + '<br>' + date + '</br>')

})

const unknownEndpoint = (request, response) => {
    response.status(404).send({ error: 'unknown endpoint' })
}

app.use(unknownEndpoint)

const errorHandler = (error, request, response, next) => {
    console.error(error.message)

    if (error.name === 'CastError' && error.kind == 'ObjectId') {
        return response.status(400).send({ error: 'malformatted id' })
    } else if (error.name === 'ValidationError') {
        return response.status(400).json({ error: error.message })
    }

    next(error)
}

app.use(errorHandler)

const generateId = () => {
    min = Math.ceil(1)
    max = Math.floor(1000)
    return Math.floor(Math.random() * (max - min)) + min
}



const PORT = process.env.PORT
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`)
})