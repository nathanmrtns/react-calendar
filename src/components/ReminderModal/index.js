import React, { useState, useEffect } from 'react';
import { Modal, Button, Form } from 'react-bootstrap';
import moment from 'moment';

import { formatDate } from '../../helpers/helpers';
import './styles.css';

let hours = [...Array(24).keys()];
hours = hours.map(h => {
  let formattedNumber = ('0' + h).slice(-2);
  formattedNumber = `${formattedNumber}:00`;
  return (
    <option key={h} value={h}>
      {formattedNumber}
    </option>
  );
});

let colors = ['orange', 'blue', 'yellow', 'grey', 'pink', 'green', 'red'];
colors = colors.map(color => {
  return (
    <option key={color} value={color}>
      {color}
    </option>
  );
});

const WEATHER_URL = 'http://api.weatherapi.com/v1/forecast.json?key=5c358cfe8648402c99c185918201609&q=';

const ReminderModal = ({ modalOpen, closeModal, reminder, create, edit, removeReminder, removeAllReminders }) => {
  useEffect(() => {
    if (reminder) {
      setColor(reminder.color);
      setHour(reminder.hour);
      setLocation(reminder.location);
      setTitle(reminder.title);
      setDay(formatDate(moment(reminder.day)));

      fetchWeather(reminder);
    }
  }, [reminder]);

  const fetchWeather = async reminder => {
    const response = await fetch(`${WEATHER_URL}${reminder.location}&days=10`);
    if (response.status === 200) {
      const weather = await response.json();
      const forecastDays = weather.forecast.forecastday;
      let exactDay = forecastDays.find(fd => {
        return fd.date === moment(reminder.day).format('YYYY-MM-DD');
      });
      const firstForecast = weather.forecast.forecastday[0].day.condition.text;
      let condition = exactDay ? exactDay.day.condition.text : firstForecast;

      setWeather(condition);
    }
  };

  const handleClose = () => {
    setColor('orange');
    setHour('');
    setLocation('');
    setTitle('');
    setWeather('');
    setErrorMessage('');
    closeModal();
  };

  const [color, setColor] = useState('orange');
  const [hour, setHour] = useState('');
  const [title, setTitle] = useState('');
  const [location, setLocation] = useState('');
  const [day, setDay] = useState('');
  const [weather, setWeather] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  const submitReminder = () => {
    if (reminder) {
      let oldDay = reminder.day;
      let newDay = moment(day);
      if (newDay.isValid()) {
        const newReminder = { ...reminder, day: newDay, title, location, hour, color };
        edit(newDay, oldDay, newReminder);
      } else {
        setErrorMessage('Invalid date!');
      }
    } else if (!reminder && title && hour && location) {
      const newReminder = { title, location, hour, color };
      create(newReminder);
      handleClose();
    } else {
      setErrorMessage('Please check if all field are filled!');
    }
  };

  const removeAll = () => {
    removeAllReminders();
    handleClose();
  };

  return (
    <>
      <Modal size="lg" className="reminder-modal" show={modalOpen} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>{!reminder ? 'Create' : 'Edit'} Reminder</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group controlId="formBasicEmail">
              <Form.Label size="lg">Reminder</Form.Label>
              <Form.Control
                size="lg"
                placeholder="Enter your reminder"
                value={title}
                onChange={e => e.target.value.length <= 30 && setTitle(e.target.value)}
              />

              <Form.Label size="lg">Location</Form.Label>
              <Form.Control
                size="lg"
                placeholder="Enter your reminder"
                value={location}
                onChange={e => e.target.value.length <= 30 && setLocation(e.target.value)}
              />

              <Form.Label size="lg">Reminder Color</Form.Label>
              <Form.Control size="lg" as="select" value={color} onChange={e => setColor(e.target.value)}>
                {colors}
              </Form.Control>

              <Form.Label size="lg">Hour</Form.Label>
              <Form.Control size="lg" as="select" value={hour} onChange={e => setHour(e.target.value)}>
                <option value="">Choose an hour</option>
                {hours}
              </Form.Control>

              {reminder && (
                <>
                  <Form.Label size="lg">Day</Form.Label>
                  <Form.Control
                    size="lg"
                    placeholder="MM/DD/YYYY"
                    value={day}
                    onChange={e => e.target.value.length <= 30 && setDay(e.target.value)}
                  />
                </>
              )}

              {errorMessage && <p className="error-message">{errorMessage}</p>}
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          {weather && <div className="weather">Weather in this day: {weather}</div>}
          {!reminder && (
            <Button variant="danger" onClick={removeAll}>
              Delete this day reminders
            </Button>
          )}

          {reminder && (
            <Button variant="danger" onClick={removeReminder}>
              Delete
            </Button>
          )}

          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
          <Button variant="primary" onClick={submitReminder}>
            Save
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default ReminderModal;
