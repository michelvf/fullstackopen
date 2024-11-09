const express = require('express')
const app = express()
const cors = require('cors')

// Morgan configuration
const morgan = require('morgan')

// const requestLogger = (request, response, next) => {
//     console.log('Method:', request.method)
//     console.log('Path:  ', request.path)
//     console.log('Body:  ', request.body)
//     console.log('---')
//     next()
// }

app.use(express.json())
app.use(cors())
// app.use(requestLogger)
morgan.token('body', (req) => {
    return JSON.stringify(req.body)
})

const customFormat = ':method :url :status :res[content-length] - :response-time ms :body'
app.use(morgan(customFormat))

let persons = [
    { 
      "id": 1,
      "name": "Arto Hellas", 
      "number": "040-123456",
      "important": true,
    },
    { 
      "id": 2,
      "name": "Ada Lovelace", 
      "number": "39-44-5323523",
      "important": false,
    },
    { 
      "id": 3,
      "name": "Dan Abramov", 
      "number": "12-43-234345",
      "important": true,
    },
    { 
      "id": 4,
      "name": "Mary Poppendieck", 
      "number": "39-23-6423122",
      "importan": false,
    }
]

// Show list of PhoneBook
app.get('/api/persons', (request, response) => {
    response.json(persons)
})

// Show information of PhoneBook
app.get('/info', (request, response) => {
    const cantidad = persons.length
    const fecha = new Date
    response.send(`Phonebook as info for ${cantidad} people<p>${fecha}</p>`)
})

// Show only a persona of PhoneBook
app.get('/api/persons/:id', (request, response) => {
    const id = Number(request.params.id)
    const person = persons.find(person => person.id === id)
    
    if (person) {
        response.json(person)
      } else {
        response.status(404).end()
      }
})

// Delete a person of PhoneBook
app.delete('/api/persons/:id', (request, response) => {
    const id = Number(request.params.id)
    
    // personDelete = persons.find(person => person.id === id)
    // console.log(`voy a borrar a ${personDelete.name}`)
    
    persons = persons.filter(person => person.id !== id)
    response.status(204).end()
})

// Insert new person
const generateId = () => {
    const maxId = persons.length > 1
      ? Math.round(Math.random() * 9999999)
      : 0
    
    return maxId
}

app.post('/api/persons/', (request, response) => {
    const body = request.body

    if(!body.name || !body.number) {
        return response.status(404).json({
            error: 'name or number missing'
        })
    } 

    nameExist = persons.find(person => person.name === body.name)
    
    if (nameExist) {
        return response.status(404).json({
            error: 'name must be unique',
        })
    }

    const person = {
        id: generateId(),
        name: body.name,
        number: body.number,
    }

    persons = persons.concat(person)

    response.json(person)
})

// Send status 404 if de request is unknow
const unknownEndpoint = (request, response) => {
    response.status(404).send({ error: 'unknown endpoint' })
  }
  
app.use(unknownEndpoint)

// Configurate the listen port and default log when the app start
const PORT = 3001
app.listen(PORT)
console.log(`$Server running on port ${PORT}`)
