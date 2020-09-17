import moment from 'moment';

import { formatDate } from '../helpers/helpers';
import { addReminder } from '../actions';
import { reducers } from '../reducers';

describe('Reminder reducer', () => {
  describe('ADD_REMINDER', () => {
    const day = moment('2020-12-25');
    const reminder = { color: 'blue', location: 'new york', hour: '5', title: 'new reminder' };
    const action = addReminder(day, reminder);
    const newState = reducers({ reminders: { reminders: {} } }, action);

    it('should add new reminder with date key', () => {
      let expected = {
        reminders: {
          [formatDate(day)]: [{ day: day, id: 1, ...reminder }],
        },
      };

      expect(newState.reminders).toEqual(expected);
    });
  });
});
