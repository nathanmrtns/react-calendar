import { combineReducers } from 'redux';

import {formatDate} from './helpers/helpers';

const addReminder = (reminders, action) => {
  const { day } = action.payload;
  let dayStr = formatDate(day);
  if (reminders[dayStr]) {
    let id = reminders[dayStr].length + 1;
    reminders[dayStr].push({ ...action.payload, id: id });
  } else {
    reminders[dayStr] = [{ ...action.payload, id: 1 }];
  }
  reminders[dayStr].sort((r1, r2) => r1.hour - r2.hour);
  return reminders;
};

const removeReminder = (reminders, day, id) => {
  const dayStr = formatDate(day);
  let newReminders = reminders;
  newReminders[dayStr] = newReminders[dayStr].filter(r => {
    return r.id !== id;
  });
  return newReminders;
};

export const reminders = (state = { reminders: [] }, action) => {
  switch (action.type) {
    case 'ADD_REMINDER': {
      return { ...state, reminders: addReminder(state.reminders, action) };
    }

    case 'EDIT_REMINDER': {
      const { oldDay } = action.payload;
      let oldDayStr = formatDate(oldDay);
      let { reminders } = state;
      let oldReminder = reminders[oldDayStr].find(r => {
        return r.id === action.payload.id;
      });

      let newReminders = removeReminder(reminders, oldDay, oldReminder.id);
      newReminders = addReminder(newReminders, action);
      return { ...state, reminders: newReminders };
    }

    case 'REMOVE_REMINDER': {
      const { day, id } = action.payload;
      return { ...state, reminders: removeReminder(state.reminders, day, id) };
    }

    case 'REMOVE_ALL': {
      const { day } = action.payload;
      let dayStr = formatDate(day);
      let { reminders } = state;
      delete reminders[dayStr];
      return { ...state, reminders: reminders };
    }

    default:
      return state;
  }
};

export const reducers = combineReducers({
  reminders,
});