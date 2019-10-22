import React, {Component} from 'react';
import {DateRangePicker} from 'react-dates';
import moment from 'moment';
import './Dates.scss'
import CalendarIcon from '../../assets/images/calendar_ionicon.svg';

class Dates extends Component {
  let start = moment();
  let end = moment();
  if(this.props.date !== null) {
    start = this.props.date.substring(0, 10);
    end = this.props.date.substring(14);
  }
  state = {
    startDate: start,
    endDate: end,
    focusedInput: null
  };

  handleDateChange = ({startDate, endDate}) => {
    this.setState({startDate, endDate});

    const date = moment(startDate).format('MM/D/YYYY') + ' - ' + moment(endDate).format('MM/D/YYYY');
    this.props.submit(date);
  }

  handleFocusChange = focusedInput => this.setState({focusedInput});

  isOutsideRange = () => false;


  render = () => {
    const calendarIcon = <img className="icon" src={CalendarIcon} alt="Calendar Icon"/>
    return (
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
             customInputIcon={calendarIcon}
          />
      </div>

    ) ;
  }
}

export default Dates;
