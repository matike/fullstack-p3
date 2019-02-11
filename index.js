const express = require('express')
const app = express()
const bodyParser = require('body-parser')
const morgan = require('morgan')
const cors = require('cors')

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
    res.json(persons)

})

app.get('/api/persons/:id', (req, res) => {
    const id = Number(req.params.id)
    const person = persons.find(person => person.id === id)

    if (person) {
        res.json(person)
    } else {
        Response.status(404).end()
    }
})

app.delete('/api/persons/:id', (req, res) => {
    const id = Number(req.params.id);
    persons = persons.filter(person => person.id !== id);

    res.status(204).end();
});

app.post('/api/persons', (req, res) => {

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
    const person = {
        name: body.name,
        number: body.number,
        id: generateId()
    }

    persons = persons.concat(person)
    console.log(person)
    res.json(person)

})

app.get('/api/info', (req, res) => {
    const date = new Date()
    res.send('Puhelinluettelossa on ' + persons.length + ' henkilön tiedot' + '<br>' + date + '</br>')

})

const generateId = () => {
    min = Math.ceil(1)
    max = Math.floor(1000)
    return Math.floor(Math.random() * (max - min)) + min
}

const PORT = process.env.PORT || 3001
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`)
})