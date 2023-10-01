import { Route, Routes } from "react-router-dom"
import "../css/App.css"
import BookSearch from "./BookSearch"
import BooksOverview from "./BooksOverview"
import * as BooksAPI from "../utils/BooksAPI.js"
import { useEffect, useState } from "react"

// compnent structure of the app:
// - app (handling views, shelves and administrates the books that are shown in shelves)
// - - book overview
// - - - - shelf (one for each book shelf, handles books for specific shelf)
// - - - - - - book (one for each book in the shelf, handles the book data and notifies parent on shelf update)
// - - book search (handlind the search input and search results)
// - - - - book (one for each search result)

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
    async function updateShelf(updatedBooks) {
        let newBooks = []
        if (updatedBooks) {
            // for each book in a shelf fetch the book data and store in an new array
            for (let shelf in updatedBooks) {
                for (let i = 0; i < updatedBooks[shelf].length; i++) {
                    await BooksAPI.get(updatedBooks[shelf][i]).then((book) => {
                        let newBook = { ...book, shelf: shelf }
                        newBooks.push(newBook)
                    })
                }
            }
        }
        // then set the new array as the main array
        setShelvedBooks(newBooks)
    }
    // initially fetch shelved books from API
    useEffect(() => {
        getBooks()
        // cleanup
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
                    <BookSearch
                        shelvedBooks={shelvedBooks}
                        shelves={shelves}
                        onUpdateShelf={updateShelf}
                    />
                }
            />
        </Routes>
    )
}

export default App
