import { createStore, combineReducers } from "redux"
import uuid from "uuid"

// ADD_EXPENSE
const addExpense = ({ description = "", note = "", amount = 0, createdAt = 0 } = {}) => ({
    type: "ADD_EXPENSE",
    expense: {
        id: uuid(),
        description,
        note,
        amount,
        createdAt
    }
})

// REMOVE_EXPENSE
const removeExpense = ({ id } = {}) => ({
    type: 'REMOVE_EXPENSE',
    id
})


// EDIT_EXPENSE
const editExpense = (id, updates) => ({
    type: "EDIT_EXPENSE",
    id,
    updates
})

// SET_TEXT_FILTER
const setTextFilter = (text = "") => ({
    type: "SET_TEXT_FILTER",
    text
})

// SORT_BY_DATE
const sortByDate = () => ({
    type: "SORT_BY_DATE"
})


// SORT_BY_AMOUNT
const sortByAmount = () => ({
    type: "SORT_BY_AMOUNT"
})

// SET_START_DATE
const setStartDate = (startDate) => ({
    type: "SET_START_DATE",
    startDate
})

// SET_END_DATE
const setEndDate = (endDate) => ({
    type: "SET_END_DATE",
    endDate
})

// Expenses Reducer

const expensesReducerDefaultState = []

const expensesReducer = (state = expensesReducerDefaultState, action) => {
    switch (action.type) {
        case "ADD_EXPENSE":
            //We don't want to change the previous state
            //return state.concat(action.expense)
            //With spread operator. We return a new array: we include the contents of the expenses array(...state) plus action.expense
            return [...state, action.expense]
        case 'REMOVE_EXPENSE':
            //Destructuring the expense, getting id.
            return state.filter(({ id }) => id !== action.id);

        case "EDIT_EXPENSE":
            //Iterating through all expenses. 
            return state.map((expense) => {
                if (expense.id === action.id) {
                    return {
                        //Spread operator, and REPLACE the new data inside (action.updates)
                        ...expense,
                        ...action.updates
                    }
                } else {
                    return expense
                }
            })

        default:
            return state;
    }
};

// Filters Reducer
// text => '', sortBy => 'date', startDate => undefined, endDate => undefined

const filtersReducerDefaultState = {
    text: '',
    sortBy: 'date',
    startDate: undefined,
    endDate: undefined
};

const filtersReducer = (state = filtersReducerDefaultState, action) => {
    switch (action.type) {
        case "SET_TEXT_FILTER":
            return {
                ...state,
                text: action.text
            }

        case "SORT_BY_DATE":
            return {
                ...state,
                sortBy: "date"
            }

        case "SORT_BY_AMOUNT":
            return {
                ...state,
                sortBy: "amount"
            }

        case "SET_START_DATE":
            return {
                ...state,
                startDate: action.startDate
            }

        case "SET_END_DATE":
            return {
                ...state,
                endDate: action.endDate
            }

        default:
            return state;
    }
};

// January 1st 1970

//Get visible expenses
const getVisibleExpenses = (expenses, { text, sortBy, startDate, endDate }) => {
    return expenses.filter((expense) => {
        //This logic means that if startDate/endDate are undefined by the user, the app show all expenses, nothing filtered. 
        //(The last sentence means FALSE || FALSE)
        //If startDate/endDate is/are defined, then the second part (expense.createdAt) is checked (this means FALSE || TRUE)
        const startDateMatch = typeof startDate !== "number" || expense.createdAt >= startDate
        const endDateMatch = typeof endDate !== "number" || expense.createdAt <= endDate
        const textMatch = expense.description.toLowerCase().includes(text.toLowerCase())

        return startDateMatch && endDateMatch && textMatch

    }).sort((a, b) => {
        if (sortBy === "date") {
            return a.createdAt < b.createdAt ? 1 : -1
        } else if(sortBy === "amount") {
            return a.amount < b.amount ? 1 : -1
        }
    })
}


// Store creation
const store = createStore(
    combineReducers({
        expenses: expensesReducer,
        filters: filtersReducer
    })
);

store.subscribe(() => {
    const state = store.getState()
    const visibleExpenses = getVisibleExpenses(state.expenses, state.filters)
    console.log(visibleExpenses)
})



const expenseOne = store.dispatch(addExpense({ description: "Rent", amount: 100, createdAt: 244 }))
const expenseTwo = store.dispatch(addExpense({ description: "Coffee", amount: 2, createdAt: 1231434 }))

//store.dispatch(removeExpense({ id: expenseOne.expense.id }));
//store.dispatch(editExpense(expenseTwo.expense.id, { amount: 500 }))

//store.dispatch(setTextFilter("rent"))
//store.dispatch(setTextFilter())

//store.dispatch(sortByDate())
store.dispatch(sortByAmount())

//store.dispatch(setStartDate(1))
//store.dispatch(setEndDate(1245))

//console.log(store.getState());

const demoState = {
    expenses: [{
        id: 'poijasdfhwer',
        description: 'January Rent',
        note: 'This was the final payment for that address',
        amount: 54500,
        createdAt: 0
    }],
    filters: {
        text: 'rent',
        sortBy: 'amount', // date or amount
        startDate: undefined,
        endDate: undefined
    }
};

const user = {
    name: "Angel",
    age: 29
}

//Object spread operator
console.log({
    //Writing age before ...user, doesn't change the existing data
    ...user,
    location: "Cehegin",
    //To override existing data
    age: 27
})
