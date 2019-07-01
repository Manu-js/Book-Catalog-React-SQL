import React from "react";
import Button from "@material-ui/core/Button";
import DeleteIcon from "@material-ui/icons/Delete";
import InputLabel from "@material-ui/core/InputLabel";
import MenuItem from "@material-ui/core/MenuItem";
import FormControl from "@material-ui/core/FormControl";
import Select from "@material-ui/core/Select";
import "./DeleteGenre.css";

class DeleteGenere extends React.Component {
  constructor(props) {
    super(props);
    this.handleDeleteGlobalGenre = this.handleDeleteGlobalGenre.bind(this);
  }

  state = {
    genreToDelete: "",
    open: false
  };

  handleDeleteGlobalGenre() {
    const { handleDeleteGlobalGenre } = this.props;
    handleDeleteGlobalGenre(this.state.genreToDelete);
  }
  handleChange = event => {
    this.setState({ [event.target.name]: event.target.value });
  };

  handleClose = () => {
    this.setState({ open: false });
  };

  handleOpen = () => {
    this.setState({ open: true });
  };

  render() {
    const { genres } = this.props;
    return (
      <div className="deleteAllWrap">
            <div className="deleteSelectGenre">
        <form autoComplete="off">
          <FormControl className="selectGenre">
            <InputLabel htmlFor="demo-controlled-open-select">
              Genre to delete
            </InputLabel>
            <Select
              open={this.state.open}
              onClose={this.handleClose}
              onOpen={this.handleOpen}
              value={this.state.genreToDelete}
              onChange={this.handleChange}
              inputProps={{
                name: "genreToDelete",
                id: "demo-controlled-open-select"
              }}
            >
              <MenuItem value="">
                <em>Select genre</em>
              </MenuItem>
              {genres.map(function(genre) {
                return (
                  <MenuItem key={genre} value={genre}>
                    {genre}
                  </MenuItem>
                );
              })}
            </Select>
          </FormControl>
        </form>
        </div>
        <Button
          variant="contained"
          color="secondary"
          onClick={this.handleDeleteGlobalGenre}
        >
          <span>Delete</span> <DeleteIcon />
        </Button>
    
      </div>
    );
  }
}

export default DeleteGenere;
