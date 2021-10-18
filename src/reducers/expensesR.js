const expensesReducerDefaultState = []

export default (state = expensesReducerDefaultState, action) => {
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