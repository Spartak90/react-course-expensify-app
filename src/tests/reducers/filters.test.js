import filtersReducer from '../../reducers/filters';
import moment from 'moment';

test('should setup default filters value', () => {
    const state = filtersReducer(undefined, { type: '@@INIT' });

    expect(state).toEqual({
        text: '',
        sortBy: 'date',
        startDate: moment().startOf('month'),
        endDate: moment().endOf('month')
    });
});

test('should set sortBy to amount', () => {
    const state = filtersReducer(undefined, { type: 'SORT_BY_AMOUNT' });

    expect(state.sortBy).toBe('amount');
});

test('should set sortBy to date', () => {
    const state = filtersReducer({sortBy: 'amount'}, { type: 'SORT_BY_DATE' });

    expect(state.sortBy).toBe('date');
});

test('should set text filter', () => {
    const state = filtersReducer(undefined, { type: 'SET_TEXT_FILTER', text: 'Testing Text' });

    expect(state.text).toBe('Testing Text');
});

test('shold set startDate filter', () => {
    const state = filtersReducer(undefined, { type: 'SET_START_DATE', startDate: moment(0) });

    expect(state.startDate).toEqual(moment(0));
});

test('shold set endDate filter', () => {
    const state = filtersReducer(undefined, { type: 'SET_END_DATE', endDate: moment(0) });

    expect(state.endDate).toEqual(moment(0));
});
