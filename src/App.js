import React from 'react';
import './App.css';
import Header from './components/Header';
import SearchBar from './components/SearchBar';
import View from './components/View';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {shared_var: "init"};
}

updateShared(shared_value) {
  this.setState({shared_var: shared_value});
}
  render() {
      return (
          <div><Header />
          <SearchBar /></div>
          
      );
  }
}

export default App;
