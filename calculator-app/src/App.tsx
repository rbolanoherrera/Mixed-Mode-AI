import React from 'react';
import Calculator from './components/Calculator';
import './App.css';

function App() {
  const fontFamily = 'Arial, sans-serif';

  return (
    <div className="App">
      <Calculator fontFamily={fontFamily} />
    </div>
  );
}

export default App;
