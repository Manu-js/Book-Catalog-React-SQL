import React, { Component } from "react";
import CloseIcon from '@material-ui/icons/Close';
import "./GenreList.css";

class GenreList extends Component {
  constructor(props) {
    super(props);
    this.handleDeleteGenre = this.handleDeleteGenre.bind(this);
  }
  handleDeleteGenre(e) {
    const { handleDeleteGenre, selectBook } = this.props;
    let arrayAux = [];
    selectBook.genres.map((genre, index) => {
      if (genre !== e.target.id) {
        arrayAux.push(genre);
      }
      return selectBook;
    })
    handleDeleteGenre(selectBook.id, arrayAux);
  }
  getArrayGenresBook(){
    const { selectBook, newBook } = this.props;
    const auxArray =[];
    if (newBook){
      return selectBook.genres;
    }
    if (selectBook.genre1 !== null){
      auxArray.push(selectBook.genre1);
    }    
    if (selectBook.genre2 !== null){
      auxArray.push(selectBook.genre2);
    }    
    if (selectBook.genre3 !== null){
      auxArray.push(selectBook.genre3);
    }  
    return auxArray;
  }
  render() {
    const { editOption } = this.props;
    const genresArray = this.getArrayGenresBook();
    return (
      <div className="genreListWrap">
        <span className="listGenreTittle">List of genres: </span>
        <ul className="genreList">
          {genresArray.map((item, i )=> (
            editOption === true ? (
              <li
                id={item}
                key={i}
                value={item}
                className="genreListObject">
                {item}
                <CloseIcon id={item} style={{ fontSize: 15 }} className="closeButton" onClick={this.handleDeleteGenre} />
              </li>
            ) : (
                <li
                  id={item}
                  key={i}
                  value={item}
                  className="genreListObject">{item}
                </li>
              )
          ))}
        </ul>
      </div>
    );
  }
}

export default GenreList;
