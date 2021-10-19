import React from "react"
import ReactDOM from "react-dom"
import { Provider } from "react-redux"
import AppRouter from "./routers/AppRouter"
import configureStore from "./store/configureStore"
import "./styles/styles.scss"    
import "normalize.css/normalize.css"    //This too

const store = configureStore()

//Provider: to provide the states from any place of our app
const jsx = (
    <Provider store={store}>
        <AppRouter />
    </Provider>
)

ReactDOM.render(jsx, document.getElementById('app'))