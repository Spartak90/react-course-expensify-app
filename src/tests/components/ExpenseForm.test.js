import React from 'react';
import { shallow } from 'enzyme';
import { ExpenseForm } from '../../components/ExpenseForm';
import moment from 'moment';

const expense = {
    id: 'klsagjlk23124',
    description: 'test description',
    note: 'test note',
    amount: 5000,
    createdAt: 566222214
};

test('should render ExpenseForm correctly', () => {
    const wrapper = shallow(<ExpenseForm />);

    expect(wrapper).toMatchSnapshot();

    const removeButton = wrapper.find('button[type="button"]');
    expect(removeButton.exists()).toBeFalsy();
});

test('should render ExpenseForm correctly with expense prop', () => {
    const wrapper = shallow(<ExpenseForm  expense = {expense} />);

    expect(wrapper).toMatchSnapshot();
});

test('should render ExpenseForm with expense data', () => {
    const wrapper = shallow(<ExpenseForm expense={expense} />);

    expect(wrapper).toMatchSnapshot();
});

test('should render error for invalid submission', () => {
    const wrapper = shallow(<ExpenseForm />);

    wrapper.find('form').simulate('submit', {preventDefault: () => {}});

    expect(wrapper.state('error').length).toBeGreaterThan(0);
    expect(wrapper).toMatchSnapshot();
});

test('should set description on input change' , () => {
    const wrapper = shallow(<ExpenseForm />);
    const descriptionInput = wrapper.find('input').at(0);

    descriptionInput.simulate('change', {target: {value: 'new description'}});

    expect(wrapper.state('description')).toBe('new description');
});

test('should set note on textinput change' , () => {
    const wrapper = shallow(<ExpenseForm />);
    const textarea = wrapper.find('textarea');

    textarea.simulate('change', {target: {value: 'new note'}});

    expect(wrapper.state('note')).toBe('new note');
});

test('should set amount if valid input on input change' , () => {
    const wrapper = shallow(<ExpenseForm />);
    const amountInput = wrapper.find('input').at(1);

    amountInput.simulate('change', {target: {value: '55.55'}});

    expect(wrapper.state('amount')).toBe('55.55');
});

test('should not set amount if invalid input on input change' , () => {
    const wrapper = shallow(<ExpenseForm />);
    const amountInput = wrapper.find('input').at(1);

    amountInput.simulate('change', {target: {value: 'abc55'}});

    expect(wrapper.state('note')).toBe('');
});

test('should call onSubmit prop for valid submission', () => {
    const onSubmitSpy = jest.fn();
    const wrapper = shallow(<ExpenseForm expense={expense} onSubmit={onSubmitSpy} />);

    wrapper.find('form').simulate('submit', {preventDefault: () => {}});

    expect(wrapper.state('error')).toBe('');
    expect(onSubmitSpy).toHaveBeenCalled();
    expect(onSubmitSpy).toHaveBeenCalledWith({
        description: 'test description',
        note: 'test note',
        amount: 5000,
        createdAt: 566222214
    });
});

test('should set date on date change', () => {
    const now = moment();
    const wrapper = shallow(<ExpenseForm />);

    const onDateChange = wrapper.find('SingleDatePicker').prop('onDateChange');

    onDateChange(now);

    expect(wrapper.state('createdAt')).toEqual(now);
});

test('should change calendarFocused on focus change', () => {
    const wrapper = shallow(<ExpenseForm />);
    const onFocusChange = wrapper.find('SingleDatePicker').prop('onFocusChange');

    onFocusChange({focused: true});
    expect(wrapper.state('calendarFocused')).toBeTruthy();

    onFocusChange({focused: false});
    expect(wrapper.state('calendarFocused')).toBeFalsy();
});

test('should remove expense on remove button click', () => {
    const removeExpense = jest.fn();

    const match = {
        params: {
            id: 'klsagjlk23124'
        }
    };

    const history = {
        push: jest.fn()
    };

    const wrapper = shallow(
        <ExpenseForm 
            expense={expense}
            match={match}
            history={history}
            removeExpense={removeExpense}
        />
    );

    const removeButton = wrapper.find('button[type="button"]');

    removeButton.simulate('click');

    expect(removeExpense).toHaveBeenLastCalledWith({ id: expense.id });
    expect(history.push).toHaveBeenLastCalledWith('/');
});
