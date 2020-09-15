import {
  combineReducers,
  createStore,
} from 'redux';

// actions.js
export const addReminder = (day, title, hour, color) => ({
  type: 'ADD_EVENT',
  payload: {day, title, hour, color},
});

// reducers.js
export const reminders = (state = {reminders: []}, action) => {
  switch (action.type) {
    case 'ADD_EVENT':
      let reminders = state.reminders;
      reminders.push(action.payload);
      console.log(action.payload)
      console.log({...state, reminders: reminders});
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