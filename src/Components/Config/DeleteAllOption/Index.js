import React from 'react';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import DeleteIcon from '@material-ui/icons/Delete';
import './DeleteAllOption.css';

class DeleteAllOption extends React.Component {
  constructor(props) {
    super(props);
    this.handleDeleteAllBook = this.handleDeleteAllBook.bind(this);
  }
  state = {
    open: false,
    visibleView: false
  };
  handleDeleteAllBook() {
    const { handleDeleteAll } = this.props;
    handleDeleteAll();
    this.handleClose();
  }
  handleClickOpen = () => {
    this.setState({ open: true });
  };
  handleClose = () => {
    this.setState({ open: false });
  };
  render() {
    const { type } = this.props;
    return (
      <div className="deleteAllWrap">
        <span>Delete all {type}: </span>
        <Button variant="contained" color="secondary" onClick={this.handleClickOpen}>
          <span>Delete</span> <DeleteIcon />
        </Button>
        <Dialog
          open={this.state.open}
          onClose={this.handleClose}
          aria-labelledby="form-dialog-title"
        >
          <DialogTitle id="form-dialog-title">Delete all {type}</DialogTitle>
          <DialogContent>
            <DialogContentText>
              Your {type} will be permanently deleted. You won't be able to retrieve anything you've added.
            </DialogContentText>
          </DialogContent>
          <DialogActions>
            <Button
              onClick={this.handleDeleteAllBook}
              variant="contained"
              color="secondary">
              Delete
            </Button>
            <Button
              variant="contained"
              color="primary"
              onClick={this.handleClose}
            >
              Cancel
            </Button>
          </DialogActions>
        </Dialog>
      </div>
    );
  }
}

export default DeleteAllOption;