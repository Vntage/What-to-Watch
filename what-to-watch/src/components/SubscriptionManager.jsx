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

      {/* Table for Available Services */}
      <table className="services-table">
        <thead>
          <tr>
            <th>Service Name</th>
            <th>Cost</th>
            <th>Renewal</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {predefinedPlans.map((plan) => (
            <tr key={plan.id}>
              <td>{plan.name}</td>
              <td>${plan.cost.toFixed(2)}</td>
              <td>{plan.renewal}</td>
              <td>
                <button
                  className="add-btn"
                  onClick={() => handleAddSubscription(plan)}
                >
                  Add
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* Subscribed Services */}
      <div className="subscriptions-section">
        <h3>My Subscriptions</h3>
        {subscriptions.length > 0 ? (
          <table className="services-table">
            <thead>
              <tr>
                <th>Service Name</th>
                <th>Cost</th>
                <th>Renewal</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {subscriptions.map((sub) => (
                <tr key={sub._id}>
                  <td>{sub.name}</td>
                  <td>${sub.cost.toFixed(2)}</td>
                  <td>{sub.renewal}</td>
                  <td>
                    <button
                      className="cancel-btn"
                      onClick={() => handleCancelSubscription(sub._id)}
                    >
                      Cancel Subscription
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        ) : (
          <p>No active subscriptions. Add one to get started!</p>
        )}
        <h3>Total Monthly Cost: ${totalCost.toFixed(2)}</h3>
        <h3>Average Subscription Cost: ${averageCost}</h3>
      </div>
    </div>
  );
};

export default SubscriptionManager;
