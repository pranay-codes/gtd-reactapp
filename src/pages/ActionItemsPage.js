import React, { useState, useEffect } from 'react';
import { fetchActionItems } from '../services/ApiService';
import ActionItemTable from '../components/ActionItemTable';

const NextActionItemsPage = () => {
  const [actionItems, setActionItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const loadActionItems = async () => {
      try {
        const items = await fetchActionItems();
        setActionItems(items);
      } catch (error) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    loadActionItems();
  }, []);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error}</p>;

  return <ActionItemTable items={actionItems} />;
};

export default NextActionItemsPage;
