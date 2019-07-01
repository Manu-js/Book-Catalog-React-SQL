import React from "react";
import ModalEditBook from '../ModalEditBook/Index';
import GenreList from "../GenreList/Index";
import Grid from '@material-ui/core/Grid';
import "./Book.css";

const Book = ({book, handleModifyBook, handleDeleteBook, handleDeleteGenre, handleAddGenre, genres}) => (
  <li key={book.id} className="bookCard">
        <Grid container spacing={24}>
          <Grid item xs={12} className="bookRightContainer">
            <h1 className="bookTittle">{book.tittle}</h1>
            <h2 className="bookPrice">{book.price}€</h2>
            <GenreList
              selectBook={book}
              handleDeleteGenre={handleDeleteGenre}
              editOption={false}
            />           
            <ModalEditBook
              handleDeleteBook={handleDeleteBook}
              bookSelected={book}
              handleAddGenre={handleAddGenre}
              handleModifyBook={handleModifyBook}
              handleDeleteGenre={handleDeleteGenre}
              genres={genres}>
            </ModalEditBook>
          </Grid>
        </Grid>
      </li>
  );

export default Book;
