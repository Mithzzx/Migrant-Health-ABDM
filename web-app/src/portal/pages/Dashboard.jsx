import React from 'react';

export default function Dashboard() {
  return (
    <div className="page">
      <h2>Dashboard</h2>
      <div className="card-grid">
        {[
          { label: 'Active Patients', value: 128 },
          { label: 'Pending Consents', value: 6 },
          { label: 'Records Added Today', value: 42 },
          { label: 'Alerts (24h)', value: 3 },
        ].map(tile => (
          <div key={tile.label} className="card">
            <h3 style={{ margin: '0 0 .25rem' }}>{tile.value}</h3>
            <p style={{ margin:0, fontSize: '.75rem', color:'#555' }}>{tile.label}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
