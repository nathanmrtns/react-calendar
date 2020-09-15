import React from 'react';
import { connect } from 'react-redux';
import moment from 'moment';

import './styles.css'
const Day = props => {
  const {
    day,
    day: { date, isCurrentMonth, isToday, number, isWeekend },
    select,
    selected,
    reminders,
  } = props;
  const dayReminders = reminders[Object.keys(reminders).filter(k => moment(k).isSame(date))] || [];

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
        dayReminders.map(r => {
          return <p>{r.title}</p>
        })
      }
    </div>
  );
};

const mapStateToProps = state => state.reminders;

const DayContainer = connect(
  mapStateToProps,
)(Day);

export default DayContainer;
