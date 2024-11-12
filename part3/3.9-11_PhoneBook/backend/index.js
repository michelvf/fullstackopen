const express = require('express')
const app = express()
const morgan = require('morgan')
const cors = require('cors')

morgan.token('body', function getBody (req) {
  const body = req.body
  return JSON.stringify(body)
})

app.use(express.json())
app.use(cors())
app.use(morgan(':method :url :status :res[content-length] - :response-time ms :body'))
// app.use(express.static('dist'))

const unknownEndpoint = (request, response) => {
  response.status(404).send({ error: 'unknown endpoint' })
}

let phonebooks = [
  { id: 1, name: 'Arto Hellas', number: '040-123456' },
  { id: 2, name: 'Ada Lovelace', number: '39-44-5323523' },
  { id: 3, name: 'Dan Abramov', number: '12-43-234345' },
  { id: 4, name: 'Mary Poppendieck', number: '39-23-6423122' }
]

// Get all the records of the PhoneBook
app.get('/', (request, response) => {
  response.send('<h1>Hello World! It is a PhoneBook</h1>')
})

app.get('/api/phonebooks', (request, response) => {
  response.json(phonebooks)
})

// Get a record of the PhoneBook
app.get('/api/phonebooks/:id', (request, response) => {
  const id = Number(request.params.id)
  const phonebook = phonebooks.find(phonebook => phonebook.id === id)
  // console.log(`el valor al buscar el id en phonebooks: ${phonebook}`)

  if (phonebook) {
    response.json(phonebook)
  } else {
    response.status(404).end()
  }
})

// Delete a record of the PhoneBook
app.delete('/api/phonebooks/:id', (request, response) => {
  const id = Number(request.params.id)
  phonebooks = phonebooks.filter(phonebook => phonebook.id !== id)

  response.status(204).end()
})

const generateId = () => {
  const maxId = phonebooks.length > 0
    ? Math.max(...phonebooks.map(n => n.id))
    : 0

  return maxId + 1
}

// Insert  a record of the PhoneBook
app.post('/api/phonebooks', (request, response) => {
  
  // console.log(phonebook)

  const body = request.body

  if (!body.name) {
    return response.status(404).json({
      error: 'content name or number, missing'
    })
  }

  const phonebook = {
    id: generateId(),
    name: body.name,
    number: body.number
  }

  phonebooks = phonebooks.concat(phonebook)
  
  response.json(phonebook)
})

// Update a record of the PhoneBook
app.put('/api/phonebooks/:id', (req, res) => {

  const id = Number(req.params.id)
  const body = req.body

  phonebook = phonebooks.find(phonebook => phonebook.id == id)

  const phonebookUpdate = {
    id: id,
    name: body.name,
    number: body.number
  }

  const phonebookIndex = phonebooks.indexOf(phonebook)

  phonebooks.splice(phonebookIndex, 1, phonebookUpdate)

  res.status(201).json(phonebookUpdate)
  })

app.use(unknownEndpoint)

const PORT = process.env.PORT || 3001
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})