import React, { Component } from "react";

import GenreList from "../GenreList/Index";
import AddGenre from "../AddGenre/Index";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogTitle from "@material-ui/core/DialogTitle";
import EditIcon from "@material-ui/icons/Edit";
import "./ModalEditBook.css";

class ModalEditBook extends Component {
  constructor(props) {
    super(props);
    this.onBookUpdate = this.onBookUpdate.bind(this);
    this.deleteThisBook = this.deleteThisBook.bind(this);
    this.handleAddNewGenre = this.handleAddNewGenre.bind(this);
    this.handleDeleteGenre = this.handleDeleteGenre.bind(this);
  }
  state = {
    open: false,
    visibleView: false,
    newBookData: {
      tittle: "",
      price: "",
      genres: [],
      id: null,
    }
  };

  updateBook(){
    const { bookSelected } = this.props;

    let auxBook = [];

    auxBook.tittle = bookSelected.tittle;
    auxBook.price = bookSelected.price;
    auxBook.id = bookSelected.idBooks;
    auxBook.genres = [];
    if(bookSelected.genre1 !== null){
      auxBook.genres.push(bookSelected.genre1)
    }
    if(bookSelected.genre2 !== null){
      auxBook.genres.push(bookSelected.genre2)
    }
    if(bookSelected.genre3 !== null){
      auxBook.genres.push(bookSelected.genre3)
    }
    return auxBook;
  }

  componentDidMount() {
    this.setState({ newBookData: this.updateBook() });
  }
  deleteThisBook() {
    const { handleDeleteBook, bookSelected } = this.props;
    handleDeleteBook(bookSelected.idBooks);
    this.handleClose();
  }

  onBookUpdate(e) {
    const { handleModifyBook } = this.props;
    handleModifyBook(this.state.newBookData);
    this.handleClose();
  }
  handleAddNewGenre(text) {
    this.setState(prevState => {
      const newState = {
        newBookData: {
          ...prevState.newBookData,
          genres: prevState.newBookData.genres.concat(text)
        }
      };
      return newState;
    });
  }

  updateInputValue(e) {
    const { newBookData } = this.state;
    this.setState({
      newBookData: {
        ...newBookData,
        [e.target.name]: e.target.value
      }
    });
  }
  handleDeleteGenre(idBook, genre) {

    this.setState(prevState => {
      const newState = {
        newBookData: {
          ...prevState.newBookData,
          genres: genre
        }
      };
      return newState;
    });
  }

  handleClickOpen = () => {

    this.setState({ open: true,
      newBookData: this.updateBook() });
  };

  handleClose = () => {
    this.setState({ open: false });
  };

  showNewGenre() {
    this.setState({ visibleView: true });
  }
  hideNewGenre() {
    this.setState({ visibleView: false });
  }

  render() {
    const { bookSelected } = this.props;

    return (
      <div className="editButton">
        <Button
          variant="contained"
          color="primary"
          onClick={this.handleClickOpen}
        >
          <EditIcon />
        </Button>
        <Dialog
          open={this.state.open}
          onClose={this.handleClose}
          aria-labelledby="form-dialog-title"
        >
          <DialogTitle id="form-dialog-title">Modify Book</DialogTitle>
          <DialogContent>
            <TextField
              id="tittle"
              label="Tittle"
              name="tittle"
              value={this.state.newBookData.tittle}
              onChange={evt => this.updateInputValue(evt)}
              margin="normal"
              fullWidth
            />
            <TextField
              type="number"
              id="price"
              label="Price"
              name="price"
              value={this.state.newBookData.price}
              onChange={evt => this.updateInputValue(evt)}
              margin="normal"
              fullWidth
            />

            <GenreList
              selectBook={this.state.newBookData}
              newBook={this.state.newBookData}
              handleAddGenre={this.handleAddNewGenre}
              handleDeleteGenre={this.handleDeleteGenre}
              editOption={true}
            />
            <AddGenre 
              selectBook={this.state.newBookData}
              handleAddGenre={this.handleAddNewGenre}
              genres={this.state.newBookData.genres}
            />
          </DialogContent>
          <DialogActions>
            <Button
              variant="contained"
              color="secondary"
              onClick={this.deleteThisBook}
              id={bookSelected.id}
            >
              Delete Book
            </Button>
            <Button
              variant="contained"
              color="primary"
              onClick={this.onBookUpdate}
            >
              Accept
            </Button>
          </DialogActions>
        </Dialog>
      </div>
    );
  }
}

export default ModalEditBook;
