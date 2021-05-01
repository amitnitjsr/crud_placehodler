import React from 'react';
import logo from './logo.svg';
import { Link } from 'react-router-dom';
import { Button } from 'reactstrap';
import './App.css';

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>This Assignment is created by Amit Maurya. Using React js</p>
        <Link
          to="/customer"
        >
          <Button>
            Go to Assignment
        </Button>
        </Link>
      </header>
    </div>
  );
}

export default App;
