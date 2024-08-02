import React from 'react';
import logo from './logo.svg';
import './App.css';
import InfiniteList from './components/InfiniteLists';

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          <InfiniteList/>
        </p>
      </header>
    </div>
  );
}

export default App;
