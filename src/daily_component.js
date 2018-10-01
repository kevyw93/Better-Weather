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
      icon = <img alt="weather-icon" src = {`http://openweathermap.org/img/w/${this.state.weatherObj.weather[0].icon}.png`} />;
      description = this.state.weatherObj.weather[0].description;
    }
    return(
      <div className="day-container">
          <div className="dayofweek">
            {day}
          </div>
          <div>
            {date}
          </div>
          <div>
            {temp_min}
          </div>
          <div>
            {temp_max}
          </div>
          <div>
            {icon}
            {description}
          </div>
      </div>
    );
  }
}


export default DailyComponent;
