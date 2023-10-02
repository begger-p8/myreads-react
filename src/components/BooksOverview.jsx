import { Link } from "react-router-dom"
import Shelf from "./Shelf"
import PropTypes from "prop-types"

function BooksOverview({ books, shelves, onUpdateShelf }) {
    return (
        <div className="list-books">
            <div className="list-books-title">
                <h1>MyReads</h1>
            </div>
            <div className="list-books-content">
                {/* for each shelf render a specific component and use the index (i) as the key */}
                {/* the books passed are only the shelf matching ones */}
                {/* shelf update event is handled also */}
                {shelves.map((shelf) => (
                    <Shelf
                        books={books.filter(
                            (book) => book.shelf === shelf.name
                        )}
                        shelves={shelves}
                        onUpdateShelf={onUpdateShelf}
                        key={shelf.name}
                    />
                ))}
            </div>
            {/* use Link to navigate */}
            <div className="open-search">
                <Link to="/search">Add a book</Link>
            </div>
        </div>
    )
}

// check props
BooksOverview.propTypes = {
    books: PropTypes.array.isRequired,
    shelves: PropTypes.array.isRequired,
    onUpdateShelf: PropTypes.func.isRequired,
}

export default BooksOverview
