import React from 'react';
import { connect } from 'react-redux';
import { editExpense } from '../actions/expenses';
import ExpenseForm from './ExpenseForm';

export class EditExpensePage extends React.Component {
  onSubmit = () => {
    this.props.editExpense(this.props.match.params.id, this.props.expense);
    this.props.history.push('/');
  }

  render () {
    return (
      <div>
        <ExpenseForm
          expense={this.props.expense}
          onSubmit={this.onSubmit} />
      </div>
    )
  }
}

const mapStateToProps = (state, ownProps) => {
  return {
    expense: state.expenses.find((expense) => {
      return expense.id === ownProps.match.params.id;
    })
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    editExpense: (id, expense) => dispatch(editExpense(id, expense))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(EditExpensePage);
