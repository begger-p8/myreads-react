import { Route, Routes } from "react-router-dom"
import "../css/App.css"
import BookSearch from "./BookSearch"
import BooksOverview from "./BooksOverview"

function App() {
    const shelves = [
        {
            name: "wantToRead",
            label: "Want to read",
        },
        {
            name: "currentlyReading",
            label: "Currently reading",
        },
        {
            name: "read",
            label: "Read",
        },
        {
            name: "none",
            label: "None",
        },
    ]
    return (
        <Routes>
            <Route
                exact
                path="/"
                element={<BooksOverview shelves={shelves} />}
            />
            <Route path="/search" element={<BookSearch shelves={shelves} />} />
        </Routes>
    )
}

export default App
