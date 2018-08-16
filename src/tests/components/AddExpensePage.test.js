import React from 'react';
import { shallow } from 'enzyme';
import { AddExpensePage } from '../../components/AddExpensePage';

const expense = {
    amount: 50,
    createdAt: 53223525,
    description: 'testing description',
    id: 'sgdksjafa',
    note: 'sldgjalkd'
};

let addExpense, history, wrapper;

beforeEach(() => {
    addExpense = jest.fn();
    
    history = {
        push: jest.fn()
    };

    wrapper = shallow(
        <AddExpensePage addExpense={addExpense} history={history} />
    );
});

test('should render AddExpensePage correctly', () => {
    expect(wrapper).toMatchSnapshot();
});

test('should submit callback correctly', () => {
    const ExpenseForm = wrapper.find('Connect(withRouter(ExpenseForm))');

    const onSubmit = ExpenseForm.prop('onSubmit');

    onSubmit(expense);

    expect(addExpense).toHaveBeenCalledWith(expense);
    expect(history.push).toHaveBeenCalledWith('/');
});
