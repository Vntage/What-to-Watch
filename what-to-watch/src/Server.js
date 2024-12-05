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

// Define Schema and Model
const reviewSchema = new mongoose.Schema({
  movieName: String,
  review: String,
  rating: Number,
});

const Review = mongoose.model('Review', reviewSchema);

// API Endpoints
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

// Define Schema and Model
const subscriptionSchema = new mongoose.Schema({
    name: String,
    cost: Number,
    renewal: String,
    userId: String, // To associate subscriptions with specific users
  });
  
  const Subscription = mongoose.model('Subscription', subscriptionSchema);
  
  // API Endpoints
  
  // Fetch all subscriptions for a user
  app.get('/userId', async (req, res) => {
    const { userId } = req.params;
    try {
      const subscriptions = await Subscription.find({ userId });
      res.json(subscriptions);
    } catch (err) {
      res.status(500).json({ error: 'Failed to fetch subscriptions' });
    }
  });
  
  // Add a new subscription
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
  
  // Delete a subscription by ID
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
