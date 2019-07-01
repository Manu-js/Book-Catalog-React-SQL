import React from "react";
import ModalNewBook from '../ModalNewBook/Index';
import CheckGenreList from '../CheckGenreList/Index';
import BookList from '../BookList/Index';
import CircularProgress from '@material-ui/core/CircularProgress';
import "./BooksView.css";

const Booklist = ({ isLoaded, 
  books, 
  booksSQL,
  genresFiltered,
  handleNewBook, 
  genres, 
  handleSelectGenre, 
  handleDeleteBook, 
  handleModifyBook, 
  handleDeleteGenre, 
  handleAddGenre }) => (
  <section>
      <div>
        <CheckGenreList
          genresFiltered={genresFiltered}
          genres={genres}
          handleSelectGenre={handleSelectGenre}
        />
        <BookList
          books={books}
          booksSQL = {booksSQL}
          handleAddGenre={handleAddGenre}
          handleDeleteBook={handleDeleteBook}
          handleModifyBook={handleModifyBook}
          handleDeleteGenre={handleDeleteGenre}
          genres={genres} 
        />
        <ModalNewBook
          handleNewBook={handleNewBook}
          handleDeleteGenre={handleDeleteGenre} />
      </div>

  </section>
);

export default Booklist;
