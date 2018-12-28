import {
  REQUEST_FORECAST,
  RECEIVE_FORECAST,
  REJECT_FORECAST,
  PIN_FORECAST
} from 'app/utils/constants';

const initialState = [];

export default (state = initialState, action) => {
  switch (action.type) {
    case REQUEST_FORECAST:
      return Object.assign(
        [...state],
        { [action.index]: {} }
      );
    case RECEIVE_FORECAST:
      return Object.assign(
        [...state],
        { [action.index]: action.data }
      );
    case REJECT_FORECAST:
      return Object.assign(
        [...state],
        { [action.index]: { error: action.error } }
      );
    case PIN_FORECAST:
      return [...state, action.forecast];
    default:
      return state;
  }
};
