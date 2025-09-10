import React from 'react';

export function Button({ children, variant = 'primary', ...rest }) {
  const styles = {
    primary: { background:'#0B6E4F', color:'#fff' },
    outline: { background:'#fff', color:'#0B6E4F', border:'1px solid #0B6E4F' }
  };
  return (
    <button style={{
      fontSize:14, padding:'0.55rem 1rem', borderRadius:6, cursor:'pointer',
      border:'none', letterSpacing:.3, ...styles[variant]
    }} {...rest}>{children}</button>
  );
}
