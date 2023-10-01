import { useState } from "react"
import { Link } from "react-router-dom"
import * as BooksAPI from "../utils/BooksAPI"
import PropTypes from "prop-types"
import Book from "./Book"

function BookSearch({ shelvedBooks, shelves, onUpdateShelf }) {
    // to handle each books data (esp. active shelf),
    // we need to merge the books from the shelves (which have shelf data)
    // with the ones from the search API (which donnot have shelf data)
    const [mergedBooks, setMergedBooks] = useState([])
    const [results, setResults] = useState([])

    async function handleQuery(event) {
        // beacuse the function is called on the onChange event,
        // the event target can be uses as query variable
        const query = event.target.value
        if (query.length > 1) {
            await BooksAPI.search(query).then((res) => {
                if (res.length) {
                    // if the search API responses some books,
                    // set the result and
                    // merge them with the shelved ones
                    setResults(res)
                    mergeBooks()
                } else {
                    setResults([])
                    setMergedBooks([])
                }
            })
        } else {
            setResults([])
            setMergedBooks([])
        }
        // if the search query is empty or the API response returns nothing,
        // reset result and the merged
    }

    function mergeBooks() {
        // define an empty array for merged books
        let merged = []
        // for each book in the results
        results.forEach((resultBook) => {
            // try to find a matching one that already is on the shelf
            const match = shelvedBooks.find(
                (shelvedBook) => shelvedBook.id === resultBook.id
            )
            if (match) {
                // if ther is one, push the one from the shelf to the merge array
                merged.push(match)
            } else {
                // if not, push the one from the result to the merge array
                merged.push(resultBook)
            }
        })
        setMergedBooks(merged)
    }

    return (
        <div className="search-books">
            <div className="search-books-bar">
                {/* use Link to navigate */}
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
                    {mergedBooks.map((book) => {
                        // for each merged book render a specific component
                        return (
                            <Book
                                book={book}
                                shelves={shelves}
                                key={book.id}
                                onUpdateShelf={onUpdateShelf}
                            />
                        )
                    })}
                </ol>
            </div>
        </div>
    )
}

// check props
BookSearch.propTypes = {
    shelvedBooks: PropTypes.array.isRequired,
    shelves: PropTypes.array.isRequired,
    onUpdateShelf: PropTypes.func.isRequired,
}

export default BookSearch
