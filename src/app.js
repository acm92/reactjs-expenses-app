import React from "react"
import ReactDOM from "react-dom"
import { Provider } from "react-redux"
import AppRouter from "./routers/AppRouter"
import configureStore from "./store/configureStore"
import { addExpense } from "./actions/expenses"
import { setTextFilter } from "./actions/filters"
import getVisibleExpenses from "./selectors/expensesS"
import "./styles/styles.scss"    
import "normalize.css/normalize.css"    //This too

const store = configureStore()

store.dispatch(addExpense({ description: "Water Bill", amount: 60, createdAt:532 }))
store.dispatch(addExpense({ description: "Gas Bill", amount: 425424340, createdAt: 201 }))
store.dispatch(addExpense({ description: "Rent", amount: 8133430, createdAt: 2222404 }))


const state = store.getState()
const visibleExpenses = getVisibleExpenses(state.expenses, state.filters)
console.log(visibleExpenses)


console.log(store.getState())

//Provider: to provide the states from any place of our app
const jsx = (
    <Provider store={store}>
        <AppRouter />
    </Provider>
)

ReactDOM.render(jsx, document.getElementById('app'))