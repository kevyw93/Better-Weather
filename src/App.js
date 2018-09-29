import React, { Component } from 'react';
// import logo from './logo.svg';
import './App.css';
import {get5DayWeather} from "./weather_api";
import DailyComponent from "./daily_component";

class App extends Component {
  constructor(props){
    super(props);
    this.state = {city: "", weather: null, currCity: null};
    this.handleChange = this.handleChange.bind(this);
    this.grabWeather = this.grabWeather.bind(this);
  }

  handleChange(field){
    return (e) => this.setState({[field]: e.target.value});
  }

  grabWeather(e){
    e.preventDefault();
    const cityStr = this.state.city;
    let weather;
    get5DayWeather(cityStr).then(resp => {
      weather = [];
      for(let i = 0; i <resp.list.length; i += 8){
        weather.push(JSON.stringify(resp.list[i]));
      }
      return {weather: weather, currCity: resp.city.name};

    }).then((newResp) => {
      this.setState({weather: newResp.weather, currCity: newResp.currCity});
    });

  }

  render() {
    let DailyWeather;
    if(this.state.weather){
      const d = new Date();
      const today = d.getDay();
      const daysOfWeek = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
      DailyWeather = this.state.weather.map( (daily, i) => (
        <DailyComponent weather={daily} day={daysOfWeek[(parseInt(today) + i) % 7]}/>
      ));
    }
    return (
      <div className="App">
        <input value={this.state.city} onChange={this.handleChange("city")} placeholder="Input City"/>
        <button onClick={this.grabWeather}>Submit</button>
        <div className="daily-weather-container">
          {DailyWeather}
        </div>
      </div>
    );
  }
}

export default App;