import React, { Component } from "react";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import "./AddGenre.css";

class AddGenre extends Component {
  state = {
    visibleAddGenre: false
  };

  constructor(props) {
    super(props);
    this.handleAddGenre = this.handleAddGenre.bind(this);
    this.showNewGenre = this.showNewGenre.bind(this);
  }

  handleAddGenre(event) {
    const { handleAddGenre, selectBook } = this.props;
    if (event.key === "Enter") {

      if (this.isGenreExist(event.target.value) === -1) {
        event.preventDefault();
        event.stopPropagation();
        handleAddGenre(event.target.value, selectBook.id);
      }
      this.hideNewGenre();
    }
  }
  
  isGenreExist(inputGenre) {

    const { selectBook } = this.props;
  
    return selectBook.genres.indexOf(inputGenre);

  }

  showNewGenre() {
    this.setState({ visibleAddGenre: true });
  }

  hideNewGenre() {
    this.setState({ visibleAddGenre: false });
  }

  render() {
    return (
      <ul className="genreListWrap">
        <li className="genreAddList">
          {this.state.visibleAddGenre === true ? (
            <TextField
              id="newGenre"
              label="New genre"
              name="newGenre"
              onKeyDown={this.handleAddGenre}
              margin="normal"
            />
          ) : (
            <Button
              variant="outlined"
              color="primary"
              onClick={this.showNewGenre}
            >
              {" "}
              +{" "}
            </Button>
          )}
        </li>
      </ul>
    );
  }
}

export default AddGenre;
