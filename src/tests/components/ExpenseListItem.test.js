import React from 'react';
import { shallow } from 'enzyme';
import { ExpenseListItem } from '../../components/ExpenseListItem';
import moment from 'moment';

const expense = {
    id: 1,
    description:
    'Water bill',
    amount: 4500,
    createdAt: moment(0)
};

test('should render ExpenseListItem with expenses', () => {
    const wrapper = shallow(<ExpenseListItem {...expense} />);

    expect(wrapper).toMatchSnapshot();
});
