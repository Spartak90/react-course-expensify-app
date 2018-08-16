import React from 'react';
import { shallow } from 'enzyme';
import { ExpenseListFilters } from '../../components/ExpenseListFilters';
import moment from 'moment';

let filters, wrapper, dispatchers;

beforeEach(() => {
    filters = {
        sortBy: 'amount',
        startDate: moment(),
        endDate: moment(),
        text: 'Testing Test'
    };

    dispatchers = {
        setEndDate: jest.fn(),
        setStartDate: jest.fn(),
        setTextFilter: jest.fn(),
        sortByAmount: jest.fn(),
        sortByDate: jest.fn()
    };

    wrapper = shallow(<ExpenseListFilters {...dispatchers} filters={filters} />);
});

test('should render ExpensesListFilters correctly', () => {
    expect(wrapper).toMatchSnapshot();
});

test('should execute setStartDate, setEndDate dispatchers correctly when date changes', () => {
    const onDatesChange = wrapper.find('DateRangePicker').prop('onDatesChange');
    const startDate = moment(0), endDate = moment().add(5, 'days');

    onDatesChange({ startDate, endDate });

    expect(dispatchers.setStartDate).toHaveBeenCalledWith(startDate);
    expect(dispatchers.setEndDate).toHaveBeenCalledWith(endDate);
});

test('should execute change calendarFocused state when calendar focus changes', () => {
    const onFocusChange = wrapper.find('DateRangePicker').prop('onFocusChange');

    onFocusChange('startDate');
    expect(wrapper.state('calendarFocused')).toBe('startDate');

    onFocusChange('endDate');
    expect(wrapper.state('calendarFocused')).toBe('endDate');
});

test('should execute setTextFilter when text filter changes', () => {
    const textInputFilter = wrapper.find('input');

    textInputFilter.simulate('change', {target: {value: 'test filter'}});

    expect(dispatchers.setTextFilter).toHaveBeenLastCalledWith('test filter');
});

test('should execute setTextFilter when text filter changes', () => {
    const select = wrapper.find('select');

    select.simulate('change', {target: {value: 'amount'}});
    expect(dispatchers.sortByAmount).toHaveBeenCalled();

    select.simulate('change', {target: {value: 'date'}});
    expect(dispatchers.sortByDate).toHaveBeenCalled();
});
