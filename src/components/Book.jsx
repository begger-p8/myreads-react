import PropTypes from "prop-types"
import * as BooksAPI from "../utils/BooksAPI.js"
import { useEffect, useState } from "react"

function Book({ book, shelves, onUpdateShelf }) {
    // const [bookItem, setBookItem] = useState(book)

    // async function setBookShelf(book) {
    //     const resAllBooks = await BooksAPI.getAll()
    //     const matchingBook = resAllBooks.find((b) => b.id === book.id)
    //     let shelf = matchingBook ? matchingBook.shelf : "none"
    //     setBookItem({ ...book, shelf: shelf })
    // }

    async function handleUpdateShelf(event) {
        const resUpdate = await BooksAPI.update(book, event.target.value)
        if (onUpdateShelf) {
            onUpdateShelf(resUpdate)
        }
    }

    // useEffect(() => {
    //     if (!book.shelf) {
    //         setBookShelf(book)
    //     }
    // }, [book])

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
                        <select
                            onChange={handleUpdateShelf}
                            defaultValue={book.shelf}>
                            <option value="-" disabled>
                                Move to...
                            </option>
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
