import { createStore } from "redux"

//The old way
//this.setState((prevState) => {
    //Changes
//})

// Reducers
const countReducer = (state = { count: 0 }, action) => {
    switch (action.type) {
        case "INCREMENT":
            //Entirely optional, but cool
            return {
                count: state.count + action.incrementBy
            }
        case "DECREMENT":
            return {
                count: state.count - action.decrementBy
            }

        case "SET":
            return {
                count: action.setBy
            }

        case "RESET":
            return {
                count: 0
            }

        default:
            return state
    }

}

//The default state inside
const store = createStore(countReducer)

//The Redux way
//OBJECT DESTRUCTURING: incrementBy. An object is passed through the argument (in the call, not here, this is the definition)
//And that call is expected to have an object with 'incrementBy' inside. Equals one means a default value if it doesn't exist (not passed),
//or is not a number. The empty curly braces "simulates" the object passed in the arguments of the call down below, which should
//have "incrementBy" inside 
const incrementCount = ({ incrementBy = 1 } = {}) => ({
    type: "INCREMENT",
    incrementBy
})

const decrementCount = ({ decrementBy = 1 } = {}) => ({
    type: "DECREMENT",
    decrementBy
})

const resetCount = () => ({
    type: "RESET"
})

const setCount = ({ setBy } = {}) => ({
    type: "SET",
    setBy
})




//This function gets called everytime the store changes
//If we put console.log inside, then we can see every change
store.subscribe(() =>{
    console.log(store.getState())
})

//To unsubscribe
//const unsubscribe = store.subscribe(() => {
//    console.log(store.getState())
//})
//Then call it
//unsubscribe()

//increment count, with extra functionality incrementBy
//Dispatch: inside the parenthesis an action is passed. 
//This action can be anything, it also could be an object. So the function incrementCount() is passed, with an object, to do the destructuring above.
//And this returns an "action" object.
//So incrementCount returns (implicitly, remember the arrow function and parenthesis, look above in the definition)
//an object: "action". Then this action is obtained in createStore. We put "type" as an attribute of action and "incrementBy", another
//attribute which is the action itself.
store.dispatch(incrementCount({ incrementBy: 5 }))


//decrement count
store.dispatch(decrementCount({ decrementBy: 10}))

//increment count
store.dispatch(resetCount())

//set count
store.dispatch(setCount({ setBy: 101 }))


