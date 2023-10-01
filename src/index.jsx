import React from "react"
import ReactDOM from "react-dom"
import "./css/index.css"
import App from "./components/App"
import { BrowserRouter } from "react-router-dom"

ReactDOM.render(
    <React.StrictMode>
        {/* use browser router for client side rendering */}
        <BrowserRouter>
            <App />
        </BrowserRouter>
    </React.StrictMode>,
    document.getElementById("root")
)
