import { Route, Routes } from "react-router-dom"
import "../css/App.css"
import BookSearch from "./BookSearch"
import BooksOverview from "./BooksOverview"
import * as BooksAPI from "../utils/BooksAPI.js"
import { useEffect, useState } from "react"

function App() {
    // define existing shelves once
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
    ]
    // books that are on the shelf
    const [shelvedBooks, setShelvedBooks] = useState([])
    // fetch shelved book from API
    async function getBooks() {
        await BooksAPI.getAll().then((res) => setShelvedBooks(res))
    }
    // re-define shelved books based on update API response
    function updateShelf(updatedShelf) {
        console.log(updatedShelf)
    }
    // initially fetch shelved books from API
    useEffect(() => {
        getBooks()
        return () => {
            setShelvedBooks([])
        }
    }, [])
    // define routes and pass elements with prop
    return (
        <Routes>
            {/* pass shelved book so they can be displayed */}
            {/* pass shelves for select options */}
            <Route
                exact
                path="/"
                element={
                    <BooksOverview
                        books={shelvedBooks}
                        shelves={shelves}
                        onUpdateShelf={updateShelf}
                    />
                }
            />
            {/* pass shelved books so they can be merged with search results */}
            {/* pass shelves for select options */}
            <Route
                path="/search"
                element={
                    <BookSearch shelvedBooks={shelvedBooks} shelves={shelves} />
                }
            />
        </Routes>
    )
}

export default App
