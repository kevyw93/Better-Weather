import React,{Component} from "react";

class DailyComponent extends Component {
  constructor(props) {
    super(props);
    this.state = {weather: null};
  }

  componentDidMount(){
    this.setState({weather: JSON.parse(this.props.weather)});
  }

  render() {
    let date;
    let temp_min;
    let temp_max;
    let day;
    if(this.state.weather){
      day = this.props.day;
      date = this.state.weather.dt_txt.split(" ")[0].split("-").slice(1).join("/");
      temp_min = this.state.weather.main.temp_min;
      temp_max = this.state.weather.main.temp_max;
    }
    return(
      <div>
        <li>
          {day}
        </li>
        <li>
          {date}
        </li>
        <li>
          {temp_min}

        </li>
        <li>
          {temp_max}

        </li>
      </div>
    );
  }
}


export default DailyComponent;
