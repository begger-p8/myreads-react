import { useEffect, useState } from "react"
import PropTypes from "prop-types"
import Book from "./Book"

function Shelf({ books, shelves }) {
    const [shelfLabel, setShelfLabel] = useState("Loading...")
    useEffect(() => {
        if (books.length) {
            setShelfLabel(
                shelves.find((shelf) => books[0].shelf === shelf.name).label
            )
        }
    }, [books, shelves])
    return (
        <div className="bookshelf">
            <h2 className="bookshelf-title">{shelfLabel}</h2>
            <div className="bookshelf-books">
                <ol className="books-grid">
                    {books.map((book, i) => {
                        return <Book book={book} shelves={shelves} key={i} />
                    })}
                </ol>
            </div>
        </div>
    )
}

Shelf.propTypes = {
    books: PropTypes.array.isRequired,
    shelves: PropTypes.array.isRequired,
}

export default Shelf
