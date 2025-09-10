import React from 'react';

const sample = [
  { id: 'ABHA123', name: 'Ravi Kumar', age: 34, lastVisit: '2025-09-09', status: 'stable' },
  { id: 'ABHA124', name: 'Meera Devi', age: 28, lastVisit: '2025-09-08', status: 'follow-up' },
  { id: 'ABHA125', name: 'Sanjay Singh', age: 45, lastVisit: '2025-09-07', status: 'critical' },
];

export default function Patients() {
  return (
    <div className="page">
      <h2>Patients</h2>
      <table className="table">
        <thead>
          <tr>
            <th>ABHA ID</th>
            <th>Name</th>
            <th>Age</th>
            <th>Last Visit</th>
            <th>Status</th>
          </tr>
        </thead>
        <tbody>
          {sample.map(p => (
            <tr key={p.id}>
              <td>{p.id}</td>
              <td>{p.name}</td>
              <td>{p.age}</td>
              <td>{p.lastVisit}</td>
              <td><span className="status-badge">{p.status}</span></td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
