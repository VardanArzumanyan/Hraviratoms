const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const path = require('path');

const app = express();
const PORT = process.env.PORT || 5000;

// Connect to MongoDB
mongoose.connect("mongodb+srv://vardanarzumanyan22:WLpeVPIdiUaw7GgH@cluster0.u5elbkq.mongodb.net/hyurer?retryWrites=true&w=majority&appName=Cluster0", {
  useNewUrlParser: true,
  useUnifiedTopology: true,
}).then(() => {
  console.log('Connected to MongoDB');
}).catch(err => {
  console.error('Failed to connect to MongoDB', err);
});

// Define Guest schema and model
const guestSchema = new mongoose.Schema({
  firstName: String,
  lastName: String,
  guestCount: Number,
});
const Guest = mongoose.model('Guest', guestSchema);

// Middleware to parse incoming request bodies
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Serve static files from the React app
app.use(express.static(path.join(__dirname, 'hraviratoms', 'build')));

// Endpoint to handle form submissions
app.post('/submit', (req, res) => {
  const { firstName, lastName, guestCount } = req.body;

  // Create a new guest
  const newGuest = new Guest({
    firstName,
    lastName,
    guestCount,
  });

  // Save the new guest to MongoDB
  newGuest.save().then(() => {
    res.status(200).json({ message: 'Data saved successfully' });
  }).catch(err => {
    console.error('Error saving data:', err);
    res.status(500).json({ error: 'Error saving data' });
  });
});

// Endpoint to fetch guest list
app.get('/guests', (req, res) => {
  Guest.find().then(guests => {
    res.status(200).json(guests);
  }).catch(err => {
    console.error('Error fetching guests:', err);
    res.status(500).json({ error: 'Error fetching guests' });
  });
});

// Fallback to React's index.html for unknown routes (for client-side routing)
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'hraviratoms', 'build', 'index.html'));
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
