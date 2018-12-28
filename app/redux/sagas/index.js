import { all } from 'redux-saga/effects';

import { forecastsSagas } from './forecastsSagas';

export default function* rootSaga() {
  yield all([
    ...forecastsSagas
  ])
}
