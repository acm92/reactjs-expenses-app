import React from "react"
import { connect } from "react-redux"
import ExpenseForm from "./ExpenseForm"
import { editExpense, removeExpense } from "../actions/expenses"

const EditExpensePage = (props) => (
    <div>
        <ExpenseForm expense={props.expense} onSubmit={(expense) => {
            //It will edit the expense with the changes already made in "expense", and redirect to the dashboard
            props.dispatch(editExpense(props.expense.id, expense))
            props.history.push("/")
        }} />
        <button onClick={() => {
            props.dispatch(removeExpense(props.expense.id))
            props.history.push("/")
        }}>Remove item</button>
    </div>
)

const mapStateToProps = (state, props) => {
    return {
        expense: state.expenses.find((expense) => {
            return expense.id === props.match.params.id
        })
    }
}

export default connect(mapStateToProps)(EditExpensePage)