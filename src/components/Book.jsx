import PropTypes from "prop-types"
import * as BooksAPI from "../utils/BooksAPI.js"

function Book({ book, shelves }) {
    async function handleUpdateShelf(event) {
        const resUpdateShelf = await BooksAPI.update(book, event.target.value)
        console.log(resUpdateShelf)
    }
    return (
        <li key={book.id}>
            <div className="book">
                <div className="book-top">
                    <div
                        className="book-cover"
                        style={{
                            width: 128,
                            height: 193,
                            backgroundImage: `url(${book.imageLinks?.thumbnail})`,
                        }}></div>
                    <div className="book-shelf-changer">
                        <select onChange={handleUpdateShelf}>
                            <option value="none" disabled>
                                Move to...
                            </option>
                            {shelves.map((shelf) => (
                                <option value={shelf.name} key={shelf.name}>
                                    {shelf.label}
                                </option>
                            ))}
                        </select>
                    </div>
                </div>
                <div className="book-title">{book.title}</div>
                <div className="book-authors">
                    {book.authors.map((author, i) => {
                        return `${author}${
                            i < book.authors.length - 1 ? ", " : ""
                        }`
                    })}
                </div>
            </div>
        </li>
    )
}

Book.propTypes = {
    book: PropTypes.object.isRequired,
    shelves: PropTypes.array.isRequired,
}

export default Book
