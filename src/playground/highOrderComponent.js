// High Order Component (HOC) - A component that renders another component

import React from "react"
import ReactDOM from "react-dom"

//The original component
const Info = (props) => (
    <div>
        <h1>Info</h1>
        <p>The info is : {props.info}</p>
    </div>
)

//A function that will wrap a component, inside another component.
//In this case WrappedComponent is Info, and it will be included inside another component (AdminInfo)
//It is somewhat similar to a inherited toString from Java. (Person -> Employee, toString super() + Employee toString)
//It is required to this method not just return JSX (arrow function only parenthesis), because we need to pass the WrappedComponent
//and then, inside we pass the props
const withAdminWarning = (WrappedComponent) => {
    return (props) => (
        <div>
            {props.isAdmin && <p>This is private info. Please don't share</p>}
            <WrappedComponent {...props}/>
        </div>
    )
}

const requireAuthentication = (WrappedComponent) => {
    return (props) => (
        <div>
            {props.isAuthenticated ? <WrappedComponent {...props} /> : <p>Please login to see the info</p>}
            
        </div>
    )
}

const AdminInfo = withAdminWarning(Info)
const AuthInfo = requireAuthentication(Info)

//Both of these will work, but AdminInfo will have more information.
// ReactDOM.render(<Info info="These are the details" />, document.getElementById("app"))
//ReactDOM.render(<AdminInfo isAdmin={true} info="These are the details" />, document.getElementById("app"))
ReactDOM.render(<AuthInfo isAuthenticated={false} info="These are the details" />, document.getElementById("app"))