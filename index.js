const express = require('express')
const app = express()

app.use(express.json())

let persons = [
    { 
        "id": 1,
        "name": "Arto Hellas", 
        "number": "040-123456"
      },
      { 
        "id": 2,
        "name": "Ada Lovelace", 
        "number": "39-44-5323523"
      },
      { 
        "id": 3,
        "name": "Dan Abramov", 
        "number": "12-43-234345"
      },
      { 
        "id": 4,
        "name": "Mary Poppendieck", 
        "number": "39-23-6423122"
      }
  ]

  const generateId = () => {
    const randoId = Math.floor(Math.random() * 10000)
    // persons.length > 0
    //   ? Math.max(...persons.map(n => n.id))
    //   : 0
    return randoId
  }
  
  app.post('/api/persons', (request, response) => {
    const body = request.body

    // Check if the name already exists in the phonebook
  if (persons.some(person => person.name === body.name)) {
    return response.status(400).json({ 
      error: 'Name must be unique' 
    });
  }
  
    if (!body.name || !body.number) {
      return response.status(400).json({ 
        error: 'name or number missing' 
      })
    }
  
    const person = {
      name: body.name,
      number: body.number || false,
      id: generateId(),
    }
  
    persons = persons.concat(person)
  
    response.json(person)
  })

app.get('/', (request, response) => {
  response.send('<h1>Hello World!</h1>')
})

app.get('/info', (request, response) => {
    const numOfPeople = Math.max(...persons.map(n => n.id));
    const currentDate = new Date().toString();

    response.send(`<p>Phonebook has info for ${numOfPeople} people</p><br><p>${currentDate}</p>`)
  })

app.get('/api/persons', (request, response) => {
    response.json(persons)
  })

app.get('/api/persons/:id', (request, response) => {
    const id = Number(request.params.id)
    const person = persons.find(person => person.id === id)
  
    if (person) {
      response.json(person)
    } else {
      response.status(404).end()
    }
  })

app.delete('/api/persons/:id', (request, response) => {
const id = Number(request.params.id)
persons = persons.filter(person => person.id !== id)

response.status(204).end()
})

const PORT = 3001
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})