import $ from "jquery";

export const get5DayWeather = (city) => {
  return $.ajax({
    type: "get",
    url: `http://api.openweathermap.org/data/2.5/forecast?q=${city}&units=imperial&&APPID=c3c12fbc0ae3a29059ceaa36e4e63189`,
    dataType: "jsonp",
    // error: function (xhr, textStatus, errorThrown) {
    //   alert("request failed");
    // }
  });
};
