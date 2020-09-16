import { combineReducers, createStore } from 'redux';
import moment from 'moment';

// actions.js
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

const addReminder2 = (reminders, action) => {
  const { day } = action.payload;
  let dayStr = moment(day).format('MM/DD/YYYY');
  // let reminders = state.reminders;
  if (reminders[dayStr]) {
    let id = reminders[dayStr].length + 1;
    reminders[dayStr].push({ ...action.payload, id: id });
  } else {
    reminders[dayStr] = [{ ...action.payload, id: 1 }];
  }
  reminders[dayStr].sort((r1, r2) => r1.hour - r2.hour);
  return reminders;
};

const removeReminder2 = (reminders, day, id) => {
  const dayStr = moment(day).format('MM/DD/YYYY');
  let newReminders = reminders;
  newReminders[dayStr] = newReminders[dayStr].filter(r => {
    return r.id !== id;
  });
  return newReminders;
};

// reducers.js
export const reminders = (state = { reminders: [] }, action) => {
  switch (action.type) {
    case 'ADD_REMINDER': {
      return { ...state, reminders: addReminder2(state.reminders, action) };
    }

    case 'EDIT_REMINDER': {
      const { oldDay } = action.payload;
      let oldDayStr = moment(oldDay).format('MM/DD/YYYY');
      let reminders = state.reminders;
      let oldReminder = reminders[oldDayStr].find(r => {
        return r.id === action.payload.id;
      });

      let newReminders = removeReminder2(reminders, oldDay, oldReminder.id);
      newReminders = addReminder2(newReminders, action);
      return { ...state, reminders: newReminders };
    }

    case 'REMOVE_REMINDER': {
      const { day, id } = action.payload;
      return { ...state, reminders: removeReminder2(state.reminders, day, id) };
    }

    default:
      return state;
  }
};

export const reducers = combineReducers({
  reminders,
});

// store.js
export function configureStore(initialState = {}) {
  const store = createStore(reducers, initialState);
  return store;
}

export const store = configureStore();
