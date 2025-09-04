import React, { useEffect, useState } from 'react';
import axios from 'axios';

export default function GrowthPage({ token }) {
  const [growth, setGrowth] = useState(null);
  const [message, setMessage] = useState('');

  useEffect(() => {
    if (!token) return;

    const fetchGrowth = async () => {
      try {
        const res = await axios.get('http://localhost:5000/growth', {
          headers: { Authorization: `Bearer ${token}` }
        });
        setGrowth(res.data);
        setMessage('');
      } catch (err) {
        setMessage(err.response?.data?.message || 'Error fetching growth data');
      }
    };

    fetchGrowth();
  }, [token]);

  if (message) return <p style={{ padding: 20 }}>{message}</p>;
  if (!growth) return <p style={{ padding: 20 }}>Loading...</p>;

  const levels = ['ruins', 'village', 'town', 'city', 'monument'];
  const currentLevelIndex = levels.indexOf(growth.level);

  return (
    <div style={{ padding: 20, maxWidth: 600, margin: '0 auto' }}>
      <h1>Growth Progress</h1>
      <p>Current Level: {growth.level}</p>
      <div style={{ display: 'flex', marginTop: 20, justifyContent: 'space-between' }}>
        {levels.map((lvl, idx) => {
          const isCompleted = idx < currentLevelIndex;
          const isCurrent = idx === currentLevelIndex;
          return (
            <div key={lvl} style={{ textAlign: 'center' }}>
              <div
                style={{
                  width: 50,
                  height: 50,
                  borderRadius: '50%',
                  backgroundColor: isCompleted ? 'green' : isCurrent ? 'orange' : '#ccc',
                  margin: '0 auto'
                }}
              />
              <span>{lvl}</span>
            </div>
          );
        })}
      </div>
      <div style={{ marginTop: 20 }}>
        <p>Progress: {growth.progress}%</p>
        <div style={{ height: 20, width: '100%', backgroundColor: '#eee', borderRadius: 10 }}>
          <div
            style={{
              width: `${growth.progress}%`,
              height: '100%',
              backgroundColor: 'orange',
              borderRadius: 10
            }}
          />
        </div>
      </div>
    </div>
  );
}
