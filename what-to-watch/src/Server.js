const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors');

const app = express();

// Middleware
app.use(bodyParser.json());
app.use(cors());

// Connect to MongoDB
mongoose.connect('mongodb+srv://WhatToWatch:WhatToWatch@whattowatch.4lvtu.mongodb.net/', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
  .then(() => console.log('Connected to MongoDB'))
  .catch((err) => console.error('Failed to connect to MongoDB', err));

// User Schema and Model
const UserSchema = new mongoose.Schema({
  firstName: String,
  lastName: String,
  username: { type: String, unique: true },
  password: String,
});

const User = mongoose.model('User', UserSchema);

// Login Route
app.get('/getUser', async (req, res) => {
  console.log(`SERVER: GET USER REQ QUERY: ${JSON.stringify(req.query)}`);
  const { username, password } = req.query;

  try {
    const user = await User.findOne({ username, password });
    if (user) {
      res.json(user);
    } else {
      res.status(404).json({ error: 'User not found' });
    }
  } catch (err) {
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

// Signup Route
app.post('/createUser', async (req, res) => {
  const { username, password, firstName, lastName } = req.body;

  console.log(`SERVER: CREATE USER REQ BODY: ${JSON.stringify(req.body)}`);

  try {
    const exists = await User.exists({ username });
    if (!exists) {
      const user = new User({ username, password, firstName, lastName });
      await user.save();
      console.log(`User created! ${user}`);
      res.status(201).json(user);
    } else {
      console.log('Username already exists');
      res.status(400).json({ error: 'Username already exists' });
    }
  } catch (err) {
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

// Review Schema and Model
const reviewSchema = new mongoose.Schema({
  movieName: String,
  review: String,
  rating: Number,
});

const Review = mongoose.model('Review', reviewSchema);

// Reviews API Endpoints
app.get('/reviews', async (req, res) => {
  try {
    const reviews = await Review.find();
    res.json(reviews);
  } catch (err) {
    res.status(500).json({ error: 'Failed to fetch reviews' });
  }
});

app.post('/reviews', async (req, res) => {
  const { movieName, review, rating } = req.body;

  try {
    const newReview = new Review({ movieName, review, rating });
    await newReview.save();
    res.status(201).json(newReview);
  } catch (err) {
    res.status(400).json({ error: 'Failed to save review' });
  }
});

// Subscription Schema and Model
const subscriptionSchema = new mongoose.Schema({
  name: String,
  cost: Number,
  renewal: String,
  userId: String, // To associate subscriptions with specific users
});

const Subscription = mongoose.model('Subscription', subscriptionSchema);

// Subscription API Endpoints
app.get('/userId', async (req, res) => {
  const { userId } = req.params;

  try {
    const subscriptions = await Subscription.find({ userId });
    res.json(subscriptions);
  } catch (err) {
    res.status(500).json({ error: 'Failed to fetch subscriptions' });
  }
});

app.post('/subscriptions', async (req, res) => {
  const { name, cost, renewal, userId } = req.body;

  try {
    const newSubscription = new Subscription({ name, cost, renewal, userId });
    await newSubscription.save();
    res.status(201).json(newSubscription);
  } catch (err) {
    res.status(400).json({ error: 'Failed to add subscription' });
  }
});

app.delete('/id', async (req, res) => {
  const { id } = req.params;

  try {
    await Subscription.findByIdAndDelete(id);
    res.json({ message: 'Subscription deleted successfully' });
  } catch (err) {
    res.status(500).json({ error: 'Failed to delete subscription' });
  }
});

// Start Server
const PORT = 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
