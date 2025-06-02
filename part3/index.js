require('dotenv').config();
const Person = require('./models/person');
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

app.get('/', (req, res) => {
    res.send('Hello World!');
});
app.get('/api/persons', (req, res) => {
    Person.find({}).then(persons => {
        res.json(persons);
    });
});
app.get('/info', (req, res) => {
    const date = new Date();
    const info = `<p>Phonebook has info for ${persons.length} people</p>
                  <p>${date}</p>`;
    res.send(info);
});
app.get('/api/persons/:id',(req,res)=> {
    const id = req.params.id;
    Person.findById(id).then(person => {
        if (person) {
            res.json(person);
        } else {
            res.status(404).end();
        }
    }).catch(error => {
        console.error('Error fetching person:', error.message);
        res.status(500).json({ error: 'Failed to fetch person' });
    });
});
app.delete('/api/persons/:id', (request,response)=>{
    const id = request.params.id;
    persons = persons.filter(person => person.id !==id);
    response.status(204).end();
});
app.post('/api/persons', (request, response) => {
    const person = request.body;
    if (!person.name || !person.number) {
        return response.status(400).json({ error: 'content missing' });
    }
    const newPerson = new Person({
        name: person.name,
        number: person.number,
    });
    newPerson.save().then(savedPerson => {
        response.json(savedPerson);
    }).catch(error => {
        console.error('Error saving person:', error.message);
        response.status(500).json({ error: 'Failed to save person' });
    });
    
});
const PORT = process.env.port;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});