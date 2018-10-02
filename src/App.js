import React, { Component } from 'react';
// import logo from './logo.svg';
import './App.css';
import {get5DayWeather} from "./weather_api";
import DailyComponent from "./daily_component";

class App extends Component {
  constructor(props){
    super(props);
    this.state = {city: "", weather: null, currCity: null, load:false};
    this.handleChange = this.handleChange.bind(this);
    this.grabWeather = this.grabWeather.bind(this);
  }

  handleChange(field){
    return (e) => this.setState({[field]: e.target.value});
  }


  grabWeather(e){
    e.preventDefault();
    this.setState({load: true});
    const cityStr = this.state.city;
    let weather;
    setTimeout(() => get5DayWeather(cityStr).then(resp => {
      weather = [];
      for(let i = 0; i <resp.list.length; i += 8){
        weather.push(JSON.stringify(resp.list[i]));
      }
      return {weather: weather, currCity: resp.city.name};
    }).then((newResp) => {
      this.setState({weather: newResp.weather, currCity: newResp.currCity, city:"", load: false});
    }).catch(() => {
      this.setState({load: false});
      alert("Not a valid location.");
    }), 2000);
  }

  render() {
    let DailyWeather;
    if(this.state.load){
      DailyWeather = <img alt="loading gif" src="https://cdn.dribbble.com/users/547544/screenshots/2718569/loading.gif"/>;
    }else if(this.state.weather){
      const d = new Date();
      const today = d.getDay();
      const daysOfWeek = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
      DailyWeather = this.state.weather.map( (daily, i) => (
        <DailyComponent id={i} key={i} weather={daily} day={daysOfWeek[(parseInt(today, 10) + i) % 7]}/>
      ));
    }else{
      DailyWeather = <main className="onLoad">Hey There! Enter A Location Above!</main>;
    }
    return (
      <main className="App">
        <section className="app-top-bar">
          <h1 className="app-title">Better Weather</h1>
          <div className ="input-container">
            <input value={this.state.city} onChange={this.handleChange("city")} placeholder="Input Location"/>
            <button onClick={this.grabWeather}><i className="fa fa-search fa-2x" aria-hidden="true"></i></button>
          </div>
        </section>
        <section className="daily-weather-container">
          {DailyWeather}
        </section>
      </main>
    );
  }
}

export default App;
