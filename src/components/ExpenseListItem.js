//Export a stateless functional component:
// - description, amount, createdAt
import React from "react"
import  { Link } from "react-router-dom"
import moment from "moment"


//each individual expense, a link to edit/"idOfExpense"
const ExpenseListItem = (props) => (
    <div>
        <Link to={`/edit/${props.expense.id}`}>
            <h3>{props.expense.description}</h3>
        </Link>
        <p>Amount: {props.expense.amount} $</p>
        <p>Created at: {moment(props.expense.createdAt).format("DD MMM YYYY")}</p>
    </div>
)

export default ExpenseListItem