import React from 'react';
import logo from './logo.svg';
import './App.css';
import useAsyncMemo from './hooks/useAsyncMemo';

const fetchHelloWorld = async (): Promise<string> => {
  const response = await fetch('http://localhost:5454/HelloWorld');
  if (!response.ok) {
    throw new Error('Network response was not ok');
  }
  return await response.text();
};

function App() {
  const value = useAsyncMemo(fetchHelloWorld, []);

  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <div>
          {value}
        </div>
      </header>
    </div>
  );
}

export default App;
