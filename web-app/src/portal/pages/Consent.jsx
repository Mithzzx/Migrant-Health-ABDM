import React, { useState } from 'react';

export default function Consent() {
  const [requests] = useState([
    { id: 1, patient: 'Ravi Kumar', scope: 'Labs, Prescriptions', status: 'pending' },
    { id: 2, patient: 'Meera Devi', scope: 'All Records', status: 'approved' },
  ]);

  return (
    <div className="page">
      <h2>Consent Management</h2>
      <div className="card" style={{ maxWidth: 520 }}>
        <h3 style={{ marginTop:0 }}>Requests</h3>
        <ul style={{ listStyle:'none', padding:0, margin:0, display:'flex', flexDirection:'column', gap:'.5rem' }}>
          {requests.map(r => (
            <li key={r.id} style={{ background:'#f9fafb', padding:'.5rem .75rem', borderRadius:6, border:'1px solid #e3e8ef' }}>
              <strong>{r.patient}</strong> – {r.scope} <span style={{ fontSize:'.65rem', textTransform:'uppercase', letterSpacing:'.5px', background:'#eef2ff', padding:'2px 6px', borderRadius:8 }}>{r.status}</span>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
