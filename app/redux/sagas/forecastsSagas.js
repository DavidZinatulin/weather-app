import * as queryString from 'query-string';
import { call, put, takeEvery } from 'redux-saga/effects';
import { receiveForecast, rejectForecast } from 'app/redux/actions/forecastsActions';
import request from 'app/utils/ajax';
import { REQUEST_FORECAST } from 'app/utils/constants';

export function* fetchData(action) {
  const query = queryString.stringify({
    units: 'metric',
    q: action.city,
    APPID: APP_ID
  });

  const requestUrl = `${API_URL}${action.mode}?${query}`;

  try {
    const response = yield call(request, requestUrl);
    yield put(receiveForecast(response, action.index));
  } catch (err) {
    yield put(rejectForecast(err, action.index));
  }
}

export const forecastsSagas = [
  takeEvery(REQUEST_FORECAST, fetchData),
];
