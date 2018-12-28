import {
  REQUEST_FORECAST,
  RECEIVE_FORECAST,
  REJECT_FORECAST,
  PIN_FORECAST
} from 'app/utils/constants';

export function requestForecast(city, mode, index) {
  return {
    type: REQUEST_FORECAST,
    index,
    city,
    mode
  };
}

export function receiveForecast(data, index) {
  return {
    type: RECEIVE_FORECAST,
    data,
    index
  };
}

export function rejectForecast(error, index) {
  return {
    type: REJECT_FORECAST,
    error: error.message,
    index
  };
}

export function pinForecast(forecast) {
  return {
    type: PIN_FORECAST,
    forecast
  };
}
