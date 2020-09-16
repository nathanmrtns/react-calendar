import React, { useState } from 'react';
import moment from 'moment';
import { connect } from 'react-redux';

import { addReminder, editReminder, removeReminder, removeAll } from '../../redux';

import DayNames from '../DayNames';
import Week from '../Week';
import ReminderModal from '../ReminderModal';
import './styles.css';

const Calendar = ({ addReminder, editReminder, removeReminder, removeAll }) => {
  const [month, setMonth] = useState(moment());
  const [selected, setSelected] = useState(moment().startOf('day'));
  const [selectedReminder, setSelectedReminder] = useState(null);
  const [isModalOpen, setModalOpen] = useState(false);
  const showModal = isOpen => {
    setModalOpen(isOpen);
  };

  const submitReminder = reminder => {
    addReminder(selected, reminder);
    closeReminder()
  };

  const editReminder_ = (newDay, oldDay, reminder) => {
    editReminder(newDay, oldDay, reminder);
    closeReminder()
  };

  const removeReminder_ = () => {
    removeReminder(selectedReminder)
    closeReminder();
  }

  const closeReminder = () => {
    setModalOpen(false)
    setSelectedReminder(null)
  }

  const removeReminders = () => {
    console.log('chamou')
    removeAll(selected)
    closeReminder();
  }

  const selectReminder = reminder => {
    setSelectedReminder(reminder);
    setModalOpen(true);
  };

  const previous = () => {
    const newMonth = month.subtract(1, 'month').clone();
    setMonth(newMonth);
  };

  const next = () => {
    const newMonth = month.add(1, 'month').clone();
    setMonth(newMonth);
  };

  const select = day => {
    setSelected(day.date);
    setMonth(day.date.clone());
    showModal(true);
  };

  const renderWeeks = () => {
    let weeks = [];
    let done = false;
    let date = month
      .clone()
      .startOf('month')
      .add('w' - 1)
      .day('Sunday');
    let count = 0;
    let monthIndex = date.month();

    while (!done) {
      weeks.push(
        <Week
          key={date}
          date={date.clone()}
          month={month}
          select={day => select(day)}
          selected={selected}
          selectReminder={selectReminder}
          closeReminder={closeReminder}
        />,
      );

      date.add(1, 'w');

      done = count++ > 2 && monthIndex !== date.month();
      monthIndex = date.month();
    }

    return weeks;
  };

  const renderMonthLabel = () => {
    return <span className="month-label">{month.format('MMMM YYYY')}</span>;
  };

  return (
    <section className="calendar">
      <header className="header">
        <div className="month-display row">
          <span className="arrow" onClick={previous}>
            {'<'}
          </span>
          {renderMonthLabel()}
          <span className="arrow" onClick={next}>
            {'>'}
          </span>
        </div>
        <DayNames />
      </header>
      {renderWeeks()}
      <ReminderModal
        modalOpen={isModalOpen}
        closeModal={closeReminder}
        create={submitReminder}
        edit={editReminder_}
        reminder={selectedReminder}
        removeReminder={removeReminder_}
        removeAllReminders={removeReminders}
      />
    </section>
  );
};

const mapStateToProps = state => ({
  reminders: state.reminders,
});

const mapDispatchToProps = {
  addReminder,
  editReminder,
  removeReminder,
  removeAll,
};

const CalendarContainer = connect(mapStateToProps, mapDispatchToProps)(Calendar);

export default CalendarContainer;
