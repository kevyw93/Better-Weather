import React, { Component } from 'react';
// import logo from './logo.svg';
import './App.css';
import {get5DayWeather} from "./weather_api";

class App extends Component {
  constructor(props){
    super(props);
    this.state = {city: ""};
    this.handleChange = this.handleChange.bind(this);
    this.grabWeather = this.grabWeather.bind(this);
  }

  handleChange(field){
    return (e) => this.setState({[field]: e.target.value});
  }

  grabWeather(e){
    e.preventDefault();
    const cityStr = this.state.city;
    get5DayWeather(cityStr);
    debugger
  }

  render() {
    return (
      <div className="App">
        <input value={this.state.city} onChange={this.handleChange("city")} placeholder="Input City"/>
        <button onClick={this.grabWeather}>Submit</button>

      </div>
    );
  }
}

export default App;
