const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors');

const app = express();

// Middleware
app.use(bodyParser.json());
app.use(cors());

const UserSchema = new mongoose.Schema({
  username: String,
  email: String,
  password: String,
  role: { type: String, default: 'user'} //will default to user role, but can be changed in mongo to 'admin'
});

const User = mongoose.model('User', UserSchema);

// Connect to MongoDB
mongoose.connect('mongodb+srv://WhatToWatch:WhatToWatch@whattowatch.4lvtu.mongodb.net/', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
  .then(() => console.log('Connected to MongoDB'))
  .catch((err) => console.error('Failed to connect to MongoDB', err));

// Login Route
app.get('/getUser', async (req, res) => {
  console.log(`SERVER: GET USER REQ BODY: ${req.query}`)
  const email = req.query.email
  const password = req.query.password

  try {
    const user = await User.findOne({ email, password });
    if (!user) {
      return res.status(404).json({ error: 'Invalid email or password' });
    }
    res.json({
      _id: user._id,
      role: user.role,
    });
  } catch (error) {
    res.status(500).send(error)
  }
})

// Signup Route
app.post('/createUser', async (req, res) => {
  console.log(`SERVER: CREATE USER REQ BODY: ${req.body.username} ${req.body.email} ${req.body.password}`)
  const { email, password} = req.body

  try {
    //Check if username already exists in database
    User.exists({ email }).then(result => {
      if (Object.is(result, null)) {
        const user = new User({
          ...req.body,
          password
        });
        user.save()
        console.log(`User created! ${user}`)
        res.send(user)
      }
      else {
        console.log("An account with that email already exists")
        res.status(500).send("An account with that email already exists")
      }
    })    
  } catch (err) {
    res.status(500).send(err);
  }
});

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
  const { userId } = req.query;
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
const PORT = 9000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));