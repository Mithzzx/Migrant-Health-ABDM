import React from 'react';

export function Card({ title, children, footer }) {
  return (
    <div style={{ background:'#fff', border:'1px solid #e3e8ef', borderRadius:8, padding:'1rem', boxShadow:'0 1px 2px rgba(0,0,0,.04)' }}>
      {title && <h3 style={{ margin:'0 0 .5rem', fontSize:16 }}>{title}</h3>}
      <div>{children}</div>
      {footer && <div style={{ marginTop:'.75rem', fontSize:12, color:'#555' }}>{footer}</div>}
    </div>
  );
}
