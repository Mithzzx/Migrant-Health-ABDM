import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

export default function Login() {
  const nav = useNavigate();
  const [id, setId] = useState('');
  const [otp, setOtp] = useState('');

  const submit = (e) => {
    e.preventDefault();
    // TODO: integrate auth via backend / ABDM
    nav('/dashboard');
  };

  return (
    <div className="page" style={{ maxWidth: 420 }}>
      <h2>Doctor Portal Login</h2>
      <form onSubmit={submit} style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
        <label>
          Practitioner ID
          <input value={id} onChange={e => setId(e.target.value)} required />
        </label>
        <label>
          OTP
          <input value={otp} onChange={e => setOtp(e.target.value)} required />
        </label>
        <button type="submit">Enter Portal</button>
      </form>
    </div>
  );
}
