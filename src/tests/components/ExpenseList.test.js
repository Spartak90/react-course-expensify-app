import React from 'react';
import { shallow } from 'enzyme';
import { ExpenseList } from '../../components/ExpenseList';

const expenses = [
    { id: 1, description: 'Water bill', amount: 4500 },
    { id: 2, description: 'Rent bill', amount: 4500 },
    { id: 3, description: 'Dirt bill', amount: 4500 }
];

test('should render ExpenseList with expenses', () => {
    const wrapper = shallow(<ExpenseList expenses={expenses} />);

    expect(wrapper).toMatchSnapshot();
});

test('should render ExpenseList with message', () => {
    const wrapper = shallow(<ExpenseList />);

    expect(wrapper).toMatchSnapshot();
});
