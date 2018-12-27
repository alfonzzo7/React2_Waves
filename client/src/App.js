import React, { Component } from 'react';
import axios from 'axios';

class App extends Component {
  componentDidMount() {
    axios.get('api/category/brands').then(response => {
      console.log(response);
    })
  }
  
  render() {
    return (
      <div className="App">
        My App
      </div>
    );
  }
}

export default App;
