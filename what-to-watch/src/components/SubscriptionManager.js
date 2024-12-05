import React, { useState } from 'react';
import axios from 'axios';
import './SubscriptionManager.css';

// Predefined plans
const predefinedPlans = [
  { id: 1, name: 'Netflix', cost: 15.99, renewal: 'Monthly' },
  { id: 2, name: 'Hulu', cost: 12.99, renewal: 'Monthly' },
  { id: 3, name: 'Disney+', cost: 10.99, renewal: 'Monthly' },
  { id: 4, name: 'Amazon Prime Video', cost: 8.99, renewal: 'Monthly' },
  { id: 5, name: 'Max', cost: 13.99, renewal: 'Monthly' },
];

const SubscriptionManager = () => {
  const [subscriptions, setSubscriptions] = useState([]);
  const [userId] = useState('123'); // Replace with dynamic user ID if available
  const [error, setError] = useState(null);

  // Fetch subscriptions from the backend
  useEffect(() => {
    const fetchSubscriptions = async () => {
      try {
        const response = await axios.get('http://localhost:5000/userId');
        setSubscriptions(response.data);
      } catch (err) {
        console.error('Error fetching subscriptions:', err);
        setError('Failed to load subscriptions. Please try again later.');
      }
    };
    fetchSubscriptions();
  }, [userId]);

  // Add a new subscription
  const handleAddSubscription = async (plan) => {
    try {
      const response = await axios.post('http://localhost:5000/subscriptions', {
        ...plan,
        userId,
      });
      setSubscriptions([...subscriptions, response.data]);
    } catch (err) {
      alert(err.response?.data?.message || 'Failed to add subscription');
    }
  };

  // Remove a subscription
  const handleCancelSubscription = async (id) => {
    try {
      await axios.delete('http://localhost:5000/api/subscriptions/id');
      setSubscriptions(subscriptions.filter((sub) => sub._id !== id));
    } catch (err) {
      console.error('Error canceling subscription:', err);
      alert('Failed to cancel subscription.');
    }
  };

  // Calculate total and average costs
  const totalCost = subscriptions.reduce((sum, sub) => sum + sub.cost, 0);
  const averageCost = subscriptions.length > 0 ? (totalCost / subscriptions.length).toFixed(2) : 0;

  return (
    <div className="subscription-manager-container">
      <h2>Manage Streaming Subscriptions</h2>

      <div className="available-plans">
        <h3>Available Plans</h3>
        {predefinedPlans.map((plan) => (
          <div key={plan.id} className="plan-card">
            <h4>{plan.name}</h4>
            <p>Cost: ${plan.cost}</p>
            <p>Renewal: {plan.renewal}</p>
            <button
              onClick={() => handleAddSubscription(plan)}
              className="add-btn"
            >
              Add to My Subscriptions
            </button>
          </div>
        ))}
      </div>

      <div className="subscriptions-section">
        <h3>My Subscriptions</h3>
        {subscriptions.length > 0 ? (
          subscriptions.map((sub) => (
            <div key={sub._id} className="subscription-card">
              <h4>{sub.name}</h4>
              <p>Cost: ${sub.cost}</p>
              <p>Renewal: {sub.renewal}</p>
              <button
                onClick={() => handleCancelSubscription(sub._id)}
                className="cancel-btn"
              >
                Cancel Subscription
              </button>
            </div>
          ))
        ) : (
          <p>No active subscriptions. Add one to get started!</p>
        )}
      </div>

      <div className="expense-tracker">
        <h3>Expense Summary</h3>
        <p>Total Monthly Cost: <strong>${totalCost.toFixed(2)}</strong></p>
        <p>Average Cost per Service: <strong>${averageCost}</strong></p>
      </div>

      {error && <p className="error-message">{error}</p>}
    </div>
  );
};

export default SubscriptionManager;
