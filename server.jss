const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');

const app = express();
const PORT = process.env.PORT || 3000;

// MongoDB connection setup
mongoose.connect('mongodb://localhost:27017/techysoftware', {
    useNewUrlParser: true,
    useUnifiedTopology: true,
});

// Define a schema for customer details
const customerSchema = new mongoose.Schema({
    name: String,
    email: String,
    message: String,
});

// Create a model based on the schema
const Customer = mongoose.model('Customer', customerSchema);

// Middleware setup
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static('public'));

// Endpoint to handle form submissions
app.post('/submit-feedback', async (req, res) => {
    try {
        const { name, email, message } = req.body;
        const newCustomer = new Customer({ name, email, message });
        await newCustomer.save();
        res.send('Feedback submitted successfully!');
    } catch (error) {
        res.status(500).send('Error submitting feedback.');
    }
});

// Start the server
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
