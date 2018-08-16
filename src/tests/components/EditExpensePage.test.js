import React from 'react';
import { shallow } from 'enzyme';
import { EditExpensePage } from '../../components/EditExpensePage';

const updates = {
    amount: 50,
    createdAt: 53223525,
    description: 'testing description',
    id: 'sgdksjafa',
    note: 'sldgjalkd'
};

let id = updates.id, editExpense, history, wrapper, match;

beforeEach(() => {
    editExpense = jest.fn();
    
    history = {
        push: jest.fn()
    };

    match = {
        params: {
            id
        }
    };

    wrapper = shallow(
        <EditExpensePage
            expense={updates}
            editExpense={editExpense}
            history={history}
            match={match}
        />
    );
});

test('should render EditExpensePage correctly', () => {
    expect(wrapper).toMatchSnapshot();
});

test('should submit callback correctly', () => {
    const ExpenseForm = wrapper.find('Connect(withRouter(ExpenseForm))');
    const onSubmit = ExpenseForm.prop('onSubmit');

    onSubmit(id, updates);

    expect(history.push).toHaveBeenLastCalledWith('/');
    expect(editExpense).toHaveBeenLastCalledWith(id, updates);
});
