import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import './layout.css';

export default function Layout({ children }) {
  const { pathname } = useLocation();
  return (
    <div className="app-shell">
      <aside className="sidebar">
        <h1 className="logo">Migrant Health</h1>
        <nav>
          <Link className={pathname === '/dashboard' ? 'active' : ''} to="/dashboard">Dashboard</Link>
          <Link className={pathname === '/patients' ? 'active' : ''} to="/patients">Patients</Link>
          <Link className={pathname === '/consent' ? 'active' : ''} to="/consent">Consent</Link>
        </nav>
      </aside>
      <main className="main-area">
        {children}
      </main>
    </div>
  );
}
