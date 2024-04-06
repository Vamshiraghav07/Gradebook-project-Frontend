
import React from 'react';

function Header() {
  return (
    <header>
      <h1>Gradebook Project</h1>
      <p>Date: {new Date().toLocaleDateString()}</p>
      {}
    </header>
  );
}

export default Header;
