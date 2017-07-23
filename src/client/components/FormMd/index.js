import React, { PropTypes, Component } from 'react';
import classNames from 'classnames';

class FormMd extends Component {

  static propTypes = {
    value: PropTypes.oneOfType([
      React.PropTypes.string,
      React.PropTypes.number,
      React.PropTypes.bool,
    ]),
    labelCol: PropTypes.string,
    valueCol: PropTypes.string,
    label:    PropTypes.string.isRequired,
  };

  static defaultProps = {
    value:    '',
    label:    '',
    labelCol: '',
    valueCol: '',
  };

  render() {
    const {
      label,
      value,
      labelCol,
      valueCol,
    } = this.props;

    return (
      <div
        style={{ marginBottom: 0, paddingTop: '5px' }}
        className={'form-group form-md-line-input'}
      >
        <comp>
          <label
            className={classNames({ 'col-lg-6 col-md-6 col-sm-6': !labelCol }, labelCol, 'control-label')}
          >
            {label}
          </label>

          <div className={classNames({ 'col-lg-6 col-md-6 col-sm-6': !valueCol }, valueCol)} >
            {value}
          </div>

        </comp>
      </div>
    );
  }
}

export default FormMd;
