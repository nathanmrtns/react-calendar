export const addReminder = (day, reminder) => ({
  type: 'ADD_REMINDER',
  payload: { day: day, ...reminder },
});

export const editReminder = (newDay, oldDay, reminder) => ({
  type: 'EDIT_REMINDER',
  payload: { ...reminder, day: newDay, oldDay: oldDay },
});

export const removeReminder = reminder => ({
  type: 'REMOVE_REMINDER',
  payload: { day: reminder.day, id: reminder.id },
});

export const removeAll = day => {
  return ({
    type: 'REMOVE_ALL',
    payload: { day: day },
  });
}