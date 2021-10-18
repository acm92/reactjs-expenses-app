import React from "react"
import { connect } from "react-redux"
import { addExpense } from "../actions/expenses"
import ExpenseForm from "./ExpenseForm"

const AddExpensePage = (props) => (
    <div>
        <h1>Add Expense </h1>
        <ExpenseForm 
            onSubmit={(expense) => {
                props.dispatch(addExpense(expense))
                //React router special props. To redirect to the page you want
                //In this case, the dashboard
                props.history.push("/")
        }}/>
    </div>
)

export default connect()(AddExpensePage)