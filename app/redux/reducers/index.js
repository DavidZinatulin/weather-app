import { combineReducers } from 'redux';
import forecasts from './forecastsReducer';

export const rootReducer = combineReducers({
  forecasts
});
