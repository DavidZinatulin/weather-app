import React from 'react';
import { connect } from "react-redux";
import _ from 'lodash';

import './App.scss';
import { generateFormValues } from 'app/utils/helpers';
import { searchForm } from 'app/forms/searchForm';
import { requestForecast, pinForecast } from 'app/redux/actions/forecastsActions';
import ForecastPanel from 'app/components/ForecastPanel/ForecastPanel';
import Form from 'app/components/Form/Form';

class App extends React.Component {
  constructor() {
    super();
    this.state = {
      [searchForm.name]: generateFormValues(searchForm.fields)
    };

    this._handleFormUpdate = this._handleFormUpdate.bind(this);
    this._submitSearchForm = this._submitSearchForm.bind(this);
  }

  _handleFormUpdate(formName, formField, formValue) {
    const newValues = { ...this.state[formName], [formField]: formValue };

    this.setState({ [formName]: newValues });
  }

  _submitSearchForm() {
    const formValues = this.state[searchForm.name];

    this.props.requestForecast(formValues.city, formValues.mode, 0);
  }

  render() {
    const { forecasts, pinForecast, requestForecast } = this.props;

    const searchResult = forecasts.length > 0 && <ForecastPanel data={forecasts[0]} onPin={pinForecast}/>;

    const pinnedForecasts = forecasts.length > 1 && (
      forecasts.slice(1).map((item, key) => (
        <ForecastPanel key={key} data={item} index={key} onRefresh={requestForecast}/>
      ))
    );

    const searchDisabled = forecasts.length > 0 && _.isEmpty(forecasts[0]);

    return (
      <div className="app">
        <div className="container">
          <Form
            structure={searchForm}
            values={this.state.searchForm}
            onUpdate={this._handleFormUpdate}
            onSubmit={this._submitSearchForm}
            disabled={searchDisabled}
          />
          <div className="text-right">
            <button
              type="button"
              className="btn btn-secondary"
              onClick={this._submitSearchForm}
              disabled={searchDisabled}
            >
              {searchDisabled ? <span>Searching...</span> : <span>Search</span>}
            </button>
          </div>
          {searchResult}
          {pinnedForecasts}
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  forecasts: state.forecasts,
});

const mapDispatchToProps = dispatch => ({
  requestForecast: (city, mode, index) => dispatch(requestForecast(city, mode, index)),
  pinForecast: (forecast) => dispatch(pinForecast(forecast)),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(App);
