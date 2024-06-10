import React, { useState } from 'react';
import './App.css';
import Weather from './components/Weather';

function App() {
  const [theme, setTheme] = useState('light');

  const toggleTheme = () => {
    setTheme((prevTheme) => (prevTheme === 'light' ? 'dark' : 'light'));
  };

  return (
    <div className={`App ${theme}`}>

      <button onClick={toggleTheme} className="toggle-theme-btn">
        
        Switch to {theme === 'light' ? 'Dark' : 'Light'} Mode
      </button>
      <Weather theme={theme} />
    </div>
  );
}

export default App;