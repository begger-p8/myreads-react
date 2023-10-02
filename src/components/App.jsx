import { Route, Routes } from "react-router-dom"
import "../css/App.css"
import BookSearch from "./BookSearch"
import BooksOverview from "./BooksOverview"
import * as BooksAPI from "../utils/BooksAPI.js"
import { useEffect, useState } from "react"

// component structure of the app:
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
            // for each book in a shelf get data and store in a new array
            for (let shelf in updatedBooks) {
                for (let i = 0; i < updatedBooks[shelf].length; i++) {
                    // find book in shelved books
                    const matchingShelvedBook = shelvedBooks.find((shelved) => {
                        return updatedBooks[shelf][i] === shelved.id
                    })
                    if (matchingShelvedBook) {
                        // if book already is in shelf only update shelf (other data is already loaded)
                        newBooks.push({ ...matchingShelvedBook, shelf: shelf })
                    } else {
                        // else fetch the new book's data
                        await BooksAPI.get(updatedBooks[shelf][i]).then(
                            (book) => {
                                newBooks.push({ ...book, shelf: shelf })
                            }
                        )
                    }
                }
            }
        }
        // then set the new array as the main array
        setShelvedBooks(newBooks)
    }
    // initially fetch shelved books from API
    useEffect(() => {
        getBooks()
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
