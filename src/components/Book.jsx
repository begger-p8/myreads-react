import PropTypes from "prop-types"
import * as BooksAPI from "../utils/BooksAPI.js"

function Book({ book, shelves, onUpdateShelf }) {
    async function handleUpdateShelf(event) {
        // send an API request to update the book's data
        // parameters are the book being updated and the new shelf name
        // because the function is called via the onChange event,
        // the select value can be accessed throught the event target
        await BooksAPI.update(book, event.target.value).then((res) => {
            if (onUpdateShelf) {
                // call the callback function and pass response (updated book list)
                onUpdateShelf(res)
            }
        })
    }

    return (
        <li>
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
                        {/* use the set shelf as default and if it's undefinded use "none" */}
                        <select
                            onChange={handleUpdateShelf}
                            defaultValue={book.shelf || "none"}>
                            <option value="-" disabled>
                                Move to...
                            </option>
                            {/* always use the shelf data defined in the main component to be consistent */}
                            {shelves.map((shelf) => (
                                <option value={shelf.name} key={shelf.name}>
                                    {shelf.label}
                                </option>
                            ))}
                            <option value="none">None</option>
                        </select>
                    </div>
                </div>
                <div className="book-title">{book.title}</div>
                <div className="book-authors">
                    {book.authors?.map((author, i) => {
                        // if the book has multiple authors, separate them with a comma
                        return `${author}${
                            i < book.authors.length - 1 ? ", " : ""
                        }`
                    })}
                </div>
            </div>
        </li>
    )
}

// check props
Book.propTypes = {
    book: PropTypes.object.isRequired,
    shelves: PropTypes.array.isRequired,
    onUpdateShelf: PropTypes.func.isRequired,
}

export default Book
