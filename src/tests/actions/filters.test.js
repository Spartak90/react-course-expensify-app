import { setStartDate, setEndDate, sortByAmount, sortByDate, setTextFilter } from '../../actions/filters';
import moment from 'moment';

test('should set up action object for startDate filter', () => {
    const action = setStartDate(moment(0));
    
    expect(action).toEqual({
        type: 'SET_START_DATE',
        startDate: moment(0)
    });
});

test('should set up action object for endDate filter', () => {
    const action = setEndDate(moment(0));
    
    expect(action).toEqual({
        type: 'SET_END_DATE',
        endDate: moment(0)
    });
});

test('should set up action object for sortByAmount filter', () => {
    expect(sortByAmount()).toEqual({
        type: 'SORT_BY_AMOUNT'
    });
});

test('should set up action object for sortByDate filter', () => {
    expect(sortByDate()).toEqual({
        type: 'SORT_BY_DATE'
    });
});

test('should set up action object for text filter', () => {
    const action = setTextFilter('test');

    expect(action).toEqual({
        type: 'SET_TEXT_FILTER',
        text: 'test'
    });
});
