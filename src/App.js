import React, { Component } from 'react';

//import logo from './logo.svg';
import './App.css';
import TodoApp from './components/TodoApp';

class App extends Component {
  render() {
    return (
      <div className="App">
        <TodoApp />
      </div>
    );
  }
}

export default App;





/*
<div className="App">
  <header className="App-header">
    <img src={logo} className="App-logo" alt="logo" />
    <h1 className="App-title">My Todo</h1>
  </header>
  <p className="App-intro">
  
  </p>
</div>
  */