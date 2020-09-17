import React from 'react';
import { mount } from 'enzyme';
import { Provider } from 'react-redux';
import moment from 'moment';
import Enzyme from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';

import { act } from 'react-dom/test-utils';

import { store } from '../store';
import Calendar from '../components/Calendar';
import ReminderModal from '../components/ReminderModal';

Enzyme.configure({ adapter: new Adapter() });

describe('Renders APP', () => {
  it('teste', () => {
    const calendarWrapper = mount(
      <Provider store={store}>
        <Calendar />
      </Provider>,
    );
    const remModal = calendarWrapper.find(ReminderModal);
    const todayWrapper = calendarWrapper.find('.today');
    const reminder = { color: 'blue', location: 'new york', hour: '5', title: 'new reminder' };
    // remModal.props().reminder = reminder;
    act(() => {
      remModal.props().create(reminder);
    });
    todayWrapper.update();
    let today = moment().date()
    let expected = `<div class="day today selected">${today}<div class="reminder blue">new reminder</div></div>`;
    expect(todayWrapper.find('.today').html()).toEqual(
      expect.stringContaining(expected),
    );

  });
});
