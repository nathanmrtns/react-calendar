import React from 'react';
import { connect } from 'react-redux';
import moment from 'moment';

import {removeReminder} from '../../actions'

import './styles.css'
const Day = props => {
  const {
    day,
    day: { date, isCurrentMonth, isToday, number, isWeekend },
    select,
    selectReminder,
    selected,
    reminders,
  } = props;
  
  const dayReminders = reminders[Object.keys(reminders).filter(k => moment(k).isSame(date))] || [];

  const showDetails = reminder => e => {
    e.stopPropagation();
    selectReminder(reminder);
  }

  return (
    <div
      key={date.toString()}
      className={
        'day' +
        (isToday ? ' today' : '') +
        (isCurrentMonth ? '' : ' different-month') +
        (date.isSame(selected) ? ' selected' : '') +
        (isWeekend ? ' weekend' : '')
      }
      onClick={() => select(day)}
    >
      {number}
      {
        dayReminders.map((r, i) => {
          return <div key={i} className={`reminder ${r.color}`} onClick={showDetails(r)}>{r.title}</div>
        })
      }
    </div>
  );
};

const mapStateToProps = state => state.reminders;
const mapDispatchToProps = {
  removeReminder,
}

const DayContainer = connect(
  mapStateToProps,
  mapDispatchToProps,
)(Day);

export default DayContainer;
