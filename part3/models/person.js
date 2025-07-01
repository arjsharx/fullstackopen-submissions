
const mongoose = require('mongoose');
mongoose.set('strictQuery', false);
const MONGO_URI = process.env.MONGO_URI;
console.log('Connecting to MongoDB...');
mongoose.connect(MONGO_URI).then(() => {
    console.log('Connected to MongoDB');
}).catch((error) => {
    console.error('Error connecting to MongoDB:', error.message);
});
const personSchema = new mongoose.Schema({
    name: {
    type: String,
    required: true,
    minlength: 3},
    number: {
    type: String,
    required: true,
    minlength: 8,
    validate: {
        validator: function(v) {
            return /\d{2,3}-\d+/.test(v);
        },
        message: props => `${props.value} is not a valid phone number!`     
    }
}
});
personSchema.set('toJSON', {
    transform: (document, returnedObject) => {
        returnedObject.id = returnedObject._id.toString();
        delete returnedObject._id;
        delete returnedObject.__v;
    }
});
module.exports = mongoose.model('Person', personSchema);