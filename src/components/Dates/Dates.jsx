import React, {Component} from 'react';
import {DateRangePicker} from 'react-dates';
import moment from 'moment';
import './Dates.scss'
import CalendarIcon from '../../assets/images/calendar_ionicon.svg';

class Dates extends Component {
  state = {
    startDate: this.props.date === null ? moment() : moment(this.props.date.substring(0, 10)),
    endDate: this.props.date === null ? moment() : moment(this.props.date.substring(14)),
    focusedInput: null,
    touched: false
  };

  handleDateChange = ({startDate, endDate}) => {
    this.setState({startDate, endDate});
    const date = moment(startDate).format('MM/D/YYYY') + ' - ' + moment(endDate).format('MM/D/YYYY');
    this.setState({touched: true})
    this.props.submit(date);
  }

  handleFocusChange = focusedInput => this.setState({focusedInput});

  isOutsideRange = () => false;

  render = () => {
    let start = this.state.startDate;
    let end = this.state.endDate;
    if(this.props.date !== null && this.state.touched === false) {
      start = moment(this.props.date.substring(0,10));
      end = moment(this.props.date.substring(12));
    }

    const calendarIcon = <img className="icon" src={CalendarIcon} alt="Calendar Icon"/>
    const icon = <span>&mdash;</span>

    return (
      <div className="container container_date">
        <h2>Date</h2>
          <DateRangePicker
             endDate={end}
             endDateId="endDate"
             focusedInput={this.state.focusedInput}
             isOutsideRange={this.isOutsideRange}
             onDatesChange={this.handleDateChange}
             onFocusChange={this.handleFocusChange}
             startDate={start}
             startDateId="startDate"
             customInputIcon={calendarIcon}
             customArrowIcon={icon}
          />
      </div>
    ) ;
  }
}

export default Dates;
