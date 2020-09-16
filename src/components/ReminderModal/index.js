import React, { useState, useEffect } from 'react';
import { Modal, Button, Form } from 'react-bootstrap';
import moment from 'moment';

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

const ReminderModal = ({ modalOpen, closeModal, reminder, create, edit, removeReminder }) => {
  useEffect(() => {
    if (reminder) {
      setColor(reminder.color);
      setHour(reminder.hour);
      setLocation(reminder.location);
      setTitle(reminder.title);
      setDay(moment(reminder.day).format('MM/DD/YYYY'))
    }
  }, [reminder]);

  const handleClose = () => {
    setColor('');
    setHour('');
    setLocation('');
    setTitle('');
    closeModal();
  };

  const [color, setColor] = useState('orange');
  const [hour, setHour] = useState('2');
  const [title, setTitle] = useState('aa');
  const [location, setLocation] = useState('aa');
  const [day, setDay] = useState('');

  const submitReminder = () => {
    if (reminder) {
      let oldDay = reminder.day;
      let newDay = moment(day);
      const newReminder = { ...reminder, day: newDay, title, location, hour, color };
      edit(newDay, oldDay, newReminder);
    }
    if (!reminder && title && hour && location) {
      const newReminder = { title, location, hour, color };
      create(newReminder);
      handleClose();
    }
  };

  return (
    <>
      <Modal size="lg" show={modalOpen} onHide={handleClose}>
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
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={removeReminder}>
            Delete
          </Button>
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
