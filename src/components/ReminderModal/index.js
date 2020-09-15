import React, { useState } from 'react';
import { Modal, Button, Form } from 'react-bootstrap';

let hours = [...Array(24).keys()];
hours = hours.map(h => {
  let formattedNumber = ('0' + h).slice(-2);
  formattedNumber = `${formattedNumber}:00`;
  return (
    <option key={h} value={formattedNumber}>
      {formattedNumber}
    </option>
  );
});

let colors = ['Orange', 'Blue', 'Yellow', 'Grey'];
colors = colors.map(color => {
  return (
    <option key={color} value={color}>
      {color}
    </option>
  );
});

const ReminderModal = ({ modalOpen, showModal, submit }) => {
  const handleClose = () => showModal(false);
  const [color, setColor] = useState('Orange');
  const [hour, setHour] = useState('00:00');
  const [title, setTitle] = useState('');

  const submitReminder = () => {
    submit(title, hour, color)
  }

  return (
    <>
      <Modal show={modalOpen} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Modal heading</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group controlId="formBasicEmail">
              <Form.Label>Reminder</Form.Label>
              <Form.Control
                placeholder="Enter your reminder"
                value={title}
                onChange={e => e.target.value.length <= 30 && setTitle(e.target.value)}
              />

              <Form.Label>Reminder Color</Form.Label>
              <Form.Control as="select" value={color} onChange={e => setColor(e.target.value)}>
                {colors}
              </Form.Control>

              <Form.Label>Hour</Form.Label>
              <Form.Control as="select" value={hour} onChange={e => setHour(e.target.value)}>
                {hours}
              </Form.Control>
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
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
