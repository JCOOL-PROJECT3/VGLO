import React, { Component } from 'react';
import './App.css';
import Header from './components/Header';
import SearchBar from './components/SearchBar';
import View from './components/View';
import Login from './components/Login';

class App extends Component {
  
  render() {
    return (
      <div>
        <Login />
        <Header />
        <SearchBar />
      </div>

    );
  }
}

export default App;
