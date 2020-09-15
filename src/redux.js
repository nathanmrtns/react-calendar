import {
  combineReducers,
  createStore,
} from 'redux';
import moment from 'moment';

// actions.js
export const addReminder = (day, title, hour, color) => ({
  type: 'ADD_EVENT',
  payload: {day, title, hour, color},
});

// reducers.js
export const reminders = (state = {reminders: []}, action) => {
  switch (action.type) {
    case 'ADD_EVENT':
      const {day} = action.payload;
      let dayStr = moment(day).format('YYYY-MM-DD');
      let reminders = state.reminders;
      if (reminders[dayStr]) {
        reminders[dayStr].push(action.payload)
      } else {
        reminders[dayStr] = [action.payload]
      }
      // reminders.push(action.payload);
      console.log(reminders);
      return {...state, reminders: reminders}
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