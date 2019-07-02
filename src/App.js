import React, { Component } from "react";
import Header from "./Components/Header/Index.js";
import Main from "./Components/Main/Index.js";
import { booksJson } from "./Services/ApiBook";
import "./App.css";

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      books: booksJson,
      genres: [],
      genresFiltered: [],
      isLoaded: false,
      booksSQL: []
    };
    this.handleDeleteBook = this.handleDeleteBook.bind(this);
    this.handleModifyBook = this.handleModifyBook.bind(this);
    this.handleNewBook = this.handleNewBook.bind(this);
    this.handleDeleteGenre = this.handleDeleteGenre.bind(this);
    this.handleAddGenre = this.handleAddGenre.bind(this);
    this.handleSelectGenre = this.handleSelectGenre.bind(this);
    this.handleDeleteAllGenre = this.handleDeleteAllGenre.bind(this);
    this.handleDeleteAllBook = this.handleDeleteAllBook.bind(this);
    this.handleDeleteGlobalGenre = this.handleDeleteGlobalGenre.bind(this);
  }



  getGenres() {
    const auxArray = [];
    booksJson.map(item => {
      return item.genres.map(item => {
        if (auxArray.indexOf(item) === -1) {
          auxArray.push(item);
        }
        return auxArray;
      });
    });
    this.setState(prevState => ({
      genres: auxArray
    }));
  }

 getGenresAux(){
  const auxArray =[];
  const { booksSQL } = this.state;
  for (let index = 0; index < booksSQL.length; index++) {

    if (auxArray.indexOf(booksSQL[index].genre1) === -1 && booksSQL[index].genre1 !== null){
      auxArray.push(booksSQL[index].genre1);
    }
    if (auxArray.indexOf(booksSQL[index].genre2) === -1 && booksSQL[index].genre2 !== null){
      auxArray.push(booksSQL[index].genre2);
    }
    if (auxArray.indexOf(booksSQL[index].genre3) === -1 && booksSQL[index].genre3 !== null){
      auxArray.push(booksSQL[index].genre3);
    }
  }

  this.setState(prevState => ({
    genres: auxArray
  }));
 }

  handleSelectGenre(e) {
    const { checked, value } = e;
    let auxArray = this.state.genresFiltered;
    if (!checked) {
      var index = auxArray.indexOf(value);
      if (index !== -1) {
        auxArray.splice(index, 1);
      }
    } else {
      auxArray.push(value);
    }
    this.setState(prevState => ({
      genresFiltered: auxArray
    }));
  }

  getArrayGenresBook(book){
    const auxArray =[];
    if (book.genre1 !== "undefined"){
      auxArray.push(book.genre1);
    }    
    if (book.genre2 !== "undefined"){
      auxArray.push(book.genre2);
    }    
    if (book.genre3 !== "undefined"){
      auxArray.push(book.genre3);
    }   
    return auxArray;
  }

  getBookList() {
    const { booksSQL, genresFiltered } = this.state;
    let auxVar = [];
    for (const book of booksSQL) {
      const genreArrayAux  = this.getArrayGenresBook(book)
      const found = genreArrayAux.some(r => genresFiltered.indexOf(r) >= 0);

      if (found === true) {
        auxVar.push(book);
      }
    }
    if (auxVar.length !== 0) {
      return auxVar;
    } else {
      return booksSQL;
    }
  }



  handleAddGenre(genre, idBook) {
    this.setState(prevState => {
      const newState = {
        books: prevState.books.map((book, index) => {
          if (book.id === idBook) {
            book = {
              ...book,
              genres: book.genres.concat(genre)
            };
          }
          return book;
        }),
        genres:
          this.isGenreExist(genre) === -1
            ? prevState.genres.concat(genre)
            : prevState.genres
      };
      return newState;
    });
  }

  isGenreExist(inputGenre) {
    const genres = this.state.genres;
    return genres.indexOf(inputGenre);
  }
 

  handleDeleteGenre(idBook, genre) {
    this.setState(prevState => {
      const newState = {
        books: prevState.books.map((book, index) => {
          if (book.id === idBook) {
            book = {
              ...book,
              genres: genre
            };
          }
          return book;
        })
      };
      return newState;
    });
  }

  handleDeleteGlobalGenre(genreToDelete) {
    this.setState(prevState => {
      const newState = {
        books: prevState.books.map((book, index) => {
          book = {
            ...book,
            genres: book.genres.filter(function(genre) {
              return genre !== genreToDelete;
            })
          };

          return book;
        }),
        genres: prevState.genres.filter(function(genre) {
          return genre !== genreToDelete;
        })
      };
      return newState;
    });
  }

  handleDeleteAllGenre() {
    this.setState(prevState => {
      const newState = {
        books: prevState.books.map((book, index) => {
          book = {
            ...book,
            genres: []
          };

          return book;
        }),
        genres: []
      };
      return newState;
    });
  }

  async handleModifyBook(newBook) {
    await this.updateBookSql(newBook)
    this.getBooksSql();
  }

  async componentDidMount() {
    await this.getBooksSql();
  }

  async handleNewBook(newBook) {
    await this.addBookSql(newBook)
    this.getBooksSql();
  }

  async handleDeleteAllBook() {
    await this.deleteAllBookSql()
    this.getBooksSql();
  }

  async handleDeleteBook(idBook) {
    await this.deleteBookSql(idBook)
    this.getBooksSql();

  }

  /*Llamadas a la base de datos*/ 

  getBooksSql = _ => {

        fetch('http://localhost:4000/books')
        .then(response => response.json())
        .then(response => this.setState({ booksSQL: response.data}))
        //.then(response => this.getGenres())
        .then(response => this.getGenresAux())
        .catch(err => console.error(err))

  }

  deleteAllBookSql = () => {
    fetch(`http://localhost:4000/Books/deleteAll`)
    .then(response => response.json())
    .catch((err => console.log(err)))
    }

  addBookSql = (newBook) => {

    let auxCall = `http://localhost:4000/Books/add?tittle=${newBook.tittle}&price=${newBook.price}`;

    if (newBook.genres[0] !== undefined){
      auxCall += "&genre1=" + newBook.genres[0] + "";
    }
    if (newBook.genres[1] !== undefined){
      auxCall += "&genre2=" + newBook.genres[1] + "";
    }
    if (newBook.genres[2] !== undefined){
      auxCall += "&genre3=" + newBook.genres[2] + "";
    }
    fetch(auxCall)
      .then(response => response.json())
      .catch((err => console.log(err)))
  }

  deleteBookSql = (bookId) => {
    fetch(`http://localhost:4000/Books/delete?id=${bookId}`)
      .then(response => response.json())
      .catch((err => console.log(err)))
  }

  updateBookSql = (bookEditData) => {

    let auxCall = `http://localhost:4000/Books/update?id=${bookEditData.id}&tittle=${bookEditData.tittle}&price=${bookEditData.price}`;

    if (bookEditData.genres[0] !== undefined){
      auxCall += "&genre1=" + bookEditData.genres[0] + "";
    }
    if (bookEditData.genres[1] !== undefined){
      auxCall += "&genre2=" + bookEditData.genres[1] + "";
    }
    if (bookEditData.genres[2] !== undefined){
      auxCall += "&genre3=" + bookEditData.genres[2] + "";
    }
    fetch(auxCall)
      .then(response => response.json())
      .catch((err => console.log(err)))
  }

  render() {
    const { booksSQL ,genres, genresFiltered } = this.state;
    return (
      <div className="App">
        <Header />
        <Main
          books={this.getBookList()}
          booksSQL = {this.getBookList()}
          genres={genres}
          genresFiltered={genresFiltered}
          handleSelectGenre={this.handleSelectGenre}
          handleDeleteAllGenre={this.handleDeleteAllGenre}
          handleAddGenre={this.handleAddGenre}
          handleDeleteBook={this.handleDeleteBook}
          handleModifyBook={this.handleModifyBook}
          handleDeleteGenre={this.handleDeleteGenre}
          handleNewBook={this.handleNewBook}
          handleDeleteAllBook={this.handleDeleteAllBook}
          handleDeleteGlobalGenre={this.handleDeleteGlobalGenre}
        />
      </div>
    );
  }
}

export default App;
