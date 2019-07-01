import React from "react";
import Book from '../Book/Index'

const CheckList = ({books, 
  genres, 
  booksSQL,
  handleAddGenre,
  handleDeleteBook,
  handleModifyBook,
  handleDeleteGenre }) => (
  <section>
    <ul>
      {booksSQL.map(function (book,i) {
        return <Book
          key={i}
          book={book}
          handleAddGenre={handleAddGenre}
          handleDeleteBook={handleDeleteBook}
          handleModifyBook={handleModifyBook}
          handleDeleteGenre={handleDeleteGenre}
          genres={genres}
        />
      })}
    </ul>
  </section>
);

export default CheckList;
