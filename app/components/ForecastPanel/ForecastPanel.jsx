import React from 'react';
import _ from 'lodash';
import './ForecastPanel.scss';
import { formatWeekDay, arrayNthElements } from 'app/utils/helpers';

const ForecastPanel = ({ data, index, onPin, onRefresh }) => {
  const { weather, main, error, name, city, list } = data;

  let cityName = '';
  if (name) cityName = name;
  if (city) cityName = city.name;

  const mode = list ? 'forecast' : 'weather';

  const renderIcon = (weather, main, dt_txt) => (
    <div className="forecast-panel__icon my-3">
      <div className="forecast-panel__weekday">{dt_txt && formatWeekDay(dt_txt)}</div>
      <img src={`${IMG_URL}${weather.icon}.png`} alt={weather.icon}/>
      <div className="forecast-panel__temp">
        <span className="forecast-panel__temp-min">{Math.round(main.temp_min)}º</span>
        <span className="forecast-panel__temp-max">{Math.round(main.temp_max)}º</span>
      </div>
    </div>
  );

  const pinButton = onPin &&
    <button type="button" className="btn btn-outline-secondary" onClick={() => onPin(data)}>
      Pin forecast
    </button>;

  const refreshButton = onRefresh &&
    <button type="button" className="btn btn-outline-secondary" onClick={() => onRefresh(cityName, mode, index + 1)}>
      Refresh
    </button>;

  const heading = !_.isEmpty(data) && !error &&
    <div className="forecast-panel__heading">
      <div><h3>{cityName}</h3></div>
      <div className="text-right">
        {pinButton}
        {refreshButton}
      </div>
    </div>;

  const currentWeather = weather && main && renderIcon(weather[0], main);

  const forecast = list &&
    <div className="row">
      {arrayNthElements(list, 8).map((item, key) => (
        <div key={key} className="col-4 col-sm-2">
          {renderIcon(item.weather[0], item.main, item.dt_txt)}
        </div>
      ))}
    </div>;

  const errorMessage = error && <p className="text-center">Error: {error}</p>;

  const loadingIcon = _.isEmpty(data) && <p className="text-center">loading...</p>;

  return (
    <div className="forecast-panel card my-3">
      {heading}
      {currentWeather}
      {forecast}
      {errorMessage}
      {loadingIcon}
    </div>
  );
};

export default ForecastPanel;
