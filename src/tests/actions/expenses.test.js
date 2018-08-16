import { addExpense, editExpense, removeExpense } from '../../actions/expenses';

test('should set up remove expense action object', (() => {
    const action = removeExpense({ id: '1234abc' });

    expect(action).toEqual({
        type: 'REMOVE_EXPENSE',
        id: '1234abc'
    });
}));

test('should set up edit expense action object', () => {
    expect(editExpense('1234abc', {
        description: 'test',
        note: 'notes on test',
        amount: 20,
        createdAt: 50000
    })).toEqual({
        type: 'EDIT_EXPENSE',
        id: '1234abc',
        updates: {
            description: 'test',
            note: 'notes on test',
            amount: 20,
            createdAt: 50000
        }
    });
});

test('should set up add expense action object with default values', () => {
    const action = addExpense();

    expect(action).toEqual({
        type: 'ADD_EXPENSE',
        expense: {
            id: expect.any(String),
            description: '',
            amount: 0,
            note: '',
            createdAt: 0
        }
    });
});

test('should set up add expense action object', () => {
    const action = addExpense({
        description: 'Rent',
        amount: 1999,
        createdAt: 4500,
        note: 'The hard part of every month.'
    });

    expect(action).toEqual({
        type: 'ADD_EXPENSE',
        expense: {
            id: expect.any(String),
            description: 'Rent',
            amount: 1999,
            createdAt: 4500,
            note: 'The hard part of every month.'
        }
    });
});
