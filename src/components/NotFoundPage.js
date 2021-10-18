import React from "react"
import { Link } from "react-router-dom"

const NotFoundPage = () => (
    //Link, client-side routing. React-router handles it, instead
    //of refreshing the pages server-side
    <div>
        404 - <Link to="/">Go home</Link>
    </div>
)

export default NotFoundPage