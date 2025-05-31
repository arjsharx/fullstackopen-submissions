const express = require('express');
const morgan = require('morgan');
const cors = require('cors');const app = express();
app.use(express.json());
app.use(express.static('dist'));
app.use(cors());
morgan.token('body', (req)=> {
    return JSON.stringify(req.body);})
app.use((req,res,next) => {
    if(req.method === 'POST') {
    morgan(':method :url :status :res[content-length] - :response-time ms :body')(req,res,next);
    } else {
        morgan('tiny')(req,res,next);
    }
});
let persons = [
    { 
      "id": "1",
      "name": "Arto Hellas", 
      "number": "040-123456"
    },
    { 
      "id": "2",
      "name": "Ada Lovelace", 
      "number": "39-44-5323523"
    },
    { 
      "id": "3",
      "name": "Dan Abramov", 
      "number": "12-43-234345"
    },
    { 
      "id": "4",
      "name": "Mary Poppendieck", 
      "number": "39-23-6423122"
    }
]
app.get('/', (req, res) => {
    res.send('Hello World!');
});
app.get('/api/persons', (req, res) => {
    res.json(persons)
});
app.get('/info', (req, res) => {
    const date = new Date();
    const info = `<p>Phonebook has info for ${persons.length} people</p>
                  <p>${date}</p>`;
    res.send(info);
});
app.get('/api/persons/:id',(req,res)=> {
    const id = req.params.id;
    const person = persons.find(person => person.id === id);
    if(person){
        res.json(person);
    } else {
        res.status(404).end();
    }
});
app.delete('/api/persons/:id', (request,response)=>{
    const id = request.params.id;
    persons = persons.filter(person => person.id !==id);
    response.status(204).end();
});
app.post('/api/persons', (request, response) => {
    const person = request.body;
    if (!person.name || !person.number) {
        return response.status(400).json({ error: 'name or number missing' });
    }
    if (persons.find(p => p.name === person.name)) {
        return response.status(400).json({ error: 'name must be unique' });
    }
    person.id = Math.floor(Math.random() * 10000).toString();
    const newPerson = {
        id: person.id,
        name:person.name,
        number:person.number,
    };
    persons = persons.concat(newPerson);
    response.json(newPerson);
    
});
const PORT = process.env.port || 3001;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
