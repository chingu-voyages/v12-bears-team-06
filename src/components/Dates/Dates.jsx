import React, {Component} from 'react';
import {DateRangePicker} from 'react-dates';
import moment from 'moment';
import './Dates.scss'

class Dates extends Component {
  state = {
    startDate: moment(),
    endDate: moment(),
    focusedInput: null
  };

  handleDateChange = ({startDate, endDate}) => this.setState({startDate, endDate});

  handleFocusChange = focusedInput => this.setState({ focusedInput });

  isOutsideRange = () => false;

  render = () => (
    <div className="container container_date">
      <h2>Date</h2>
        <DateRangePicker
           endDate={this.state.endDate}
           endDateId="endDate"
           focusedInput={this.state.focusedInput}
           isOutsideRange={this.isOutsideRange}
           onDatesChange={this.handleDateChange}
           onFocusChange={this.handleFocusChange}
           startDate={this.state.startDate}
           startDateId="startDate"
        />
    </div>

  );
}

export default Dates;
