import React from 'react';
import { BrowserRouter as Router, Route } from "react-router-dom";
import Login from './components/Login'
import './App.css';
import Home from './components/Home'

function App() {
  return (
    <div className="App">
      <Router>
           <Route exact path="/" component={Login} />
          <Route path="/login" component={Login} />
          <Route path="/home" component={Home} />
      </Router>
    </div>
  );
}

export default App;
