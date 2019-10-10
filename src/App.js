import React from 'react';
import './App.css';
import Routes from './routes';

function App() {

  return (
    <div className="container">
      <div className="content">
        <h1 id="main-title">
          Power Movies
        </h1>

        <Routes />

      </div>
    </div>
  );
}

export default App;
