import { useEffect, useState } from "react"
import PropTypes from "prop-types"
import Book from "./Book"

function Shelf({ books, shelves, onUpdateShelf }) {
    // because books are loaded asynchronously but shelves are not
    const [shelfLabel, setShelfLabel] = useState("Loading...")

    if (books.length) {
        // find the matching label based on the first book's shelf name
        const newLabel = shelves.find(
            (shelf) => books[0].shelf === shelf.name
        ).label
        if (newLabel !== shelfLabel) {
            setShelfLabel(newLabel)
        }
    }

    return (
        <div className="bookshelf">
            <h2 className="bookshelf-title">{shelfLabel}</h2>
            <div className="bookshelf-books">
                <ol className="books-grid">
                    {books.map((book) => {
                        // for each book in the shelf render a specific component
                        return (
                            <Book
                                book={book}
                                shelves={shelves}
                                onUpdateShelf={onUpdateShelf}
                                key={book.id}
                            />
                        )
                    })}
                </ol>
            </div>
        </div>
    )
}

// check props
Shelf.propTypes = {
    books: PropTypes.array.isRequired,
    shelves: PropTypes.array.isRequired,
    onUpdateShelf: PropTypes.func.isRequired,
}

export default Shelf
