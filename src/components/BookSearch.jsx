import { useState } from "react"
import { Link } from "react-router-dom"
import * as BooksAPI from "../utils/BooksAPI"
import Book from "./Book"

function BookSearch({ shelves }) {
    const [results, setResults] = useState([])

    async function handleQuery(event) {
        const query = event.target.value
        if (query.length > 1) {
            const resSearch = await BooksAPI.search(query)
            if (resSearch.length) {
                setResults(resSearch)
            } else {
                setResults([])
            }
        } else {
            setResults([])
        }
    }

    return (
        <div className="search-books">
            <div className="search-books-bar">
                <Link className="close-search" to="/">
                    Close
                </Link>
                <div className="search-books-input-wrapper">
                    <input
                        name="query"
                        type="text"
                        placeholder="Search by title, author, or ISBN"
                        onChange={handleQuery}
                    />
                </div>
            </div>
            <div className="search-books-results">
                <ol className="books-grid">
                    {results.map((book) => {
                        return (
                            <Book book={book} shelves={shelves} key={book.id} />
                        )
                    })}
                </ol>
            </div>
        </div>
    )
}

export default BookSearch
