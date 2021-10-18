import React from "react"
import ExpenseListItem from "./ExpenseListItem"
import selectExpenses from "../selectors/expensesS"
//We are connecting to the store
import { connect } from "react-redux"


const ExpenseList = (props) => (
    //A key is needed for each map element, and the expense is the prop
    <div>
        <h1>Expense List</h1>
        {props.expenses.map((expense) => (
            <ExpenseListItem key={expense.id} expense={expense}/>
        ))}
        
    </div>
)

const mapStateToProps = (state) => {

    return {
        //We could just put state.expenses. But we created the selector so we filter out the information
        //Selector expensesS returns the expenses but with filtered out information
        expenses: selectExpenses(state.expenses, state.filters)
    }
}

//High Order Component - First parenthesis to gather the data from the store. Second, to where it is going to be applied
export default connect(mapStateToProps)(ExpenseList)