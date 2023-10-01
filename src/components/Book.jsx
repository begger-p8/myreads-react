import PropTypes from "prop-types"
import * as BooksAPI from "../utils/BooksAPI.js"
import { useEffect, useState } from "react"

function Book({ book, shelves, onUpdateShelf }) {
    const [bookItem, setBookItem] = useState(book)

    async function setBookShelf(book) {
        await BooksAPI.getAll().then((res) => {
            const matchingBook = res.find((b) => b.id === book.id)
            let shelf = matchingBook ? matchingBook.shelf : "none"
            setBookItem({ ...book, shelf: shelf })
        })
    }

    async function handleUpdateShelf(event) {
        await BooksAPI.update(book, event.target.value).then((res) => {
            if (onUpdateShelf) {
                onUpdateShelf()
            }
        })
    }

    useEffect(() => {
        if (!book.shelf) {
            setBookShelf(book)
        }
    }, [book])

    return (
        <li>
            <div className="book">
                <div className="book-top">
                    <div
                        className="book-cover"
                        style={{
                            width: 128,
                            height: 193,
                            backgroundImage: `url(${bookItem.imageLinks?.thumbnail})`,
                        }}></div>
                    <div className="book-shelf-changer">
                        <select
                            onChange={handleUpdateShelf}
                            defaultValue={bookItem.shelf}>
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
                <div className="book-title">{bookItem.title}</div>
                <div className="book-authors">
                    {bookItem.authors?.map((author, i) => {
                        return `${author}${
                            i < bookItem.authors.length - 1 ? ", " : ""
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
