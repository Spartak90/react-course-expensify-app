import expensesReducer from '../../reducers/expenses';
import moment from 'moment';
import uuid from 'uuid';

test('should set up reducer with default values', () => {
    const state = expensesReducer(undefined, { type: '@@INIT' })

    expect(state).toEqual([]);
});

test('should set new expense', () => {
    const expense = {
        id: uuid(),
        description: 'testing expense',
        note: 'notes on testing expense',
        amount: '50',
        createdAt: moment(0)
    };

    const state = expensesReducer(undefined, { type: 'ADD_EXPENSE', expense });

    expect(state).toEqual([expense]);
});

test('should edit an existing expense', () => {
    const expense = {
        id: uuid(),
        description: 'testing expense',
        note: 'notes on testing expense',
        amount: '50',
        createdAt: moment(0)
    };

    const editedExpense = {
        id: expect.any(String),
        description: 'testing expense edited',
        note: 'notes on testing expense edited',
        amount: '100',
        createdAt: moment(0)
    };

    const state = expensesReducer([expense], { type: 'EDIT_EXPENSE', id: expense.id, updates: editedExpense });

    expect(state).toEqual([editedExpense]);
});

test('should not edit if id not found', () => {
    const expense = {
        id: uuid(),
        description: 'testing expense',
        note: 'notes on testing expense',
        amount: '50',
        createdAt: moment(0)
    };

    const editedExpense = {
        id: expect.any(String),
        description: 'testing expense edited',
        note: 'notes on testing expense edited',
        amount: '100',
        createdAt: moment(0)
    };

    const state = expensesReducer([expense], { type: 'EDIT_EXPENSE', id: 'abc2', updates: editedExpense });

    expect(state).toEqual([expense]);
});

test('should remove an existing expense', () => {
    const expense = {
        id: uuid(),
        description: 'testing expense',
        note: 'notes on testing expense',
        amount: '50',
        createdAt: moment(0)
    };

    const state = expensesReducer([expense], { type: 'REMOVE_EXPENSE', id: expense.id });

    expect(state).toEqual([]);
});
