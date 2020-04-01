import React from 'react';
import logo from './logo.svg';
import './App.css';

function App() {
  return (
    <div className="App">
      <Router>
           <Route exact path="/" component={Login} />
          <Route path="/login" component={Login} />
      </Router>
    </div>
  );
}

export default App;
