import React, { useState } from 'react';
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

  const handleAddSubscription = (plan) => {
    
    // Check if the plan is already added
    if (subscriptions.find((sub) => sub.id === plan.id)) {
      alert(`${plan.name} is already in your subscriptions.`);
      return;
    }

    setSubscriptions([...subscriptions, plan]);
  };

  const handleCancelSubscription = (id) => {
    const updatedSubscriptions = subscriptions.filter((sub) => sub.id !== id);
    setSubscriptions(updatedSubscriptions);
  };


  // Calculate total monthly cost
  const totalCost = subscriptions.reduce((sum, sub) => sum + sub.cost, 0);

  // Calculate average cost per service
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
            <div key={sub.id} className="subscription-card">
              <h4>{sub.name}</h4>
              <p>Cost: ${sub.cost}</p>
              <p>Renewal: {sub.renewal}</p>
              <button
                onClick={() => handleCancelSubscription(sub.id)}
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
    </div>
  );
};

export default SubscriptionManager;
