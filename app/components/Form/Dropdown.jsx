import React from 'react';

export default class Dropdown extends React.Component {
  constructor() {
    super();
    this.state = { open: false };

    this._onToggle = this._onToggle.bind(this);
  }

  _onToggle() {
    this.setState({ open: !this.state.open });
  }

  _onSelect(item) {
    this._onToggle();
    this.props.onChange(this.props.name, item);
  }

  render() {
    const { value, options, disabled } = this.props;

    return (
      <div className="dropdown">
        <button className="btn btn-block dropdown-toggle" onClick={this._onToggle}>
          {options[value].label}
        </button>
        <ul className={`dropdown-menu ${this.state.open && 'show'}`}>
          {Object.keys(options).map((item, key) =>
            <li key={key} className="dropdown-item" onClick={() => this._onSelect(item)}>
              {options[item].label}
            </li>
          )}
        </ul>
      </div>
    );
  }
}
