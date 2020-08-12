import React, { Component } from 'react';
import './App.css';
import Header from './components/Header';
import SearchBar from './components/SearchBar';
import Login from './components/Login';


class App extends Component {

  state = {
    authUser: null,
  }
  
  render() {
    return (
      <div>
        <Header />
        <Login />
      </div>

    );
  }
}

export default App;
