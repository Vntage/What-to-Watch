import React, { useState } from 'react';
import './SubscriptionManager.css';

const SubscriptionManager = () => {
  const [serviceName, setServiceName] = useState('');
  const [cost, setCost] = useState('');
  const [renewalDate, setRenewalDate] = useState('');
  const [subscriptions, setSubscriptions] = useState([]);

  const handleAddSubscription = (e) => {
    e.preventDefault();
    if (serviceName && cost && renewalDate) {
      const newSubscription = { serviceName, cost, renewalDate };
      setSubscriptions([...subscriptions, newSubscription]);
      setServiceName('');
      setCost('');
      setRenewalDate('');
    } else {
      alert('Please fill in all fields!');
    }
  };

  const handleCancelSubscription = (index) => {
    const updatedSubscriptions = subscriptions.filter((_, i) => i !== index);
    setSubscriptions(updatedSubscriptions);
  };

  return (
    <div className="subscription-manager-container">
      <h2>Manage Streaming Subscriptions</h2>
      <form onSubmit={handleAddSubscription} className="subscription-form">
        <input
          type="text"
          placeholder="Enter service name"
          value={serviceName}
          onChange={(e) => setServiceName(e.target.value)}
          className="form-input"
        />
        <input
          type="number"
          placeholder="Enter cost ($)"
          value={cost}
          onChange={(e) => setCost(e.target.value)}
          className="form-input"
        />
        <input
          type="date"
          placeholder="Renewal date"
          value={renewalDate}
          onChange={(e) => setRenewalDate(e.target.value)}
          className="form-input"
        />
        <button type="submit" className="submit-btn">
          Add Subscription
        </button>
      </form>

      <div className="subscriptions-section">
        <h3>Active Subscriptions</h3>
        {subscriptions.length > 0 ? (
          subscriptions.map((sub, index) => (
            <div key={index} className="subscription-card">
              <h4>{sub.serviceName}</h4>
              <p>Cost: ${sub.cost}</p>
              <p>Renewal Date: {sub.renewalDate}</p>
              <button
                onClick={() => handleCancelSubscription(index)}
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
    </div>
  );
};

export default SubscriptionManager;
