import { Link } from "react-router-dom"
import { useState, useEffect } from "react"
import Shelf from "./Shelf"
import PropTypes from "prop-types"
import * as BooksAPI from "../utils/BooksAPI.js"

function BooksOverview({ shelves }) {
    const [books, setBooks] = useState([])

    async function getAllBooks() {
        await BooksAPI.getAll().then((res) => setBooks(res))
    }

    useEffect(() => {
        getAllBooks()
        return () => {
            setBooks([])
        }
    }, [])

    return (
        <div className="list-books">
            <div className="list-books-title">
                <h1>MyReads</h1>
            </div>
            <div className="list-books-content">
                {shelves.map((shelf, i) => (
                    <Shelf
                        books={books.filter(
                            (book) => book.shelf === shelf.name
                        )}
                        shelves={shelves}
                        onUpdateShelf={getAllBooks}
                        key={i}
                    />
                ))}
            </div>
            <div className="open-search">
                <Link to="/search">Add a book</Link>
            </div>
        </div>
    )
}

BooksOverview.propTypes = {
    shelves: PropTypes.array.isRequired,
}

export default BooksOverview
