import React from 'react';

export function PageSection({ children }) {
  return <section style={{ marginBottom:'1.5rem' }}>{children}</section>;
}

export function Grid({ children, cols='auto-fill', min=240 }) {
  return <div style={{ display:'grid', gap:'1rem', gridTemplateColumns:`repeat(${cols}, minmax(${min}px,1fr))` }}>{children}</div>;
}
