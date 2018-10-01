import React,{Component} from "react";

class DailyComponent extends Component {
  constructor(props) {
    super(props);
    this.state = {weatherObj: null};
  }

  componentDidMount(){
    this.setState({weatherObj: JSON.parse(this.props.weather)});
  }

  render() {
    let date;
    let temp_min;
    let temp_max;
    let day;
    let icon;
    let description;
    if(this.state.weatherObj){
      day = this.props.day;
      date = this.state.weatherObj.dt_txt.split(" ")[0].split("-").slice(1).join("/");
      temp_min = this.state.weatherObj.main.temp_min;
      temp_max = this.state.weatherObj.main.temp_max;
      icon = <img className="weather-img" alt="weather-icon" src = {`http://openweathermap.org/img/w/${this.state.weatherObj.weather[0].icon}.png`} />;
      description = this.state.weatherObj.weather[0].description;
    }
    return(
      <div className="day-container">
          <div className="dayofweek">
            <h1>{day}</h1> <h4>{date}</h4>
          </div>
          <div>
            <div>{icon}</div>
            <h4 className="description">{description}</h4>
          </div>
          <div className="temp-container">
            <div className="max-min">
              <h3>Min:</h3>
              <h3>Max:</h3>
            </div>
            <div className="temp-inner-container">
              <div className="temp"><h3>{temp_min}</h3><span className="dot"></span><h3>F</h3></div>
              <div className="temp"><h3>{temp_max}</h3><span className="dot"></span><h3>F</h3></div>
            </div>
          </div>
      </div>
    );
  }
}


export default DailyComponent;
