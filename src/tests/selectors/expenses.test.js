import expensesSelector from '../../selectors/expenses';
import moment from 'moment';

const expenses = [
    {
        id: '1',
        description: 'Gum',
        note: '',
        amount: 195,
        createdAt: 0
    },

    {
        id: '2',
        description: 'Rent',
        note: '',
        amount: 1950,
        createdAt: moment(0).subtract(4, 'days').valueOf()
    },

    {
        id: '3',
        description: 'Credit Card',
        note: '',
        amount: 4500,
        createdAt: moment(0).add(4, 'days').valueOf()
    }
];

test('should filter by text value', () => {
    const filteredExpenses = expensesSelector(expenses, { text: 'en', sortBy: 'date' });

    expect(filteredExpenses).toEqual([expenses[1]]);
});

test('should filter by startDate', () => {
    const filters = {
        text: '',
        sortBy: 'date',
        startDate: moment(0),
        endDate: undefined
    };

    const filteredExpenses = expensesSelector(expenses, filters);

    expect(filteredExpenses).toEqual([expenses[2], expenses[0]]);
});


test('should filter by endDate', () => {
    const filters = {
        text: '',
        sortBy: 'date',
        startDate: undefined,
        endDate: moment(0)
    };

    const filteredExpenses = expensesSelector(expenses, filters);

    expect(filteredExpenses).toEqual([expenses[0], expenses[1]]);
});


test('should filter by date', () => {
    const filters = {
        text: '',
        sortBy: 'date',
        startDate: undefined,
        endDate: undefined
    };

    const filteredExpenses = expensesSelector(expenses, filters);

    expect(filteredExpenses).toEqual([expenses[2], expenses[0], expenses[1]]);
});


test('should filter by date', () => {
    const filters = {
        text: '',
        sortBy: 'amount',
        startDate: undefined,
        endDate: undefined
    };

    const filteredExpenses = expensesSelector(expenses, filters);

    expect(filteredExpenses).toEqual([expenses[2], expenses[1], expenses[0]]);
});
