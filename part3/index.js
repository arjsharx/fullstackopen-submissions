require('dotenv').config();
const Person = require('./models/person');
const express = require('express');
const morgan = require('morgan');
const cors = require('cors');const { Query } = require('mongoose');
const app = express();
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

  Person.countDocuments({})
    .then(count => {
      const info = `<p>Phonebook has info for ${count} people</p>
                    <p>${date}</p>`;
      res.send(info);
    })
    .catch(error => next(error));
});

app.get('/api/persons/:id',(req,res,next)=> {
    const id = req.params.id;
    Person.findById(id).then(person => {
        if (person) {
            res.json(person);
        } else {
            res.status(404).end();
        }
    }).catch(error => next(error));
});
app.delete('/api/persons/:id', (request,response,next)=>{
    Person.findByIdAndDelete(request.params.id)
    .then(result => {
        if (result) {
            response.status(204).end();
        } else {
            response.status(404).json({ error: 'Person not found' });
        }
    }).catch(error => next(error));
});
app.post('/api/persons', (request, response,next) => {
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
    }).catch(error => next(error));
});
app.put('/api/persons/:id', (request, response, next) => {
    const id = request.params.id;
    const {number} = request.body;
    Person.findByIdAndUpdate(id, { number }, { new: true, runValidators: true, context: 'Query'}).then(updatedPerson => {
        if(updatedPerson){
            response.json(updatedPerson);
        } else {
            response.status(404).json({ error: 'Person not found' });
        }
    }).catch(error => next(error));
}); 
const errorHandler = (error, request, response, next) => {
  console.error(error.message)

  if (error.name === 'CastError') {
    return response.status(400).send({ error: 'malformatted id' })
  } 
  if (error.name === 'ValidationError') {
    return response.status(400).json({ error: error.message })
  }

  next(error)
}
app.use(errorHandler);
const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});